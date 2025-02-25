// src/pages/contact/components/ContactInfo.tsx
import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react';

export const ContactInfoSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredCard, setHoveredCard] = useState(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        const section = document.querySelector('.contact-info-section');
        if (section) {
            observer.observe(section);
        }

        return () => {
            if (section) {
                observer.unobserve(section);
            }
        };
    }, []);

    const contactInfo = [
        {
            id: 'phone',
            title: 'Telefon',
            items: ['+381 (0)XX XXX-XXX', '+381 (0)XX XXX-XXX'],
            icon: <Phone className="w-6 h-6" />,
            action: 'tel:+38100000000',
            actionText: 'Pozovite nas',
            color: 'blue'
        },
        {
            id: 'email',
            title: 'Email',
            items: ['info@kamenpro.rs', 'prodaja@kamenpro.rs'],
            icon: <Mail className="w-6 h-6" />,
            action: 'mailto:info@kamenpro.rs',
            actionText: 'Pošaljite email',
            color: 'emerald'
        },
        {
            id: 'address',
            title: 'Adresa',
            items: ['Ulica i broj', 'Grad, Poštanski broj', 'Srbija'],
            icon: <MapPin className="w-6 h-6" />,
            action: 'https://maps.google.com',
            actionText: 'Pogledajte na mapi',
            color: 'amber'
        },
        {
            id: 'hours',
            title: 'Radno vreme',
            items: ['Pon-Pet: 09:00-17:00', 'Sub: 10:00-14:00', 'Ned: Zatvoreno'],
            icon: <Clock className="w-6 h-6" />,
            action: null,
            color: 'purple'
        }
    ];

    const getColorClasses = (color, isHovered) => {
        const colorMap = {
            blue: {
                bg: isHovered ? 'bg-blue-600' : 'bg-blue-50',
                text: isHovered ? 'text-white' : 'text-blue-600',
                border: isHovered ? 'border-blue-700' : 'border-blue-100',
                shadow: isHovered ? 'shadow-blue-200' : 'shadow-gray-100'
            },
            emerald: {
                bg: isHovered ? 'bg-emerald-600' : 'bg-emerald-50',
                text: isHovered ? 'text-white' : 'text-emerald-600',
                border: isHovered ? 'border-emerald-700' : 'border-emerald-100',
                shadow: isHovered ? 'shadow-emerald-200' : 'shadow-gray-100'
            },
            amber: {
                bg: isHovered ? 'bg-amber-600' : 'bg-amber-50',
                text: isHovered ? 'text-white' : 'text-amber-600',
                border: isHovered ? 'border-amber-700' : 'border-amber-100',
                shadow: isHovered ? 'shadow-amber-200' : 'shadow-gray-100'
            },
            purple: {
                bg: isHovered ? 'bg-purple-600' : 'bg-purple-50',
                text: isHovered ? 'text-white' : 'text-purple-600',
                border: isHovered ? 'border-purple-700' : 'border-purple-100',
                shadow: isHovered ? 'shadow-purple-200' : 'shadow-gray-100'
            }
        };

        return colorMap[color] || colorMap.blue;
    };

    return (
        <section className="contact-info-section py-20 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
            {/* Background decoration */}
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-gray-100 to-transparent opacity-50"></div>
            <div className="absolute -left-20 top-40 w-60 h-60 rounded-full bg-blue-50 opacity-40 blur-3xl"></div>
            <div className="absolute -right-20 bottom-40 w-80 h-80 rounded-full bg-amber-50 opacity-30 blur-3xl"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <span className="inline-block text-blue-600 text-sm font-medium tracking-wider uppercase mb-2 opacity-0 animate-fade-in">Budimo u kontaktu</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 opacity-0 animate-slide-up">Kontakt Informacije</h2>
                    <div className="w-20 h-1 bg-blue-600 mx-auto mb-6 opacity-0 animate-grow"></div>
                    <p className="text-gray-600 opacity-0 animate-fade-in">
                        Pronađite sve potrebne informacije za kontakt sa našim timom. Dostupni smo putem telefona, emaila, ili nas možete posetiti na našoj adresi.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 max-w-6xl mx-auto">
                    {contactInfo.map((info, index) => {
                        const isCardHovered = hoveredCard === info.id;
                        const colorClasses = getColorClasses(info.color, isCardHovered);

                        return (
                            <div
                                key={info.id}
                                className={`relative transform transition-all duration-500 ${
                                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                                onMouseEnter={() => setHoveredCard(info.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                <div className={`h-full p-6 rounded-xl border ${colorClasses.border} bg-white backdrop-blur-sm transition-all duration-300 transform ${
                                    isCardHovered ? 'scale-105 shadow-xl' : 'shadow-md hover:shadow-lg'
                                } ${colorClasses.shadow} relative overflow-hidden`}>

                                    {/* Background decoration */}
                                    <div className={`absolute -right-12 -top-12 w-40 h-40 rounded-full ${colorClasses.bg} opacity-10 transition-all duration-500 ${
                                        isCardHovered ? 'scale-150' : 'scale-100'
                                    }`}></div>

                                    <div className="relative z-10">
                                        <div className={`w-16 h-16 ${colorClasses.bg} ${colorClasses.text} rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 ${
                                            isCardHovered ? 'scale-110' : 'scale-100'
                                        }`}>
                                            {info.icon}
                                        </div>

                                        <h3 className={`text-xl font-semibold mb-4 text-center transition-colors duration-300 ${
                                            isCardHovered ? 'text-gray-800' : 'text-gray-700'
                                        }`}>
                                            {info.title}
                                        </h3>

                                        <div className="space-y-2 mb-6">
                                            {info.items.map((item, i) => (
                                                <p key={i} className={`text-center transition-colors duration-300 ${
                                                    isCardHovered ? 'text-gray-700' : 'text-gray-600'
                                                }`}>
                                                    {item}
                                                </p>
                                            ))}
                                        </div>

                                        {info.action && (
                                            <div className="text-center mt-auto">
                                                <a
                                                    href={info.action}
                                                    className={`inline-flex items-center space-x-2 text-sm font-medium ${colorClasses.text} hover:underline transition-all duration-300`}
                                                >
                                                    <span>{info.actionText}</span>
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Mobile contact quick links - visible only on small screens */}
                <div className="mt-12 md:hidden">
                    <div className="bg-white rounded-xl shadow-md p-4 max-w-sm mx-auto">
                        <h3 className="text-center text-gray-700 font-medium mb-4">Brze akcije</h3>
                        <div className="flex justify-around">
                            <a href="tel:+38100000000" className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                                <Phone className="w-6 h-6 text-blue-600 mb-1" />
                                <span className="text-xs text-gray-600">Pozovite</span>
                            </a>
                            <a href="mailto:info@kamenpro.rs" className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                                <Mail className="w-6 h-6 text-emerald-600 mb-1" />
                                <span className="text-xs text-gray-600">Email</span>
                            </a>
                            <a href="https://maps.google.com" className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                                <MapPin className="w-6 h-6 text-amber-600 mb-1" />
                                <span className="text-xs text-gray-600">Mapa</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes grow {
                    from { opacity: 0; width: 0; }
                    to { opacity: 1; width: 5rem; }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.8s forwards;
                    animation-delay: 0.3s;
                }
                
                .animate-slide-up {
                    animation: slide-up 0.8s forwards;
                    animation-delay: 0.2s;
                }
                
                .animate-grow {
                    animation: grow 0.8s forwards;
                    animation-delay: 0.5s;
                }
                
                @media (max-width: 640px) {
                    .grid {
                        gap: 1rem;
                    }
                }
            `}</style>
        </section>
    );
};