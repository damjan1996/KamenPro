// src/pages/References.tsx
import { Seo } from "../components/Seo";
import BreadcrumbSchema from "../components/schemas/BreadcrumbSchema";
import ReviewSchema from "../components/schemas/ReviewSchema";
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
        <BreadcrumbSchema items={[
            { name: "Početna", url: "/" },
            { name: "Reference", url: "/reference" }
        ]} />
        
        <ReviewSchema
            reviews={[
                {
                    author: "Marko Nikolić",
                    rating: 5,
                    text: "Odličan kvalitet kamenih obloga. Montaža je bila brza i profesionalna. Preporučujem svima!",
                    date: "2024-11-15",
                    title: "Savršena kamena obloga za spoljašnju zidnu"
                },
                {
                    author: "Ana Stojanović",
                    rating: 5,
                    text: "Vrlo zadovoljna uslugom. Kamene obloge izgledaju predivno i kvalitet je na visokom nivou.",
                    date: "2024-10-28",
                    title: "Preporučujem KamenPro!"
                },
                {
                    author: "Đorđe Petrović",
                    rating: 4,
                    text: "Dobar kvalitet proizvoda, brzо izvršavanje posla. Jedna manja zamerka na komunikaciju, ali rezultat je odličan.",
                    date: "2024-09-20",
                    title: "Kvalitetne kamene obloge"
                },
                {
                    author: "Milica Jovanović",
                    rating: 5,
                    text: "Fantastičan rezultat! Kamene obloge su transformisale naš prostor. Stručno osoblje i kvalitetna usluga.",
                    date: "2024-08-10",
                    title: "Transformacija prostora"
                },
                {
                    author: "Stefan Mitrović",
                    rating: 5,
                    text: "Izuzetno profesionalna usluga od početka do kraja. Kamene obloge su otporne i izgledaju fantastično.",
                    date: "2024-07-25",
                    title: "Profesionalna usluga"
                }
            ]}
            productName="KamenPro dekorativne kamene obloge"
            averageRating={4.8}
            reviewCount={5}
        />
        <Hero />
        <CategoriesSection />
        <ProcessSection />
        <ClientFeedbackSection />
        <CTASection />
      </>
  );
}