// src/pages/References.tsx
import { Seo } from "../components/Seo";
// Direkter Import der Komponenten ohne Dateiendung
import {
    Hero,
    CategoriesSection,
    FeaturedProjectsSection,
    ProcessSection,
    ClientFeedbackSection,
    CTASection
} from "./references/index";

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
            <FeaturedProjectsSection />
            <ProcessSection />
            <ClientFeedbackSection />
            <CTASection />
        </>
    );
}