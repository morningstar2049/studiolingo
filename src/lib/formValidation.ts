// Field checks shared by the two registration forms, so both say the same
// thing for the same mistake. Each returns the message to show, or null when
// the value is fine.

/** Rules a field can carry beyond being required. */
export type FieldRules = {
  /** Phone-style field: at least this many digits, spaces and + allowed. */
  minDigits?: number;
  /** Nothing but digits, e.g. age. */
  digitsOnly?: boolean;
};

const countDigits = (v: string) => (v.match(/\d/g) ?? []).length;

// What people actually type in a phone box: +995 599 12 34 56, (032) 2-11-46-23.
const PHONE_CHARS = /^[\d\s+()./-]+$/;

export function fieldError(
  value: string,
  field: { type?: string } & FieldRules,
): string | null {
  const v = (value ?? "").trim();
  if (!v) return "ეს ველი სავალდებულოა";

  if (field.type === "email" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v))
    return "შეავსეთ სწორი ელფოსტა";

  if (field.digitsOnly && !/^\d+$/.test(v)) return "მხოლოდ ციფრები";

  if (field.minDigits) {
    if (!PHONE_CHARS.test(v)) return "მხოლოდ ციფრები";
    if (countDigits(v) < field.minDigits)
      return `მინიმუმ ${field.minDigits} ციფრი`;
  }

  return null;
}
