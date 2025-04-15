// src/pages/products/components/ProductCTA.tsx
import { useState, useEffect, useRef } from "react";
import { Container } from "../../../components/ui/Container";
import { ArrowRight, Phone, Mail } from "lucide-react";

export function ProductCTA() {
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredButton, setHoveredButton] = useState<string | null>(null);
    const [email, setEmail] = useState('');
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Ovde bi išla logika za slanje email-a
        console.log("Kontakt email:", email);
        alert("Hvala na interesovanju! Kontaktiraćemo vas uskoro.");
        setEmail('');
    };

    return (
        <section
            ref={sectionRef}
            id="proizvodi-kontakt"
            className="py-16 md:py-24 bg-stone-100 overflow-hidden font-sans"
        >
            <Container>
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* Leva strana - Tekst */}
                        <div className={getAnimationClasses()}>
                            <div className="mb-6">
                                <span className="text-sm uppercase tracking-wider text-amber-600 block mb-2">
                                    Besplatna konsultacija
                                </span>
                                <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-4 tracking-wide">
                                    Transformišite <span className="font-medium">svoj prostor</span> <br className="hidden md:block" />
                                    sa KamenPro oblogama
                                </h2>
                                <div className="w-16 h-1 bg-amber-500 mb-6"></div>
                                <p className="text-stone-600 mb-8 font-light leading-relaxed">
                                    Naš tim vam stoji na raspolaganju za sve informacije i savete oko izbora
                                    i ugradnje dekorativnih obloga. Verujemo da svaki prostor može biti
                                    transformisan uz pravilan izbor materijala i stručni pristup.
                                </p>
                            </div>

                            {/* Kontakt informacije */}
                            <div className={`space-y-4 ${getAnimationClasses('delay-200')}`}>
                                <div className="flex items-start">
                                    <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 mr-4">
                                        <Phone className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-stone-800">Pozovite nas</h3>
                                        <p className="text-stone-600 font-light">+387 65 678 634 - Željko Savić</p>
                                        <p className="text-sm text-stone-500 font-light">Pon - Sub: 09:00 - 18:00</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 mr-4">
                                        <Mail className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-stone-800">Pošaljite nam email</h3>
                                        <p className="text-stone-600 font-light">info@kamenpro.net</p>
                                        <p className="text-sm text-stone-500 font-light">Odgovaramo u roku od 24h</p>
                                    </div>
                                </div>
                            </div>

                            {/* Prednosti */}
                            <div className={`mt-8 grid grid-cols-2 gap-4 ${getAnimationClasses('delay-300')}`}>
                                <div className="p-4 bg-white rounded-lg border border-stone-200 hover:border-amber-200 hover:shadow-sm transition-all duration-300">
                                    <h4 className="font-medium text-stone-800 mb-2">Kvalitetni materijali</h4>
                                    <p className="text-stone-600 font-light text-sm">Beli cement sa aditivima za maksimalnu izdržljivost</p>
                                </div>
                                <div className="p-4 bg-white rounded-lg border border-stone-200 hover:border-amber-200 hover:shadow-sm transition-all duration-300">
                                    <h4 className="font-medium text-stone-800 mb-2">Stručna podrška</h4>
                                    <p className="text-stone-600 font-light text-sm">Pre, tokom i nakon kupovine i ugradnje</p>
                                </div>
                            </div>
                        </div>

                        {/* Desna strana - Forma i akcije */}
                        <div className={getAnimationClasses('delay-400')}>
                            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-stone-200">
                                <h3 className="text-xl font-medium text-stone-800 mb-6">
                                    Pošaljite upit ili zakažite konsultaciju
                                </h3>

                                <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">
                                            Vaša email adresa
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="primer@email.com"
                                            required
                                            className="w-full px-4 py-3 border border-stone-300 rounded-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1">
                                            Poruka (opciono)
                                        </label>
                                        <textarea
                                            id="message"
                                            rows={4}
                                            placeholder="Opišite vaš projekat ili pitanje..."
                                            className="w-full px-4 py-3 border border-stone-300 rounded-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className={`w-full px-6 py-3 bg-amber-500 text-stone-900 rounded-sm hover:bg-amber-400 transition-all duration-300 flex items-center justify-center group ${
                                            hoveredButton === 'submit' ? 'shadow-md' : ''
                                        }`}
                                        onMouseEnter={() => setHoveredButton('submit')}
                                        onMouseLeave={() => setHoveredButton(null)}
                                    >
                                        <span>Pošaljite upit</span>
                                        <ArrowRight className={`ml-2 h-4 w-4 transition-transform duration-300 ${
                                            hoveredButton === 'submit' ? 'translate-x-1' : ''
                                        }`} />
                                    </button>
                                </form>

                                <div className="flex flex-col space-y-3">
                                    <a
                                        href="/kontakt"
                                        className={`px-6 py-3 border border-stone-400 text-stone-800 rounded-sm hover:bg-stone-50 transition-all duration-300 inline-flex items-center justify-center text-sm uppercase tracking-wider font-light ${
                                            hoveredButton === 'contact' ? 'border-amber-400' : ''
                                        }`}
                                        onMouseEnter={() => setHoveredButton('contact')}
                                        onMouseLeave={() => setHoveredButton(null)}
                                    >
                                        Kontakt stranica
                                    </a>
                                    <a
                                        href="/reference"
                                        className={`px-6 py-3 border border-stone-400 text-stone-800 rounded-sm hover:bg-stone-50 transition-all duration-300 inline-flex items-center justify-center text-sm uppercase tracking-wider font-light ${
                                            hoveredButton === 'reference' ? 'border-amber-400' : ''
                                        }`}
                                        onMouseEnter={() => setHoveredButton('reference')}
                                        onMouseLeave={() => setHoveredButton(null)}
                                    >
                                        Pogledajte naše projekte
                                    </a>
                                </div>
                            </div>

                            {/* Tim i slike proizvoda */}
                            <div className={`mt-6 flex items-center justify-between ${getAnimationClasses('delay-600')}`}>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
                                        <img
                                            src="https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Team/zeljko-savic.jpg"
                                            alt="Željko Savić"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-stone-800">Željko Savić</p>
                                        <p className="text-xs text-stone-500">Glavni kontakt</p>
                                    </div>
                                </div>
                                <div className="text-sm text-amber-600 font-medium">
                                    Od 2019. godine
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dodatni dekorativni elementi - blagi i minimalistički */}
                    <div className={`mt-16 relative ${getAnimationClasses('delay-700')}`}>
                        <div className="absolute top-0 left-1/4 w-12 h-12 rounded-full border border-amber-200 opacity-50"></div>
                        <div className="absolute bottom-0 right-1/4 w-8 h-8 rounded-full border border-amber-200 opacity-50"></div>
                    </div>
                </div>
            </Container>
        </section>
    );
}