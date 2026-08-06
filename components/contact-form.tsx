"use client";

import { useState } from "react";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

interface FieldErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const subjects = [
  "Research collaboration",
  "Student / internship application",
  "Dataset or code request",
  "Media enquiry",
  "Other",
];

/**
 * The form posts to `NEXT_PUBLIC_CONTACT_ENDPOINT` when one is configured
 * (any form-handling service that accepts JSON). Without an endpoint it falls
 * back to opening a pre-filled email, so the page never silently drops a
 * message.
 */
export function ContactForm({ mailto }: { mailto: string }) {
  const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: subjects[0]!,
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "mailto">("idle");

  const update = (field: keyof typeof values) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = () => {
    const next: FieldErrors = {};
    if (values.name.trim().length < 2) next.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
      next.email = "Please enter a valid email address.";
    if (!values.subject) next.subject = "Please choose a subject.";
    if (values.message.trim().length < 20)
      next.message = "Please give us at least a couple of sentences (20 characters or more).";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    if (!endpoint) {
      const body = `${values.message}\n\n—\n${values.name}\n${values.email}`;
      window.location.href = `mailto:${mailto}?subject=${encodeURIComponent(
        `[NRL] ${values.subject}`,
      )}&body=${encodeURIComponent(body)}`;
      setState("mailto");
      return;
    }

    try {
      setState("sending");
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("Request failed");
      setState("sent");
      setValues({ name: "", email: "", subject: subjects[0]!, message: "" });
    } catch {
      setState("idle");
      setErrors({ message: "The form could not be submitted. Please email us directly instead." });
    }
  };

  if (state === "sent") {
    return (
      <div className="surface-card rounded-2xl p-8 text-center" role="status">
        <span className="bg-emerald-nrl/12 text-emerald-deep dark:text-emerald-soft mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full">
          <CheckIcon className="h-6 w-6" />
        </span>
        <h3 className="mt-5 text-xl font-semibold">Message received</h3>
        <p className="mx-auto mt-3 max-w-md leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Thank you for writing to Nexus Research Lab. We reply to most enquiries within three
          working days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="surface-card rounded-2xl p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="contact-name" error={errors.name} required>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={update("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={inputClass(Boolean(errors.name))}
            placeholder="Dr. Jane Researcher"
          />
        </Field>

        <Field label="Email address" htmlFor="contact-email" error={errors.email} required>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={update("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={inputClass(Boolean(errors.email))}
            placeholder="you@university.edu"
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Subject" htmlFor="contact-subject" error={errors.subject} required>
          <select
            id="contact-subject"
            name="subject"
            required
            value={values.subject}
            onChange={update("subject")}
            className={inputClass(Boolean(errors.subject))}
          >
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Message" htmlFor="contact-message" error={errors.message} required>
          <textarea
            id="contact-message"
            name="message"
            rows={6}
            required
            value={values.message}
            onChange={update("message")}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            className={cn(inputClass(Boolean(errors.message)), "resize-y")}
            placeholder="Tell us about the collaboration, project or question. If you are applying to join, mention the group and what you have worked on."
          />
        </Field>
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={state === "sending"}
          className="bg-emerald-nrl hover:bg-emerald-deep group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 disabled:opacity-60"
        >
          {state === "sending" ? "Sending…" : "Send message"}
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
        <p className="text-[0.76rem] leading-relaxed" style={{ color: "var(--text-muted)" }}>
          {state === "mailto"
            ? "Your email client should now be open with the message ready to send."
            : "We use your details only to reply to this enquiry."}
        </p>
      </div>
    </form>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "mt-2 w-full rounded-xl border bg-[var(--surface-muted)] px-4 py-3 text-sm outline-none transition-colors",
    hasError ? "border-red-500/70" : "focus:border-emerald-nrl",
  );
}

function Field({
  label,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="text-[0.68rem] font-semibold uppercase tracking-[0.16em]"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
        {required && <span className="text-emerald-nrl ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="mt-2 text-[0.76rem] text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
