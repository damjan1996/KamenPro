// src/components/about/index.tsx
import { OurStoryHero } from './components/OurStoryHero';
import { CompanyHistory } from './components/CompanyHistory';
import { MissionVision } from './components/MissionVision';
import { ValuesSection } from './components/ValuesSection';
import { TeamSection } from './components/TeamSection';
import { ProductionCapabilities } from './components/ProductionCapabilities';
import { CertificatesSection } from './components/CertificatesSection';

const AboutPage = () => {
    return (
        <div className="pt-16 md:pt-0">
            <OurStoryHero />
            <CompanyHistory />
            <MissionVision />
            <ValuesSection />
            <TeamSection />
            <ProductionCapabilities />
            <CertificatesSection />
        </div>
    );
};

export default AboutPage;