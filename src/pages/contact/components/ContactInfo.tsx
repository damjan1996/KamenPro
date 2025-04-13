// src/pages/contact/components/ContactInfo.tsx
import { useState, useEffect, useRef } from 'react';
import { Container } from '../../../components/ui/Container';
import { Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react';

interface ContactInfoItem {
    id: string;
    title: string;
    items: string[];
    subtext: string;
    icon: JSX.Element;
    action: string | null;
    actionText: string | null;
}

export const ContactInfoSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);
    const sectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = sectionRef.current;

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    const contactInfo: ContactInfoItem[] = [
        {
            id: 'phone',
            title: 'Telefon',
            items: ['065 678 634'],
            subtext: 'Željko Savić',
            icon: <Phone className="w-5 h-5" />,
            action: 'tel:+38765678634',
            actionText: 'Pozovite nas'
        },
        {
            id: 'email',
            title: 'Email',
            items: ['info@kamenpro.rs'],
            subtext: 'Odgovaramo u roku od 24h',
            icon: <Mail className="w-5 h-5" />,
            action: 'mailto:info@kamenpro.rs',
            actionText: 'Pošaljite email'
        },
        {
            id: 'address',
            title: 'Adresa',
            items: ['Bijeljina', 'Republika Srpska, BiH'],
            subtext: 'Poslovni objekat i izložbeni prostor',
            icon: <MapPin className="w-5 h-5" />,
            action: 'https://maps.google.com',
            actionText: 'Pogledajte na mapi'
        },
        {
            id: 'hours',
            title: 'Radno vreme',
            items: ['Pon - Sub: 09:00 - 18:00', 'Nedelja: Zatvoreno'],
            subtext: 'Dostupni smo za vaša pitanja',
            icon: <Clock className="w-5 h-5" />,
            action: null,
            actionText: null
        }
    ];

    // Pomoćna funkcija za dobijanje klasa animacije
    const getAnimationClasses = (delay: string = '') => `
        transition-all duration-700 ${delay} ease-out transform 
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
    `.trim();

    return (
        <section
            ref={sectionRef}
            id="kontakt-informacije"
            className="py-16 md:py-24 bg-stone-50 overflow-hidden font-sans"
        >
            <Container>
                <div className={`text-center mb-12 md:mb-16 ${getAnimationClasses()}`}>
                    <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-4 uppercase tracking-wide">
                        Kontakt <span className="font-medium">informacije</span>
                    </h2>
                    <div className="w-16 h-1 bg-amber-500 mx-auto mb-6"></div>
                    <p className="text-stone-600 max-w-2xl mx-auto font-light">
                        Pronađite sve potrebne informacije za kontakt sa našim timom.
                        Dostupni smo putem telefona, emaila, ili nas možete posetiti na našoj adresi.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {contactInfo.map((info, index) => (
                        <div
                            key={info.id}
                            className={getAnimationClasses(`delay-${200 + index * 100}`)}
                            onMouseEnter={() => setHoveredCard(info.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <div className={`h-full p-6 rounded-lg border border-stone-200 bg-white transition-all duration-300 ${
                                hoveredCard === info.id
                                    ? 'shadow-md border-amber-200 -translate-y-1'
                                    : 'shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-amber-200'
                            }`}>
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 transition-all duration-300 ${
                                    hoveredCard === info.id
                                        ? 'bg-amber-500 text-white'
                                        : 'bg-amber-100 text-amber-600'
                                }`}>
                                    {info.icon}
                                </div>

                                <h3 className="text-lg font-medium text-stone-800 mb-3 text-center">
                                    {info.title}
                                </h3>

                                <div className="space-y-1 mb-4">
                                    {info.items.map((item, i) => (
                                        <p key={i} className="text-center text-stone-600 font-light">
                                            {item}
                                        </p>
                                    ))}
                                    {info.subtext && (
                                        <p className="text-center text-stone-500 text-sm font-light">
                                            {info.subtext}
                                        </p>
                                    )}
                                </div>

                                {info.action && (
                                    <div className="text-center mt-4">
                                        <a
                                            href={info.action}
                                            className="inline-flex items-center text-amber-600 hover:text-amber-700 transition-colors group"
                                            target={info.id === 'address' ? "_blank" : undefined}
                                            rel={info.id === 'address' ? "noopener noreferrer" : undefined}
                                        >
                                            <span className="text-sm font-light">{info.actionText}</span>
                                            <ExternalLink className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Brzi linkovi za mobilne uređaje */}
                <div className={`mt-12 md:hidden ${getAnimationClasses('delay-600')}`}>
                    <div className="bg-white rounded-lg shadow-md p-4 max-w-sm mx-auto border border-stone-200">
                        <h3 className="text-center text-stone-800 font-medium mb-4">Brze akcije</h3>
                        <div className="flex justify-around">
                            <a
                                href="tel:+38765678634"
                                className="flex flex-col items-center p-3 hover:bg-stone-50 rounded-lg transition-colors duration-200"
                            >
                                <Phone className="w-5 h-5 text-amber-600 mb-1" />
                                <span className="text-xs text-stone-600 font-light">Pozovite</span>
                            </a>
                            <a
                                href="mailto:info@kamenpro.rs"
                                className="flex flex-col items-center p-3 hover:bg-stone-50 rounded-lg transition-colors duration-200"
                            >
                                <Mail className="w-5 h-5 text-amber-600 mb-1" />
                                <span className="text-xs text-stone-600 font-light">Email</span>
                            </a>
                            <a
                                href="https://maps.google.com"
                                className="flex flex-col items-center p-3 hover:bg-stone-50 rounded-lg transition-colors duration-200"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <MapPin className="w-5 h-5 text-amber-600 mb-1" />
                                <span className="text-xs text-stone-600 font-light">Mapa</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Dodatne informacije */}
                <div className={`mt-16 p-6 bg-white rounded-lg border border-stone-200 shadow-sm ${getAnimationClasses('delay-700')}`}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                        <div className="text-center md:text-left">
                            <h3 className="text-lg font-medium text-stone-800 mb-2">KamenPro</h3>
                            <p className="text-stone-600 font-light">Od 2019. godine s vama</p>
                        </div>
                        <div className="text-center hidden md:block">
                            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="text-center md:text-right">
                            <a
                                href="https://www.facebook.com/KamenPro-Bijeljina"
                                className="text-amber-600 hover:text-amber-700 transition-colors inline-flex items-center justify-center md:justify-end"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className="font-light mr-1">Facebook</span>
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};