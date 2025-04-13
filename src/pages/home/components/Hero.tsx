// src/components/home/components/Hero.tsx
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "../../../components/ui/Container";

export function Hero() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    const scrollToContent = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth"
        });
    };

    return (
        <section className="relative min-h-screen w-full flex items-center overflow-hidden font-sans">
            {/* Background with gradient overlay */}
            <div className="absolute inset-0 z-0 w-full">
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/50 z-10"></div>
                <img
                    src="/images/home_header.png"
                    alt="KamenPro dekorativne obloge"
                    className="w-full h-full object-cover object-center z-0 transform scale-105 transition-transform duration-10000 hover:scale-110"
                />
            </div>

            {/* Content container */}
            <Container className="relative z-20 px-4 sm:px-6 py-12 md:py-16">
                <div
                    className={`text-white max-w-xl mx-auto md:mx-0 transform transition-all duration-1000 ease-out ${
                        isVisible
                            ? "translate-y-0 opacity-100"
                            : "translate-y-10 opacity-0"
                    }`}
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-light mb-4 md:mb-6 tracking-wide uppercase">
                        Vaš prostor.
                        <br />
                        <span className="font-medium">Transformisan.</span>
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-10 text-gray-200 font-light tracking-wide">
                        Moderan dizajn, vrhunska funkcionalnost prilagođena vašim individualnim potrebama.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <a
                            href="/proizvodi"
                            className="btn-primary group bg-amber-500 text-gray-900 px-5 py-3 rounded-sm hover:bg-amber-400 transition-all duration-300 inline-flex items-center justify-center text-sm uppercase tracking-wider font-light shadow-md hover:shadow-lg"
                        >
                            Istražite proizvode
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a
                            href="/kontakt"
                            className="btn-secondary px-5 py-3 rounded-sm border border-white hover:bg-white hover:bg-opacity-10 transition-all duration-300 text-center text-sm uppercase tracking-wider font-light"
                        >
                            Besplatna konsultacija
                        </a>
                    </div>
                </div>
            </Container>

            {/* Scroll indicator with improved animation */}
            <div
                className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer hidden md:block"
                onClick={scrollToContent}
            >
                <div className="w-10 h-10 flex items-center justify-center rounded-full border border-white/30 backdrop-blur-sm bg-black/10 text-white hover:bg-black/20 hover:border-white/50 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>
        </section>
    );
}