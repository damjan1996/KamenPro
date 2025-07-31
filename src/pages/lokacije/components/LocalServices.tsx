// src/pages/lokacije/components/LocalServices.tsx
import { useState, useEffect, useRef } from "react";
import { Container } from "../../../components/ui/Container";
import { Check, Truck, Clock, Phone, Wrench, Star } from "lucide-react";

interface LocalServicesProps {
    city: string;
    services: string[];
    specialties: string[];
    deliveryRadius: string;
    responseTime: string;
}

export function LocalServices({
    city,
    services,
    specialties,
    deliveryRadius,
    responseTime
}: LocalServicesProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [activeService, setActiveService] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);

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

        // Auto rotate active service
        const interval = setInterval(() => {
            setActiveService(prev => (prev + 1) % services.length);
        }, 3000);

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
            clearInterval(interval);
        };
    }, [services.length]);

    const serviceIcons = [
        <Wrench className="h-6 w-6" />,
        <Truck className="h-6 w-6" />,
        <Phone className="h-6 w-6" />,
        <Check className="h-6 w-6" />,
        <Star className="h-6 w-6" />
    ];

    return (
        <section id="local-services" ref={sectionRef} className="py-16 md:py-24 bg-white font-sans">
            <Container>
                <div className={`text-center mb-12 transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-4 tracking-wide">
                        Usluge u <span className="font-medium text-amber-600">{city}</span>
                    </h2>
                    <div className="w-16 h-1 bg-amber-500 mx-auto mb-6"></div>
                    <p className="text-stone-600 max-w-2xl mx-auto font-light">
                        Kompletne usluge montaže i dostave kamenih obloga za {city} i okolinu
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Services list */}
                    <div className={`lg:col-span-7 transition-all duration-700 delay-200 ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                    }`}>
                        <h3 className="text-xl font-medium text-stone-800 mb-6">Naše usluge</h3>
                        
                        <div className="space-y-4">
                            {services.map((service, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center p-4 rounded-lg transition-all duration-300 ${
                                        activeService === index
                                            ? 'bg-amber-50 border-l-4 border-amber-500 shadow-sm'
                                            : 'bg-stone-50 hover:bg-stone-100'
                                    }`}
                                    onMouseEnter={() => setActiveService(index)}
                                >
                                    <div className={`p-2 rounded-full mr-4 ${
                                        activeService === index
                                            ? 'bg-amber-500 text-white'
                                            : 'bg-stone-200 text-stone-600'
                                    }`}>
                                        {serviceIcons[index] || <Check className="h-6 w-6" />}
                                    </div>
                                    <span className={`font-medium ${
                                        activeService === index ? 'text-amber-700' : 'text-stone-700'
                                    }`}>
                                        {service}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Quick stats */}
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <div className="bg-stone-50 p-4 rounded-lg text-center">
                                <Truck className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                                <div className="font-medium text-stone-800">Dostava</div>
                                <div className="text-sm text-stone-600">{deliveryRadius}</div>
                            </div>
                            <div className="bg-stone-50 p-4 rounded-lg text-center">
                                <Clock className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                                <div className="font-medium text-stone-800">Odziv</div>
                                <div className="text-sm text-stone-600">{responseTime}</div>
                            </div>
                        </div>
                    </div>

                    {/* Specialties and CTA */}
                    <div className={`lg:col-span-5 transition-all duration-700 delay-400 ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                    }`}>
                        <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
                            <h3 className="text-xl font-medium text-amber-800 mb-4">
                                Prednosti za {city}
                            </h3>
                            
                            <ul className="space-y-3 mb-6">
                                {specialties.map((specialty, index) => (
                                    <li key={index} className="flex items-start">
                                        <Check className="h-5 w-5 text-amber-600 mr-3 flex-shrink-0 mt-0.5" />
                                        <span className="text-amber-700 font-light">{specialty}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <h4 className="font-medium text-stone-800 mb-2">Besplatna procena</h4>
                                <p className="text-stone-600 text-sm mb-4 font-light">
                                    Dolazimo na teren u {city} i pružamo detaljnu procenu bez obaveze
                                </p>
                                <a
                                    href="/kontakt"
                                    className="inline-flex items-center bg-amber-500 text-white px-4 py-2 rounded-sm hover:bg-amber-600 transition-colors text-sm font-medium"
                                >
                                    Zakazaše procenu
                                    <Check className="ml-2 h-4 w-4" />
                                </a>
                            </div>
                        </div>

                        {/* Process overview */}
                        <div className="mt-6 bg-stone-50 p-6 rounded-lg">
                            <h4 className="font-medium text-stone-800 mb-4">Kako funkcioniše</h4>
                            
                            <div className="space-y-4 text-sm">
                                <div className="flex">
                                    <div className="bg-amber-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium mr-3 flex-shrink-0">1</div>
                                    <span className="text-stone-600">Kontaktirate nas i zakazujete procenu</span>
                                </div>
                                <div className="flex">
                                    <div className="bg-amber-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium mr-3 flex-shrink-0">2</div>
                                    <span className="text-stone-600">Naš stručnjak dolazi u {city} i pravi procenu</span>
                                </div>
                                <div className="flex">
                                    <div className="bg-amber-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium mr-3 flex-shrink-0">3</div>
                                    <span className="text-stone-600">Dobijate ponudu i zakazujete montažu</span>
                                </div>
                                <div className="flex">
                                    <div className="bg-amber-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium mr-3 flex-shrink-0">4</div>
                                    <span className="text-stone-600">Profesionalna montaža i garancija</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}