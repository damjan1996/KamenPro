// src/pages/references/components/CTASection.tsx
import { useState, useEffect, useRef } from 'react';

export const CTASection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

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
        <section
            ref={sectionRef}
            className="py-20 md:py-28 bg-stone-100 relative overflow-hidden"
        >
            {/* Pozadinski dekorativni elementi */}
            <div className="absolute inset-0 w-full h-full opacity-5">
                <div className="absolute h-96 w-96 rounded-full bg-stone-800 -top-48 -right-48"></div>
                <div className="absolute h-96 w-96 rounded-full bg-stone-800 -bottom-48 -left-48"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto">
                    {/* Leva strana - Tekst */}
                    <div className={`w-full md:w-1/2 mb-10 md:mb-0 md:pr-12 transition-all duration-1000 transform ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
                    }`}>
                        <h2 className="text-2xl md:text-4xl font-bold text-stone-900 mb-3">
                            Get in <span className="relative inline-block">
                                touch
                                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-stone-900"></span>
                            </span>
                        </h2>

                        <p className="text-stone-600 mb-8 max-w-xl leading-relaxed">
                            Promenite svoj prostor u estetski kutak koji donosi harmoniju.
                            Naš tim je spreman da vaše ideje pretvori u stvarnost, stvarajući
                            enterijer koji će oduševiti sve, posebno vašu porodicu.
                        </p>

                        <ul className="space-y-4 mb-8">
                            {[
                                "Besplatna konsultacija i ponuda",
                                "Profesionalni dizajn enterijerа",
                                "Vrhunski kvalitet materijala i izrade",
                                "Kompletan projekat od ideje do realizacije"
                            ].map((item, index) => (
                                <li
                                    key={index}
                                    className="flex items-center text-stone-700"
                                    style={{ transitionDelay: `${100 * index}ms` }}
                                >
                                    <svg
                                        className="w-5 h-5 mr-3 text-stone-900"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        {/* CTA dugme */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <button className="group relative inline-flex items-center justify-center px-6 py-3 bg-stone-900 text-white overflow-hidden transition-all duration-300 hover:bg-stone-800">
                                <span className="relative z-10 font-medium flex items-center">
                                    CONTACT US
                                    <svg
                                        className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </span>
                                <span className="absolute inset-0 bg-stone-700 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                            </button>

                            <a href="tel:+381123456789" className="text-stone-900 font-medium hover:text-stone-700 transition-colors flex items-center">
                                <svg
                                    className="w-5 h-5 mr-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                +381 12 345 6789
                            </a>
                        </div>
                    </div>

                    {/* Desna strana - Slika */}
                    <div className={`w-full md:w-1/2 md:pl-6 transition-all duration-1000 transform ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
                    }`}>
                        <div className="relative">
                            {/* Glavna slika */}
                            <div className="rounded bg-white shadow-lg p-3 z-10 relative">
                                <div className="aspect-w-4 aspect-h-3 overflow-hidden relative">
                                    <div className="w-full h-full bg-stone-200" style={{
                                        backgroundImage: `url('/images/interior-kitchen.jpg')`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}>
                                        {/* Fallback ako nema slike */}
                                        <img
                                            src="/api/placeholder/800/600"
                                            alt="Estetski enterijer"
                                            className="opacity-0"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Dekorativni elementi */}
                            <div className="absolute w-24 h-24 rounded-full bg-stone-200 -top-6 -right-6 z-0"></div>
                            <div className="absolute w-16 h-16 rounded-full border-2 border-stone-300 -bottom-4 -left-4 z-0"></div>

                            {/* Nagrade/Akreditacije */}
                            <div className="flex justify-center mt-8 gap-6">
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="w-16 h-16 rounded-full flex items-center justify-center border border-stone-300 bg-white shadow-sm hover:border-stone-900 transition-colors duration-300"
                                    >
                                        <span className="text-xs text-stone-600 font-medium">AWARD {i}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};