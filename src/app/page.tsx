import Header from "@/components/Header";
import MainContent from "@/components/MainContent";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Header />
      <Navbar />
      <MainContent />
    </main>
  );
}
