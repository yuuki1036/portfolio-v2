import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders, getRequestIP } from "@tanstack/react-start/server";
import { Resend } from "resend";
import { contactServerSchema, type ContactFormValues } from "#/lib/contact-schema.js";
import { getServerEnv } from "#/lib/env.server.js";
import { checkRateLimit } from "#/lib/rate-limit.server.js";

/**
 * Contact フォーム送信のサーバー関数。
 *
 * 検証順 (失敗時は i18n key を message に持たせて throw、クライアント `catch` で
 * `err.message` を見てエラー文言を切り替える):
 * 1. {@link contactServerSchema} で zod 厳密検証
 * 2. honeypot (`data.honeypot !== ""`) → `contact_error_bot`
 * 3. Cloudflare Turnstile siteverify → `contact_error_turnstile`
 * 4. rate-limit (IP 単位、60s window で 5 req まで。Turnstile 成功後にカウント) → `contact_error_rate_limited`
 * 5. Resend `emails.send`、エラーは generic で throw
 *
 * IP は CF-Connecting-IP を優先する（X-Forwarded-For は詐称可能なため rate-limit キーに使わない）。
 */
export const sendContact = createServerFn({ method: "POST" })
  .inputValidator(contactServerSchema)
  .handler(async ({ data }) => {
    if (data.honeypot !== "") {
      throw new Error("contact_error_bot");
    }

    const env = getServerEnv();

    // 接続元 IP は Cloudflare の CF-Connecting-IP を優先（クライアントが詐称できない信頼値）。
    // X-Forwarded-For は任意に詐称可能なため rate-limit キーには使わず fallback のみに留める。
    // getRequestHeaders() の戻り値は既知ヘッダのみ型付けされ cf-connecting-ip を直接 index
    // できないため Record に widen して参照する。
    const headers = getRequestHeaders() as unknown as Record<string, string | undefined>;
    const ip = headers["cf-connecting-ip"] ?? getRequestIP({ xForwardedFor: true }) ?? "unknown";

    const turnstileBody = new FormData();
    turnstileBody.append("secret", env.TURNSTILE_SECRET_KEY);
    turnstileBody.append("response", data.turnstileToken);
    if (ip !== "unknown") {
      turnstileBody.append("remoteip", ip);
    }
    // siteverify は fail-closed: ネットワーク障害 / timeout / 非 2xx / JSON parse 失敗は
    // すべて検証失敗扱いにし、生エラーを client に漏らさない。
    let turnstileSuccess = false;
    try {
      const turnstileRes = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          body: turnstileBody,
          signal: AbortSignal.timeout(5000),
        },
      );
      if (turnstileRes.ok) {
        const turnstileJson = (await turnstileRes.json()) as { success?: boolean };
        turnstileSuccess = turnstileJson.success === true;
      }
    } catch (err) {
      console.error("Turnstile siteverify に失敗:", err);
    }
    if (!turnstileSuccess) {
      throw new Error("contact_error_turnstile");
    }

    // rate-limit は Turnstile 成功後にカウントする。正規ユーザーが Turnstile の一時失敗で
    // 再送しても budget を浪費しないよう、実際に送信に至る試行のみを IP 単位で制限する。
    const rl = checkRateLimit(`contact:${ip}`);
    if (!rl.allowed) {
      throw new Error("contact_error_rate_limited");
    }

    const resend = new Resend(env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: env.CONTACT_FROM_EMAIL,
      to: env.CONTACT_TO_EMAIL,
      replyTo: data.email,
      subject: `[Portfolio] ${data.name}: ${data.subject}`,
      html: renderContactHtml(data),
      headers: { "X-Entity-Ref-ID": crypto.randomUUID() },
    });

    if (error) {
      // Resend の内部詳細（未検証ドメイン等）を client に漏らさない。
      // 詳細はサーバーログに残し、client へは固定の汎用キーを返す。
      console.error("Resend 送信失敗:", error);
      throw new Error("contact_error_generic");
    }

    return { ok: true } as const;
  });

function renderContactHtml(data: ContactFormValues): string {
  const safe = (value: string) =>
    value.replace(
      /[&<>"']/g,
      (char) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[char] ?? char,
    );

  return [
    `<p><strong>From:</strong> ${safe(data.name)} &lt;${safe(data.email)}&gt;</p>`,
    `<p><strong>Subject:</strong> ${safe(data.subject)}</p>`,
    `<hr />`,
    `<pre style="font-family: ui-monospace, monospace; white-space: pre-wrap; line-height: 1.6;">${safe(data.message)}</pre>`,
  ].join("\n");
}
