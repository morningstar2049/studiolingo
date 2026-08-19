import type { Metadata } from "next";
import VacanciesList from "./components/VacanciesList";

const title = "ვაკანსიები — შემოგვიერთდი გუნდში | Studio Lingo";
const description =
  "Studio Lingo ეძებს ინგლისურისა და გერმანულის მასწავლებლებსა და გუნდის ახალ წევრებს. იხილე მიმდინარე ვაკანსიები და შემოგვიერთდი.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/career" },
  openGraph: { title, description, images: ["/og-logo.png"] },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-logo.png"],
  },
};

function page() {
  return (
    <div className="p-8 sm:p-11">
      <VacanciesList />
    </div>
  );
}

export default page;
