import { MobileMenuContextProvider } from "@/Context/MobileMenuContext";
import Header from "@/components/Header";
import MainContent from "@/components/MainContent";
import MobileNavMenu from "@/components/MobileNavMenu";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <MobileMenuContextProvider>
      <main>
        <div className="sticky top-0">
          <Header />

          <Navbar />
        </div>
        <MainContent />
        <MobileNavMenu />
      </main>
    </MobileMenuContextProvider>
  );
}
