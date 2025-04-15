// src/components/home/components/CTASection.tsx
import { useState, useEffect, useRef } from "react";
import { ArrowRight, ChevronRight, Phone } from "lucide-react";
import { Container } from "../../../components/ui/Container";

interface Step {
    id: number;
    number: string;
    title: string;
    description: string;
}

type ButtonType = 'main' | 'contact' | 'products' | null;

export function CTASection() {
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredStep, setHoveredStep] = useState<number | null>(null);
    const [hoveredButton, setHoveredButton] = useState<ButtonType>(null);
    const sectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const currentRef = sectionRef.current;
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
        );

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    const steps: Step[] = [
        {
            id: 1,
            number: "01",
            title: "Kvalitetni proizvodi",
            description: "Ručno izrađen dekorativni kamen od belog cementa sa aditivima za maksimalnu izdržljivost."
        },
        {
            id: 2,
            number: "02",
            title: "Jednostavna ugradnja",
            description: "Lako postavljanje na unutrašnje i spoljašnje zidove uz odgovarajući lepak i našu stručnu podršku."
        },
        {
            id: 3,
            number: "03",
            title: "Dugotrajnost",
            description: "Naši proizvodi su otporni na sve vremenske uslove - kišu, sneg, mraz, kao i na vatru i vlagu."
        }
    ];

    return (
        <section
            ref={sectionRef}
            className="py-20 md:py-28 bg-stone-100 text-stone-800 relative overflow-hidden font-sans"
        >
            {/* Background pattern with subtle animation */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-br from-stone-200 to-white"></div>
                <div className="absolute inset-0 opacity-30" style={{
                    backgroundImage: "radial-gradient(circle at 25px 25px, rgba(120, 113, 108, 0.2) 2px, transparent 0)",
                    backgroundSize: "50px 50px"
                }}></div>
            </div>

            <Container>
                <div className={`relative z-10 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center md:text-left md:flex md:items-end md:justify-between mb-16 md:mb-20">
                            <div className="md:max-w-2xl mb-10 md:mb-0">
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 tracking-wide">
                                    Transformišite svoj prostor<br />
                                    <span className="font-medium">sa KamenPro oblogama</span>
                                </h2>
                                <div className="w-16 h-1 bg-amber-600 mx-auto md:mx-0 mb-6"></div>
                                <p className="text-base md:text-lg text-stone-600 max-w-xl font-light leading-relaxed">
                                    Od 2019. godine stvaramo visokokvalitetne kamene obloge koje kombinuju prirodan izgled sa izuzetnom trajnošću. Idealno za unutrašnje i spoljašnje zidove.
                                </p>
                            </div>

                            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                                <a
                                    href="tel:+38765678634"
                                    className={`inline-flex items-center px-7 py-4 bg-amber-600 text-white rounded-sm shadow-lg transition-all duration-300 text-lg font-light group ${
                                        hoveredButton === 'main'
                                            ? 'bg-amber-700 shadow-amber-500/30'
                                            : 'hover:bg-amber-700 hover:shadow-amber-500/30'
                                    }`}
                                    onMouseEnter={() => setHoveredButton('main')}
                                    onMouseLeave={() => setHoveredButton(null)}
                                >
                                    <Phone className="mr-2 h-5 w-5" />
                                    <span>+387 65 678 634</span>
                                    <ArrowRight className={`ml-2 h-5 w-5 transition-transform duration-300 ${hoveredButton === 'main' ? 'translate-x-1' : ''}`} />
                                </a>
                            </div>
                        </div>

                        <div className={`grid md:grid-cols-3 gap-6 md:gap-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            {steps.map((step) => (
                                <div
                                    key={step.id}
                                    className={`p-6 md:p-8 border border-stone-300 bg-white rounded-lg shadow-sm transition-all duration-300 ${
                                        hoveredStep === step.id
                                            ? 'border-amber-500 shadow-md transform -translate-y-1'
                                            : 'hover:border-amber-400 hover:shadow hover:-translate-y-1'
                                    }`}
                                    onMouseEnter={() => setHoveredStep(step.id)}
                                    onMouseLeave={() => setHoveredStep(null)}
                                >
                                    <div className={`text-3xl font-light mb-4 transition-all duration-300 ${
                                        hoveredStep === step.id ? 'text-amber-600' : 'text-stone-400'
                                    }`}>{step.number}</div>
                                    <h3 className="text-xl font-medium mb-3 text-stone-800">{step.title}</h3>
                                    <p className="text-stone-600 font-light">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>

            <div className={`mt-20 md:mt-24 border-t border-stone-200 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <Container>
                    <div className="pt-10 md:pt-12 flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="mb-8 md:mb-0">
                            <h4 className="text-2xl font-light mb-3">Potrebne su vam dekorativne obloge?</h4>
                            <p className="text-stone-600 font-light">Posetite nas u Bijeljini ili nas kontaktirajte. Radno vreme: Pon-Sub, 09:00-18:00.</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href="/kontakt"
                                className={`px-6 py-3 bg-stone-800 text-white rounded-sm font-light hover:bg-stone-700 transition-all duration-300 inline-flex items-center justify-center group ${
                                    hoveredButton === 'contact'
                                        ? 'bg-stone-700 shadow-md'
                                        : ''
                                }`}
                                onMouseEnter={() => setHoveredButton('contact')}
                                onMouseLeave={() => setHoveredButton(null)}
                            >
                                <span>Kontaktirajte nas</span>
                                <ChevronRight className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                                    hoveredButton === 'contact' ? 'translate-x-1' : ''
                                }`} />
                            </a>
                            <a
                                href="/proizvodi"
                                className={`px-6 py-3 border border-stone-400 text-stone-800 rounded-sm font-light transition-all duration-300 inline-flex items-center justify-center group ${
                                    hoveredButton === 'products'
                                        ? 'bg-stone-100 border-amber-500'
                                        : 'hover:bg-stone-50 hover:border-stone-500'
                                }`}
                                onMouseEnter={() => setHoveredButton('products')}
                                onMouseLeave={() => setHoveredButton(null)}
                            >
                                <span>Pogledajte proizvode</span>
                                <ChevronRight className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                                    hoveredButton === 'products' ? 'translate-x-1' : ''
                                }`} />
                            </a>
                        </div>
                    </div>
                </Container>
            </div>
        </section>
    );
}