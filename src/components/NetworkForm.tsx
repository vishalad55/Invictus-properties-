"use client";

import { useState } from "react";
import { NETWORK_ROLES } from "@/lib/form-validation";
import { Field, Honeypot, Select, TextArea, TextInput } from "./Field";

const empty = { name: "", role: "", city: "", email: "", phone: "", note: "" };

export function NetworkForm() {
  const [values, setValues] = useState(empty);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const set = (key: keyof typeof empty) => (v: string) =>
    setValues((prev) => ({ ...prev, [key]: v }));

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/network", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("sent");
    } catch {
      setStatus("error");
      setError("Network problem. Please try again.");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="border border-accent p-8">
        <h2 className="display text-2xl">You are on the list</h2>
        <p className="copy mt-4 opacity-80">
          We will be in touch when there is something relevant to your city and role. We do not
          send a general mailing list.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-6 sm:grid-cols-2">
      <Honeypot value={honeypot} onChange={setHoneypot} />

      <Field label="Your name" name="net-name" required>
        <TextInput
          id="net-name"
          autoComplete="name"
          required
          value={values.name}
          onChange={(e) => set("name")(e.target.value)}
        />
      </Field>

      <Field label="I am a" name="net-role" required>
        <Select
          id="net-role"
          required
          placeholder="Select your role"
          options={NETWORK_ROLES}
          value={values.role}
          onChange={(e) => set("role")(e.target.value)}
        />
      </Field>

      <Field label="City" name="net-city" required>
        <TextInput
          id="net-city"
          required
          value={values.city}
          onChange={(e) => set("city")(e.target.value)}
        />
      </Field>

      <Field label="Email" name="net-email" required>
        <TextInput
          id="net-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={values.email}
          onChange={(e) => set("email")(e.target.value)}
        />
      </Field>

      <div className="sm:col-span-2">
        <Field label="Phone" name="net-phone" hint="Optional.">
          <TextInput
            id="net-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => set("phone")(e.target.value)}
          />
        </Field>
      </div>

      <div className="sm:col-span-2">
        <Field
          label="Short note"
          name="net-note"
          hint="What you work on, and what you are looking for from us."
        >
          <TextArea
            id="net-note"
            value={values.note}
            onChange={(e) => set("note")(e.target.value)}
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
          {status === "sending" ? "Sending…" : "Join the network"}
        </button>
        <p className="mt-4 text-xs opacity-70">
          Used to contact you about this enquiry only. Not stored in a database, not shared.
        </p>
      </div>
    </form>
  );
}
