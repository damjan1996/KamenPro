// src/pages/contact/components/Hero.tsx
import { useState, useEffect, useRef } from 'react';
import { Container } from '../../../components/ui/Container';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';

export const Hero = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const sectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        // Inicijalna animacija pri učitavanju
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 300);

        // Scroll progress
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const maxScroll = window.innerHeight * 0.5;
            const progress = Math.min(scrollTop / maxScroll, 1);
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Pomoćna funkcija za dobijanje klasa animacije
    const getAnimationClasses = (delay: string = '') => `
        transition-all duration-700 ${delay} ease-out transform 
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
    `.trim();

    // Komponenta za kontakt informaciju
    const ContactInfo = ({
                             icon,
                             title,
                             content,
                             subtext = "",
                             link = ""
                         }: {
        icon: JSX.Element;
        title: string;
        content: string;
        subtext?: string;
        link?: string;
    }) => (
        <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                {icon}
            </div>
            <div>
                <h4 className="text-white text-base font-medium">{title}</h4>
                <p className="text-white/70 font-light">
                    {link ? (
                        <a
                            href={link}
                            className="hover:text-amber-400 transition-colors"
                        >
                            {content}
                        </a>
                    ) : (
                        content
                    )}
                </p>
                {subtext && <p className="text-white/50 text-sm font-light">{subtext}</p>}
            </div>
        </div>
    );

    return (
        <section
            ref={sectionRef}
            className="relative min-h-[80vh] flex items-center overflow-hidden font-sans"
        >
            {/* Pozadinska slika sa gradijentom - sad fiksirana */}
            <div
                className="absolute inset-0 bg-fixed"
            >
                <div
                    className="absolute inset-0 transition-transform duration-300 ease-out"
                    style={{
                        transform: `scale(${1 + scrollProgress * 0.05})`,
                        opacity: 1 - scrollProgress * 0.3
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/60 z-10"></div>
                    <img
                        src="/images/contact/background%20contact.jpg"
                        alt="KamenPro kontakt"
                        className="w-full h-full object-cover object-center z-0 fixed"
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            pointerEvents: "none"
                        }}
                    />
                </div>
            </div>

            {/* Dekorativni elementi */}
            <div className="absolute top-1/4 right-[10%] w-32 h-32 rounded-full border border-white/20 opacity-30 custom-animate-pulse hidden lg:block"></div>
            <div className="absolute bottom-1/4 left-[10%] w-48 h-48 rounded-full border border-white/10 opacity-20 custom-animate-pulse hidden lg:block" style={{ animationDelay: '1s' }}></div>

            <Container className="relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Leva strana - Glavni tekst */}
                    <div>
                        <div className={getAnimationClasses()}>
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="h-[2px] w-10 bg-amber-500"></div>
                                <span className="font-light uppercase tracking-widest text-amber-100 text-sm">Kontakt</span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6 tracking-wide leading-tight">
                                <span className="block">Kontaktirajte</span>
                                <span className="block font-medium text-amber-400">KamenPro</span>
                            </h1>
                        </div>

                        <div className={getAnimationClasses('delay-200')}>
                            <p className="text-lg text-white/90 mb-8 leading-relaxed font-light max-w-lg">
                                Imate pitanje ili želite da započnete projekat? Naš tim je spreman
                                da vam pomogne i pretvori vaše ideje u stvarnost. Javite nam se
                                i saznajte više o našim dekorativnim kamenim oblogama.
                            </p>
                        </div>

                        <div className={getAnimationClasses('delay-400')}>
                            <a
                                href="#kontakt-formular"
                                className="group inline-flex items-center bg-amber-500 text-stone-900 px-6 py-3 rounded-sm hover:bg-amber-400 transition-all duration-300 text-sm uppercase tracking-wider font-light shadow-md hover:shadow-lg"
                            >
                                <span>Pošaljite upit</span>
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </div>

                    {/* Desna strana - Kontakt informacije */}
                    <div className={getAnimationClasses('delay-500')}>
                        <div className="relative bg-black/30 backdrop-blur-sm rounded-lg p-6 md:p-8 overflow-hidden group border border-white/10">
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent"></div>

                            <div className="relative z-10">
                                <h3 className="text-xl font-medium text-white mb-4">Kontakt informacije</h3>
                                <p className="text-white/80 text-sm font-light mb-6">
                                    Dostupni smo za sve informacije o našim proizvodima i uslugama
                                </p>

                                <div className="mt-4 mb-6 h-[1px] w-full bg-amber-500/30"></div>

                                <div className="space-y-6 mb-8">
                                    {/* Telefon */}
                                    <ContactInfo
                                        icon={<Phone className="w-5 h-5 text-amber-400" />}
                                        title="Telefon"
                                        content="+387 65 678 634"
                                        subtext="Željko"
                                        link="tel:+38765678634"
                                    />

                                    {/* Email */}
                                    <ContactInfo
                                        icon={<Mail className="w-5 h-5 text-amber-400" />}
                                        title="Email"
                                        content="info@kamenpro.net"
                                        link="mailto:info@kamenpro.net"
                                    />

                                    {/* Adresa */}
                                    <ContactInfo
                                        icon={<MapPin className="w-5 h-5 text-amber-400" />}
                                        title="Adresa"
                                        content="Bijeljina, Republika Srpska, BiH"
                                    />
                                </div>

                                {/* Radno vreme */}
                                <div className="border-t border-white/10 pt-4">
                                    <h4 className="text-white text-sm font-medium mb-2">Radno vreme</h4>
                                    <div className="flex justify-between text-white/70 text-sm font-light">
                                        <span>Ponedeljak - Subota</span>
                                        <span>09:00 - 18:00</span>
                                    </div>
                                    <div className="flex justify-between text-white/70 text-sm font-light">
                                        <span>Nedelja</span>
                                        <span>Zatvoreno</span>
                                    </div>
                                </div>
                            </div>

                            {/* Kružni dekorativni element */}
                            <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full border border-amber-500/10 opacity-70"></div>
                        </div>
                    </div>
                </div>
            </Container>

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
};