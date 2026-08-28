import type { Metadata } from "next";

import Team from "@/components/Team/Team";

const title = "ჩვენი გუნდი — ინგლისურის მასწავლებლები | Studio Lingo";
const description =
  "„სტუდიო ლინგო“ — ყველაზე პოპულარული ინგლისური ენის სკოლა თბილისსა და ონლაინ. გაიცანი ჩვენი გუნდი, მეთოდოლოგია და ღირებულებები, სადაც შეცდომა სწავლის ბუნებრივი ნაწილია.";

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
    <main className="pt-4 sm:pt-10 pb-24 bg-[#eef7f1] -mb-20">
      <Team />
    </main>
  );
}
