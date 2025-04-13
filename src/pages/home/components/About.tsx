import { Container } from "../../../components/ui/Container";
import { useState, useEffect, useRef } from "react";
import { Check, Shield, Clock, Phone } from "lucide-react";

// Card interface for type safety
interface ValueCard {
    icon: JSX.Element;
    title: string;
    description: string;
}

// Reusable card component to reduce duplication
const ValueCard = ({
                       value,
                       index,
                       hoveredCard,
                       setHoveredCard
                   }: {
    value: ValueCard;
    index: number;
    hoveredCard: number | null;
    setHoveredCard: (index: number | null) => void;
}) => (
    <div
        className={`p-4 bg-white rounded-lg shadow-sm border border-stone-200 transition-all duration-300 ${
            hoveredCard === index
                ? "shadow-md transform -translate-y-1 border-amber-200"
                : "hover:shadow-md hover:-translate-y-1 hover:border-amber-200"
        }`}
        onMouseEnter={() => setHoveredCard(index)}
        onMouseLeave={() => setHoveredCard(null)}
    >
        <div className="flex items-center mb-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 transition-all duration-300 ${
                hoveredCard === index
                    ? "bg-amber-500 text-white"
                    : "bg-amber-100 text-amber-600"
            }`}>
                {value.icon}
            </div>
            <h4 className="font-medium text-stone-800 text-sm">{value.title}</h4>
        </div>
        <p className="text-xs text-stone-600 font-light">{value.description}</p>
    </div>
);

export function AboutSection() {
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
            { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
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

    const values: ValueCard[] = [
        {
            icon: <Shield className="w-5 h-5" />,
            title: "Kvalitet",
            description: "Provereni materijali i pažnja prema detaljima"
        },
        {
            icon: <Check className="w-5 h-5" />,
            title: "Pouzdanost",
            description: "Poštovanje dogovora i rokova isporuke"
        },
        {
            icon: <Clock className="w-5 h-5" />,
            title: "Podrška",
            description: "Tehnička podrška pre, tokom i nakon kupovine"
        }
    ];

    // Animation class helper to reduce duplication
    const getAnimationClasses = (delay: string = '') => `
      transition-all duration-700 ${delay} ease-out transform 
      ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
    `.trim();

    return (
        <section
            ref={sectionRef}
            className="py-16 md:py-20 bg-stone-100 overflow-hidden font-sans"
        >
            <Container>
                {/* Heading */}
                <div className={`text-center mb-10 md:mb-14 ${getAnimationClasses()}`}>
                    <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-4 uppercase tracking-wide">
                        O <span className="font-semibold">nama</span>
                    </h2>
                    <div className="w-16 h-1 bg-amber-500 mx-auto mb-6"></div>
                </div>

                {/* Main content */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center">
                    {/* Left column - Company story */}
                    <div
                        className={`transition-all duration-700 delay-200 ease-out transform ${
                            isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
                        }`}
                    >
                        <p className="text-stone-600 mb-8 font-light leading-relaxed">
                            KamenPro je samostalna zanatska radnja osnovana 2019. godine u Bijeljini, specijalizovana za proizvodnju visokokvalitetnih dekorativnih kamenih obloga koje spajaju estetiku prirodnog kamena sa praktičnošću savremenih materijala.
                        </p>

                        <div className="mb-8 bg-white p-5 rounded-lg shadow-sm border border-stone-200 hover:shadow-md transition-shadow duration-300">
                            <h4 className="text-lg font-medium text-stone-800 mb-3">Naša misija</h4>
                            <p className="text-stone-600 font-light">
                                Stvaramo jedinstvene dekorativne obloge koje transformišu svaki prostor u upečatljivo okruženje, dostupno svakom domu i poslovnom prostoru.
                            </p>
                        </div>

                        {/* Contact info */}
                        <div className="p-5 bg-white rounded-lg shadow-sm border border-stone-200 hover:shadow-md transition-all duration-300 group">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h4 className="font-medium text-stone-800 transition-all duration-300 group-hover:text-amber-600">Željko</h4>
                                    <p className="text-sm text-stone-500 font-light">Pon - Sub: 09:00 - 18:00</p>
                                </div>
                                <a
                                    href="tel:+38765678634"
                                    className="flex items-center justify-center w-10 h-10 bg-amber-50 text-amber-600 rounded-full hover:bg-amber-500 hover:text-white transition-all duration-300"
                                    aria-label="Pozovite nas"
                                >
                                    <Phone className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right column - Image and values */}
                    <div
                        className={`transition-all duration-700 delay-400 ease-out transform ${
                            isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
                        }`}
                    >
                        {/* Image - updated with the correct URL */}
                        <div className="relative rounded-lg overflow-hidden mb-6 shadow-lg group">
                            <img
                                src="https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Page/Homepage/About/products.png"
                                alt="KamenPro proizvodi"
                                className="w-full h-48 md:h-56 object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                                <div className="p-4 text-white transform transition-transform duration-300 group-hover:translate-y-0 translate-y-2">
                                    <p className="text-sm font-light">Dekorativne kamene obloge i cigle</p>
                                </div>
                            </div>
                        </div>

                        {/* Values - using the extracted component to reduce duplication */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                            {values.map((value, index) => (
                                <ValueCard
                                    key={index}
                                    value={value}
                                    index={index}
                                    hoveredCard={hoveredCard}
                                    setHoveredCard={setHoveredCard}
                                />
                            ))}
                        </div>

                        {/* Product highlights */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-4 bg-amber-50 rounded-lg border border-amber-100 hover:bg-amber-100 hover:border-amber-200 transition-all duration-300 cursor-pointer">
                                <h4 className="font-medium text-amber-800 text-sm mb-1">Dekorativni kamen</h4>
                                <p className="text-xs text-amber-700 font-light">Otporan na sve vremenske uslove</p>
                            </div>
                            <div className="p-4 bg-amber-50 rounded-lg border border-amber-100 hover:bg-amber-100 hover:border-amber-200 transition-all duration-300 cursor-pointer">
                                <h4 className="font-medium text-amber-800 text-sm mb-1">Rustik cigla</h4>
                                <p className="text-xs text-amber-700 font-light">Za topao, klasičan izgled</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}