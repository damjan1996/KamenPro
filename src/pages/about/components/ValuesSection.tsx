// src/components/about/components/ValuesSection.tsx
import { useState, useEffect, useRef } from 'react';
import { Container } from '../../../components/ui/Container';
import { Shield, Check, Zap, Users } from 'lucide-react';

interface Value {
    icon: React.ElementType;
    title: string;
    description: string;
    color: string;
}

export function ValuesSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeValue, setActiveValue] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);

    const values: Value[] = [
        {
            icon: Shield,
            title: 'Kvalitet bez kompromisa',
            description: 'Koristimo samo proverene materijale najvišeg kvaliteta i posvećujemo posebnu pažnju svakom detalju proizvodnog procesa.',
            color: '#CA8A04' // amber-600
        },
        {
            icon: Check,
            title: 'Poštovanje dogovora',
            description: 'Trudimo se da ispunimo svaki dogovor sa našim klijentima, od rokova isporuke do kvaliteta finalnog proizvoda.',
            color: '#CA8A04' // amber-600
        },
        {
            icon: Zap,
            title: 'Fleksibilnost i prilagodljivost',
            description: 'Spremni smo da se prilagodimo specifičnim zahtevima svakog projekta i pronađemo optimalna rešenja.',
            color: '#CA8A04' // amber-600
        },
        {
            icon: Users,
            title: 'Podrška klijentima',
            description: 'Uvek smo dostupni za savete i tehničku podršku pre, tokom i nakon kupovine.',
            color: '#CA8A04' // amber-600
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        const currentRef = sectionRef.current;

        if (currentRef) {
            observer.observe(currentRef);
        }

        // Automatsko rotiranje aktivne vrednosti svakih 3 sekunde
        const interval = setInterval(() => {
            setActiveValue((prev) => (prev + 1) % values.length);
        }, 3000);

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
            clearInterval(interval);
        };
    }, [values.length]);

    return (
        <section ref={sectionRef} className="py-16 md:py-24 bg-stone-50 font-sans">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    {/* Leva kolona - Naslov i opis */}
                    <div className={`transition-all duration-700 transform ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}>
                        <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-6 tracking-wide">
                            KAMENPRO
                            <span className="block mt-2 text-lg uppercase tracking-wider text-stone-500 font-light">NAŠE VREDNOSTI</span>
                        </h2>

                        <div className="h-1 w-16 bg-amber-500 mb-8"></div>

                        <p className="text-stone-600 mb-8 text-base leading-relaxed font-light">
                            Principi koji vode svaku našu odluku i oblikuju našu kompanijsku kulturu. Verujemo da
                            kvalitet, poštovanje dogovora, fleksibilnost i podrška klijentima čine temelj
                            našeg uspešnog poslovanja i odnosa sa klijentima.
                        </p>

                        {/* Navigacija za vrednosti - vidljiva samo na mobilnim uređajima */}
                        <div className="flex space-x-2 mb-8 lg:hidden">
                            {values.map((_, index) => (
                                <button
                                    key={index}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                        index === activeValue ? 'bg-amber-500 w-8' : 'bg-stone-300'
                                    }`}
                                    onClick={() => setActiveValue(index)}
                                    aria-label={`Prikaži vrednost ${index + 1}`}
                                />
                            ))}
                        </div>

                        {/* Slika koja prikazuje vrednosti u akciji */}
                        <div className="hidden lg:block relative overflow-hidden rounded-lg mt-12 shadow-md">
                            <img
                                src="https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Page/About/Values/proizvodni%20proces.jpg"
                                alt="KamenPro proizvodni proces"
                                className="w-full h-72 object-cover hover:scale-105 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <p className="text-white font-light">Naše vrednosti u praksi: kvalitet i posvećenost u svakom detalju</p>
                            </div>
                        </div>
                    </div>

                    {/* Desna kolona - Vrednosti */}
                    <div className={`transition-all duration-700 delay-300 transform ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}>
                        {/* Na desktop prikazujemo sve vrednosti u grid layout-u */}
                        <div className="hidden lg:grid grid-cols-2 gap-6">
                            {values.map((value, index) => (
                                <div
                                    key={index}
                                    className={`p-6 bg-white border border-stone-100 hover:shadow-md transition-all duration-300 rounded-lg group ${
                                        activeValue === index ? 'border-amber-200 shadow-sm' : ''
                                    }`}
                                    onMouseEnter={() => setActiveValue(index)}
                                >
                                    <div className="mb-4 flex justify-between items-start">
                                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-100 text-amber-600">
                                            <value.icon
                                                className="w-5 h-5 transition-all duration-300 group-hover:scale-110"
                                            />
                                        </div>
                                        <span className="text-sm text-stone-400 font-light">0{index + 1}</span>
                                    </div>
                                    <h3 className="text-lg font-medium text-stone-800 mb-3">{value.title}</h3>
                                    <p className="text-stone-600 font-light">{value.description}</p>
                                </div>
                            ))}
                        </div>

                        {/* Na mobilnim uređajima prikazujemo samo aktivnu vrednost */}
                        <div className="lg:hidden relative min-h-[200px]">
                            {values.map((value, index) => (
                                <div
                                    key={index}
                                    className={`p-6 bg-white border border-stone-100 rounded-lg shadow-sm transition-all duration-500 ${
                                        index === activeValue ? 'block' : 'hidden'
                                    }`}
                                >
                                    <div className="mb-4 flex justify-between items-start">
                                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-100 text-amber-600">
                                            <value.icon className="w-5 h-5" />
                                        </div>
                                        <span className="text-sm text-stone-400 font-light">0{index + 1}</span>
                                    </div>
                                    <h3 className="text-lg font-medium text-stone-800 mb-3">{value.title}</h3>
                                    <p className="text-stone-600 font-light">{value.description}</p>
                                </div>
                            ))}
                        </div>

                        {/* Projekti preporuke */}
                        <div className="mt-12 pt-8 border-t border-stone-200">
                            <h3 className="text-xl md:text-2xl font-medium mb-6 text-stone-800">Naši projekti</h3>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="group">
                                    <div className="bg-stone-100 aspect-square rounded-lg overflow-hidden mb-2 shadow-sm transition-all duration-300 group-hover:shadow-md">
                                        <img
                                            src="https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Page/About/Values/stambeni%20prostor.jpg"
                                            alt="Stambeni objekat"
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div>
                                        <div className="text-xs text-amber-600 uppercase font-medium">STAMBENI OBJEKTI</div>
                                        <div className="text-sm text-stone-700">Enterijer i eksterijer</div>
                                    </div>
                                </div>

                                <div className="group">
                                    <div className="bg-stone-100 aspect-square rounded-lg overflow-hidden mb-2 shadow-sm transition-all duration-300 group-hover:shadow-md">
                                        <img
                                            src="https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Page/About/Values/radni%20prostor.jpg"
                                            alt="Poslovni prostor"
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div>
                                        <div className="text-xs text-amber-600 uppercase font-medium">POSLOVNI OBJEKTI</div>
                                        <div className="text-sm text-stone-700">Reprezentativni prostori</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 text-center">
                                <a
                                    href="/reference"
                                    className="inline-flex items-center px-6 py-3 bg-stone-800 text-white rounded-sm hover:bg-stone-700 transition-all duration-300 shadow-sm"
                                >
                                    <span className="mr-2 font-light">Pogledajte sve projekte</span>
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14M12 5l7 7-7 7"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}