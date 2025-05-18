// src/pages/Home.tsx - with SEO optimizations
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
                description="KamenPro - Visokokvalitetne kamene obloge za vaš dom i poslovni prostor. Nudimo dekorativni kamen, mermer, travertin i druge materijale za unutrašnje i spoljašnje uređenje. Bijeljina, Bosna i Hercegovina."
                keywords="kamene obloge, dekorativni kamen, zidne obloge, podne obloge, mermer, travertin, Bijeljina, Bosna, zidni kamen, fasade"
                canonical="/"
                schemaType="WebPage"
                schemaData={{
                    speakable: {
                        "@type": "SpeakableSpecification",
                        cssSelector: ["h1", ".hero-description"]
                    },
                    breadcrumb: {
                        "@type": "BreadcrumbList",
                        itemListElement: [{
                            "@type": "ListItem",
                            position: 1,
                            name: "Početna",
                            item: "https://kamenpro.net/"
                        }]
                    }
                }}
                image="/images/home/hero.png"
            />
            <main>
                <Hero />
                <ProductsSection />
                <CTASection />
                <AboutSection />
                <ProjectsSection />
                <TestimonialsSection />
                <ContactInfoSection />
            </main>
        </>
    );
}