import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Footer />
    </div>
  );
}
