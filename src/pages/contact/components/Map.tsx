// src/pages/contact/components/Map.tsx
import { useState, useEffect, useRef } from "react";
import { MapPin, Navigation, ExternalLink, ArrowRight } from "lucide-react";
import { Container } from "../../../components/ui/Container";

interface LocationDetail {
    icon: React.ReactNode;
    text: string;
}

interface InfoCardProps {
    number: string;
    title: string;
    content: string;
}

interface PhoneProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
}

export function MapSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [mapInteracted, setMapInteracted] = useState(false);
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

    const handleMapInteraction = () => {
        setMapInteracted(true);
    };

    const locationDetails: LocationDetail[] = [
        { icon: <MapPin size={18} />, text: "Bijeljina, Republika Srpska, BiH" },
        { icon: <Navigation size={18} />, text: "Okolina do 50km od Bijeljine" }
    ];

    // Helper function for common animation classes
    const getAnimationClasses = (delay: string = '') => `
        transition-all duration-700 ${delay} 
        ${isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"}
    `.trim();

    // Helper component for location details
    const LocationDetailItem = ({ icon, text }: LocationDetail) => (
        <div className="flex items-start space-x-2">
            <div className="text-amber-600 mt-1 flex-shrink-0">{icon}</div>
            <p className="text-stone-600 text-sm font-light">{text}</p>
        </div>
    );

    // Helper component for info cards
    const InfoCard = ({ number, title, content }: InfoCardProps) => (
        <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-stone-100">
            <h3 className="text-stone-800 font-medium mb-2 flex items-center">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-2">
                    <span className="text-sm">{number}</span>
                </span>
                {title}
            </h3>
            <p className="text-sm text-stone-600 font-light">{content}</p>
        </div>
    );

    return (
        <section
            ref={sectionRef}
            className="py-16 md:py-24 bg-stone-50 font-sans overflow-hidden relative"
        >
            {/* Dekorativni elementi pozadine */}
            <div
                className={`absolute top-0 right-0 w-96 h-96 bg-amber-50 rounded-full opacity-30 blur-3xl transition-transform duration-1000 ${
                    isVisible ? "translate-x-1/2 -translate-y-1/2" : "translate-x-full -translate-y-full"
                }`}
            ></div>
            <div
                className={`absolute bottom-0 left-0 w-80 h-80 bg-amber-50 rounded-full opacity-30 blur-3xl transition-transform duration-1000 ${
                    isVisible ? "-translate-x-1/2 translate-y-1/2" : "-translate-x-full translate-y-full"
                }`}
            ></div>

            <Container>
                <div className={getAnimationClasses()}>
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-4 tracking-wide uppercase">
                            Gde nas <span className="font-medium">pronaći</span>
                        </h2>
                        <div className="w-16 h-1 bg-amber-500 mx-auto mb-6"></div>
                        <p className="text-stone-600 max-w-2xl mx-auto font-light">
                            Posetite naš izložbeni salon u Bijeljini i otkrijte širok asortiman naših dekorativnih kamenih obloga i rustik cigli.
                        </p>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto">
                    <div
                        className={`relative rounded-lg overflow-hidden shadow-md ${getAnimationClasses()} ${isHovered ? "shadow-lg" : "shadow-sm"}`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={handleMapInteraction}
                    >
                        {/* Kontejner za mapu */}
                        <div className="relative w-full">
                            {/* Privremeni placeholder za mapu */}
                            <div
                                className={`w-full h-96 md:h-[28rem] bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center transition-transform duration-700 ${
                                    isHovered && !mapInteracted ? "scale-[1.02]" : "scale-100"
                                }`}
                            >
                                {/* Placeholder sadržaj - zameniti sa pravom mapom */}
                                <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm max-w-md">
                                    <MapPin className="w-10 h-10 text-amber-600 mx-auto mb-4" />
                                    <p className="text-stone-700 mb-4 font-light">
                                        Mapa će biti prikazana ovde. Kliknite za interakciju.
                                    </p>
                                    <div className="flex justify-center space-x-2">
                                        <a
                                            href="https://goo.gl/maps/bijeljina"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-2 bg-amber-500 text-stone-900 rounded-sm flex items-center space-x-2 hover:bg-amber-400 transition-colors shadow-sm group"
                                        >
                                            <Navigation size={16} />
                                            <span>Navigacija</span>
                                            <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    </div>
                                </div>

                                {/* Sloj za interakciju sa mapom */}
                                <div
                                    className={`absolute inset-0 bg-stone-900/10 backdrop-blur-[1px] transition-opacity duration-300 ${
                                        mapInteracted ? "opacity-0 pointer-events-none" : "opacity-100"
                                    }`}
                                ></div>
                            </div>

                            {/* Plutajuća kartica sa informacijama */}
                            <div
                                className={`absolute top-6 left-6 bg-white shadow-lg rounded-lg p-4 md:p-6 max-w-xs transition-all duration-500 ${
                                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                                }`}
                            >
                                <h3 className="text-lg font-medium text-stone-800 mb-2">KamenPro</h3>
                                <div className="space-y-3 mb-4">
                                    {locationDetails.map((detail, index) => (
                                        <LocationDetailItem key={index} {...detail} />
                                    ))}
                                    <div className="flex items-start space-x-2">
                                        <div className="text-amber-600 mt-1 flex-shrink-0">
                                            <Phone className="w-4 h-4" />
                                        </div>
                                        <p className="text-stone-600 text-sm font-light">065 678 634 - Željko Savić</p>
                                    </div>
                                </div>
                                <a
                                    href="https://goo.gl/maps/bijeljina"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-amber-600 hover:text-amber-700 flex items-center space-x-1 transition-colors group font-light"
                                >
                                    <span>Otvori u Google Maps</span>
                                    <ExternalLink size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>

                            {/* Traka sa informacijama za mobilne uređaje */}
                            <div className="md:hidden absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-4 shadow-md">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-sm font-medium text-stone-800">KamenPro</h3>
                                        <p className="text-xs text-stone-600 truncate font-light">Bijeljina, Republika Srpska</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <a
                                            href="tel:+38765678634"
                                            className="p-2 bg-amber-500 text-white rounded-full hover:bg-amber-400 transition-colors"
                                            aria-label="Pozovite nas"
                                        >
                                            <Phone className="w-5 h-5" />
                                        </a>
                                        <a
                                            href="https://goo.gl/maps/bijeljina"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 bg-stone-100 text-stone-700 rounded-full hover:bg-stone-200 transition-colors"
                                            aria-label="Otvori mapu"
                                        >
                                            <ExternalLink size={18} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dodatne informacije o lokaciji */}
                    <div className={`mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 ${getAnimationClasses('delay-300')}`}>
                        <InfoCard
                            number="1"
                            title="Radno vreme"
                            content="Ponedeljak - Subota: 09:00 - 18:00
                                     Nedelja: Zatvoreno"
                        />
                        <InfoCard
                            number="2"
                            title="Dostava"
                            content="Vršimo dostavu u okolini Bijeljine do 50km. Za ostale lokacije po dogovoru."
                        />
                        <InfoCard
                            number="3"
                            title="Kontakt"
                            content="Za sva pitanja i konsultacije kontaktirajte nas na 065 678 634 ili posetite naš izložbeni prostor."
                        />
                    </div>
                </div>
            </Container>

            {/* Animirani dekorativni elementi */}
            <div
                className="absolute top-1/2 left-10 w-4 h-4 rounded-full bg-amber-400/30 animate-pulse"
                style={{ animationDuration: "3s" }}
            ></div>
            <div
                className="absolute top-1/3 right-1/4 w-6 h-6 rounded-full bg-amber-400/20 animate-pulse"
                style={{ animationDuration: "5s" }}
            ></div>
            <div
                className="absolute bottom-1/4 right-10 w-3 h-3 rounded-full bg-amber-400/20 animate-pulse"
                style={{ animationDuration: "4s" }}
            ></div>
        </section>
    );
}

// Phone Icon Component
function Phone({ className = "", ...props }: PhoneProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
    );
}