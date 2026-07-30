import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
      <Navbar />
      <Hero />
    </div>
  );
}
