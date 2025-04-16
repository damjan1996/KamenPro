// src/pages/about/components/OurStoryHero.tsx
import { useState, useEffect, useRef } from 'react';
import { Container } from '../../../components/ui/Container';
import { ArrowRight } from 'lucide-react';

interface StoryFeature {
    text: string;
}

export function OurStoryHero() {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const sectionRef = useRef<HTMLElement | null>(null);

    // Liste der Features für den linken unteren Bereich
    const features: StoryFeature[] = [
        { text: "Otporno na vremenske uslove" },
        { text: "Vatrootporno" },
        { text: "Dugotrajno" }
    ];

    useEffect(() => {
        // Inicijalna animacija pri učitavanju
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 300);

        // Praćenje skrola za animacije
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const maxScroll = window.innerHeight * 0.5;
            const progress = Math.min(scrollTop / maxScroll, 1);
            setScrollProgress(progress);
        };

        // Intersection Observer za animacije pri skrolovanju
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = sectionRef.current;

        if (currentRef) {
            observer.observe(currentRef);
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', handleScroll);
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    // Helper-Funktion zum Rendern von Features
    const renderFeature = (feature: StoryFeature, index: number) => (
        <div key={index} className="flex items-center space-x-3 text-white/80">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span className="font-light text-sm">{feature.text}</span>
        </div>
    );

    return (
        <section
            ref={sectionRef}
            className="relative min-h-[85vh] flex items-center overflow-hidden font-sans"
        >
            {/* Pozadinska slika sa gradijentom */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/60 z-10"></div>
                <img
                    src="/images/about/pozadina.jpg"
                    alt="KamenPro dekorativne kamene obloge"
                    className="w-full h-full object-cover object-center z-0 transition-transform duration-10000 ease-out"
                    style={{
                        transform: `scale(${1 + scrollProgress * 0.05})`,
                        opacity: 1 - scrollProgress * 0.3
                    }}
                />
            </div>

            {/* Dekorativni elementi */}
            <div className="absolute top-1/4 right-[10%] w-32 h-32 rounded-full border border-white/20 opacity-30 animate-pulse hidden lg:block"></div>
            <div className="absolute bottom-1/4 left-[10%] w-48 h-48 rounded-full border border-white/10 opacity-20 animate-pulse hidden lg:block" style={{ animationDelay: '1s' }}></div>

            {/* Glavni sadržaj */}
            <Container className="relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
                    {/* Leva kolona - Glavni tekst */}
                    <div className="lg:col-span-3">
                        <div className={`transition-all duration-1000 ease-out ${
                            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}>
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="h-[2px] w-10 bg-amber-500"></div>
                                <span className="font-light uppercase tracking-widest text-amber-100 text-sm">Od 2019. godine</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6 tracking-wide leading-tight">
                                <span className="block overflow-hidden">
                                    <span className="block transform transition-all duration-1000 delay-100">
                                        <span className="font-light">Umetnost</span>
                                    </span>
                                </span>
                                <span className="block overflow-hidden mt-2">
                                    <span className="block transform transition-all duration-1000 delay-300">
                                        <span className="font-medium">kamenih obloga</span>
                                    </span>
                                </span>
                            </h1>
                        </div>

                        <div className={`transition-all duration-1000 delay-500 ${
                            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}>
                            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl leading-relaxed font-light">
                                KamenPro je samostalna zanatska radnja osnovana 2019. godine u Bijeljini,
                                specijalizovana za proizvodnju visokokvalitetnih dekorativnih kamenih obloga koje
                                spajaju estetiku prirodnog kamena sa praktičnošću savremenih materijala.
                            </p>
                        </div>

                        <div className={`transition-all duration-1000 delay-700 ${
                            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}>
                            <a
                                href="/proizvodi"
                                className="group inline-flex items-center bg-amber-500 text-stone-900 px-6 py-3 rounded-sm hover:bg-amber-400 transition-all duration-300 text-sm uppercase tracking-wider font-light shadow-md hover:shadow-lg"
                            >
                                <span>Istražite proizvode</span>
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a
                                href="/kontakt"
                                className="group inline-flex items-center ml-4 border border-white/70 text-white px-6 py-3 rounded-sm hover:bg-white/10 transition-all duration-300 text-sm uppercase tracking-wider font-light"
                            >
                                <span>Kontaktirajte nas</span>
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </div>

                    {/* Desna kolona - Istaknuta kartica */}
                    <div className={`lg:col-span-2 transition-all duration-1000 delay-700 ${
                        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'
                    }`}>
                        <div className="relative bg-black/30 backdrop-blur-sm rounded-lg p-6 overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent"></div>

                            <div className="relative z-10">
                                <h3 className="text-xl font-medium text-white mb-3">Naša misija</h3>
                                <p className="font-light text-white/90 text-sm mb-4">
                                    Stvaramo visokokvalitetne dekorativne kamene obloge koje transformišu svaki prostor
                                    u jedinstveno i upečatljivo okruženje, dostupno svakom domu i poslovnom prostoru.
                                </p>

                                <div className="mt-4 mb-6 h-[1px] w-full bg-amber-500/30"></div>

                                <div className="relative aspect-video rounded-lg overflow-hidden mb-4 shadow-md">
                                    <img
                                        src="/images/about/radionica.jpg"
                                        alt="KamenPro radionica"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300"></div>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-4">
                                    <div className="px-3 py-1 bg-amber-500/20 text-amber-200 rounded-full text-xs font-medium">
                                        Kvalitet
                                    </div>
                                    <div className="px-3 py-1 bg-amber-500/20 text-amber-200 rounded-full text-xs font-medium">
                                        Pouzdanost
                                    </div>
                                    <div className="px-3 py-1 bg-amber-500/20 text-amber-200 rounded-full text-xs font-medium">
                                        Podrška
                                    </div>
                                </div>
                            </div>

                            {/* Kružni dekorativni element */}
                            <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full border border-amber-500/10 opacity-70"></div>
                        </div>
                    </div>
                </div>
            </Container>

            {/* Karakteristike */}
            <div className="absolute bottom-12 left-12 hidden lg:block">
                <div className="flex flex-col items-start space-y-3">
                    {features.map(renderFeature)}
                </div>
            </div>

            {/* Kružni element sa tekstom */}
            <div className="absolute bottom-8 right-8 hidden md:flex items-center justify-center">
                <div className="relative w-32 h-32">
                    <svg viewBox="0 0 100 100" className="w-full h-full rotate-animation">
                        <path
                            id="circlePath"
                            d="M50,90 a40,40 0 1,1 0,-80 a40,40 0 1,1 0,80"
                            fill="none"
                            stroke="none"
                        />
                        <text fontSize="8" fill="white" opacity="0.6" className="font-light">
                            <textPath href="#circlePath" startOffset="0%">
                                prirodno • estetično • dugotrajno • kvalitetno • prirodno •
                            </textPath>
                        </text>
                    </svg>
                </div>
            </div>

            {/* Indikator za skrolovanje */}
            <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center transition-opacity duration-500 cursor-pointer ${
                scrollProgress > 0.2 ? 'opacity-0' : 'opacity-70'
            }`}
                 onClick={() => window.scrollTo({top: window.innerHeight, behavior: 'smooth'})}>
                <span className="font-light text-white/70 text-sm mb-2">Skrolujte nadole</span>
                <div className="w-6 h-10 rounded-full border border-white/30 flex items-center justify-center p-1">
                    <div className="w-1 h-2 bg-white rounded-full animate-scroll"></div>
                </div>
            </div>

            {/* Mobilni overlay pri skrolanju */}
            <div
                className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 pointer-events-none md:hidden transition-opacity duration-500"
                style={{ opacity: scrollProgress * 0.6 }}
            ></div>

            <style>{`
                @keyframes rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                .rotate-animation {
                    animation: rotate 25s linear infinite;
                }

                @keyframes scroll {
                    0% { transform: translateY(0); opacity: 1; }
                    30% { transform: translateY(4px); opacity: 1; }
                    60% { transform: translateY(0); opacity: 0.5; }
                    100% { transform: translateY(0); opacity: 1; }
                }

                .animate-scroll {
                    animation: scroll 1.5s ease-in-out infinite;
                }

                @keyframes pulse {
                    0% { opacity: 0.4; }
                    50% { opacity: 0.7; }
                    100% { opacity: 0.4; }
                }

                .animate-pulse {
                    animation: pulse 3s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
}