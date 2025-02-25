// src/components/home/index.tsx
import { Hero } from './components/Hero';
import { AboutSection } from './components/About';
import { ProductsSection } from './components/Products';
import { BenefitsSection } from './components/Benefits';
import { ProjectsSection } from './components/Projects';
import { TestimonialsSection } from './components/Testimonials';
import { CTASection } from './components/CTASection';
import { ContactInfoSection } from './components/ContactInfo';

const HomePage = () => {
    return (
        <div className="overflow-hidden">
            <Hero />
            <AboutSection />
            <ProductsSection />
            <BenefitsSection />
            <ProjectsSection />
            <TestimonialsSection />
            <CTASection />
            <ContactInfoSection />
        </div>
    );
}

export default HomePage