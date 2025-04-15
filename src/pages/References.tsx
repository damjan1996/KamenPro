// src/pages/References.tsx
import { Seo } from "../components/Seo";

// Direkter Import der Komponenten aus ihren jeweiligen Dateien
import { Hero } from "./references/components/Hero";
import { CategoriesSection } from "./references/components/Categories";
import { FeaturedProjectsSection } from "./references/components/FeaturedProjects";
import { ProcessSection } from "./references/components/Process";
import { ClientFeedbackSection } from "./references/components/ClientFeedback";
import { CTASection } from "./references/components/CTASection";

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