"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { newsletterSchema } from "@/lib/validation/schemas";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();

    const parsed = newsletterSchema.safeParse({ email, consent: true, company });
    if (!parsed.success) {
      setStatus("error");
      setMessage(parsed.error.issues[0]?.message ?? "Please check your email address.");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result = await response.json();

      if (response.ok && result.ok) {
        setStatus("done");
        setMessage("You are on the list. Welcome.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(result.error ?? "That did not go through. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("We could not reach the server. Please try again.");
    }
  }

  if (status === "done") {
    return <p className="text-sm text-gold-600">{message}</p>;
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full max-w-sm">
      <div className="flex items-center gap-2 border-b border-rose-300 pb-2 focus-within:border-gold-500">
        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(event) => { setEmail(event.target.value); setStatus("idle"); }}
          placeholder="Your email address"
          autoComplete="email"
          required
          className="w-full bg-transparent text-sm text-ink-800 placeholder:text-ink-400 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          aria-label="Subscribe"
          className="shrink-0 p-1 text-gold-600 transition-transform duration-300 hover:translate-x-0.5 disabled:opacity-40"
        >
          <ArrowRight className="size-4" />
        </button>
      </div>

      {/* Honeypot — visually hidden, never announced, ignored by real users. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="nl-company">Company</label>
        <input
          id="nl-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
        />
      </div>

      <p className="mt-3 text-xs text-ink-400" aria-live="polite">
        {status === "error" ? (
          <span className="text-error">{message}</span>
        ) : (
          "Occasional letters on new stones. No more than twice a month."
        )}
      </p>
    </form>
  );
}
