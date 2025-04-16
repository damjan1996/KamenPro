// src/components/about/components/ProductionCapabilities.tsx
import { useState, useEffect, useRef } from 'react';
import { Container } from '../../../components/ui/Container';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';

interface Capability {
    title: string;
    description: string;
    icon: string;
}

export function ProductionCapabilities() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);

    const capabilities: Capability[] = [
        {
            title: "Ručna izrada",
            description: "Svaki proizvod je rezultat pažljivog ručnog rada, što garantuje jedinstven izgled i kvalitet",
            icon: "handmade"
        },
        {
            title: "Kvalitetni materijali",
            description: "Koristimo beli cement sa aditivima i sredstvima za očvršćivanje najvišeg kvaliteta",
            icon: "materials"
        },
        {
            title: "Raznovrsne teksture",
            description: "Nudimo različite vrste tekstura i dezena za dekorativne kamene i ciglene obloge",
            icon: "texture"
        },
        {
            title: "Otpornost na spoljne uticaje",
            description: "Naši proizvodi su otporni na sve vremenske uslove - kišu, sneg, mraz, vatru i vlagu",
            icon: "durability"
        },
        {
            title: "Proizvodni kapacitet",
            description: "Kapacitet za proizvodnju dekorativnih kamenih i ciglenih obloga za različite potrebe",
            icon: "capacity"
        }
    ];

    const categories = [
        "Proizvodnja", "Materijali", "Teksture", "Kvalitet", "Ugradnja"
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

        // Auto rotate tabs every 4 seconds
        const interval = setInterval(() => {
            setActiveTab(prev => (prev + 1) % categories.length);
        }, 4000);

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
            clearInterval(interval);
        };
    }, [categories.length]);

    return (
        <section ref={sectionRef} className="py-16 md:py-24 bg-white overflow-hidden font-sans">
            <Container>
                <div className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-700 transform ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-4 tracking-wide">
                        <span className="text-stone-400">Proizvodni</span> <span className="font-medium">procesi</span>
                    </h2>
                    <div className="w-16 h-1 bg-amber-500 mx-auto mb-6"></div>
                    <p className="text-stone-600 font-light mb-8">
                        Istražite naše proizvodne mogućnosti i procese koji osiguravaju kvalitet svakog proizvoda
                        koji izlazi iz naše radionice.
                    </p>
                </div>

                {/* Category Tabs */}
                <div className={`flex flex-nowrap overflow-x-auto py-4 mb-12 scrollbar-hide transition-all duration-700 delay-200 transform ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    <div className="flex space-x-4 mx-auto">
                        {categories.map((category, index) => (
                            <button
                                key={index}
                                className={`flex-shrink-0 px-6 py-3 rounded-sm font-light transition-all duration-300 transform ${
                                    activeTab === index
                                        ? 'bg-amber-500 text-white shadow-md'
                                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                                }`}
                                onClick={() => setActiveTab(index)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Left Content - Image */}
                    <div className={`lg:col-span-7 transition-all duration-700 delay-300 transform ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                    }`}>
                        <div className="relative rounded-lg overflow-hidden shadow-md">
                            {/* Main Image */}
                            <img
                                src="/images/about/radionica%20iii.jpg"
                                alt="KamenPro radionica"
                                className="w-full h-full object-cover aspect-video"
                            />

                            {/* Overlay with badge */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                            <div className="absolute bottom-4 left-4 text-white">
                                <h3 className="text-2xl font-medium">KamenPro radionica</h3>
                                <p className="text-sm text-white/80 font-light">Bijeljina, Republika Srpska</p>
                            </div>

                            {/* Navigation arrows */}
                            <div className="absolute bottom-4 right-4 flex space-x-2">
                                <button
                                    className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all duration-300"
                                    onClick={() => setActiveTab(prev => (prev > 0 ? prev - 1 : categories.length - 1))}
                                    aria-label="Prethodna kategorija"
                                >
                                    <ArrowLeft size={18} />
                                </button>
                                <button
                                    className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all duration-300"
                                    onClick={() => setActiveTab(prev => (prev + 1) % categories.length)}
                                    aria-label="Sledeća kategorija"
                                >
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Information */}
                    <div className={`lg:col-span-5 transition-all duration-700 delay-400 transform ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                    }`}>
                        <div className="bg-stone-50 p-6 md:p-8 rounded-lg shadow-sm border border-stone-100">
                            <h3 className="text-2xl font-medium text-stone-800 mb-6">Proizvodni kapaciteti</h3>

                            <div className="space-y-6">
                                {capabilities.map((capability, index) => (
                                    <div
                                        key={index}
                                        className={`transition-all duration-300 ${
                                            index < 3 ? 'opacity-100' : 'opacity-80 hover:opacity-100'
                                        }`}
                                    >
                                        <div className="flex items-start">
                                            <div className="mr-4 bg-amber-100 text-amber-600 p-2 rounded-full">
                                                <Check size={18} />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-stone-800">{capability.title}</h4>
                                                <p className="text-stone-600 text-sm mt-1 font-light">{capability.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-stone-200">
                                <a
                                    href="/proizvodi"
                                    className="inline-flex items-center w-full bg-amber-500 text-white py-3 px-6 rounded-sm hover:bg-amber-600 hover:shadow-md transition-all duration-300 justify-center font-light"
                                >
                                    <span>Pogledajte naše proizvode</span>
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </a>
                            </div>
                        </div>

                        {/* Mobile indicators */}
                        <div className="flex justify-center mt-6 lg:hidden">
                            {categories.map((_, index) => (
                                <button
                                    key={index}
                                    className={`w-2 h-2 rounded-full mx-1 transition-all duration-300 ${
                                        activeTab === index ? 'bg-amber-500 w-4' : 'bg-stone-300'
                                    }`}
                                    onClick={() => setActiveTab(index)}
                                    aria-label={`Prikaži kategoriju ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Additional cards section */}
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 transition-all duration-700 delay-500 transform ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    {[
                        {
                            title: 'Dekorativni kamen',
                            description: 'Standardne dimenzije 44cm x 8.5cm, debljine 15-20mm',
                            price: '33-40 BAM/m²'
                        },
                        {
                            title: 'Rustik cigla',
                            description: 'Standardne dimenzije 50cm x 20cm, debljine 5mm',
                            price: '25-30 BAM/m²'
                        },
                        {
                            title: 'Ugaoni elementi',
                            description: 'Za savršeno završavanje spoljnih uglova',
                            price: 'Po dogovoru'
                        },
                        {
                            title: 'Posebne porudžbine',
                            description: 'Proizvodi po meri sa izborom boja i tekstura',
                            price: 'Po dogovoru'
                        }
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-stone-100 group cursor-pointer"
                        >
                            <div className="flex justify-between items-start">
                                <h4 className="font-medium text-stone-800">{item.title}</h4>
                                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-amber-100 text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                                    <ArrowRight className="h-4 w-4" />
                                </div>
                            </div>
                            <div className="mt-2 text-sm text-stone-600 font-light">
                                {item.description}
                            </div>
                            <div className="mt-4 text-sm font-medium text-amber-600">
                                {item.price}
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA box */}
                <div className={`mt-16 p-8 bg-stone-50 border border-stone-100 rounded-lg text-center max-w-3xl mx-auto transition-all duration-700 delay-600 transform ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    <h3 className="text-2xl font-medium text-stone-800 mb-4">Zainteresovani ste za naše proizvode?</h3>
                    <p className="text-stone-600 mb-6 font-light">
                        Kontaktirajte nas za više informacija o našim proizvodima i procesima, mogućnostima ugradnje
                        ili za besplatnu konsultaciju.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/proizvodi"
                            className="bg-stone-800 text-white px-6 py-3 rounded-sm hover:bg-stone-700 transition-all duration-300 font-light"
                        >
                            Pogledajte proizvode
                        </a>
                        <a
                            href="/kontakt"
                            className="bg-amber-500 text-white px-6 py-3 rounded-sm hover:bg-amber-600 transition-all duration-300 font-light"
                        >
                            Kontaktirajte nas
                        </a>
                    </div>
                </div>
            </Container>
        </section>
    );
}