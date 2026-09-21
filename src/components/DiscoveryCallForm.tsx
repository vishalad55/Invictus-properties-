"use client";

import { useState } from "react";
import { BUDGET_RANGES, PROJECT_TYPES } from "@/lib/form-validation";
import { whatsappLink } from "@/lib/site";
import { Field, Honeypot, Select, TextArea, TextInput } from "./Field";

type Status = "idle" | "sending" | "sent" | "error";

const empty = {
  name: "",
  company: "",
  email: "",
  phone: "",
  projectType: "",
  city: "",
  budget: "",
  message: "",
};

/**
 * On submit the enquiry is emailed through the serverless route, and the
 * visitor is handed a prefilled WhatsApp message so they can reach us on the
 * channel they actually use. Nothing is stored in the browser.
 */
export function DiscoveryCallForm() {
  const [values, setValues] = useState(empty);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [wa, setWa] = useState("");

  const set = (key: keyof typeof empty) => (v: string) =>
    setValues((prev) => ({ ...prev, [key]: v }));

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/discovery-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setError(data.error ?? "Something went wrong. Please try WhatsApp or email instead.");
        return;
      }

      const link = whatsappLink(
        `Hi Invictus, I'd like to book a discovery call.\n\nName: ${values.name}\nCompany: ${values.company}\nProject: ${values.projectType} in ${values.city}\nBudget: ${values.budget}`,
      );
      setWa(link);
      setStatus("sent");
      // Open WhatsApp straight away where we have a number configured. If the
      // browser blocks it, the link is still shown below.
      if (link) window.open(link, "_blank", "noopener,noreferrer");
    } catch {
      setStatus("error");
      setError("Network problem. Please try WhatsApp or email instead.");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="border border-accent p-8">
        <h2 className="display text-2xl">Request received</h2>
        <p className="copy mt-4 opacity-80">
          We reply within one working day. If you would rather talk now, continue on WhatsApp.
        </p>
        {wa ? (
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-12 items-center bg-accent px-6 text-sm font-semibold uppercase tracking-[0.12em] text-carbon"
          >
            Continue on WhatsApp
          </a>
        ) : null}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-6 sm:grid-cols-2">
      <Honeypot value={honeypot} onChange={setHoneypot} />

      <Field label="Your name" name="name" required>
        <TextInput
          id="name"
          name="name"
          autoComplete="name"
          required
          value={values.name}
          onChange={(e) => set("name")(e.target.value)}
        />
      </Field>

      <Field label="Company" name="company" required>
        <TextInput
          id="company"
          name="company"
          autoComplete="organization"
          required
          value={values.company}
          onChange={(e) => set("company")(e.target.value)}
        />
      </Field>

      <Field label="Email" name="email" required>
        <TextInput
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={values.email}
          onChange={(e) => set("email")(e.target.value)}
        />
      </Field>

      <Field label="Phone" name="phone" hint="Optional. Helps us call at a time that suits you.">
        <TextInput
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={(e) => set("phone")(e.target.value)}
        />
      </Field>

      <Field label="Project type" name="projectType" required>
        <Select
          id="projectType"
          name="projectType"
          required
          placeholder="Select a project type"
          options={PROJECT_TYPES}
          value={values.projectType}
          onChange={(e) => set("projectType")(e.target.value)}
        />
      </Field>

      <Field label="City" name="city" required>
        <TextInput
          id="city"
          name="city"
          required
          placeholder="Hyderabad, Bangalore…"
          value={values.city}
          onChange={(e) => set("city")(e.target.value)}
        />
      </Field>

      <div className="sm:col-span-2">
        <Field label="Monthly marketing budget" name="budget" required>
          <Select
            id="budget"
            name="budget"
            required
            placeholder="Select a range"
            options={BUDGET_RANGES}
            value={values.budget}
            onChange={(e) => set("budget")(e.target.value)}
          />
        </Field>
      </div>

      <div className="sm:col-span-2">
        <Field
          label="What are you launching?"
          name="message"
          hint="A few lines is enough. Stage, location and what is not working today."
        >
          <TextArea
            id="message"
            name="message"
            value={values.message}
            onChange={(e) => set("message")(e.target.value)}
          />
        </Field>
      </div>

      {status === "error" ? (
        <p role="alert" className="sm:col-span-2 border-l-2 border-accent pl-4 text-sm">
          {error}
        </p>
      ) : null}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="min-h-12 w-full bg-accent px-6 text-sm font-semibold uppercase tracking-[0.12em] text-carbon disabled:opacity-60 sm:w-auto"
        >
          {status === "sending" ? "Sending…" : "Request a discovery call"}
        </button>
        <p className="mt-4 text-xs opacity-70">
          We use these details to reply to you and for nothing else. We do not store them in a
          database or share them.
        </p>
      </div>
    </form>
  );
}
