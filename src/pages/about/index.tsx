// src/components/about/index.tsx
import { Seo } from '../../components/Seo';
import BreadcrumbSchema from '../../components/schemas/BreadcrumbSchema';
import { OurStoryHero } from './components/OurStoryHero';
import { CompanyHistory } from './components/CompanyHistory';
import { MissionVision } from './components/MissionVision';
import { ValuesSection } from './components/ValuesSection';
import { ProductionCapabilities } from './components/ProductionCapabilities';
import { CertificatesSection } from './components/CertificatesSection';

const AboutPage = () => {
    return (
        <>
            <Seo
                title="O nama"
                description="KamenPro - Saznajte više o našoj priči, misiji i vrednostima. Od 2019. godine stvaramo visokokvalitetne dekorativne kamene obloge u Bijeljini."
                keywords="o nama, KamenPro, kamene obloge, Bijeljina, proizvodnja, kvalitet, misija"
            />
            <BreadcrumbSchema items={[
                { name: "Početna", url: "/" },
                { name: "O nama", url: "/o-nama" }
            ]} />
            <div className="pt-16 md:pt-0">
                <OurStoryHero />
                <CompanyHistory />
                <MissionVision />
                <ValuesSection />
                <ProductionCapabilities />
                <CertificatesSection />
            </div>
        </>
    );
};

export default AboutPage;