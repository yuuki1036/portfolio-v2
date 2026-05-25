import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";
import { contactServerSchema, type ContactFormValues } from "#/lib/contact-schema.js";
import { getServerEnv } from "#/lib/env.server.js";

/**
 * Contact フォーム送信のサーバー関数。
 *
 * 流れ:
 * 1. {@link contactServerSchema} で厳密 validate（honeypot 空 / turnstileToken は PR3 で締める）
 * 2. {@link getServerEnv} で Resend / 受信アドレスを取り出す（Workers 対応のため関数ラップ）
 * 3. Resend `emails.send` で送信、`{ data, error }` の判別 union を確認
 *
 * PR3 で handler の冒頭に rate-limit + Turnstile 検証層を差し込む。
 */
export const sendContact = createServerFn({ method: "POST" })
  .inputValidator(contactServerSchema)
  .handler(async ({ data }) => {
    const env = getServerEnv();
    const resend = new Resend(env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: env.CONTACT_FROM_EMAIL,
      to: env.CONTACT_TO_EMAIL,
      replyTo: data.email,
      subject: `[Portfolio] ${data.name}: ${data.subject}`,
      html: renderContactHtml(data),
      // Gmail のスレッド集約を避けるため毎回ユニーク ID
      headers: { "X-Entity-Ref-ID": crypto.randomUUID() },
    });

    if (error) {
      throw new Error(`Resend 送信失敗: ${error.message}`);
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
