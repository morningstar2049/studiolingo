// JSON-LD structured data, rendered from the root layout.
// Every value here must reflect reality — Google penalises structured data
// that disagrees with what is on the page.

export const SITE_URL = "https://studiolingo.ge";
export const SITE_NAME = "Studio Lingo";

const OG_IMAGE = "https://i.ibb.co/f8s59ww/page-Thumbnail.png";
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

export const siteSchemas = [
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
];
