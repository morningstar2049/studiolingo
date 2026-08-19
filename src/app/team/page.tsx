import type { Metadata } from "next";

import Team from "@/components/Team/Team";

const title = "ჩვენი გუნდი — ინგლისურის მასწავლებლები | Studio Lingo";
const description =
  "გაიცანი Studio Lingo-ს გუნდი — ინგლისურის პროფესიონალი მასწავლებლები, რომლებიც ზრდასრულებსა და მოზარდებს თბილისში და ონლაინ ასწავლიან.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/team" },
  openGraph: { title, description, type: "website", images: ["/og-logo.png"] },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-logo.png"],
  },
};

export default function TeamPage() {
  return (
    <main className="pt-6 pb-24">
      <Team />
    </main>
  );
}
