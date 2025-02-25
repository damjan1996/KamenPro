// src/pages/home/components/Hero.tsx
import { useState, useEffect } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Container } from "../../../components/ui/Container";

export function Hero() {
    const [scrolled, setScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timer);
        };
    }, []);

    const scrollToNextSection = () => {
        const nextSection = document.querySelector('#about-section');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative min-h-screen flex items-center bg-stone-900 text-white">
            {/* Background image with overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-stone-900 to-stone-900/70 z-10"></div>
                <img
                    src="/images/hero.png"
                    alt="Hero background"
                    className="w-full h-full object-cover object-center"
                />
            </div>

            <Container className="relative z-10">
                <div className={`max-w-3xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        Prirodne kamene obloge za vaš prostor
                    </h1>
                    <p className="text-lg md:text-xl text-stone-200 mb-8 max-w-2xl">
                        Transformišite vaš dom ili poslovni prostor sa našim vrhunskim kamenim oblogama. Prirodna lepota i dugotrajnost za svaki prostor.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a
                            href="/proizvodi"
                            className="inline-flex items-center justify-center px-8 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
                        >
                            Pogledajte proizvode
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </a>
                        <a
                            href="/kontakt"
                            className="inline-flex items-center justify-center px-8 py-3 border border-white text-white rounded-md hover:bg-white hover:text-stone-900 transition-colors"
                        >
                            Kontaktirajte nas
                        </a>
                    </div>
                </div>
            </Container>

            <button
                onClick={scrollToNextSection}
                className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center transition-opacity duration-300 ${scrolled ? 'opacity-0' : 'opacity-100'}`}
            >
                <span className="text-sm mb-2">Saznajte više</span>
                <ChevronDown className="h-6 w-6 animate-bounce" />
            </button>
        </section>
    );
}

export default Hero;