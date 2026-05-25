import { z } from "zod";

/**
 * Contact フォームのスキーマ。
 *
 * - {@link contactValidationSchema}: クライアント側 TanStack Form の `validators` に渡す形。
 *   ユーザー入力 4 フィールド (`name`/`email`/`subject`/`message`) のみ validate する。
 *   `honeypot` / `turnstileToken` は UI 上のフィールドとして含むが、client では制約をかけない
 *   （TanStack Form の TFormData と Standard Schema の input 型を一致させるため、`z.string()` で受けるだけ）。
 * - {@link contactServerSchema}: PR2 / PR3 で `createServerFn` の `inputValidator` に渡す厳密版。
 *   `honeypot` は空文字必須、`turnstileToken` は PR3 で `min(1)` を強制する。
 */
export const contactValidationSchema = z.object({
  name: z.string().trim().min(1, "contact_error_name_required").max(100),
  email: z.string().trim().email("contact_error_email_invalid").max(200),
  subject: z.string().trim().min(1, "contact_error_subject_required").max(200),
  message: z
    .string()
    .trim()
    .min(10, "contact_error_message_min")
    .max(3000, "contact_error_message_max"),
  // 以下は server 側で厳密化するため client は緩い
  honeypot: z.string(),
  turnstileToken: z.string(),
});

export const contactServerSchema = contactValidationSchema.extend({
  honeypot: z.string().max(0),
  turnstileToken: z.string().min(1, "contact_error_turnstile"),
});

export type ContactFormValues = z.input<typeof contactValidationSchema>;
