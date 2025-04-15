// src/pages/References.tsx
import { Seo } from "../components/Seo";
import {
  Hero,
  CategoriesSection,
  ProcessSection,
  ClientFeedbackSection,
  CTASection
} from "./references/index.tsx";

export default function References() {
  return (
      <>
        <Seo
            title="Reference"
            description="KamenPro - Pogledajte naše projekte i reference. Kolekcija naših uspešno završenih projekata sa kamenim oblogama za unutrašnje i spoljašnje uređenje."
            keywords="kamene obloge reference, projekti, prirodni kamen projekti, zidne obloge reference, podne obloge projekti"
        />
        <Hero />
        <CategoriesSection />
        <ProcessSection />
        <ClientFeedbackSection />
        <CTASection />
      </>
  );
}