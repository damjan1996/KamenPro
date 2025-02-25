// src/components/home/components/BenefitsSection.tsx
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "../../../components/ui/Container";

// Stilovi kamenih obloga
const stoneStyles = [
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
const benefits = [
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

    useEffect(() => {
        const handleScroll = () => {
            const element = document.getElementById('benefits-section');
            if (element) {
                const position = element.getBoundingClientRect();
                if (position.top < window.innerHeight * 0.75) {
                    setIsVisible(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <section id="benefits-section" className="py-20 md:py-32 bg-white">
            <Container>
                <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="max-w-4xl mx-auto mb-16">
                        <h2 className="text-4xl md:text-5xl font-light mb-6">
                            Otkrijte svoj<br />
                            <span className="font-semibold">signature stil</span>
                        </h2>

                        <p className="mb-8 text-gray-600 max-w-lg">
                            Kod KamenPro-a, verujemo da svaki prostor treba da odražava vašu ličnost i ukus. Istražite različite stilove kamenih obloga koje možemo ponuditi.
                        </p>
                    </div>
                </div>

                <div className={`grid md:grid-cols-2 gap-6 lg:gap-8 mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    {stoneStyles.map((style, index) => (
                        <div
                            key={style.id}
                            className={`group relative overflow-hidden rounded-lg transition-all hover:shadow-lg ${index % 2 === 1 ? 'md:mt-12' : ''}`}
                        >
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <img
                                    src={style.image}
                                    alt={style.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0"></div>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                <h3 className="text-2xl font-medium mb-2">{style.title}</h3>
                                <p className="text-gray-200 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{style.description}</p>
                                <a
                                    href={`/stilovi/${style.category}`}
                                    className="inline-flex items-center text-white hover:underline group-hover:underline"
                                >
                                    Istražite stil
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={`my-32 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-light mb-16">
                            Zašto izabrati<br />
                            <span className="font-semibold">KamenPro</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit, index) => (
                            <div
                                key={benefit.id}
                                className={`p-6 border border-gray-100 rounded-lg transition-all hover:shadow-lg delay-${index * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${700 + index * 100}ms` }}
                            >
                                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                                    <span className="text-2xl font-light">{benefit.id}</span>
                                </div>
                                <h3 className="text-xl font-medium mb-3">{benefit.title}</h3>
                                <p className="text-gray-600">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={`bg-gray-100 p-8 md:p-12 rounded-lg mt-20 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="md:flex items-center justify-between">
                        <div className="max-w-2xl mb-6 md:mb-0">
                            <h3 className="text-2xl md:text-3xl font-medium mb-4">Stvorite svoj idealni prostor uz naše stručnjake</h3>
                            <p className="text-gray-600">Zakažite besplatnu konsultaciju danas i započnite putovanje ka svom savršenom enterijeru.</p>
                        </div>
                        <a
                            href="/kontakt"
                            className="inline-flex items-center px-6 py-3 bg-black text-white rounded hover:bg-opacity-90 transition-all"
                        >
                            Besplatna konsultacija
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </a>
                    </div>
                </div>
            </Container>
        </section>
    );
}