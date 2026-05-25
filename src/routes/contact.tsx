import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import type { ReactNode } from "react";
import { Section } from "#/components/layout/section.js";
import { Button } from "#/components/ui/button.js";
import { Reveal } from "#/components/ui/reveal.js";
import { SectionHeading } from "#/components/ui/section-heading.js";
import { contactValidationSchema, type ContactFormValues } from "#/lib/contact-schema.js";
import * as m from "#/paraglide/messages/_index.js";

export const Route = createFileRoute("/contact")({ component: Contact });

type SubmitStatus = "idle" | "success" | "error";

const errorMessageMap: Record<string, () => string> = {
  contact_error_name_required: m.contact_error_name_required,
  contact_error_email_invalid: m.contact_error_email_invalid,
  contact_error_subject_required: m.contact_error_subject_required,
  contact_error_message_min: m.contact_error_message_min,
  contact_error_message_max: m.contact_error_message_max,
};

function translateFieldError(error: unknown): string {
  if (!error) return "";
  if (typeof error === "string") return errorMessageMap[error]?.() ?? error;
  if (typeof error === "object" && "message" in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === "string") return errorMessageMap[message]?.() ?? message;
  }
  return "";
}

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
  honeypot: "",
  turnstileToken: "",
};

function Contact() {
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const form = useForm({
    defaultValues: initialValues,
    validators: { onBlur: contactValidationSchema },
    onSubmit: async ({ value }) => {
      // PR2 で server function 呼び出しに差し替える
      // eslint-disable-next-line no-console
      console.log("[contact stub] would send:", value);
      await new Promise((resolve) => setTimeout(resolve, 300));
      setStatus("success");
    },
  });

  return (
    <>
      {/* ── HERO ── */}
      <section
        id="contact-hero"
        className="relative flex min-h-[60vh] items-center overflow-hidden px-12 pt-[120px] pb-16"
      >
        <div className="ct-glow" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-3xl text-center">
          <Reveal>
            <p className="mb-7 font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
              {m.contact_eyebrow()}
            </p>
            <SectionHeading as="h1" size="lg" className="mb-7">
              {m.contact_heading_line1()}
              <br />
              <em>{m.contact_heading_line2()}</em>
            </SectionHeading>
            <p className="font-sans text-[15px] font-light leading-[1.88] text-muted">
              {m.contact_lead()}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── FORM / SUCCESS ── */}
      <Section variant="full" id="contact-form" className="!py-[120px]">
        <div className="mx-auto max-w-2xl">
          {status === "success" ? (
            <Reveal>
              <div className="text-center">
                <SectionHeading as="h2" size="md" className="mb-7">
                  {m.contact_success_heading()}
                </SectionHeading>
                <p className="font-sans text-[15px] font-light leading-[1.88] text-muted">
                  {m.contact_success_body()}
                </p>
              </div>
            </Reveal>
          ) : (
            <Reveal>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  void form.handleSubmit();
                }}
                noValidate
                className="space-y-8"
              >
                {/* Honeypot: 視覚的に非表示。bot が埋めるとサーバーで弾く。 */}
                <form.Field name="honeypot">
                  {(field) => (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
                    >
                      <label htmlFor={field.name}>Website (leave blank)</label>
                      <input
                        id={field.name}
                        name={field.name}
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={field.state.value ?? ""}
                        onChange={(event) => field.handleChange(event.target.value)}
                      />
                    </div>
                  )}
                </form.Field>

                <form.Field name="name">
                  {(field) => (
                    <FormField
                      label={m.contact_label_name()}
                      name={field.name}
                      error={translateFieldError(field.state.meta.errors[0])}
                    >
                      <input
                        id={field.name}
                        name={field.name}
                        type="text"
                        autoComplete="name"
                        placeholder={m.contact_placeholder_name()}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) => field.handleChange(event.target.value)}
                        aria-invalid={field.state.meta.errors.length > 0 || undefined}
                        aria-describedby={
                          field.state.meta.errors.length > 0 ? `${field.name}-error` : undefined
                        }
                        className={fieldInputClass}
                      />
                    </FormField>
                  )}
                </form.Field>

                <form.Field name="email">
                  {(field) => (
                    <FormField
                      label={m.contact_label_email()}
                      name={field.name}
                      error={translateFieldError(field.state.meta.errors[0])}
                    >
                      <input
                        id={field.name}
                        name={field.name}
                        type="email"
                        autoComplete="email"
                        placeholder={m.contact_placeholder_email()}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) => field.handleChange(event.target.value)}
                        aria-invalid={field.state.meta.errors.length > 0 || undefined}
                        aria-describedby={
                          field.state.meta.errors.length > 0 ? `${field.name}-error` : undefined
                        }
                        className={fieldInputClass}
                      />
                    </FormField>
                  )}
                </form.Field>

                <form.Field name="subject">
                  {(field) => (
                    <FormField
                      label={m.contact_label_subject()}
                      name={field.name}
                      error={translateFieldError(field.state.meta.errors[0])}
                    >
                      <input
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder={m.contact_placeholder_subject()}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) => field.handleChange(event.target.value)}
                        aria-invalid={field.state.meta.errors.length > 0 || undefined}
                        aria-describedby={
                          field.state.meta.errors.length > 0 ? `${field.name}-error` : undefined
                        }
                        className={fieldInputClass}
                      />
                    </FormField>
                  )}
                </form.Field>

                <form.Field name="message">
                  {(field) => (
                    <FormField
                      label={m.contact_label_message()}
                      name={field.name}
                      error={translateFieldError(field.state.meta.errors[0])}
                    >
                      <textarea
                        id={field.name}
                        name={field.name}
                        rows={6}
                        placeholder={m.contact_placeholder_message()}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) => field.handleChange(event.target.value)}
                        aria-invalid={field.state.meta.errors.length > 0 || undefined}
                        aria-describedby={
                          field.state.meta.errors.length > 0 ? `${field.name}-error` : undefined
                        }
                        className={`${fieldInputClass} resize-y leading-[1.7]`}
                      />
                    </FormField>
                  )}
                </form.Field>

                {status === "error" && (
                  <p
                    role="alert"
                    aria-live="polite"
                    className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#d97777]"
                  >
                    {m.contact_error_generic()}
                  </p>
                )}

                <div className="flex justify-end pt-2">
                  <form.Subscribe selector={(state) => state.isSubmitting}>
                    {(isSubmitting) => (
                      <Button type="submit" variant="primary" size="md" disabled={isSubmitting}>
                        {isSubmitting ? m.contact_submitting() : m.contact_submit()}
                      </Button>
                    )}
                  </form.Subscribe>
                </div>
              </form>
            </Reveal>
          )}
        </div>
      </Section>
    </>
  );
}

const fieldInputClass =
  "w-full bg-transparent border border-border2 rounded-sm px-4 py-3 font-sans text-[15px] text-text placeholder:text-dim focus:outline-none focus:border-accent transition-colors duration-200 aria-[invalid=true]:border-[#d97777]";

interface FormFieldProps {
  label: string;
  name: string;
  error: string;
  children: ReactNode;
}

function FormField({ label, name, error, children }: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-sub"
      >
        {label}
      </label>
      {children}
      {error && (
        <p
          id={`${name}-error`}
          role="alert"
          aria-live="polite"
          className="mt-2 font-mono text-[11px] tracking-wide text-[#d97777]"
        >
          {error}
        </p>
      )}
    </div>
  );
}
