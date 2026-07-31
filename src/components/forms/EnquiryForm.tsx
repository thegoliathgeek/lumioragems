"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { enquirySchema } from "@/lib/validation/schemas";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "done" | "error";
type Errors = Partial<Record<"name" | "email" | "phone" | "message" | "consent" | "form", string>>;

const initial = { name: "", email: "", phone: "", message: "", consent: false, company: "" };

export function EnquiryForm({
  enquiryType = "general",
  productSlug,
  productName,
  heading,
  intro,
}: {
  enquiryType?: "general" | "product" | "custom";
  productSlug?: string;
  productName?: string;
  heading?: string;
  intro?: string;
}) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const update = (field: keyof typeof initial) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.type === "checkbox"
        ? (event.target as HTMLInputElement).checked
        : event.target.value;
      setValues((previous) => ({ ...previous, [field]: value }));
      setErrors((previous) => ({ ...previous, [field]: undefined, form: undefined }));
    };

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErrors({});

    // Client-side parse for instant feedback. The server re-parses regardless.
    const parsed = enquirySchema.safeParse({
      ...values,
      enquiryType,
      productSlug,
      productName,
    });

    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof Errors;
        if (field && !next[field]) next[field] = issue.message;
      }
      setErrors(next);
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result = await response.json();

      if (response.ok && result.ok) {
        setStatus("done");
        setValues(initial);
      } else {
        setStatus("error");
        setErrors({ form: result.error ?? "We could not send that. Please try again." });
      }
    } catch {
      setStatus("error");
      setErrors({ form: "We could not reach the server. Please try again in a moment." });
    }
  }

  if (status === "done") {
    return (
      <div className="border border-gold-400/50 bg-rose-50 px-8 py-14 text-center">
        <span className="mx-auto flex size-11 items-center justify-center rounded-full bg-gold-500 text-ivory-50">
          <Check className="size-5" />
        </span>
        <h3 className="mt-6 text-(length:--text-display-sm)">Thank you.</h3>
        <p className="mx-auto mt-3 max-w-sm text-sm text-ink-500">
          Your enquiry is with our gemmologists and you will have a reply within one working day.
          A copy is on its way to your inbox.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-7">
      {heading ? <h3 className="text-(length:--text-display-sm)">{heading}</h3> : null}
      {intro ? <p className="text-sm text-ink-500">{intro}</p> : null}

      {productName ? (
        <div className="border-l-2 border-gold-400 bg-rose-50 px-5 py-3.5">
          <p className="eyebrow mb-1">Enquiring about</p>
          <p className="font-display text-lg text-ink-800">{productName}</p>
        </div>
      ) : null}

      <div className="grid gap-7 sm:grid-cols-2">
        <Field id="name" label="Your name" error={errors.name}>
          <input
            id="name" type="text" required autoComplete="name"
            value={values.name} onChange={update("name")}
            aria-invalid={Boolean(errors.name)}
            className={inputClass(Boolean(errors.name))}
          />
        </Field>

        <Field id="email" label="Email address" error={errors.email}>
          <input
            id="email" type="email" required autoComplete="email"
            value={values.email} onChange={update("email")}
            aria-invalid={Boolean(errors.email)}
            className={inputClass(Boolean(errors.email))}
          />
        </Field>
      </div>

      <Field id="phone" label="Telephone" hint="Optional" error={errors.phone}>
        <input
          id="phone" type="tel" autoComplete="tel"
          value={values.phone} onChange={update("phone")}
          aria-invalid={Boolean(errors.phone)}
          className={inputClass(Boolean(errors.phone))}
        />
      </Field>

      <Field
        id="message"
        label={enquiryType === "custom" ? "Describe the piece you have in mind" : "Your message"}
        error={errors.message}
      >
        <textarea
          id="message" rows={5} required
          value={values.message} onChange={update("message")}
          aria-invalid={Boolean(errors.message)}
          placeholder={
            enquiryType === "custom"
              ? "Colour, carat, setting, metal, budget, and the date you need it by…"
              : "Tell us what you are looking for…"
          }
          className={cn(inputClass(Boolean(errors.message)), "resize-y")}
        />
      </Field>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm text-ink-500">
          <input
            type="checkbox" checked={values.consent} onChange={update("consent")}
            aria-invalid={Boolean(errors.consent)}
            className="mt-1 size-3.5 shrink-0 accent-[var(--color-gold-500)]"
          />
          <span>
            I agree that Lumiora Gems may contact me about this enquiry, in line with the{" "}
            <a href="/policies/privacy" className="text-gold-600 link-underline">privacy policy</a>.
          </span>
        </label>
        {errors.consent ? <p className="mt-2 text-xs text-error">{errors.consent}</p> : null}
      </div>

      {/* Honeypot */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off"
          value={values.company} onChange={update("company")} />
      </div>

      {errors.form ? (
        <p role="alert" className="border border-error/30 bg-error/5 px-4 py-3 text-sm text-error">
          {errors.form}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center gap-2.5 rounded-[2px] bg-ink-800 px-10 py-4 text-[0.72rem] uppercase tracking-[0.22em] text-ivory-50 transition-all duration-500 hover:bg-gold-500 disabled:opacity-60"
      >
        {status === "sending" ? <Loader2 aria-hidden className="size-3.5 animate-spin" /> : null}
        {status === "sending" ? "Sending" : "Send enquiry"}
      </button>
    </form>
  );
}

function inputClass(invalid: boolean) {
  return cn(
    "w-full border-b bg-transparent py-2.5 text-sm text-ink-800 transition-colors duration-300",
    "placeholder:text-ink-400 focus:outline-none",
    invalid ? "border-error focus:border-error" : "border-rose-300 focus:border-gold-500",
  );
}

function Field({
  id, label, hint, error, children,
}: {
  id: string; label: string; hint?: string; error?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="eyebrow">{label}</label>
        {hint ? <span className="text-[0.65rem] text-ink-400">{hint}</span> : null}
      </div>
      {children}
      {error ? <p className="mt-2 text-xs text-error">{error}</p> : null}
    </div>
  );
}
