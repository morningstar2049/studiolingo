import { SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <div className="flex justify-center items-center pt-4 sm:min-h-[90vh] bg-gray-100">
      <SignIn />
    </div>
  );
}
