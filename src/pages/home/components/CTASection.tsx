// src/components/home/components/CTASection.tsx
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "../../../components/ui/Container";

export function CTASection() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const element = document.getElementById('cta-section');
            if (element) {
                const position = element.getBoundingClientRect();
                if (position.top < window.innerHeight * 0.75) {
                    setIsVisible(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <section id="cta-section" className="py-20 md:py-32 bg-black text-white relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-pattern"></div>
            </div>

            <Container>
                <div className={`relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center md:text-left md:flex md:items-end md:justify-between mb-16">
                            <div className="md:max-w-2xl mb-10 md:mb-0">
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
                                    Stvorite prostor<br />
                                    <span className="font-semibold">koji oduševljava</span>
                                </h2>

                                <p className="text-lg md:text-xl text-gray-300 max-w-xl">
                                    Vrhunske kamene obloge koje kombinuju estetiku i trajnost. Transformišite svoj dom ili poslovni prostor uz KamenPro.
                                </p>
                            </div>

                            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                                <a
                                    href="/kontakt"
                                    className="inline-flex items-center px-8 py-4 bg-white text-black rounded hover:bg-opacity-90 transition-all duration-300 text-lg font-medium"
                                >
                                    Besplatna konsultacija
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </a>
                            </div>
                        </div>

                        <div className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            <div className="p-8 border border-white/20 rounded-lg hover:border-white/40 transition-all">
                                <div className="text-3xl font-light mb-4">01</div>
                                <h3 className="text-xl font-medium mb-3">Besplatna konsultacija</h3>
                                <p className="text-gray-400">Naši eksperti analiziraju vaš prostor i predlažu optimalna rešenja za vaše potrebe.</p>
                            </div>

                            <div className="p-8 border border-white/20 rounded-lg hover:border-white/40 transition-all">
                                <div className="text-3xl font-light mb-4">02</div>
                                <h3 className="text-xl font-medium mb-3">Profesionalna ugradnja</h3>
                                <p className="text-gray-400">Iskusni majstori osiguravaju besprekorno postavljanje i završnu obradu kamenih obloga.</p>
                            </div>

                            <div className="p-8 border border-white/20 rounded-lg hover:border-white/40 transition-all">
                                <div className="text-3xl font-light mb-4">03</div>
                                <h3 className="text-xl font-medium mb-3">Dugotrajno zadovoljstvo</h3>
                                <p className="text-gray-400">Naši proizvodi su dizajnirani da traju, uz garanciju kvaliteta i naknadnu podršku.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            <div className={`mt-24 border-t border-white/10 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <Container>
                    <div className="pt-12 flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="mb-8 md:mb-0">
                            <h4 className="text-2xl font-light mb-3">Spremni ste za početak?</h4>
                            <p className="text-gray-400">Kontaktirajte nas danas i započnite transformaciju vašeg prostora.</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href="/kontakt"
                                className="px-6 py-3 bg-white text-black rounded font-medium hover:bg-opacity-90 transition-colors"
                            >
                                Kontaktirajte nas
                            </a>
                            <a
                                href="/proizvodi"
                                className="px-6 py-3 border border-white text-white rounded font-medium hover:bg-white/10 transition-colors"
                            >
                                Pogledajte proizvode
                            </a>
                        </div>
                    </div>
                </Container>
            </div>
        </section>
    );
}