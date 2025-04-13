// src/components/home/components/BenefitsSection.tsx
import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "../../../components/ui/Container";

interface StoneStyle {
    id: number;
    title: string;
    description: string;
    image: string;
    category: string;
}

interface Benefit {
    id: number;
    title: string;
    description: string;
}

// Stilovi kamenih obloga
const stoneStyles: StoneStyle[] = [
    {
        id: 1,
        title: 'Rustični stil',
        description: 'Prirodne teksture i tople boje koje stvaraju osećaj tradicionalnog ambijenta sa izraženim karakterom.',
        image: '/images/rustic-style.jpg',
        category: 'rustican-stil'
    },
    {
        id: 2,
        title: 'Moderan stil',
        description: 'Čiste linije i minimalistički pristup koji naglašava eleganciju i sofisticiranost savremenog prostora.',
        image: '/images/modern-style.jpg',
        category: 'moderan-stil'
    },
    {
        id: 3,
        title: 'Industrijski stil',
        description: 'Sirove teksture i urbani izgled koji donosi autentičnost i karakter industrijskog nasleđa u vaš dom.',
        image: '/images/industrial-style.jpg',
        category: 'industrijski-stil'
    },
    {
        id: 4,
        title: 'Mediteranski stil',
        description: 'Svetle boje i prirodni tonovi koji evociraju toplinu i opuštenost mediteranskog načina života.',
        image: '/images/mediterranean-style.jpg',
        category: 'mediteranski-stil'
    }
];

// Prednosti
const benefits: Benefit[] = [
    {
        id: 1,
        title: 'Premium kvalitet',
        description: 'Svi naši proizvodi izrađeni su od visokokvalitetnih materijala koji garantuju dugotrajnost i lepotu.'
    },
    {
        id: 2,
        title: 'Jednostavna instalacija',
        description: 'Naše zidne obloge dizajnirane su za brzu i jednostavnu instalaciju, uz minimalnu pripremu površine.'
    },
    {
        id: 3,
        title: 'Otpornost i trajnost',
        description: 'Kamene obloge koje nudimo otporne su na vlagu, grebanje i habanje, što ih čini idealnim za sve prostore.'
    },
    {
        id: 4,
        title: 'Stručna podrška',
        description: 'Naš tim pružiće vam podršku od idejnog rešenja do finalne instalacije, za savršen rezultat.'
    }
];

export function BenefitsSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredStyle, setHoveredStyle] = useState<number | null>(null);
    const [hoveredBenefit, setHoveredBenefit] = useState<number | null>(null);
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
            { threshold: 0.1 }
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

    return (
        <section
            ref={sectionRef}
            className="py-20 md:py-28 bg-white font-sans overflow-hidden"
        >
            <Container>
                {/* Signature Style Section */}
                <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="max-w-4xl mx-auto mb-12 md:mb-16 text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-light mb-4 tracking-wide text-stone-900">
                            Otkrijte svoj<br />
                            <span className="font-medium">signature stil</span>
                        </h2>
                        <div className="w-16 h-1 bg-amber-500 mx-auto md:mx-0 mb-6"></div>
                        <p className="mb-8 text-stone-600 max-w-lg mx-auto md:mx-0 font-light">
                            Kod KamenPro-a, verujemo da svaki prostor treba da odražava vašu ličnost i ukus. Istražite različite stilove kamenih obloga koje možemo ponuditi.
                        </p>
                    </div>
                </div>

                {/* Stone Styles Grid */}
                <div className={`grid md:grid-cols-2 gap-6 lg:gap-8 mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                     style={{ transitionDelay: '300ms' }}>
                    {stoneStyles.map((style, index) => (
                        <div
                            key={style.id}
                            className={`group relative overflow-hidden rounded-lg transition-all duration-300 shadow-sm hover:shadow-lg ${index % 2 === 1 ? 'md:mt-12' : ''}`}
                            onMouseEnter={() => setHoveredStyle(style.id)}
                            onMouseLeave={() => setHoveredStyle(null)}
                        >
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <img
                                    src={style.image}
                                    alt={style.title}
                                    className={`w-full h-full object-cover transition-transform duration-700 ${hoveredStyle === style.id ? 'scale-105' : ''}`}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 to-stone-900/0"></div>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                <h3 className="text-2xl font-medium mb-2">{style.title}</h3>
                                <p className={`text-stone-200 mb-4 transition-all duration-300 ${
                                    hoveredStyle === style.id ? 'opacity-100 max-h-24' : 'opacity-0 max-h-0 overflow-hidden'
                                }`}>
                                    {style.description}
                                </p>
                                <a
                                    href={`/stilovi/${style.category}`}
                                    className="inline-flex items-center text-white font-light hover:underline group"
                                >
                                    Istražite stil
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Why Choose Us Section */}
                <div className={`my-20 md:my-28 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                     style={{ transitionDelay: '500ms' }}>
                    <div className="max-w-4xl mx-auto text-center md:text-left mb-12">
                        <h2 className="text-3xl md:text-4xl font-light mb-4 tracking-wide text-stone-900">
                            Zašto izabrati<br />
                            <span className="font-medium">KamenPro</span>
                        </h2>
                        <div className="w-16 h-1 bg-amber-500 mx-auto md:mx-0 mb-6"></div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {benefits.map((benefit, index) => (
                            <div
                                key={benefit.id}
                                className={`p-6 bg-white border border-stone-100 rounded-lg shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${700 + index * 100}ms` }}
                                onMouseEnter={() => setHoveredBenefit(benefit.id)}
                                onMouseLeave={() => setHoveredBenefit(null)}
                            >
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 transition-all duration-300 ${
                                    hoveredBenefit === benefit.id
                                        ? 'bg-amber-500 text-white'
                                        : 'bg-stone-100 text-stone-600'
                                }`}>
                                    <span className="text-xl font-light">{benefit.id}</span>
                                </div>
                                <h3 className="text-xl font-medium mb-3 text-stone-800">{benefit.title}</h3>
                                <p className="text-stone-600 font-light">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div
                    className={`bg-stone-100 p-8 md:p-10 rounded-lg mt-16 transition-all duration-1000 shadow-sm hover:shadow-md ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: '1000ms' }}
                >
                    <div className="md:flex items-center justify-between">
                        <div className="max-w-2xl mb-6 md:mb-0">
                            <h3 className="text-2xl md:text-3xl font-light mb-4 text-stone-800">
                                Stvorite svoj <span className="font-medium">idealni prostor</span> uz naše stručnjake
                            </h3>
                            <p className="text-stone-600 font-light">Zakažite besplatnu konsultaciju danas i započnite putovanje ka svom savršenom enterijeru.</p>
                        </div>
                        <a
                            href="/kontakt"
                            className="inline-flex items-center px-6 py-3 bg-amber-500 text-stone-900 rounded-sm hover:bg-amber-400 transition-all duration-300 group font-light"
                        >
                            <span>Besplatna konsultacija</span>
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </Container>
        </section>
    );
}