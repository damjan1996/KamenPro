// src/components/about/components/CertificatesSection.tsx
import { useState, useEffect, useRef, ElementType } from 'react';
import { Container } from '../../../components/ui/Container';
import { CheckCircle, Shield, Zap, Award } from 'lucide-react';

interface Certificate {
    title: string;
    description: string;
    icon: ElementType;
    color: string;
    number?: string;
    label?: string;
}

interface Statistic {
    number: string;
    label: string;
    color: string;
}

export function CertificatesSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const sectionRef = useRef<HTMLElement>(null);

    const certificates: Certificate[] = [
        {
            title: 'Kvalitet materijala',
            description: 'Koristimo samo najkvalitetnije materijale, uključujući beli cement i specijalne aditive',
            icon: Shield,
            color: '#CA8A04', // amber-600
            number: '100%',
            label: 'kvaliteta u svakom proizvodu'
        },
        {
            title: 'Otpornost na vremenske uslove',
            description: 'Naši proizvodi su otporni na sve vrste vremenskih uslova - kišu, sneg, mraz i druge spoljne uticaje',
            icon: Zap,
            color: '#CA8A04', // amber-600
            number: 'Više',
            label: 'decenija trajnosti'
        },
        {
            title: 'Raznovrsnost tekstura',
            description: 'Nudimo različite vrste dekorativnih kamenih obloga i cigli sa jedinstvenim teksturama i bojama',
            icon: Award,
            color: '#CA8A04', // amber-600
            number: '3+',
            label: 'različite teksture'
        },
        {
            title: 'Pouzdana ugradnja',
            description: 'Obezbeđujemo detaljne smernice za ugradnju i dostupni smo za podršku tokom celog procesa',
            icon: CheckCircle,
            color: '#CA8A04', // amber-600
            number: '100+',
            label: 'uspešnih projekata'
        }
    ];

    const statistics: Statistic[] = [
        { number: '6+', label: 'godina iskustva', color: '#B45309' }, // amber-700 for better contrast
        { number: '100+', label: 'realizovanih projekata', color: '#B45309' },
        { number: '3', label: 'vrste tekstura', color: '#B45309' },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        const currentRef = sectionRef.current;

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    // Hilfsfunktion zum Rendern einer Zertifikatkarte
    const renderCertificateCard = (cert: Certificate, index: number) => (
        <div
            key={index}
            className={`bg-white p-6 rounded-lg border border-stone-100 hover:border-amber-200 transition-all duration-500 transform shadow-sm hover:shadow-md ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            } ${
                hoveredIndex === index ? 'border-l-2 border-l-amber-500' : ''
            }`}
            style={{ transitionDelay: `${200 + index * 100}ms` }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
        >
            <div className="flex items-start mb-4">
                <div
                    className="p-2 rounded-full mr-4 transition-colors duration-300"
                    style={{
                        backgroundColor: hoveredIndex === index ? cert.color : 'rgba(245, 158, 11, 0.1)', // amber bg
                        color: hoveredIndex === index ? 'white' : cert.color
                    }}
                >
                    <cert.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-medium text-stone-800">{cert.title}</h3>
            </div>

            <p className="text-stone-600 text-sm mb-6 font-light">{cert.description}</p>

            {cert.number && (
                <div className="flex justify-between items-end mt-auto">
                    <div>
                        <div className="text-2xl font-bold text-amber-600">{cert.number}</div>
                        <div className="text-stone-500 text-xs font-light">{cert.label}</div>
                    </div>
                </div>
            )}
        </div>
    );

    // Hilfsfunktion zum Rendern einer Statistik
    const renderStatistic = (stat: Statistic, index: number) => (
        <div
            key={index}
            className="p-6 md:p-8 hover:bg-stone-50 transition-all duration-300 border-r border-stone-100 last:border-r-0"
        >
            <div
                className="text-3xl md:text-4xl font-bold mb-2 transition-colors duration-300"
                style={{ color: stat.color }}
            >
                {stat.number}
            </div>
            <div className="text-stone-500 text-sm font-light">{stat.label}</div>
        </div>
    );

    return (
        <section ref={sectionRef} className="py-16 md:py-24 bg-stone-50 relative overflow-hidden font-sans">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-20 left-20 w-64 h-64 rounded-full border border-amber-500/30"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full border border-amber-500/20"></div>
            </div>

            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    {/* Left column */}
                    <div className={`transition-all duration-700 transform ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}>
                        <div className="text-amber-600 mb-2 text-sm font-medium tracking-wider uppercase">
                            KVALITET I GARANCIJE
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-stone-800 mb-6 leading-tight tracking-wide">
                            Mi stvaramo <br/>
                            <span className="text-stone-600 font-light">mnogo više od</span> <br/>
                            <span className="text-stone-800 font-medium">običnih obloga</span>
                        </h2>

                        <div className="h-1 w-16 bg-amber-500 mb-8"></div>

                        <div className="text-stone-600 mb-8 text-base font-light leading-relaxed">
                            Naša posvećenost kvalitetu ogleda se u svakom proizvodu koji izlazi iz naše radionice.
                            Fokusiramo se na detalje, koristimo proverene materijale i primenjujemo tradicionalne
                            tehnike koje garantuju trajnost i estetsku vrednost naših dekorativnih obloga.
                        </div>

                        <a
                            href="/kontakt"
                            className="inline-flex items-center group cursor-pointer"
                        >
                            <div className="px-6 py-3 bg-amber-500 text-white rounded-sm hover:bg-amber-600 transition-all duration-300 inline-flex items-center justify-center text-sm uppercase tracking-wider font-light shadow-md hover:shadow-lg">
                                <span>Kontaktirajte nas</span>
                                <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                            </div>
                        </a>
                    </div>

                    {/* Right column - Certificates grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {certificates.map(renderCertificateCard)}
                    </div>
                </div>

                {/* Bottom statistics section */}
                <div className={`grid grid-cols-1 md:grid-cols-3 gap-px mt-16 bg-white rounded-lg overflow-hidden shadow-md border border-stone-100 transition-all duration-700 delay-500 transform ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    {statistics.map(renderStatistic)}
                </div>

                {/* Call to action */}
                <div className={`mt-16 text-center transition-all duration-700 delay-600 transform ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    <div className="bg-amber-50 p-8 rounded-lg border border-amber-100 shadow-sm">
                        <h3 className="text-2xl font-medium text-stone-800 mb-4">Želite saznati više o našim proizvodima?</h3>
                        <p className="text-stone-600 mb-6 max-w-2xl mx-auto font-light">
                            Bilo da planirate renoviranje, gradnju novog objekta ili samo želite osvežiti izgled vašeg prostora,
                            naše dekorativne kamene obloge su savršeno rešenje. Kontaktirajte nas za više informacija.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/proizvodi"
                                className="px-6 py-3 bg-stone-800 hover:bg-stone-700 text-white rounded-sm transition-all duration-300 inline-flex items-center justify-center font-light"
                            >
                                Pogledajte naše proizvode
                            </a>
                            <a
                                href="/kontakt"
                                className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-sm transition-all duration-300 inline-flex items-center justify-center font-light"
                            >
                                Kontaktirajte nas
                            </a>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}