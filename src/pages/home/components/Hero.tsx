// src/components/home/components/Hero.tsx
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
    }, 300);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
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
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40 z-10"></div>
          <img
              src="/images/home_header.png"
              alt="KamenPro dekorativne obloge"
              className="w-full h-full object-cover z-0 transition-transform duration-10000 ease-out scale-105 hover:scale-100"
          />
        </div>

        {/* Content container */}
        <Container>
          <div
              className={`relative z-20 text-white max-w-2xl transform transition-all duration-1000 ${
                  isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
              }`}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-6 tracking-tight">
              Vaš prostor.
              <br />
              <span className="font-semibold">Transformisan.</span>
            </h1>
            <p className="text-lg md:text-xl mb-10 text-gray-200 font-light">
              Moderan dizajn, vrhunska funkcionalnost prilagođena vašim individualnim potrebama.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                  href="/proizvodi"
                  className="btn-primary group bg-white text-black px-6 py-3 rounded hover:bg-opacity-90 transition-all duration-300 inline-flex items-center justify-center"
              >
                Istražite proizvode
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                  href="/kontakt"
                  className="btn-secondary px-6 py-3 rounded border border-white hover:bg-white hover:bg-opacity-10 transition-all duration-300"
              >
                Besplatna konsultacija
              </a>
            </div>
          </div>
        </Container>

        {/* Scroll indicator */}
        <div
            className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-30 transition-opacity duration-500 ${
                scrolled ? "opacity-0" : "opacity-100"
            }`}
            onClick={scrollToContent}
        >
          <div className="flex flex-col items-center text-white">
            <span className="text-sm mb-2 opacity-70">Saznajte više</span>
            <ChevronDown className="animate-bounce h-6 w-6" />
          </div>
        </div>

        {/* Discount badge */}
        <div className="absolute z-30 right-4 top-1/2 rotate-90 transform -translate-y-1/2 sm:right-10 md:right-0 md:top-auto md:bottom-10 md:rotate-0 md:transform-none">
          <div className="bg-black text-white font-semibold py-2 px-4 rounded-full text-sm animate-pulse">
            Popust 20%
          </div>
        </div>

        {/* Small logo in top left */}
        <div className="absolute top-8 left-8 z-30">
          <div className="flex items-center">
            <span className="text-white text-xl font-bold">KamenPro</span>
          </div>
        </div>

        {/* Mobile menu button */}
        <button className="absolute top-8 right-8 z-30 text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </section>
  );
}