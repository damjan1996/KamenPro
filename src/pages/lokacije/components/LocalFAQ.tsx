// src/pages/lokacije/components/LocalFAQ.tsx
import { useState, useEffect, useRef } from "react";
import { Container } from "../../../components/ui/Container";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

interface FAQ {
    question: string;
    answer: string;
}

interface LocalFAQProps {
    city: string;
    faqs: FAQ[];
}

export function LocalFAQ({ city, faqs }: LocalFAQProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const toggleFAQ = (index: number) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    return (
        <section ref={sectionRef} className="py-16 md:py-24 bg-white font-sans">
            <Container>
                <div className={`text-center mb-12 transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-4 tracking-wide">
                        esto postavljana pitanja - <span className="font-medium text-amber-600">{city}</span>
                    </h2>
                    <div className="w-16 h-1 bg-amber-500 mx-auto mb-6"></div>
                    <p className="text-stone-600 max-w-2xl mx-auto font-light">
                        Odgovori na najeaa pitanja klijenata iz {city} o naaim uslugama
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`mb-4 bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden transition-all duration-500 ${
                                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-stone-50 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-inset"
                                aria-expanded={openFAQ === index}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="bg-amber-100 p-2 rounded-lg flex-shrink-0">
                                        <HelpCircle className="h-5 w-5 text-amber-600" />
                                    </div>
                                    <h3 className="font-medium text-stone-800 text-left">
                                        {faq.question}
                                    </h3>
                                </div>
                                <div className="flex-shrink-0 ml-4">
                                    {openFAQ === index ? (
                                        <ChevronUp className="h-5 w-5 text-stone-500" />
                                    ) : (
                                        <ChevronDown className="h-5 w-5 text-stone-500" />
                                    )}
                                </div>
                            </button>
                            
                            <div className={`overflow-hidden transition-all duration-300 ${
                                openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                            }`}>
                                <div className="px-6 pb-4 pl-16">
                                    <div className="border-l-2 border-amber-200 pl-4">
                                        <p className="text-stone-600 font-light leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <div className="inline-flex flex-col items-center bg-stone-50 px-8 py-6 rounded-lg border border-stone-200">
                        <HelpCircle className="h-8 w-8 text-amber-500 mb-3" />
                        <p className="text-stone-700 font-medium mb-2">
                            Imate dodatno pitanje?
                        </p>
                        <p className="text-stone-600 text-sm mb-4 max-w-sm">
                            Kontaktirajte nas direktno za personalizovane odgovore o uslugama u {city}
                        </p>
                        <a
                            href="/kontakt"
                            className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-sm font-medium transition-colors"
                        >
                            Kontaktirajte nas
                        </a>
                    </div>
                </div>
            </Container>
        </section>
    );
}