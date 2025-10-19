import MainContent from "@/components/MainContent";
import { SignOutButton } from "@clerk/nextjs";
import { currentUser, auth } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();
  const { getToken } = await auth();

  return (
    <main>
      <MainContent />
      <SignOutButton />
    </main>
  );
}
