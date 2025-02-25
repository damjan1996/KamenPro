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

    const capabilities = [
        {
            title: "CNC mašine",
            description: "Najsavremenije CNC mašine za precizno sečenje i oblikovanje kamenih obloga",
            icon: "cnc"
        },
        {
            title: "Linija za poliranje",
            description: "Automatizovana linija za poliranje koja osigurava savršenu završnu obradu",
            icon: "polish"
        },
        {
            title: "Teksture i obrade",
            description: "Specijalizovani alati za različite teksture i završne obrade po meri",
            icon: "texture"
        },
        {
            title: "Laboratorija",
            description: "Laboratorija za testiranje kvaliteta i izdržljivosti svih materijala",
            icon: "lab"
        },
        {
            title: "Proizvodni kapacitet",
            description: "Kapacitet proizvodnje od 5000m² mesečno za sve vrste projekata",
            icon: "capacity"
        }
    ];

    const categories = [
        "Proizvodni pogon", "Tehnologija", "Materijali", "Obrada", "Kvalitet"
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

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        // Auto rotate tabs every 4 seconds
        const interval = setInterval(() => {
            setActiveTab(prev => (prev + 1) % categories.length);
        }, 4000);

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
            clearInterval(interval);
        };
    }, [categories.length]);

    return (
        <section ref={sectionRef} className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
            <Container>
                <div className={`text-center max-w-2xl mx-auto mb-12 transition-all duration-700 transform ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        FIND YOUR <span className="block">DREAM PRODUCTION</span>
                    </h2>
                    <p className="text-gray-600">
                        Istražite svetsku klasu proizvodnih kapaciteta prema vašim zahtevima i izboru
                    </p>
                </div>

                {/* Category Tabs - Colorful Gradient Buttons */}
                <div className={`flex flex-nowrap overflow-x-auto py-4 mb-12 scrollbar-hide transition-all duration-700 delay-200 transform ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    <div className="flex space-x-4 mx-auto">
                        {categories.map((category, index) => (
                            <button
                                key={index}
                                className={`flex-shrink-0 px-6 py-4 rounded-full text-white font-medium transition-all duration-300 transform ${
                                    activeTab === index
                                        ? 'scale-105 shadow-lg'
                                        : 'opacity-80 hover:opacity-100 hover:scale-105'
                                }`}
                                style={{
                                    background: getGradient(index),
                                }}
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
                        <div className="relative rounded-2xl overflow-hidden shadow-xl">
                            {/* Main Image */}
                            <img
                                src="/images/production-facility.jpg"
                                alt="Proizvodni pogon"
                                className="w-full h-full object-cover aspect-video"
                            />

                            {/* Overlay with discount badge - inspired by reference image */}
                            <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold transform rotate-3 shadow-lg">
                                <div className="text-sm">KAPACITET</div>
                                <div className="text-xl">5000m²</div>
                                <div className="text-sm">MESEČNO</div>
                            </div>

                            {/* Navigation arrows */}
                            <div className="absolute bottom-4 right-4 flex space-x-2">
                                <button
                                    className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors duration-300"
                                    onClick={() => setActiveTab(prev => (prev > 0 ? prev - 1 : categories.length - 1))}
                                >
                                    <ArrowLeft size={18} />
                                </button>
                                <button
                                    className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors duration-300"
                                    onClick={() => setActiveTab(prev => (prev + 1) % categories.length)}
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
                        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
                            <h3 className="text-2xl font-bold mb-6">Proizvodni kapaciteti</h3>

                            <div className="space-y-6">
                                {capabilities.map((capability, index) => (
                                    <div
                                        key={index}
                                        className={`transition-all duration-500 transform ${
                                            index < 3 ? 'opacity-100 translate-y-0' : 'opacity-60 hover:opacity-100'
                                        }`}
                                    >
                                        <div className="flex items-start">
                                            <div className="mr-4 bg-green-100 text-green-600 p-2 rounded-lg">
                                                <Check size={18} />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-800">{capability.title}</h4>
                                                <p className="text-gray-600 text-sm mt-1">{capability.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <a
                                    href="/o-nama/proizvodni-pogon"
                                    className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-6 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                                >
                                    <span>Saznajte više o našoj proizvodnji</span>
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
                                        activeTab === index ? 'bg-blue-500 w-6' : 'bg-gray-300'
                                    }`}
                                    onClick={() => setActiveTab(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Additional cards section */}
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 transition-all duration-700 delay-500 transform ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    {['Savremena tehnologija', 'Kvalitetni materijali', 'Precizna obrada', 'Kontrola kvaliteta'].map((item, index) => (
                        <div
                            key={index}
                            className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer"
                        >
                            <div className="flex justify-between items-start">
                                <h4 className="font-medium">{item}</h4>
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-blue-500"
                                    style={{ background: getLightGradient(index) }}
                                >
                                    <ArrowRight className="h-4 w-4 text-white" />
                                </div>
                            </div>
                            <div className="mt-2 text-sm text-gray-500">
                                Istražite naše mogućnosti
                            </div>
                            <div className="mt-4 text-xs text-gray-400">
                                {index * 250 + 1000}m² mesečno
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}

// Helper functions for gradients
function getGradient(index: number): string {
    const gradients = [
        'linear-gradient(45deg, #FF9966, #FF5E62)',
        'linear-gradient(45deg, #4158D0, #C850C0)',
        'linear-gradient(45deg, #0093E9, #80D0C7)',
        'linear-gradient(45deg, #00C853, #B2FF59)',
        'linear-gradient(45deg, #FF8A00, #FF5252)'
    ];

    return gradients[index % gradients.length];
}

function getLightGradient(index: number): string {
    const gradients = [
        'linear-gradient(45deg, #FFB299, #FF8C8E)',
        'linear-gradient(45deg, #748AF0, #E890E8)',
        'linear-gradient(45deg, #40B3FF, #A0E0D7)',
        'linear-gradient(45deg, #40E883, #D2FF89)'
    ];

    return gradients[index % gradients.length];
}