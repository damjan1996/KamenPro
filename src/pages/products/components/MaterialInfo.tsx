// src/pages/products/components/MaterialInfo.tsx
import { useState, useEffect, useRef } from "react";
import { Container } from "../../../components/ui/Container";
import { ArrowRight } from "lucide-react";

export function MaterialInfo() {
    const [activeMaterial, setActiveMaterial] = useState<number>(1);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setIsVisible(true);
            }
        }, { threshold: 0.2 });

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const materials = [
        {
            id: 1,
            name: "Beli cement sa aditivima",
            description: "Visokokvalitetna osnova za naše dekorativne obloge, uz dodatak specijalnih aditiva za očvršćivanje i trajnost.",
            image: "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Page/Products/Material/cement.jpg"
        },
        {
            id: 2,
            name: "Dekorativni kamen",
            description: "Ručno izrađene kamene ploče debljine 15-20mm sa prirodnom kamenom optikom i raznovrsnim teksturama za svaki enterijer.",
            image: "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Dolomite/White/Dolomite%20-%20White%20I.jpg"
        },
        {
            id: 3,
            name: "Rustik cigla",
            description: "Tanke ciglene obloge debljine samo 5mm koje donose topao, klasičan izgled svakom prostoru uz jednostavnu ugradnju.",
            image: "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Cigla/Rustik/Red/Cigla%20-%20Rustik%20-%20Red.jpg"
        },
        {
            id: 4,
            name: "Ugaoni elementi",
            description: "Specijalno oblikovani elementi za savršeno završavanje spoljnih uglova koji stvaraju utisak masivne kamene konstrukcije.",
            image: "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Page/Products/Categories/ugaoni%20elementi%20iiii.jpg"
        }
    ];

    return (
        <section ref={sectionRef} id="material-info" className="py-16 md:py-24 bg-white font-sans">
            <Container>
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Leva strana - Informacije */}
                    <div className={`transition-all duration-700 transform ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}>
                        <div className="mb-8">
                            <div className="relative inline-block">
                                <span className="text-amber-600 mb-2 text-sm font-medium tracking-wider uppercase">MATERIJALI</span>
                                <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-4 tracking-wide">
                                    <span className="text-stone-400">Materijali</span> <span className="font-medium">naših obloga</span>
                                </h2>
                                <div className="h-1 w-16 bg-amber-500 mb-6"></div>
                            </div>
                            <p className="text-base text-stone-600 mb-8 max-w-xl font-light leading-relaxed">
                                Koristimo samo najkvalitetnije materijale koji su pažljivo odabrani za svaku namenu.
                                Naši proizvodi kombinuju prirodnu estetiku kamena sa praktičnošću savremenih materijala.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {materials.map((material) => (
                                <div
                                    key={material.id}
                                    className={`border-l-4 pl-5 py-3 transition-all duration-300 cursor-pointer ${
                                        activeMaterial === material.id
                                            ? "border-amber-500 bg-stone-50 shadow-sm"
                                            : "border-stone-200 hover:border-amber-300"
                                    }`}
                                    onClick={() => setActiveMaterial(material.id)}
                                >
                                    <h3 className={`text-lg font-medium mb-2 transition-colors duration-300 ${
                                        activeMaterial === material.id ? "text-amber-600" : "text-stone-800"
                                    }`}>
                                        {material.name}
                                    </h3>
                                    <p className="text-stone-600 text-sm font-light">{material.description}</p>
                                </div>
                            ))}
                        </div>

                        <a
                            href="/kontakt"
                            className="mt-8 inline-flex items-center text-amber-600 font-medium group hover:text-amber-700 transition-colors"
                        >
                            <span>Zatražite više informacija o našim materijalima</span>
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </a>
                    </div>

                    {/* Desna strana - Slika i karakteristike */}
                    <div className={`relative transition-all duration-700 delay-300 transform ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}>
                        {/* Glavna slika */}
                        <div className="rounded-lg overflow-hidden shadow-md transition-all duration-500 hover:shadow-lg">
                            <img
                                src={materials[activeMaterial-1].image}
                                alt={materials[activeMaterial-1].name}
                                className="w-full aspect-video object-cover transition-transform duration-700 hover:scale-105"
                            />
                            {/* Overlay za sliku */}
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent pointer-events-none" />
                        </div>

                        {/* Dekorativni element */}
                        <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full border border-stone-200 opacity-30 z-0 hidden lg:block"></div>

                        {/* Karakteristike materijala */}
                        <div className={`absolute -top-10 -right-10 bg-white shadow-lg p-5 max-w-[220px] rounded-lg border border-stone-100 transition-all duration-500 delay-500 transform ${
                            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
                        }`}>
                            <p className="text-xs text-stone-600 mb-3 font-medium">Karakteristike naših proizvoda:</p>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-light">Otpornost na vremenske uslove</span>
                                    <div className="w-20 h-2 bg-stone-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-amber-500 transition-all duration-1000"
                                            style={{
                                                width: isVisible ? "95%" : "0%",
                                                transitionDelay: "800ms"
                                            }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-light">Vatrootpornost</span>
                                    <div className="w-20 h-2 bg-stone-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-amber-500 transition-all duration-1000"
                                            style={{
                                                width: isVisible ? "90%" : "0%",
                                                transitionDelay: "1000ms"
                                            }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-light">Estetski kvalitet</span>
                                    <div className="w-20 h-2 bg-stone-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-amber-500 transition-all duration-1000"
                                            style={{
                                                width: isVisible ? "100%" : "0%",
                                                transitionDelay: "1200ms"
                                            }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-light">Lakoća ugradnje</span>
                                    <div className="w-20 h-2 bg-stone-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-amber-500 transition-all duration-1000"
                                            style={{
                                                width: isVisible ? "85%" : "0%",
                                                transitionDelay: "1400ms"
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dodatni citat */}
                <div className={`mt-16 p-8 bg-amber-50 rounded-lg text-center border border-amber-100 transition-all duration-700 delay-700 transform ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    <p className="italic text-stone-700 max-w-3xl mx-auto font-light">
                        "Dekorišite svaki centimetar vašeg prostora da se oseća kao dom. Naše dekorativne obloge inspirišu
                        dizajne koji odražavaju vašu ličnost i donose prirodnu lepotu kamena u svaki enterijer."
                    </p>
                    <div className="mt-6 space-x-2">
                        <a
                            href="/proizvodi#proizvodi"
                            className="inline-flex items-center px-5 py-2 bg-stone-800 text-white rounded-sm hover:bg-stone-700 transition-all duration-300 text-sm shadow-sm hover:shadow-md"
                        >
                            <span className="font-light">Istražite proizvode</span>
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a
                            href="/kontakt"
                            className="inline-flex items-center px-5 py-2 bg-amber-500 text-white rounded-sm hover:bg-amber-600 transition-all duration-300 text-sm shadow-sm hover:shadow-md"
                        >
                            <span className="font-light">Kontaktirajte nas</span>
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </Container>
        </section>
    );
}