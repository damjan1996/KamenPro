// src/components/about/components/CertificatesSection.tsx
import { useState, useEffect, useRef } from 'react';
import { Container } from '../../../components/ui/Container';
import { ArrowRight, Award, Leaf, Globe, CheckCircle } from 'lucide-react';

interface Certificate {
    title: string;
    description: string;
    icon: React.ElementType;
    color: string;
    number?: string;
    label?: string;
}

export function CertificatesSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const sectionRef = useRef<HTMLElement>(null);

    const certificates: Certificate[] = [
        {
            title: 'ISO 9001:2015',
            description: 'Sistem upravljanja kvalitetom za konzistentnost i kontinuirano unapređenje',
            icon: Award,
            color: '#FFC107',
            number: '16',
            label: 'godina sertifikacije'
        },
        {
            title: 'ISO 14001:2015',
            description: 'Sistem upravljanja zaštitom životne sredine i održivim poslovanjem',
            icon: Leaf,
            color: '#4CAF50',
            number: '12',
            label: 'ekoloških inicijativa'
        },
        {
            title: 'CE oznaka',
            description: 'Usklađenost sa EU standardima za građevinske materijale i bezbednost',
            icon: Globe,
            color: '#2196F3',
            number: '263',
            label: 'sertifikovanih proizvoda'
        },
        {
            title: 'Domaći sertifikat kvaliteta',
            description: 'Priznanje Privredne komore Srbije za izuzetan kvalitet domaćih proizvoda',
            icon: CheckCircle,
            color: '#FF5722',
            number: '5',
            label: 'nacionalnih priznanja'
        }
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

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <section ref={sectionRef} className="py-16 md:py-24 bg-black relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-20 left-20 w-64 h-64 rounded-full border border-white/20"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full border border-white/10"></div>
            </div>

            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left column */}
                    <div className={`transition-all duration-700 transform ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}>
                        <div className="text-yellow-400 mb-2 text-sm font-medium tracking-wider uppercase">
                            NAŠI SERTIFIKATI
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                            We create <br/>
                            <span className="text-white opacity-80">more than just</span> <br/>
                            <span className="text-white">kvalitet</span>
                        </h2>

                        <div className="h-px w-16 bg-yellow-400 mb-8"></div>

                        <div className="text-white/70 mb-8 text-lg">
                            Naša posvećenost kvalitetu potvrđena je brojnim sertifikatima i priznanjima koja pokazuju
                            našu odgovornost prema klijentima, životnoj sredini i zajednici.
                        </div>

                        <div className="inline-flex items-center group cursor-pointer">
                            <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center mr-4">
                                <ArrowRight className="w-6 h-6 text-black transform group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                            <span className="text-white text-lg font-medium">LET'S TALK</span>
                        </div>
                    </div>

                    {/* Right column - Certificates grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {certificates.map((cert, index) => (
                            <div
                                key={index}
                                className={`bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 transition-all duration-500 transform ${
                                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                } ${
                                    hoveredIndex === index ? 'bg-white/10 scale-105' : ''
                                }`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <div className="flex items-start mb-4">
                                    <div
                                        className="p-2 rounded-md mr-4 transition-colors duration-300"
                                        style={{
                                            backgroundColor: hoveredIndex === index ? cert.color : 'rgba(255,255,255,0.1)',
                                            color: hoveredIndex === index ? 'black' : cert.color
                                        }}
                                    >
                                        <cert.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white">{cert.title}</h3>
                                </div>

                                <p className="text-white/70 text-sm mb-6">{cert.description}</p>

                                {cert.number && (
                                    <div className="flex justify-between items-end mt-auto">
                                        <div>
                                            <div className="text-3xl font-bold text-white">{cert.number}</div>
                                            <div className="text-white/50 text-xs">{cert.label}</div>
                                        </div>
                                        <div>
                                            <button
                                                className="text-yellow-400 hover:text-white transition-colors duration-300"
                                                aria-label="Saznaj više"
                                            >
                                                <ArrowRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom statistics section */}
                <div className={`grid grid-cols-1 md:grid-cols-3 gap-1 mt-16 bg-white/5 rounded-lg overflow-hidden transition-all duration-700 delay-500 transform ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    {[
                        { number: '15+', label: 'godina poslovanja', color: '#FFC107' },
                        { number: '500+', label: 'klijenata', color: '#4CAF50' },
                        { number: '12K+', label: 'proizvoda', color: '#2196F3' },
                    ].map((stat, index) => (
                        <div
                            key={index}
                            className="p-6 md:p-8 flex items-center justify-between hover:bg-white/5 transition-all duration-300 group"
                        >
                            <div>
                                <div
                                    className="text-3xl md:text-4xl font-bold transition-colors duration-300"
                                    style={{ color: stat.color }}
                                >
                                    {stat.number}
                                </div>
                                <div className="text-white/60 text-sm">{stat.label}</div>
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <ArrowRight className="w-5 h-5 text-white" />
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}