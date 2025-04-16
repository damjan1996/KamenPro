// src/pages/products/components/ProductAdvantages.tsx
import { useState, useEffect, useRef } from "react";
import { Container } from "../../../components/ui/Container";
import { Shield, Clock, Droplets, ThumbsUp, ArrowRight } from "lucide-react";

export function ProductAdvantages() {
    const [activeAdvantage, setActiveAdvantage] = useState<number | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

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

    const advantages = [
        {
            id: 1,
            icon: Shield,
            title: "Otpornost na vremenske uslove",
            description: "Naše dekorativne obloge su otporne na sve vrste vremenskih uslova - kišu, sneg, mraz, kao i na vatru i vlagu.",
            color: "bg-amber-500"
        },
        {
            id: 2,
            icon: Clock,
            title: "Dugotrajnost",
            description: "Sa pravilnim održavanjem i kvalitetnim lepkom, naši proizvodi mogu trajati nekoliko decenija bez gubitka kvaliteta i izgleda.",
            color: "bg-amber-500"
        },
        {
            id: 3,
            icon: Droplets,
            title: "Lako održavanje",
            description: "Nakon ugradnje, obloge je dovoljno premazati zaštitnim prajmerom koji se može nabaviti u bolje opremljenim prodavnicama.",
            color: "bg-amber-500"
        },
        {
            id: 4,
            icon: ThumbsUp,
            title: "Estetski kvalitet",
            description: "Prirodna kamena optika sa 6 različitih reljefnih tipova koji stvaraju jedinstveni izgled za svaki enterijer ili eksterijer.",
            color: "bg-amber-500"
        }
    ];

    const useCases = [
        { name: "Enterijer", image: "/images/products/enterijer.jpg" },
        { name: "Eksterijer", image: "/images/products/eksterijer.jpg" },
        { name: "Kamini", image: "/images/products/kamin.jpg" },
        { name: "Stubovi", image: "/images/products/stubovi.jpg" }
    ];

    return (
        <section ref={sectionRef} id="product-advantages" className="py-16 md:py-24 bg-stone-50 font-sans">
            <Container>
                <div className="text-center mb-16">
                    <div className={`transition-all duration-700 transform ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}>
                        <span className="text-amber-600 mb-2 text-sm font-medium tracking-wider uppercase block">
                            Zašto izabrati nas
                        </span>
                        <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-4 tracking-wide">
                            <span className="text-stone-400">Prednosti</span> <span className="font-medium">naših proizvoda</span>
                        </h2>
                        <div className="h-1 w-16 bg-amber-500 mx-auto mb-6"></div>
                        <p className="max-w-2xl mx-auto text-base text-stone-600 font-light">
                            Naše dekorativne kamene i ciglene obloge nude brojne prednosti koje će unaprediti
                            vaš prostor, od izdržljivosti do estetskog kvaliteta.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {advantages.map((advantage, index) => (
                        <div
                            key={advantage.id}
                            className={`bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-500 transform ${
                                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            } ${
                                activeAdvantage === advantage.id ? 'border-l-2 border-amber-500' : 'border-l-2 border-transparent'
                            }`}
                            style={{ transitionDelay: `${200 + index * 100}ms` }}
                            onMouseEnter={() => setActiveAdvantage(advantage.id)}
                            onMouseLeave={() => setActiveAdvantage(null)}
                        >
                            <div className={`h-1 w-full ${advantage.color}`}></div>
                            <div className="p-6">
                                <div
                                    className={`w-14 h-14 rounded-full flex items-center justify-center mb-5 transition-all duration-300 ${
                                        activeAdvantage === advantage.id
                                            ? 'bg-amber-500 text-white transform scale-110'
                                            : 'bg-amber-100 text-amber-600'
                                    }`}
                                >
                                    <advantage.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-medium text-stone-800 mb-3">{advantage.title}</h3>
                                <p className="text-stone-600 text-sm font-light mb-4">{advantage.description}</p>

                                <div
                                    className={`mt-4 flex items-center text-sm transition-all duration-300 ${
                                        activeAdvantage === advantage.id
                                            ? 'opacity-100 translate-y-0'
                                            : 'opacity-0 translate-y-4'
                                    }`}
                                >
                                    <a
                                        href="/kontakt"
                                        className="text-amber-600 hover:text-amber-700 transition-colors font-medium inline-flex items-center"
                                    >
                                        <span>Saznajte više</span>
                                        <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div
                    className={`mt-12 text-center transition-all duration-700 delay-500 transform ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                >
                    <a
                        href="/proizvodi#proizvodi"
                        className="px-6 py-3 bg-stone-800 text-white rounded-sm inline-flex items-center hover:bg-stone-700 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        <span className="font-light">Pogledajte sve proizvode</span>
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                {/* Primene proizvoda */}
                <div
                    className={`mt-16 pt-8 border-t border-stone-200 transition-all duration-700 delay-600 transform ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                >
                    <h3 className="text-2xl font-medium text-stone-800 mb-8 text-center">
                        Primene naših proizvoda
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {useCases.map((category, index) => (
                            <div
                                key={index}
                                className={`rounded-lg overflow-hidden shadow-sm group cursor-pointer transition-all duration-500 transform ${
                                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}
                                style={{ transitionDelay: `${700 + index * 100}ms` }}
                            >
                                <div className="relative overflow-hidden aspect-square">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <h4 className="text-white text-lg font-medium">{category.name}</h4>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA sekcija */}
                <div
                    className={`mt-16 p-8 bg-amber-50 rounded-lg border border-amber-100 text-center transition-all duration-700 delay-700 transform ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                >
                    <h3 className="text-2xl font-medium text-stone-800 mb-4">Spremni za vašu transformaciju prostora?</h3>
                    <p className="text-stone-600 mb-6 max-w-2xl mx-auto font-light">
                        Naše dekorativne kamene i ciglene obloge će dati vašem prostoru prirodan, topao i autentičan izgled.
                        Kontaktirajte nas danas za besplatnu konsultaciju ili posetite naš izložbeni prostor.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/reference"
                            className="px-6 py-3 bg-stone-800 hover:bg-stone-700 text-white rounded-sm transition-all duration-300 inline-flex items-center justify-center font-light"
                        >
                            Pogledajte projekte
                        </a>
                        <a
                            href="/kontakt"
                            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-sm transition-all duration-300 inline-flex items-center justify-center font-light"
                        >
                            Kontaktirajte nas
                        </a>
                    </div>
                </div>
            </Container>
        </section>
    );
}