// src/pages/Home.tsx
import { Seo } from "../components/Seo";
import { Hero } from "./home/components/Hero";
import { AboutSection } from "./home/components/About";
import { ProductsSection } from "./home/components/Products";
import { ProjectsSection } from "./home/components/Projects";
import { TestimonialsSection } from "./home/components/Testimonials";
import { CTASection } from "./home/components/CTASection";
import { ContactInfoSection } from "./home/components/ContactInfo";

export default function Home() {
    return (
        <>
            <Seo
                title="Početna"
                description="KamenPro - Visokokvalitetne kamene obloge za vaš dom. Nudimo prirodni kamen, mermer, travertin i druge materijale za unutrašnje i spoljašnje uređenje."
                keywords="kamene obloge, prirodni kamen, zidne obloge, podne obloge, mermer, travertin"
            />
            <Hero />
            <AboutSection />
            <ProductsSection />
            <ProjectsSection />
            <TestimonialsSection />
            <CTASection />
            <ContactInfoSection />
        </>
    );
}