// src/pages/products/components/MaterialInfo.tsx
import { useState, useEffect } from "react";
import { Container } from "../../../components/ui/Container";

export function MaterialInfo() {
    const [activeMaterial, setActiveMaterial] = useState<number | null>(1);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setIsVisible(true);
            }
        }, { threshold: 0.1 });

        const section = document.getElementById('material-info-section');
        if (section) {
            observer.observe(section);
        }

        return () => {
            if (section) {
                observer.unobserve(section);
            }
        };
    }, []);

    // Materials data
    const materials = [
        {
            id: 1,
            name: 'Prirodni kamen',
            description: 'Naš prirodni kamen se pažljivo bira iz najboljih kamenoloma širom sveta. Svaki komad nosi jedinstvene šare i boje koje samo priroda može stvoriti.',
            features: [
                'Dugovečnost i izdržljivost',
                'Otpornost na mraz i vremenske uslove',
                'Prirodna lepota i jedinstvene šare',
                'Ekološki prihvatljiv materijal'
            ],
            image: '/images/natural-stone.jpg'
        },
        {
            id: 2,
            name: 'Travertin',
            description: 'Travertin je sedimentna stena sa karakterističnim rupicama koje stvaraju jedinstvenu teksturu. Naš travertin je dostupan u raznim bojama od krem i bež do braon i sive.',
            features: [
                'Klasičan i bezvremenski izgled',
                'Odlična toplotna izolacija',
                'Dostupan u raznim završnim obradama',
                'Idealan za unutrašnje i spoljašnje površine'
            ],
            image: '/images/travertine.jpg'
        },
        {
            id: 3,
            name: 'Mermer',
            description: 'Mermer je sinonim za luksuz i eleganciju. Naša kolekcija mermera obuhvata razne vrste sa prepoznatljivim venama i kristalnom strukturom.',
            features: [
                'Vrhunski luksuzni izgled',
                'Reflektuje svetlost i stvara osećaj prostora',
                'Dostupan u širokom spektru boja',
                'Idealan za unutrašnje površine i dekorativne elemente'
            ],
            image: '/images/marble.jpg'
        },
        {
            id: 4,
            name: 'Granit',
            description: 'Granit je jedan od najtvrđih prirodnih kamena, savršen za površine koje zahtevaju veliku otpornost na habanje. Dostupan u raznim bojama i završnim obradama.',
            features: [
                'Izuzetna čvrstoća i otpornost na grebanje',
                'Otpornost na toplotu i hemikalije',
                'Minimalno održavanje',
                'Idealan za podove, radne površine i spoljašnje površine'
            ],
            image: '/images/granite.jpg'
        }
    ];

    return (
        <section id="material-info-section" className="py-16 md:py-24 bg-stone-100">
            <Container>
                <div className={`mb-12 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Vrste kamena</h2>
                    <p className="text-lg text-stone-600 max-w-3xl mx-auto">
                        Istražite različite vrste kamena koje koristimo za naše proizvode
                    </p>
                </div>

                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 md:pr-8 mb-8 md:mb-0">
                        <div className={`space-y-2 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                            {materials.map((material) => (
                                <button
                                    key={material.id}
                                    onClick={() => setActiveMaterial(material.id)}
                                    className={`block w-full text-left px-6 py-4 rounded-lg transition-all duration-300 ${
                                        activeMaterial === material.id
                                            ? 'bg-amber-600 text-white shadow-md'
                                            : 'bg-white hover:bg-amber-50 text-stone-800'
                                    }`}
                                >
                                    <span className="font-medium">{material.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="md:w-2/3 bg-white rounded-lg shadow-md overflow-hidden">
                        {materials.map((material) => (
                            <div
                                key={material.id}
                                className={`transition-all duration-500 ${
                                    activeMaterial === material.id ? 'opacity-100 block' : 'opacity-0 hidden'
                                }`}
                            >
                                <div className="flex flex-col md:flex-row">
                                    <div className="md:w-1/2">
                                        <img
                                            src={material.image}
                                            alt={material.name}
                                            className="w-full h-64 md:h-full object-cover"
                                        />
                                    </div>
                                    <div className="md:w-1/2 p-6">
                                        <h3 className="text-2xl font-semibold mb-3">{material.name}</h3>
                                        <p className="text-stone-600 mb-4">{material.description}</p>
                                        <h4 className="font-medium text-lg mb-2">Karakteristike:</h4>
                                        <ul className="space-y-2">
                                            {material.features.map((feature, index) => (
                                                <li key={index} className="flex items-start">
                                                    <svg
                                                        className="h-5 w-5 text-amber-600 mr-2 mt-0.5"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}