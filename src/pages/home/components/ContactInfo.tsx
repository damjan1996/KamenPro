// src/components/home/components/ContactInfoSection.tsx
import { useState, useEffect, useRef } from "react";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import { Container } from "../../../components/ui/Container";

interface ContactItem {
    id: number;
    title: string;
    content: string[];
    icon: JSX.Element;
    action: string;
    actionText: string;
}

const contactInfo: ContactItem[] = [
    {
        id: 1,
        title: 'Pozovite nas',
        content: ['+387 65 678 634'],
        icon: <Phone className="h-6 w-6" />,
        action: 'tel:+38765678634',
        actionText: 'Pozovite odmah'
    },
    {
        id: 2,
        title: 'Email',
        content: ['info@kamenpro.net'],
        icon: <Mail className="h-6 w-6" />,
        action: 'mailto:info@kamenpro.net',
        actionText: 'Pošaljite email'
    },
    {
        id: 3,
        title: 'Lokacija',
        content: ['Bijeljina', 'Republika Srpska, BiH'],
        icon: <MapPin className="h-6 w-6" />,
        action: 'https://maps.google.com',
        actionText: 'Pogledajte na mapi'
    }
];

export function ContactInfoSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
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
            className="py-16 md:py-24 bg-white font-sans overflow-hidden"
        >
            <Container>
                {/* Section Heading */}
                <div
                    className={`mb-12 text-center transition-all duration-700 transform ${
                        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    }`}
                >
                    <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-4 tracking-wide uppercase">
                        Kontaktirajte <span className="font-medium">nas</span>
                    </h2>
                    <div className="w-16 h-1 bg-amber-500 mx-auto mb-6"></div>
                    <p className="text-stone-600 max-w-xl mx-auto font-light">
                        Dostupni smo za sva vaša pitanja i konsultacije. Javite nam se i pomozite vam da transformišete vaš prostor.
                    </p>
                </div>

                {/* Contact Cards */}
                <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                    {contactInfo.map((item, index) => (
                        <div
                            key={item.id}
                            className={`text-center p-8 bg-white border border-stone-200 rounded-lg shadow-sm transition-all duration-500 ${
                                hoveredCard === item.id
                                    ? "border-amber-500 shadow-md transform -translate-y-1"
                                    : "hover:border-amber-300 hover:shadow-md hover:-translate-y-1"
                            } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                            style={{ transitionDelay: `${200 + index * 100}ms` }}
                            onMouseEnter={() => setHoveredCard(item.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 ${
                                hoveredCard === item.id
                                    ? "bg-amber-500 text-white"
                                    : "bg-amber-100 text-amber-700"
                            }`}>
                                {item.icon}
                            </div>

                            <h3 className="text-xl font-medium mb-4 text-stone-800">{item.title}</h3>

                            <div className="min-h-16 mb-6">
                                {item.content.map((line, i) => (
                                    <p key={i} className="text-stone-600 font-light">{line}</p>
                                ))}
                            </div>

                            <a
                                href={item.action}
                                className="inline-flex items-center text-amber-600 hover:text-amber-700 transition-colors group"
                                target={item.id === 3 ? "_blank" : undefined}
                                rel={item.id === 3 ? "noopener noreferrer" : undefined}
                            >
                                <span className="mr-2 font-light">{item.actionText}</span>
                                {item.id === 3 ? (
                                    <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                ) : (
                                    <span className="h-4 w-4 font-medium group-hover:translate-x-1 transition-transform">→</span>
                                )}
                            </a>
                        </div>
                    ))}
                </div>

                {/* Business Hours */}
                <div
                    className={`mt-16 p-6 md:p-8 bg-stone-50 rounded-lg border border-stone-200 text-center transition-all duration-700 delay-700 transform ${
                        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    }`}
                >
                    <h3 className="text-xl font-medium mb-4 text-stone-800">Radno vreme</h3>
                    <div className="flex justify-center space-x-8 md:space-x-16">
                        <div>
                            <p className="text-stone-600 font-light">Ponedeljak - Petak</p>
                            <p className="text-stone-800 font-medium">09:00 - 18:00</p>
                        </div>
                        <div>
                            <p className="text-stone-600 font-light">Subota</p>
                            <p className="text-stone-800 font-medium">09:00 - 15:00</p>
                        </div>
                        <div>
                            <p className="text-stone-600 font-light">Nedelja</p>
                            <p className="text-stone-800 font-medium">Zatvoreno</p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}