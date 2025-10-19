import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center pt-4 sm:min-h-[90vh] bg-gray-100">
      <SignIn />
    </div>
  );
}
