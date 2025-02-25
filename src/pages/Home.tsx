// src/pages/Home.tsx
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Seo } from "../components/Seo";
import { lazy, Suspense } from 'react';

// Lazy loading components
const Hero = lazy(() => import("./home/components/Hero").then(module => ({ default: module.Hero })));
const AboutSection = lazy(() => import("./home/components/About").then(module => ({ default: module.AboutSection })));
const ProductsSection = lazy(() => import("./home/components/Products").then(module => ({ default: module.ProductsSection })));
const BenefitsSection = lazy(() => import("./home/components/Benefits").then(module => ({ default: module.BenefitsSection })));
const ProjectsSection = lazy(() => import("./home/components/Projects").then(module => ({ default: module.ProjectsSection })));
const TestimonialsSection = lazy(() => import("./home/components/Testimonials").then(module => ({ default: module.TestimonialsSection })));
const CTASection = lazy(() => import("./home/components/CTASection").then(module => ({ default: module.CTASection })));
const ContactInfoSection = lazy(() => import("./home/components/ContactInfo").then(module => ({ default: module.ContactInfoSection })));

// Simple loading component
const Loading = () => (
    <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-600"></div>
    </div>
);

export default function Home() {
    return (
        <>
            <Seo
                title="Početna"
                description="KamenPro - Kvalitetne kamene obloge za unutrašnje i spoljašnje uređenje. Prirodni kamen, travertin, mermer i kvarcit za vaš dom i poslovni prostor."
                keywords="kamene obloge, prirodni kamen, zidne obloge, travertin, dekorativni kamen"
            />
            <Header />
            <main>
                <Suspense fallback={<Loading />}>
                    <Hero />
                </Suspense>
                <Suspense fallback={<Loading />}>
                    <AboutSection />
                </Suspense>
                <Suspense fallback={<Loading />}>
                    <ProductsSection />
                </Suspense>
                <Suspense fallback={<Loading />}>
                    <BenefitsSection />
                </Suspense>
                <Suspense fallback={<Loading />}>
                    <ProjectsSection />
                </Suspense>
                <Suspense fallback={<Loading />}>
                    <TestimonialsSection />
                </Suspense>
                <Suspense fallback={<Loading />}>
                    <CTASection />
                </Suspense>
                <Suspense fallback={<Loading />}>
                    <ContactInfoSection />
                </Suspense>
            </main>
            <Footer />
        </>
    );
}