// src/pages/products/components/ProductCTA.tsx
import { useState, useEffect } from "react";
import { Container } from "../../../components/ui/Container";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function ProductCTA() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setIsVisible(true);
            }
        }, { threshold: 0.1 });

        const section = document.getElementById('cta-section');
        if (section) {
            observer.observe(section);
        }

        return () => {
            if (section) {
                observer.unobserve(section);
            }
        };
    }, []);

    return (
        <section id="cta-section" className="py-16 md:py-24 bg-amber-600 text-white">
            <Container>
                <div className={`grid md:grid-cols-2 gap-8 items-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Spremni ste da započnete svoj projekat?</h2>
                        <p className="text-lg mb-8 text-amber-100">
                            Naš tim stručnjaka je tu da vam pomogne pri izboru idealnih kamenih obloga za vaš projekat. Kontaktirajte nas danas za besplatnu konsultaciju.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/kontakt"
                                className="inline-flex items-center justify-center px-8 py-3 bg-white text-amber-600 font-medium rounded-lg hover:bg-amber-50 transition-colors"
                            >
                                Kontaktirajte nas
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                            <Link
                                to="/reference"
                                className="inline-flex items-center justify-center px-8 py-3 border border-white text-white font-medium rounded-lg hover:bg-amber-700 transition-colors"
                            >
                                Pogledajte reference
                            </Link>
                        </div>
                    </div>
                    <div className={`relative transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                        <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden shadow-xl">
                            <img
                                src="/images/cta-image.jpg"
                                alt="Kamene obloge u modernom enterijeru"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-5 -left-5 bg-white p-4 rounded-lg shadow-lg">
                            <p className="text-amber-600 font-bold">Besplatna konsultacija</p>
                            <p className="text-stone-600 text-sm">Pozovite nas: +381 11 123 4567</p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}