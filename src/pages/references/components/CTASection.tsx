// src/pages/references/components/CTASection.tsx
import { useState, useEffect, useRef } from 'react';
import { Container } from '../../../components/ui/Container';
import { ArrowRight, Check, Phone } from 'lucide-react';

export const CTASection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredButton, setHoveredButton] = useState<string | null>(null);
    const sectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    // Pomoćna funkcija za dobijanje klasa animacije
    const getAnimationClasses = (delay: string = '') => `
        transition-all duration-700 ${delay} ease-out transform 
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
    `.trim();

    return (
        <section
            ref={sectionRef}
            id="kontaktirajte-nas"
            className="py-16 md:py-24 bg-stone-100 overflow-hidden font-sans"
        >
            <Container>
                <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto">
                    {/* Leva strana - Tekst */}
                    <div className={`w-full md:w-1/2 mb-10 md:mb-0 md:pr-8 ${getAnimationClasses()}`}>
                        <div className="mb-6">
                            <span className="font-light uppercase tracking-widest text-amber-600 text-sm">Kontaktirajte nas</span>
                            <h2 className="text-3xl md:text-4xl font-light text-stone-800 mt-2 mb-4 tracking-wide">
                                Spremni ste za <span className="font-medium">transformaciju</span>?
                            </h2>
                            <div className="w-16 h-1 bg-amber-500 mb-6"></div>
                            <p className="text-stone-600 mb-8 max-w-xl leading-relaxed font-light">
                                Promenite svoj prostor dekorativnim kamenim oblogama i stvorite ambijent koji pleni.
                                Naš tim je tu da vaše ideje pretvori u stvarnost, stvarajući enterijer i eksterijer
                                koji će oduševiti sve posetioce.
                            </p>
                        </div>

                        <ul className="space-y-4 mb-8">
                            {[
                                "Besplatna konsultacija i ponuda",
                                "Širok izbor dekorativnih kamenih obloga",
                                "Visok kvalitet materijala i izrade",
                                "Stručna podrška od izbora do ugradnje"
                            ].map((item, index) => (
                                <li
                                    key={index}
                                    className="flex items-center text-stone-700 font-light"
                                    style={{ transitionDelay: `${100 * index}ms` }}
                                >
                                    <Check className="w-5 h-5 mr-3 text-amber-500 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        {/* CTA dugme */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <a
                                href="/kontakt"
                                className={`inline-flex items-center px-6 py-3 bg-amber-500 text-stone-900 rounded-sm hover:bg-amber-400 transition-all duration-300 text-sm uppercase tracking-wider font-light shadow-sm hover:shadow-md group ${
                                    hoveredButton === 'contact' ? 'bg-amber-400' : ''
                                }`}
                                onMouseEnter={() => setHoveredButton('contact')}
                                onMouseLeave={() => setHoveredButton(null)}
                            >
                                <span>Kontaktirajte nas</span>
                                <ArrowRight className={`ml-2 h-4 w-4 transition-transform duration-300 ${
                                    hoveredButton === 'contact' ? 'translate-x-1' : ''
                                }`} />
                            </a>

                            <a
                                href="tel:+38765678634"
                                className={`flex items-center text-stone-800 hover:text-amber-600 transition-colors ${
                                    hoveredButton === 'phone' ? 'text-amber-600' : ''
                                }`}
                                onMouseEnter={() => setHoveredButton('phone')}
                                onMouseLeave={() => setHoveredButton(null)}
                            >
                                <Phone className="w-5 h-5 mr-2" />
                                <span className="font-medium">+387 65 678 634</span>
                            </a>
                        </div>
                    </div>

                    {/* Desna strana - Slika */}
                    <div className={`w-full md:w-1/2 md:pl-8 ${getAnimationClasses('delay-300')}`}>
                        <div className="relative">
                            {/* Glavna slika */}
                            <div className="rounded-lg bg-white shadow-md p-3 z-10 relative">
                                <div className="overflow-hidden rounded-lg relative h-72 md:h-96">
                                    <img
                                        src="https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Page/About/Production/radionica%20iii.jpg"
                                        alt="KamenPro izložbeni prostor sa prikazom dekorativnih kamenih obloga i stručnog osoblja za konsultacije"
                                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                    />
                                </div>
                            </div>

                            {/* Dekorativni elementi */}
                            <div className="absolute w-24 h-24 rounded-full bg-amber-100 -top-6 -right-6 z-0 opacity-70"></div>
                            <div className="absolute w-16 h-16 rounded-full border-2 border-amber-200 -bottom-4 -left-4 z-0 opacity-70"></div>

                            {/* Informacije */}
                            <div className={`flex justify-center mt-8 gap-6 ${getAnimationClasses('delay-500')}`}>
                                <div className="p-4 bg-white rounded-lg shadow-sm border border-stone-200 hover:border-amber-200 hover:shadow-md transition-all duration-300 text-center flex-1">
                                    <h3 className="font-medium text-stone-800 mb-1">Radno vreme</h3>
                                    <p className="text-stone-600 font-light text-sm">Pon - Sub: 09:00 - 18:00</p>
                                </div>
                                <div className="p-4 bg-white rounded-lg shadow-sm border border-stone-200 hover:border-amber-200 hover:shadow-md transition-all duration-300 text-center flex-1">
                                    <h3 className="font-medium text-stone-800 mb-1">Od 2019.</h3>
                                    <p className="text-stone-600 font-light text-sm">5+ godina iskustva</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dodatna sekcija na dnu */}
                <div className={`mt-16 pt-8 border-t border-stone-200 ${getAnimationClasses('delay-700')}`}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div>
                            <h3 className="font-medium text-stone-800 mb-1">Adresa</h3>
                            <p className="text-stone-600 font-light">Bijeljina, Republika Srpska, BiH</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-stone-800 mb-1">Email</h3>
                            <a href="mailto:info@kamenpro.net" className="text-amber-600 hover:text-amber-700 transition-colors">info@kamenpro.net</a>
                        </div>
                        <div>
                            <h3 className="font-medium text-stone-800 mb-1">Društvene mreže</h3>
                            <a href="https://www.facebook.com/KamenPro-Bijeljina" className="text-amber-600 hover:text-amber-700 transition-colors">Facebook</a>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};