// src/pages/references/components/Process.tsx
import { useState, useEffect, useRef } from 'react';

export const ProcessSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const sectionRef = useRef(null);

    const processSteps = [
        {
            title: "Konsultacije",
            desc: "Započinjemo sa detaljnim razgovorom o vašim željama, potrebama i budžetu. U ovoj fazi analiziramo prostor i stvaramo inicijalnu viziju vašeg idealnog enterijera.",
            icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        },
        {
            title: "Dizajn Koncept",
            desc: "Naš kreativni tim razvija detaljne koncepte i vizualizacije prostora. Predstavljamo vam 3D rendere, materijale, palete boja i sve detalje koji će oživeti vaš prostor.",
            icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        },
        {
            title: "Implementacija",
            desc: "Koordiniramo sve aspekte realizacije projekta, od nabavke materijala do saradnje sa majstorima i dobavljačima. Osiguravamo da svaki detalj bude izveden prema planu.",
            icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        },
        {
            title: "Finalizacija",
            desc: "Pažljivo stilizujemo prostor sa dekorativnim elementima i detaljima koji daju karakter. Finalni obilazak zajedno sa vama osigurava da je svaki aspekt projekta savršeno izveden.",
            icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        }
    ];

    // Pratimo vidljivost sekcije za animaciju
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

    // Automatska promena aktivnog koraka svakih 5 sekundi
    useEffect(() => {
        if (!isVisible) return;

        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % processSteps.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isVisible, processSteps.length]);

    return (
        <section ref={sectionRef} className="py-20 md:py-32 bg-stone-50 relative overflow-hidden">
            {/* Pozadinski elementi */}
            <div className="absolute w-96 h-96 rounded-full bg-neutral-100 -top-48 -right-48 opacity-50"></div>
            <div className="absolute w-96 h-96 rounded-full bg-neutral-100 -bottom-48 -left-48 opacity-50"></div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Naslov sekcije */}
                <div className={`mb-20 transition-all duration-1000 transform ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
                        Naš <span className="text-neutral-800 relative inline-block">
                            Proces
                            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gold-500"></span>
                        </span>
                    </h2>
                    <p className="text-center max-w-2xl mx-auto text-neutral-600">
                        Pristupamo svakom projektu sa posvećenošću i preciznošću,
                        prateći proverenu metodologiju koja garantuje izvanredne rezultate.
                    </p>
                </div>

                {/* Desktop prikaz procesa - horizontalni timeline */}
                <div className="hidden md:block max-w-6xl mx-auto">
                    <div className="relative">
                        {/* Centralna linija */}
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-neutral-200 transform -translate-y-1/2"></div>

                        {/* Koraci procesa */}
                        <div className="flex justify-between relative z-10">
                            {processSteps.map((step, index) => (
                                <div
                                    key={index}
                                    className={`w-64 transition-all duration-700 transform ${
                                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                    }`}
                                    style={{ transitionDelay: `${index * 200}ms` }}
                                    onMouseEnter={() => setActiveStep(index)}
                                >
                                    {/* Broj koraka u krugu */}
                                    <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center text-xl font-semibold transition-all duration-500 ${
                                        activeStep === index
                                            ? 'bg-black text-white scale-110'
                                            : 'bg-white text-neutral-800 border-2 border-neutral-200'
                                    }`}>
                                        {index + 1}
                                    </div>

                                    {/* Sadržaj koraka - alternirajući gore/dole */}
                                    <div className={`mt-8 text-center transition-all duration-500 ${
                                        activeStep === index ? 'opacity-100' : 'opacity-70'
                                    }`}>
                                        <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                                            activeStep === index ? 'text-black' : 'text-neutral-600'
                                        }`}>
                                            {step.title}
                                        </h3>
                                        <p className={`text-sm transition-all duration-500 ${
                                            activeStep === index ? 'text-neutral-800 max-h-40' : 'text-neutral-500 max-h-20 overflow-hidden'
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
                    <div className="relative pl-8">
                        {/* Vertikalna linija */}
                        <div className="absolute top-0 left-4 w-0.5 h-full bg-neutral-200"></div>

                        {/* Koraci procesa */}
                        {processSteps.map((step, index) => (
                            <div
                                key={index}
                                className={`mb-12 relative transition-all duration-700 transform ${
                                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                                }`}
                                style={{ transitionDelay: `${index * 200}ms` }}
                            >
                                {/* Broj koraka u krugu */}
                                <div className={`absolute -left-4 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-500 ${
                                    activeStep === index
                                        ? 'bg-black text-white scale-110'
                                        : 'bg-white text-neutral-800 border-2 border-neutral-200'
                                }`}>
                                    {index + 1}
                                </div>

                                {/* Sadržaj koraka */}
                                <div className={`transition-all duration-500 ${
                                    activeStep === index ? 'opacity-100' : 'opacity-70'
                                }`}>
                                    <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                                        activeStep === index ? 'text-black' : 'text-neutral-600'
                                    }`}>
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-neutral-600">
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
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    activeStep === index
                                        ? 'w-8 bg-black'
                                        : 'bg-neutral-300 hover:bg-neutral-400'
                                }`}
                                aria-label={`Korak ${index + 1}`}
                            ></button>
                        ))}
                    </div>
                </div>

                {/* CTA sekcija */}
                <div className={`mt-20 text-center transition-all duration-1000 transform ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`} style={{ transitionDelay: '800ms' }}>
                    <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
                        Spremni ste da transformišete svoj prostor u luksuzno remek-delo?
                    </p>
                    <button className="group relative inline-flex items-center justify-center px-8 py-3 bg-black text-white overflow-hidden transition-all duration-300">
                        <span className="relative z-10 font-medium">Započnite Projekat</span>
                        <span className="absolute inset-0 bg-neutral-800 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
                    </button>
                </div>
            </div>
        </section>
    );
};