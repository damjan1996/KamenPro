// src/pages/Contact.tsx - Korrektur
// Falls das Layout nicht korrekt geladen wird, sollten wir Header und Footer importieren:

import { Seo } from "../components/Seo";
import BreadcrumbSchema from "../components/schemas/BreadcrumbSchema";
import {
  Hero,
  ContactFormSection,
  ContactInfoSection,
  MapSection,
  BusinessHoursSection,
  FAQSection
} from "../pages/contact/index";

export default function Contact() {
  return (
      <>
        <Seo
            title="Kontakt"
            description="KamenPro - Kontaktirajte nas za sve informacije o kamenim oblogama i našim uslugama. Naš tim je spreman da odgovori na sva vaša pitanja."
            keywords="kontakt, kamene obloge, kamen, usluge, pitanja"
        />
        <BreadcrumbSchema items={[
            { name: "Početna", url: "/" },
            { name: "Kontakt", url: "/kontakt" }
        ]} />
        <main>
          <Hero />
          <ContactFormSection />
          <ContactInfoSection />
          <MapSection />
          <BusinessHoursSection />
          <FAQSection />
        </main>
      </>
  );
}