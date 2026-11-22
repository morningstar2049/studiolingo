import { fieldError } from "./formValidation";

// Country codes for the WhatsApp / Viber field on the adult registration form.
// Georgia comes first (it is the default and most sign-ups are local), then the
// countries Georgians most often live in, in Georgian alphabetical order, and
// "სხვა ქვეყანა" last for anyone not listed — they type the full number with +.
export type Country = { iso: string; name: string; dial: string };

export const DEFAULT_COUNTRY = "GE";
export const OTHER_COUNTRY = "OTHER";

export const COUNTRIES: Country[] = [
  { iso: "GE", name: "საქართველო", dial: "+995" },
  { iso: "AU", name: "ავსტრალია", dial: "+61" },
  { iso: "AT", name: "ავსტრია", dial: "+43" },
  { iso: "AZ", name: "აზერბაიჯანი", dial: "+994" },
  { iso: "AE", name: "არაბთა გაერთიანებული საამიროები", dial: "+971" },
  { iso: "US", name: "აშშ", dial: "+1" },
  { iso: "BY", name: "ბელარუსი", dial: "+375" },
  { iso: "BE", name: "ბელგია", dial: "+32" },
  { iso: "BG", name: "ბულგარეთი", dial: "+359" },
  { iso: "DE", name: "გერმანია", dial: "+49" },
  { iso: "DK", name: "დანია", dial: "+45" },
  { iso: "GB", name: "დიდი ბრიტანეთი", dial: "+44" },
  { iso: "EG", name: "ეგვიპტე", dial: "+20" },
  { iso: "ES", name: "ესპანეთი", dial: "+34" },
  { iso: "EE", name: "ესტონეთი", dial: "+372" },
  { iso: "TR", name: "თურქეთი", dial: "+90" },
  { iso: "JP", name: "იაპონია", dial: "+81" },
  { iso: "IN", name: "ინდოეთი", dial: "+91" },
  { iso: "IR", name: "ირანი", dial: "+98" },
  { iso: "IE", name: "ირლანდია", dial: "+353" },
  { iso: "IL", name: "ისრაელი", dial: "+972" },
  { iso: "IT", name: "იტალია", dial: "+39" },
  { iso: "CA", name: "კანადა", dial: "+1" },
  { iso: "QA", name: "კატარი", dial: "+974" },
  { iso: "CY", name: "კვიპროსი", dial: "+357" },
  { iso: "LV", name: "ლატვია", dial: "+371" },
  { iso: "LT", name: "ლიეტუვა", dial: "+370" },
  { iso: "MT", name: "მალტა", dial: "+356" },
  { iso: "MD", name: "მოლდოვა", dial: "+373" },
  { iso: "NL", name: "ნიდერლანდები", dial: "+31" },
  { iso: "NO", name: "ნორვეგია", dial: "+47" },
  { iso: "PL", name: "პოლონეთი", dial: "+48" },
  { iso: "PT", name: "პორტუგალია", dial: "+351" },
  { iso: "RO", name: "რუმინეთი", dial: "+40" },
  { iso: "RU", name: "რუსეთი", dial: "+7" },
  { iso: "GR", name: "საბერძნეთი", dial: "+30" },
  { iso: "KR", name: "სამხრეთ კორეა", dial: "+82" },
  { iso: "SA", name: "საუდის არაბეთი", dial: "+966" },
  { iso: "FR", name: "საფრანგეთი", dial: "+33" },
  { iso: "SK", name: "სლოვაკეთი", dial: "+421" },
  { iso: "AM", name: "სომხეთი", dial: "+374" },
  { iso: "UZ", name: "უზბეკეთი", dial: "+998" },
  { iso: "UA", name: "უკრაინა", dial: "+380" },
  { iso: "HU", name: "უნგრეთი", dial: "+36" },
  { iso: "FI", name: "ფინეთი", dial: "+358" },
  { iso: "KZ", name: "ყაზახეთი", dial: "+7" },
  { iso: "SE", name: "შვედეთი", dial: "+46" },
  { iso: "CH", name: "შვეიცარია", dial: "+41" },
  { iso: "CZ", name: "ჩეხეთი", dial: "+420" },
  { iso: "CN", name: "ჩინეთი", dial: "+86" },
  { iso: "HR", name: "ხორვატია", dial: "+385" },
  { iso: OTHER_COUNTRY, name: "სხვა ქვეყანა", dial: "" },
];

export const findCountry = (iso?: string) =>
  COUNTRIES.find((c) => c.iso === iso) ?? COUNTRIES[0];

// Flag emoji from the ISO code (regional indicator letters); a globe for "other".
export const flagOf = (iso: string) =>
  iso === OTHER_COUNTRY
    ? "🌐"
    : String.fromCodePoint(
        ...iso.split("").map((ch) => 0x1f1e6 + ch.charCodeAt(0) - 65),
      );

// The number exactly as it should reach the Google Sheet: "+<code> <digits>".
// A number typed with its own "+" (or "00") is taken as already international;
// a leading 0 is the domestic trunk prefix and is dropped, except in Italy,
// where it is part of the number.
export function intlPhone(iso: string, local: string): string {
  const v = (local ?? "").trim();
  if (v.startsWith("+")) return v;
  if (v.startsWith("00")) return "+" + v.slice(2).trim();
  const country = findCountry(iso);
  let digits = v.replace(/\D/g, "");
  if (country.iso !== "IT" && digits.startsWith("0")) digits = digits.slice(1);
  return country.dial ? `${country.dial} ${digits}` : digits;
}

// Georgian mobiles are 9 digits; elsewhere local lengths vary (Denmark has 8,
// Estonia 7), so other countries only get a sanity floor. "Other country" must
// carry its own country code. Last, the combined value itself is checked: the
// Google Form question requires at least 9 characters and rejects anything
// shorter silently, which the site could never see (no-cors), so nothing
// shorter may leave the browser — whatever prefix the visitor typed.
export function intlPhoneError(iso: string, local: string): string | null {
  const base =
    iso === OTHER_COUNTRY
      ? fieldError(local, { type: "tel", minDigits: 8 })
      : fieldError(local, {
          type: "tel",
          minDigits: iso === DEFAULT_COUNTRY ? 9 : 6,
        });
  if (base) return base;

  const v = local.trim();
  if (iso === OTHER_COUNTRY && !v.startsWith("+") && !v.startsWith("00"))
    return "დაწერეთ + და ქვეყნის კოდი";

  return intlPhone(iso, v).length < 9 ? "ნომერი არასრულია" : null;
}
