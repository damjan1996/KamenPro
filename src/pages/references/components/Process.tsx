// src/pages/references/components/Process.tsx
import { useState, useEffect, useRef } from 'react';
import { Container } from '../../../components/ui/Container';
import { MessageSquare, Palette, Clock, CheckCircle, ArrowRight } from 'lucide-react';

export const ProcessSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const sectionRef = useRef<HTMLElement | null>(null);

    const processSteps = [
        {
            title: "Konsultacije",
            desc: "Započinjemo sa detaljnim razgovorom o vašim željama i potrebama. Analiziramo prostor i pomažemo vam da izaberete najbolje dekorativne obloge za vaš projekat.",
            icon: <MessageSquare className="w-5 h-5" />
        },
        {
            title: "Izbor materijala",
            desc: "Predstavljamo vam naš asortiman dekorativnih kamenih i ciglenih obloga, uključujući različite teksture, boje i završne obrade koje će najbolje odgovarati vašem prostoru.",
            icon: <Palette className="w-5 h-5" />
        },
        {
            title: "Ugradnja",
            desc: "Naš stručni tim ili vaš izvođač radova vrši profesionalnu ugradnju dekorativnih obloga prema planu, osiguravajući savršen rezultat i poštovanje rokova.",
            icon: <Clock className="w-5 h-5" />
        },
        {
            title: "Završna obrada",
            desc: "Nakon ugradnje, obloge se premazuju zaštitnim sredstvom koje održava njihov prirodan izgled i obezbeđuje dugotrajnost i otpornost na vremenske uslove.",
            icon: <CheckCircle className="w-5 h-5" />
        }
    ];

    // Pratimo vidljivost sekcije za animaciju
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
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

    // Automatska promena aktivnog koraka svakih 5 sekundi
    useEffect(() => {
        if (!isVisible) return;

        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % processSteps.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isVisible, processSteps.length]);

    // Pomoćna funkcija za dobijanje klasa animacije
    const getAnimationClasses = (delay: string = '') => `
        transition-all duration-700 ${delay} ease-out transform 
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
    `.trim();

    return (
        <section
            ref={sectionRef}
            id="proces-rada"
            className="py-16 md:py-24 bg-stone-100 overflow-hidden font-sans"
        >
            <Container>
                {/* Zaglavlje */}
                <div className={`text-center mb-12 md:mb-16 ${getAnimationClasses()}`}>
                    <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-4 uppercase tracking-wide">
                        Naš <span className="font-medium">proces</span>
                    </h2>
                    <div className="w-16 h-1 bg-amber-500 mx-auto mb-6"></div>
                    <p className="text-stone-600 max-w-2xl mx-auto font-light">
                        Pristupamo svakom projektu sa posvećenošću i preciznošću,
                        prateći proverenu metodologiju koja garantuje kvalitetne rezultate.
                    </p>
                </div>

                {/* Desktop prikaz procesa - horizontalni timeline */}
                <div className="hidden md:block max-w-5xl mx-auto">
                    <div className="relative pb-16">
                        {/* Centralna linija */}
                        <div className="absolute top-16 left-0 w-full h-0.5 bg-stone-300"></div>

                        {/* Koraci procesa */}
                        <div className="flex justify-between relative z-10">
                            {processSteps.map((step, index) => (
                                <div
                                    key={index}
                                    className={`w-56 ${getAnimationClasses(`delay-${200 + index * 100}`)}`}
                                    onMouseEnter={() => setActiveStep(index)}
                                >
                                    {/* Ikona koraka u krugu */}
                                    <div className={`w-12 h-12 rounded-full mx-auto flex items-center justify-center transition-all duration-500 ${
                                        activeStep === index
                                            ? 'bg-amber-500 text-white scale-110 shadow-md'
                                            : 'bg-white text-stone-600 border border-stone-200'
                                    }`}>
                                        {step.icon}
                                    </div>

                                    {/* Broj koraka */}
                                    <div className={`w-6 h-6 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center text-xs font-medium mx-auto -mt-2 transition-all duration-500 ${
                                        activeStep === index
                                            ? 'bg-amber-600 text-white'
                                            : ''
                                    }`}>
                                        {index + 1}
                                    </div>

                                    {/* Sadržaj koraka */}
                                    <div className={`mt-6 text-center transition-all duration-500 ${
                                        activeStep === index ? 'opacity-100' : 'opacity-70'
                                    }`}>
                                        <h3 className={`text-lg font-medium mb-2 transition-colors duration-300 ${
                                            activeStep === index ? 'text-amber-600' : 'text-stone-800'
                                        }`}>
                                            {step.title}
                                        </h3>
                                        <p className={`text-sm font-light transition-all duration-500 ${
                                            activeStep === index ? 'text-stone-700' : 'text-stone-500'
                                        }`}>
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobilni prikaz procesa - vertikalni timeline */}
                <div className="md:hidden max-w-sm mx-auto">
                    <div className="relative pl-10">
                        {/* Vertikalna linija */}
                        <div className="absolute top-0 left-4 w-0.5 h-full bg-stone-300"></div>

                        {/* Koraci procesa */}
                        {processSteps.map((step, index) => (
                            <div
                                key={index}
                                className={`mb-10 relative ${getAnimationClasses(`delay-${200 + index * 100}`)}`}
                                onClick={() => setActiveStep(index)}
                            >
                                {/* Ikona koraka u krugu */}
                                <div className={`absolute -left-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                                    activeStep === index
                                        ? 'bg-amber-500 text-white scale-110 shadow-md'
                                        : 'bg-white text-stone-600 border border-stone-200'
                                }`}>
                                    <span className="text-xs font-medium">{index + 1}</span>
                                </div>

                                {/* Sadržaj koraka */}
                                <div className={`transition-all duration-500 ${
                                    activeStep === index ? 'opacity-100' : 'opacity-70'
                                }`}>
                                    <h3 className={`text-lg font-medium mb-2 transition-colors duration-300 flex items-center ${
                                        activeStep === index ? 'text-amber-600' : 'text-stone-800'
                                    }`}>
                                        {step.icon}
                                        <span className="ml-2">{step.title}</span>
                                    </h3>
                                    <p className="text-sm text-stone-600 font-light">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Indikatori */}
                    <div className="flex justify-center space-x-2 mt-8">
                        {processSteps.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveStep(index)}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                    activeStep === index
                                        ? 'w-8 bg-amber-500'
                                        : 'w-4 bg-stone-300 hover:bg-stone-400'
                                }`}
                                aria-label={`Korak ${index + 1}`}
                            ></button>
                        ))}
                    </div>
                </div>

                {/* CTA sekcija */}
                <div className={`mt-16 md:mt-20 text-center ${getAnimationClasses('delay-800')}`}>
                    <p className="text-stone-600 mb-6 max-w-2xl mx-auto font-light">
                        Spremni ste da transformišete svoj prostor sa našim dekorativnim kamenim oblogama?
                    </p>
                    <a
                        href="/kontakt"
                        className="group inline-flex items-center bg-stone-800 text-white px-6 py-3 rounded-sm hover:bg-stone-700 transition-all duration-300 text-sm uppercase tracking-wider font-light shadow-sm hover:shadow-md"
                    >
                        <span>Započnite projekat</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                {/* Dodatne informacije */}
                <div className={`mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 ${getAnimationClasses('delay-900')}`}>
                    <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300">
                        <h3 className="text-lg font-medium text-stone-800 mb-3">Stručna podrška kroz ceo proces</h3>
                        <p className="text-stone-600 font-light text-sm">
                            Od inicijalnih konsultacija do završne obrade, naš tim vam pruža stručnu podršku i savete. Oslonite se na naše iskustvo za besprekorne rezultate.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300">
                        <h3 className="text-lg font-medium text-stone-800 mb-3">Prilagođeno vašim potrebama</h3>
                        <p className="text-stone-600 font-light text-sm">
                            Svaki projekat je jedinstven, a naš pristup je prilagođen vašim specifičnim zahtevima. Pružamo fleksibilne opcije ugradnje i podrške koji odgovaraju vašim potrebama.
                        </p>
                    </div>
                </div>
            </Container>
        </section>
    );
};