import type { Metadata } from "next";
import RegistrationForm from "@/components/Courses/RegistrationForm";

const title = "რეგისტრაცია — ინგლისური მოზარდებისთვის | Studio Lingo";
const description =
  "დარეგისტრირდი ინგლისურის კურსზე მოზარდებისთვის — შეავსე ფორმა და ჩვენ მალევე დაგიკავშირდებით.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/register" },
  openGraph: { title, description, images: ["/og-logo.png"] },
};

export default function RegisterPage() {
  return (
    <>
      <div
        className="relative w-full overflow-hidden"
        style={{ background: "linear-gradient(120deg, #2a375c, #181f33)" }}
      >
        <div className="max-w-3xl px-5 mx-auto py-8 text-center sm:py-11">
          <h1
            style={{ fontFeatureSettings: "'case' on" }}
            className="text-2xl font-bold text-[#fff] sm:text-3xl"
          >
            რეგისტრაცია
          </h1>
          <p className="mt-2 text-[15px] text-[#c3c9d4]">
            შეავსე ფორმა და ჩვენ მალევე დაგიკავშირდებით.
          </p>
        </div>
      </div>

      <main className="px-5 py-10 sm:py-14">
        <RegistrationForm variant="page" />
      </main>
    </>
  );
}
