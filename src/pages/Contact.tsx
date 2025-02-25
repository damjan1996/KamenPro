// src/pages/Contact.tsx - Korrektur
// Falls das Layout nicht korrekt geladen wird, sollten wir Header und Footer importieren:

import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Seo } from "../components/Seo";
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
        <Header />
        <Seo
            title="Kontakt"
            description="KamenPro - Kontaktirajte nas za sve informacije o kamenim oblogama i našim uslugama. Naš tim je spreman da odgovori na sva vaša pitanja."
            keywords="kontakt, kamene obloge, kamen, usluge, pitanja"
        />
        <main>
          <Hero />
          <ContactFormSection />
          <ContactInfoSection />
          <MapSection />
          <BusinessHoursSection />
          <FAQSection />
        </main>
        <Footer />
      </>
  );
}