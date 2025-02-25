// src/pages/About.tsx
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import AboutPage from "./about/index";

export default function About() {
  return (
      <>
        <Header />
        <AboutPage />
        <Footer />
      </>
  );
}