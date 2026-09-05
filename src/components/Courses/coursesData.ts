export type Course = {
  slug: string;
  title: string;
  chips: [string, string];
  desc: string;
  accent: string; // color block start
  accentLight: string; // color block end
  accentText: string; // readable chip/link colour
  blockFrom?: string; // illustration block bg start (defaults to accent)
  blockTo?: string; // illustration block bg end (defaults to accentLight)
  art: string; // inline SVG markup
};

export const courses: Course[] = [
  {
    slug: "/courses/individual-online",
    title: "ინდივიდუალური ინგლისური ონლაინ",
    chips: ["ონლაინ", "ინდივიდუალური"],
    desc: "პერსონალური გაკვეთილები, შენს ტემპსა და მიზნებზე მორგებული — მასწავლებლის მთელი ყურადღება მხოლოდ შენზეა. მოქნილი გრაფიკი და ყველაზე სწრაფი პროგრესი.",
    accent: "#2f9e4d",
    accentLight: "#41bd66",
    accentText: "#2f9e4d",
    blockFrom: "#2a375c",
    blockTo: "#181f33",
    art: `<svg viewBox="0 0 320 184" width="100%" height="100%" role="img" aria-label="ინდივიდუალური ონლაინ გაკვეთილი">
      <circle cx="160" cy="90" r="78" fill="#fff" opacity=".08"/>
      <ellipse cx="160" cy="152" rx="66" ry="8" fill="#1e7d3a" opacity=".22"/>
      <path d="M98 138h124l12 12H86z" fill="#fff"/>
      <rect x="100" y="50" width="120" height="90" rx="11" fill="#fff"/>
      <rect x="108" y="58" width="104" height="74" rx="7" fill="#eaf6ee"/>
      <circle cx="150" cy="90" r="15" fill="#2f9e4d"/>
      <path d="M131 121a19 19 0 0 1 38 0z" fill="#2f9e4d"/>
      <circle cx="150" cy="86" r="6.5" fill="#eaf6ee"/>
      <rect x="181" y="100" width="26" height="26" rx="6" fill="#fff" stroke="#cfebd7" stroke-width="1.6"/>
      <circle cx="194" cy="110" r="5" fill="#3bb85e"/><path d="M186 122a8 8 0 0 1 16 0z" fill="#3bb85e"/>
      <circle cx="118" cy="68" r="3.6" fill="#e2574f"/>
      <g><rect x="214" y="38" width="48" height="30" rx="9" fill="#fff"/><path d="M224 66l-3 11 13-8z" fill="#fff"/><circle cx="228" cy="53" r="3.2" fill="#2f9e4d"/><circle cx="238" cy="53" r="3.2" fill="#8fd3a5"/><circle cx="248" cy="53" r="3.2" fill="#cfebd7"/></g>
      <g><circle cx="72" cy="110" r="15" fill="#fff"/><path d="M65 110l5 5 9-10" fill="none" stroke="#2f9e4d" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></g>
    </svg>`,
  },
  {
    slug: "/courses/group-online",
    title: "ჯგუფური ინგლისური ონლაინ",
    chips: ["ონლაინ", "ჯგუფური"],
    desc: "ისწავლე პატარა ჯგუფში, სახლიდან გაუსვლელად — ცოცხალი კომუნიკაცია, თანაგუნდელებთან პრაქტიკა და ხელმისაწვდომი ფასი.",
    accent: "#2f9e4d",
    accentLight: "#41bd66",
    accentText: "#2f9e4d",
    blockFrom: "#2a375c",
    blockTo: "#181f33",
    art: `<svg viewBox="0 0 320 184" width="100%" height="100%" role="img" aria-label="ჯგუფური ონლაინ გაკვეთილი">
      <circle cx="160" cy="92" r="80" fill="#fff" opacity=".08"/>
      <ellipse cx="160" cy="156" rx="72" ry="8" fill="#1e7d3a" opacity=".18"/>
      <rect x="94" y="52" width="62" height="46" rx="10" fill="#fff"/>
      <rect x="164" y="52" width="62" height="46" rx="10" fill="#fff"/>
      <rect x="94" y="104" width="62" height="46" rx="10" fill="#fff"/>
      <rect x="164" y="104" width="62" height="46" rx="10" fill="#fff"/>
      <rect x="90" y="48" width="70" height="54" rx="13" fill="none" stroke="#bfe6cb" stroke-width="3"/>
      <g fill="#2f9e4d">
        <circle cx="125" cy="68" r="8"/><path d="M112 91a13 13 0 0 1 26 0z"/>
        <circle cx="195" cy="68" r="8"/><path d="M182 91a13 13 0 0 1 26 0z"/>
        <circle cx="125" cy="120" r="8"/><path d="M112 143a13 13 0 0 1 26 0z"/>
        <circle cx="195" cy="120" r="8"/><path d="M182 143a13 13 0 0 1 26 0z"/>
      </g>
      <g><circle cx="238" cy="44" r="14" fill="#fff"/><path d="M238 51c-4.5-4-8-6-8-10a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 4-3.5 6-8 10z" fill="#e2574f"/></g>
      <g><circle cx="78" cy="150" r="13" fill="#fff"/><text x="78" y="155" font-size="14" font-weight="800" fill="#2f9e4d" text-anchor="middle" font-family="sans-serif">4</text></g>
      <circle cx="256" cy="120" r="6" fill="#fff" opacity=".5"/>
    </svg>`,
  },
  {
    slug: "/courses/group-onsite",
    title: "ჯგუფური ინგლისური ადგილზე",
    chips: ["ადგილზე", "ჯგუფური"],
    desc: "ცოცხალი გაკვეთილები ჩვენს სივრცეში — ენერგიული გარემო, მოტივირებული ჯგუფი და თვეში ერთხელ პრაქტიკა ბრიტანელ მასწავლებელთან (native speaker).",
    accent: "#eaa41e",
    accentLight: "#f7b73c",
    accentText: "#b9790a",
    art: `<svg viewBox="0 0 320 184" width="100%" height="100%" role="img" aria-label="ჯგუფური გაკვეთილი ადგილზე">
      <circle cx="160" cy="86" r="80" fill="#fff" opacity=".1"/>
      <ellipse cx="160" cy="158" rx="74" ry="8" fill="#b9790a" opacity=".2"/>
      <rect x="86" y="34" width="148" height="86" rx="10" fill="#fff"/>
      <rect x="102" y="86" width="12" height="22" rx="3" fill="#f4b23f"/>
      <rect x="120" y="74" width="12" height="34" rx="3" fill="#eaa41e"/>
      <rect x="138" y="62" width="12" height="46" rx="3" fill="#f4b23f"/>
      <path d="M100 66l18-10 16 8 22-20" fill="none" stroke="#eaa41e" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M186 52l3 6 6.6.9-4.8 4.6 1.1 6.6-5.9-3.1-5.9 3.1 1.1-6.6-4.8-4.6 6.6-.9z" fill="#eaa41e"/>
      <rect x="156" y="120" width="8" height="14" fill="#fff"/>
      <g fill="#fff"><circle cx="108" cy="150" r="11"/><circle cx="160" cy="152" r="11"/><circle cx="212" cy="150" r="11"/></g>
      <g fill="#f7c877"><path d="M96 170a12 12 0 0 1 24 0z"/><path d="M148 172a12 12 0 0 1 24 0z"/><path d="M200 170a12 12 0 0 1 24 0z"/></g>
      <g><path d="M250 42l17 7-17 7-17-7z" fill="#fff"/><path d="M240 51v8c0 4 20 4 20 0v-8" fill="none" stroke="#fff" stroke-width="2.6"/><rect x="266" y="49" width="2.6" height="11" fill="#fff"/></g>
    </svg>`,
  },
  {
    slug: "/courses/teenagers",
    title: "ინგლისური მოზარდებისთვის",
    chips: ["ონლაინ", "9–16 წელი"],
    desc: "სპეციალურად მოზარდებზე მორგებული კურსი — არაფორმალურ, მეგობრულ და ფერად გარემოში, ასაკის შესაბამისი მეთოდებითა და თემებით.",
    accent: "#e2574f",
    accentLight: "#f06b63",
    accentText: "#e2574f",
    art: `<svg viewBox="0 0 320 184" width="100%" height="100%" role="img" aria-label="ინგლისური მოზარდებისთვის">
      <circle cx="152" cy="90" r="78" fill="#fff" opacity=".1"/>
      <ellipse cx="150" cy="156" rx="58" ry="8" fill="#c0332b" opacity=".2"/>
      <path d="M112 152a40 40 0 0 1 80 0z" fill="#fff"/>
      <circle cx="152" cy="86" r="30" fill="#fff"/>
      <path d="M124 82c0-18 56-18 56 2 0-7-4-11-8-11 0-9-40-9-40 9z" fill="#e2574f"/>
      <circle cx="144" cy="86" r="2.8" fill="#e2574f"/><circle cx="160" cy="86" r="2.8" fill="#e2574f"/>
      <path d="M146 96a8 8 0 0 0 12 0" fill="none" stroke="#e2574f" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M120 86a32 32 0 0 1 64 0" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>
      <rect x="116" y="84" width="12" height="22" rx="6" fill="#fff"/>
      <rect x="176" y="84" width="12" height="22" rx="6" fill="#fff"/>
      <g transform="rotate(13 206 130)"><rect x="193" y="110" width="26" height="42" rx="6" fill="#fff"/><rect x="198" y="118" width="16" height="26" rx="3" fill="#ffd7d3"/></g>
      <g fill="#fff"><circle cx="226" cy="66" r="5"/><rect x="230" y="46" width="3" height="22"/><circle cx="248" cy="58" r="5"/><rect x="252" y="40" width="3" height="20"/><path d="M233 46h22v4h-22z"/></g>
      <path d="M88 56l3.2 7 7 1-5 5 1.2 7-6.4-3.5-6.4 3.5 1.2-7-5-5 7-1z" fill="#fff" opacity=".9"/>
    </svg>`,
  },
];
