/** Shared, dependency-free validation for the two public forms. */

export type FieldSpec = {
  name: string;
  label: string;
  required?: boolean;
  maxLength?: number;
  /** Restrict a select to known values, so a crafted post cannot inject text. */
  allowed?: readonly string[];
};

export type Parsed =
  | { ok: true; values: Record<string, string> }
  | { ok: false; error: string };

export function parseFields(
  payload: Record<string, unknown>,
  specs: FieldSpec[],
): Parsed {
  const values: Record<string, string> = {};
  for (const spec of specs) {
    const raw = payload[spec.name];
    const value = typeof raw === "string" ? raw.trim() : "";
    if (spec.required && value === "") {
      return { ok: false, error: `${spec.label} is required.` };
    }
    if (spec.maxLength && value.length > spec.maxLength) {
      return { ok: false, error: `${spec.label} is too long.` };
    }
    if (spec.allowed && value !== "" && !spec.allowed.includes(value)) {
      return { ok: false, error: `${spec.label} is not a valid choice.` };
    }
    values[spec.name] = value;
  }
  return { ok: true, values };
}

/** Deliberately permissive. Rejecting a valid address is worse than accepting a typo. */
export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

/** Accepts Indian and international formats, digits and separators only. */
export function isPhone(value: string): boolean {
  const digits = value.replace(/[^\d]/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

export const PROJECT_TYPES = [
  "Apartments",
  "Villas",
  "Plots",
  "Commercial",
  "Mixed use",
  "Other",
] as const;

export const BUDGET_RANGES = [
  "Under ₹2 lakh a month",
  "₹2–5 lakh a month",
  "₹5–10 lakh a month",
  "Over ₹10 lakh a month",
  "Not decided yet",
] as const;

export const NETWORK_ROLES = ["Channel partner", "Investor", "Vendor"] as const;
