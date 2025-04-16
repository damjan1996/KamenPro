// src/pages/references/components/Categories.tsx
import { useState, useEffect, useRef } from 'react';
import { Container } from '../../../components/ui/Container';
import { ArrowRight } from 'lucide-react';

export const CategoriesSection = () => {
    const [activeCategory, setActiveCategory] = useState<number | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
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

    const categories = [
        {
            id: 1,
            title: "Stambeni objekti",
            description: "Nudimo rešenja za enterijer stambenih objekata, obezbeđujući da svaki prostor odražava stil i ličnost vlasnika. Naše kamene obloge donose toplinu i karakter svakom domu.",
            image: "/images/about/stambeni%20prostor.jpg",
            imageAlt: "Stambeni objekat sa dekorativnim kamenim oblogama"
        },
        {
            id: 2,
            title: "Poslovni objekti",
            description: "Naše kamene obloge stvaraju upečatljiv utisak u poslovnim prostorima, od elegantnih recepcija do reprezentativnih sala za sastanke. Kombinujemo estetiku i funkcionalnost za stvaranje produktivnog radnog okruženja.",
            image: "/images/about/radni%20prostor.jpg",
            imageAlt: "Poslovni prostor sa dekorativnim kamenim oblogama"
        },
        {
            id: 3,
            title: "Ugostiteljski objekti",
            description: "Specijalizovani smo za stvaranje jedinstvenih ambijenata u hotelima i restoranima, gde naše kamene obloge doprinose autentičnom doživljaju. Svaki projekat odražava karakter i viziju brenda.",
            image: "/images/home/ugostiteljski-prostor.jpg",
            imageAlt: "Ugostiteljski objekat sa dekorativnim kamenim oblogama"
        }
    ];

    // Pomoćna funkcija za dobijanje klasa animacije
    const getAnimationClasses = (delay: string = '') => `
        transition-all duration-700 ${delay} ease-out transform 
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
    `.trim();

    return (
        <section
            ref={sectionRef}
            id="kategorije-projekata"
            className="py-16 md:py-24 bg-stone-50 overflow-hidden font-sans"
        >
            <Container>
                {/* Zaglavlje */}
                <div className={`text-center mb-12 md:mb-16 ${getAnimationClasses()}`}>
                    <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-4 uppercase tracking-wide">
                        Kategorije <span className="font-medium">projekata</span>
                    </h2>
                    <div className="w-16 h-1 bg-amber-500 mx-auto mb-6"></div>
                    <p className="text-stone-600 max-w-2xl mx-auto font-light">
                        Istražite naš portfolio realizovanih projekata po kategorijama i pogledajte
                        kako naše dekorativne obloge transformišu različite vrste prostora.
                    </p>
                </div>

                {/* Kategorije */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {categories.map((category, index) => (
                        <div
                            key={category.id}
                            className={`group relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ${getAnimationClasses(`delay-${200 + index * 100}`)}`}
                            onMouseEnter={() => setActiveCategory(category.id)}
                            onMouseLeave={() => setActiveCategory(null)}
                        >
                            {/* Slika */}
                            <div className="relative h-72 overflow-hidden">
                                <img
                                    src={category.image}
                                    alt={category.imageAlt}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-90"></div>
                            </div>

                            {/* Sadržaj */}
                            <div className="absolute inset-0 flex flex-col justify-end p-6">
                                <div className="relative z-10">
                                    <h3 className="text-xl font-medium text-white mb-2">{category.title}</h3>
                                    <p className={`text-white/80 text-sm font-light mb-4 transition-all duration-500 line-clamp-2 ${
                                        activeCategory === category.id ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0'
                                    }`}>
                                        {category.description}
                                    </p>
                                    <a
                                        href={`#${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                                        className={`inline-flex items-center text-amber-400 transition-all duration-300 ${
                                            activeCategory === category.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                        }`}
                                    >
                                        <span className="text-sm font-light">Pogledajte projekte</span>
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </div>

                            {/* Dekorativni element */}
                            <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-medium py-1 px-2 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {categories.filter(c => c.id === category.id).length} projekata
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className={`mt-12 text-center ${getAnimationClasses('delay-700')}`}>
                    <a
                        href="#svi-projekti"
                        className="group inline-flex items-center bg-stone-800 text-white px-6 py-3 rounded-sm hover:bg-stone-700 transition-all duration-300 text-sm uppercase tracking-wider font-light shadow-sm hover:shadow-md"
                    >
                        <span>Pogledajte sve projekte</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                {/* Brojke */}
                <div className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 ${getAnimationClasses('delay-800')}`}>
                    <div className="p-6 bg-white rounded-lg border border-stone-200 hover:border-amber-200 hover:shadow-sm transition-all duration-300 text-center">
                        <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl font-medium">5+</span>
                        </div>
                        <h4 className="text-lg font-medium text-stone-800 mb-2">Godina iskustva</h4>
                        <p className="text-stone-600 font-light text-sm">Od 2019. godine radimo na stvaranju jedinstvenih prostora</p>
                    </div>

                    <div className="p-6 bg-white rounded-lg border border-stone-200 hover:border-amber-200 hover:shadow-sm transition-all duration-300 text-center">
                        <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl font-medium">50+</span>
                        </div>
                        <h4 className="text-lg font-medium text-stone-800 mb-2">Uspešnih projekata</h4>
                        <p className="text-stone-600 font-light text-sm">Stambeni objekti, poslovni prostori i ugostiteljski objekti</p>
                    </div>

                    <div className="p-6 bg-white rounded-lg border border-stone-200 hover:border-amber-200 hover:shadow-sm transition-all duration-300 text-center">
                        <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl font-medium">100%</span>
                        </div>
                        <h4 className="text-lg font-medium text-stone-800 mb-2">Zadovoljnih klijenata</h4>
                        <p className="text-stone-600 font-light text-sm">Posvećeni smo kvalitetu i zadovoljstvu naših klijenata</p>
                    </div>
                </div>
            </Container>
        </section>
    );
};