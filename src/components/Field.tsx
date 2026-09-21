import type { ReactNode } from "react";

const control =
  "mt-2 min-h-12 w-full border border-current/25 bg-transparent px-4 py-3 text-base text-current placeholder:text-current/40 focus:border-accent";

export function Field({
  label,
  name,
  children,
  hint,
  required,
}: {
  label: string;
  name: string;
  children: ReactNode;
  hint?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow block opacity-80">
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
        {required ? <span className="sr-only"> (required)</span> : null}
      </label>
      {children}
      {hint ? (
        <p id={`${name}-hint`} className="mt-2 text-xs opacity-70">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={control} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${control} min-h-32`} />;
}

export function Select({
  options,
  placeholder,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: readonly string[];
  placeholder: string;
}) {
  return (
    <select {...props} className={control}>
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o} className="text-ink">
          {o}
        </option>
      ))}
    </select>
  );
}

/**
 * Honeypot. Hidden from sighted users and from assistive technology, and never
 * focusable, so only a script fills it.
 */
export function Honeypot({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
      <label htmlFor="website">Leave this field empty</label>
      <input
        id="website"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
