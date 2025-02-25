// src/pages/references/components/Hero.tsx
import { useState, useEffect } from 'react';

export const Hero = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Animacija na učitavanje
        setIsVisible(true);
    }, []);

    return (
        <section className="relative bg-gradient-to-b from-gray-100 to-white py-16 md:py-24 overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                {/* Animirani naslov */}
                <h1
                    className={`text-4xl md:text-6xl font-bold text-center mb-4 md:mb-8 transition-all duration-700 transform ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                >
                    Naše <span className="text-orange-500">Reference</span>
                </h1>

                {/* Animirani podnaslov */}
                <p
                    className={`text-lg md:text-xl text-center max-w-3xl mx-auto mb-12 transition-all duration-700 delay-300 transform ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                >
                    Pogledajte naše uspešno završene projekte i transformacije
                    koje smo ostvarili za naše klijente.
                </p>

                {/* Dugme sa hover efektom */}
                <div className={`flex justify-center transition-all duration-700 delay-500 transform ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    <button className="group relative bg-black text-white py-3 px-8 rounded-full overflow-hidden transition-all duration-300 hover:bg-orange-500">
                        <span className="relative z-10 flex items-center">
                            Pregled projekata
                            <svg
                                className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </span>
                        <span className="absolute inset-0 bg-orange-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                    </button>
                </div>
            </div>

            {/* Pozadinski elementi */}
            <div className="absolute -top-10 -right-10 w-40 h-40 md:w-80 md:h-80 bg-orange-400 opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-60 h-60 md:w-96 md:h-96 bg-orange-400 opacity-10 rounded-full blur-3xl"></div>

            {/* Dekorativna linija */}
            <div className={`absolute right-0 top-1/2 transform -translate-y-1/2 h-40 w-1 bg-gradient-to-b from-orange-500 to-transparent transition-all duration-1000 ${
                isVisible ? 'opacity-70' : 'opacity-0'
            }`}></div>
        </section>
    );
};