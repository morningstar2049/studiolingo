// JSON-LD structured data, rendered from the root layout.
// Every value here must reflect reality — Google penalises structured data
// that disagrees with what is on the page.

// The apex domain 308-redirects to www, so www is the canonical host. Canonical
// tags, sitemap entries and JSON-LD ids must all use it.
export const SITE_URL = "https://www.studiolingo.ge";
export const SITE_NAME = "Studio Lingo";

const OG_IMAGE = `${SITE_URL}/og-image.png`;
const MAP_URL = "https://maps.app.goo.gl/jjNmMYDcq6hFzN1VA";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: "სტუდიო ლინგო",
  url: SITE_URL,
  logo: `${SITE_URL}/lingo-logo-main.png`,
  description:
    "Studio Lingo — ინგლისური ენის სკოლა თბილისში. ინგლისურის კურსები ზრდასრულთათვის და მოზარდებისთვის, ოფისში და ონლაინ.",
  sameAs: [
    "https://www.facebook.com/studiolingo",
    "https://www.instagram.com/studio_lingo/",
    "https://www.linkedin.com/company/studio-lingo/",
    "https://www.youtube.com/@studio_lingo",
    "https://www.tiktok.com/@studio.lingo",
  ],
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "EducationalOrganization"],
  "@id": `${SITE_URL}/#localbusiness`,
  name: SITE_NAME,
  image: OG_IMAGE,
  url: SITE_URL,
  telephone: "+995322114623",
  email: "info@studiolingo.ge",
  priceRange: "₾₾",
  address: {
    "@type": "PostalAddress",
    streetAddress: "წერეთლის გამზ. 116",
    addressLocality: "თბილისი",
    addressRegion: "თბილისი",
    postalCode: "0119",
    addressCountry: "GE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.7382887,
    longitude: 44.7809253,
  },
  hasMap: MAP_URL,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "11:00",
      closes: "22:00",
    },
  ],
  areaServed: { "@type": "Country", name: "Georgia" },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: "ka",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

// Course offerings shown on the homepage (#courses). Kept factual — both
// courses genuinely run onsite (საბურთალო) and online. Rendered only on the
// homepage, where these courses appear.
const courseInstances = [
  {
    "@type": "CourseInstance",
    courseMode: "onsite",
    location: {
      "@type": "Place",
      name: SITE_NAME,
      address: {
        "@type": "PostalAddress",
        streetAddress: "წერეთლის გამზ. 116",
        addressLocality: "თბილისი",
        addressCountry: "GE",
      },
    },
  },
  { "@type": "CourseInstance", courseMode: "online" },
];

export const coursesSchema = [
  {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "ინგლისურის კურსები ზრდასრულებისთვის",
    description:
      "ინგლისურის კურსები ზრდასრულთათვის A1-დან C1-მდე — მცირე ჯგუფებში ან ინდივიდუალურად, თბილისში (საბურთალო) და ონლაინ.",
    url: `${SITE_URL}/#courses`,
    inLanguage: "ka",
    educationalLevel: "A1–C1",
    provider: { "@id": `${SITE_URL}/#organization` },
    hasCourseInstance: courseInstances,
  },
  {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "ინგლისურის კურსები მოზარდებისთვის",
    description:
      "ინგლისურის კურსები მოზარდებისთვის (12–16 წელი) — თბილისში (საბურთალო) და ონლაინ.",
    url: `${SITE_URL}/#courses`,
    inLanguage: "ka",
    provider: { "@id": `${SITE_URL}/#organization` },
    hasCourseInstance: courseInstances,
  },
];

export const siteSchemas = [
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
];
