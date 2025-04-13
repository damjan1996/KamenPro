// src/pages/references/components/Hero.tsx
import { useState, useEffect, useRef } from 'react';
import { Container } from '../../../components/ui/Container';
import { ArrowRight } from 'lucide-react';

export function Hero() {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const sectionRef = useRef<HTMLElement | null>(null);

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
        const currentRef = sectionRef.current;
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

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

    return (
        <section
            ref={sectionRef}
            className="relative min-h-[85vh] flex items-center overflow-hidden font-sans"
        >
            {/* Pozadinska slika sa gradijentom */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/60 z-10"></div>
                <img
                    src="https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Page/References/Hero/hero.jpg"
                    alt="KamenPro reference i projekti"
                    className="w-full h-full object-cover object-center z-0 transition-transform duration-10000 ease-out"
                    style={{
                        transform: `scale(${1 + scrollProgress * 0.05})`,
                        opacity: 1 - scrollProgress * 0.3
                    }}
                />
            </div>

            {/* Dekorativni elementi */}
            <div className="absolute top-1/4 right-[10%] w-32 h-32 rounded-full border border-white/20 opacity-30 custom-animate-pulse hidden lg:block"></div>
            <div className="absolute bottom-1/4 left-[10%] w-48 h-48 rounded-full border border-white/10 opacity-20 custom-animate-pulse hidden lg:block" style={{ animationDelay: '1s' }}></div>

            <Container className="relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Leva kolona - Glavni tekst */}
                    <div>
                        <div className={`transition-all duration-1000 ease-out ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}>
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="h-[2px] w-10 bg-amber-500"></div>
                                <span className="font-light uppercase tracking-widest text-amber-100 text-sm">Naši projekti</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6 tracking-wide leading-tight">
                                <span className="block">Naše</span>
                                <span className="block font-medium text-amber-400">reference</span>
                            </h1>
                        </div>

                        <div className={`transition-all duration-1000 delay-300 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}>
                            <p className="text-lg text-white/90 mb-8 leading-relaxed font-light max-w-lg">
                                Pogledajte naše uspešno realizovane projekte i transformacije koje smo ostvarili
                                za naše klijente. Od stambenih objekata do poslovnih prostora, naše dekorativne
                                obloge donose jedinstven karakter svakom ambijentu.
                            </p>
                        </div>

                        <div className={`transition-all duration-1000 delay-500 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}>
                            <a
                                href="#projekti"
                                className="group inline-flex items-center bg-amber-500 text-stone-900 px-6 py-3 rounded-sm hover:bg-amber-400 transition-all duration-300 text-sm uppercase tracking-wider font-light shadow-md hover:shadow-lg"
                            >
                                <span>Pogledajte projekte</span>
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

                    {/* Desna kolona - Reference kartice */}
                    <div className={`transition-all duration-1000 delay-700 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <div className="relative h-64 overflow-hidden rounded-lg shadow-md group">
                                    <img
                                        src="https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Page/Homepage/Projects/stambeni-prostor.jpg"
                                        alt="Stambeni objekat"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <div className="text-amber-400 text-xs font-medium uppercase tracking-wider mb-1">Stambeni objekti</div>
                                        <div className="text-white text-base font-medium">Uređenje domova</div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="relative h-64 overflow-hidden rounded-lg shadow-md group mt-8">
                                    <img
                                        src="https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Page/Homepage/Projects/poslovni-prostor.jpg"
                                        alt="Poslovni prostor"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <div className="text-amber-400 text-xs font-medium uppercase tracking-wider mb-1">Poslovni objekti</div>
                                        <div className="text-white text-base font-medium">Profesionalna okruženja</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 p-5 bg-black/40 backdrop-blur-sm rounded-lg border border-white/10">
                            <div className="flex items-center">
                                <div className="mr-4">
                                    <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-white">
                                        <span className="text-lg font-medium">5+</span>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-white font-medium">Godina iskustva</h4>
                                    <p className="text-white/70 text-sm font-light">Uspešno realizovani projekti stambenih i poslovnih objekata</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            {/* Kategorije projekata */}
            <div className="absolute left-8 bottom-16 hidden lg:flex flex-col items-start space-y-4">
                <div className="flex items-center space-x-3 text-white/80">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span className="font-light text-sm">Stambeni objekti</span>
                </div>
                <div className="flex items-center space-x-3 text-white/80">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span className="font-light text-sm">Poslovni prostori</span>
                </div>
                <div className="flex items-center space-x-3 text-white/80">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span className="font-light text-sm">Ugostiteljski objekti</span>
                </div>
            </div>

            {/* Indikator za skrolovanje */}
            <div
                className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center transition-opacity duration-500 cursor-pointer ${
                    scrollProgress > 0.2 ? 'opacity-0' : 'opacity-70'
                }`}
                onClick={() => window.scrollTo({top: window.innerHeight, behavior: 'smooth'})}
            >
                <span className="font-light text-white/70 text-sm mb-2">Skrolujte nadole</span>
                <div className="w-6 h-10 rounded-full border border-white/30 flex items-center justify-center p-1">
                    <div className="w-1 h-2 bg-white rounded-full custom-animate-scroll"></div>
                </div>
            </div>

            <style>
                {`
                @keyframes custom-scroll {
                    0% { transform: translateY(0); opacity: 1; }
                    30% { transform: translateY(4px); opacity: 1; }
                    60% { transform: translateY(0); opacity: 0.5; }
                    100% { transform: translateY(0); opacity: 1; }
                }

                .custom-animate-scroll {
                    animation: custom-scroll 1.5s ease-in-out infinite;
                }

                @keyframes custom-pulse {
                    0% { opacity: 0.4; }
                    50% { opacity: 0.7; }
                    100% { opacity: 0.4; }
                }

                .custom-animate-pulse {
                    animation: custom-pulse 3s ease-in-out infinite;
                }
                `}
            </style>
        </section>
    );
}