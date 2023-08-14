import MainContent from "@/components/MainContent";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="overflow-x-hidden h-[100dvh]">
      <Navbar />
      <MainContent />
    </main>
  );
}
