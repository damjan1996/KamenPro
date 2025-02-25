// src/pages/references/components/Categories.tsx
import { useState, useEffect } from 'react';

export const CategoriesSection = () => {
    const [activeCategory, setActiveCategory] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        const section = document.getElementById('categories-section');
        if (section) observer.observe(section);

        return () => {
            if (section) observer.unobserve(section);
        };
    }, []);

    const categories = [
        {
            title: "Stambeni Objekti",
            description: "Estetski i funkcionalni prostori koji harmonizuju modernu estetiku sa bezvremenskom elegancijom, stvarajući dom koji odiše životom.",
            image: "/images/residential.jpg",
            imageAlt: "Moderna dnevna soba sa minimalističkim dizajnom"
        },
        {
            title: "Komercijalni Objekti",
            description: "Poslovni prostori koji spajaju profesionalizam i kreativnost, stvarajući produktivno okruženje koje impresionira klijente i inspiriše zaposlene.",
            image: "/images/commercial.jpg",
            imageAlt: "Moderan kancelarijski prostor sa drvenim detaljima"
        },
        {
            title: "Javni Prostori",
            description: "Javni prostori koji inspirišu zajednicu, kombinujući funkcionalnost i estetiku za stvaranje dugotrajnog utiska na svakog posetioca.",
            image: "/images/public.jpg",
            imageAlt: "Elegantno uređen javni prostor sa prirodnim svetlom"
        }
    ];

    return (
        <section id="categories-section" className="py-16 md:py-24 bg-stone-50">
            <div className="container mx-auto px-4 md:px-6">
                {/* Naslov sa animacijom */}
                <div className={`mb-12 md:mb-16 transition-all duration-700 transform ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    <h2 className="text-3xl md:text-5xl font-bold text-center">
                        Kategorije <span className="text-orange-700">Projekata</span>
                    </h2>
                    <div className="w-24 h-1 bg-orange-700 mx-auto mt-4"></div>
                </div>

                {/* Kategorije */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className={`group relative overflow-hidden rounded-xl transition-all duration-700 transform ${
                                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                            }`}
                            style={{ transitionDelay: `${100 * index}ms` }}
                            onMouseEnter={() => setActiveCategory(index)}
                        >
                            {/* Pozadinska slika */}
                            <div className="relative h-80 md:h-96 overflow-hidden">
                                <div
                                    className="absolute inset-0 bg-stone-800 opacity-30 group-hover:opacity-10 transition-opacity duration-500"
                                ></div>
                                <div
                                    className="w-full h-full bg-stone-200 transition-transform duration-700 group-hover:scale-105"
                                    style={{
                                        backgroundImage: `url(${category.image || '/api/placeholder/800/600'})`,
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                    }}
                                ></div>
                            </div>

                            {/* Sadržaj kartice */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-stone-900 to-transparent">
                                <h3 className="text-xl md:text-2xl font-semibold mb-2 text-white group-hover:text-orange-200 transition-colors duration-300">
                                    {category.title}
                                </h3>
                                <p className="text-stone-200 text-sm md:text-base max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                                    {category.description}
                                </p>
                                <div className="mt-4 md:mt-6 overflow-hidden h-8">
                                    <button className="flex items-center text-white opacity-0 transform translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                                        <span className="mr-2">Pogledaj projekte</span>
                                        <svg
                                            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Dekorativni element */}
                            <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
                                <div className="absolute rotate-45 bg-orange-500 text-white w-16 h-16 flex items-center justify-center -top-8 -right-8 group-hover:bg-orange-600 transition-colors duration-300"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Dugme "Pogledaj sve" */}
                <div className={`flex justify-center mt-12 transition-all duration-700 delay-500 transform ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    <button className="group relative bg-transparent border-2 border-stone-800 text-stone-800 py-3 px-8 rounded-full overflow-hidden transition-all duration-300 hover:text-white hover:border-orange-700">
                        <span className="relative z-10 flex items-center">
                            Pogledaj sve projekte
                            <svg
                                className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </span>
                        <span className="absolute inset-0 bg-orange-700 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                    </button>
                </div>
            </div>
        </section>
    );
};