import { HeroSection } from "@/features/home";
import { Navbar } from "@/shared/components/navigation/navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />
      </main>
    </>
  );
}