// src/pages/products/components/ProductCategories.tsx
import { useState, useEffect, useRef } from "react";
import { Container } from "../../../components/ui/Container";
import { ArrowRight } from "lucide-react";

export function ProductCategories() {
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    // Intersection Observer za animaciju pri scrollu
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setIsVisible(true);
            }
        }, { threshold: 0.1 });

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
            name: "Dekorativni kamen",
            image: "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Dolomite/White/Dolomite%20-%20White%20I.jpg",
            description: "Prirodan izgled sa različitim teksturama i bojama za unutrašnje i spoljašnje zidove",
            link: "#dekorativni-kamen",
            price: "33-40 BAM/m²"
        },
        {
            id: 2,
            name: "Rustik cigla",
            image: "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Cigla/Rustik/Red/Cigla%20-%20Rustik%20-%20Red.jpg",
            description: "Klasičan izgled cigle koji donosi toplinu i karakter svakom prostoru",
            link: "#rustik-cigla",
            price: "25-30 BAM/m²"
        },
        {
            id: 3,
            name: "Ugaoni elementi",
            image: "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Page/Products/Categories/ugaoni%20elementi%20iiii.jpg",
            description: "Savršeno završavanje spoljnih uglova za besprekoran izgled",
            link: "#ugaoni-elementi",
            price: "Po dogovoru"
        },
        {
            id: 4,
            name: "Posebne porudžbine",
            image: "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Page/Products/Categories/posebno.jpg",
            description: "Prilagođene boje i dizajn prema vašim specifičnim potrebama",
            link: "#posebne-porudzbine",
            price: "Po dogovoru"
        }
    ];

    return (
        <section
            ref={sectionRef}
            id="proizvodi"
            className="py-16 md:py-24 bg-white font-sans"
        >
            <Container>
                <div className="flex flex-col items-center mb-16">
                    <div
                        className={`relative inline-block text-center transition-all duration-700 transform ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                    >
                        <span className="text-amber-600 mb-2 text-sm font-medium tracking-wider uppercase">NAŠA PONUDA</span>
                        <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-4 tracking-wide">
                            <span className="text-stone-400">Kategorije</span> <span className="font-medium">proizvoda</span>
                        </h2>
                        <div className="w-16 h-1 bg-amber-500 mx-auto mb-6"></div>
                        <p className="text-stone-600 text-center max-w-2xl mx-auto font-light">
                            Transformišite vaš prostor našim visokokvalitetnim dekorativnim kamenim i ciglenim oblogama,
                            kreiranim da traju i inspirišu.
                        </p>
                    </div>
                </div>

                <div
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
                >
                    {categories.map((category, index) => (
                        <div
                            key={category.id}
                            className={`group relative overflow-hidden rounded-lg shadow-md transition-all duration-700 transform ${
                                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                            style={{ transitionDelay: `${200 + index * 100}ms` }}
                            onMouseEnter={() => setHoveredId(category.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            <div className="aspect-[3/4] overflow-hidden">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className={`object-cover w-full h-full transition-transform duration-700 ${
                                        hoveredId === category.id ? 'scale-110' : 'scale-100'
                                    }`}
                                />
                            </div>

                            <div
                                className={`absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/30 to-transparent transition-opacity duration-300 ${
                                    hoveredId === category.id ? 'opacity-75' : 'opacity-40'
                                }`}
                            ></div>

                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                                <h3 className="text-xl md:text-2xl font-medium mb-2 tracking-wide">{category.name}</h3>

                                <div
                                    className={`overflow-hidden transition-all duration-300 ${
                                        hoveredId === category.id ? 'max-h-40 opacity-100 mb-4' : 'max-h-0 opacity-0'
                                    }`}
                                >
                                    <p className="text-white/80 text-sm font-light mb-2">{category.description}</p>
                                    <div className="inline-block px-3 py-1 bg-amber-500 text-white text-xs font-medium rounded-sm mt-2">
                                        {category.price}
                                    </div>
                                </div>

                                <a
                                    href={category.link}
                                    className={`flex items-center text-white text-sm border-b border-white/30 pb-1 transition-all duration-300 ${
                                        hoveredId === category.id ? 'translate-x-2 border-white' : ''
                                    }`}
                                >
                                    Pogledajte više
                                    <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                                </a>
                            </div>

                            {/* Dekorativni element - brojevi */}
                            <div
                                className={`absolute top-6 right-6 font-light text-xs text-white/60 transition-all duration-300 ${
                                    hoveredId === category.id ? 'opacity-100 translate-y-0' : 'opacity-60 -translate-y-2'
                                }`}
                            >
                                0{category.id}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Statistika na dnu */}
                <div
                    className={`mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center transition-all duration-700 delay-500 transform ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                >
                    <div className="flex flex-col items-center bg-stone-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-stone-100">
                        <span className="text-4xl font-bold text-stone-800">6<span className="text-amber-500">+</span></span>
                        <p className="text-stone-600 text-sm mt-2 font-light">Godina iskustva</p>
                    </div>
                    <div className="flex flex-col items-center bg-stone-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-stone-100">
                        <span className="text-4xl font-bold text-stone-800">100<span className="text-amber-500">+</span></span>
                        <p className="text-stone-600 text-sm mt-2 font-light">Realizovanih projekata</p>
                    </div>
                    <div className="flex flex-col items-center bg-stone-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-stone-100">
                        <span className="text-4xl font-bold text-stone-800">3<span className="text-amber-500">+</span></span>
                        <p className="text-stone-600 text-sm mt-2 font-light">Vrste tekstura</p>
                    </div>
                </div>

                {/* CTA sekcija */}
                <div
                    className={`mt-16 text-center bg-amber-50 p-8 rounded-lg border border-amber-100 shadow-sm transition-all duration-700 delay-600 transform ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                >
                    <h3 className="text-2xl font-medium text-stone-800 mb-4">Ne možete da se odlučite?</h3>
                    <p className="text-stone-600 mb-6 max-w-2xl mx-auto font-light">
                        Kontaktirajte nas za stručni savet i pomoć pri izboru idealne dekorativne obloge za vaš prostor.
                        Možemo vam poslati uzorke i pomoći oko planiranja vašeg projekta.
                    </p>
                    <a
                        href="/kontakt"
                        className="inline-flex items-center px-6 py-3 bg-amber-500 text-white rounded-sm hover:bg-amber-600 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        <span className="font-light">Zatražite besplatnu konsultaciju</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </Container>
        </section>
    );
}