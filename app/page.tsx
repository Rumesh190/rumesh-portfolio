import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import OpeningReveal from "@/components/OpeningReveal";

export default function Home() {
  return (
    <div className="portfolio-page">
      <OpeningReveal />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Footer />
    </div>
  );
}
