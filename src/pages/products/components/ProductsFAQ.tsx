// src/pages/products/components/ProductsFAQ.tsx
import { useState, useEffect, useRef } from "react";
import { Container } from "../../../components/ui/Container";
import { ChevronDown, ArrowRight, Phone } from "lucide-react";

export function ProductsFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
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
            { threshold: 0.1 }
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

    const faqs = [
        {
            id: 1,
            question: "Da li vršite dostavu proizvoda?",
            answer: "Da, vršimo dostavu u krugu od 50km od Bijeljine. Za ostale lokacije dostava je moguća po dogovoru."
        },
        {
            id: 2,
            question: "Koliko je potrebno materijala za određenu površinu?",
            answer: "Za preciznu procenu potrebne količine materijala, savetujemo vam da nas kontaktirate sa tačnim dimenzijama vaše površine. Naši stručnjaci će vam pomoći u određivanju optimalne količine, uzimajući u obzir specifičnosti projekta."
        },
        {
            id: 3,
            question: "Da li je potrebno posebno održavanje obloga?",
            answer: "Nakon ugradnje, obloge je potrebno premazati zaštitnim prajmerom koji se može nabaviti u bolje opremljenim prodavnicama boja i lakova. Ovo omogućava dugotrajnost i očuvanje izgleda vaših obloga."
        },
        {
            id: 4,
            question: "Da li mogu samostalno ugraditi obloge?",
            answer: "Da, naše obloge su dizajnirane tako da ih mogu ugraditi i osobe sa osnovnim DIY veštinama. Pružamo detaljne instrukcije i dostupni smo za savete. Potreban vam je osnovni alat poput špatle, brusilice za sečenje kamena, libele i merne trake."
        },
        {
            id: 5,
            question: "Koje su cene vaših obloga po kvadratnom metru?",
            answer: "Cena dekorativnog kamena se kreće između 33 KM do 40 KM po m². Cena dekorativne rustik cigle se kreće od 25 KM do 30 KM po m². Za veće porudžbine nudimo popuste po dogovoru."
        },
        {
            id: 6,
            question: "Koliko je rok isporuke od trenutka poručivanja?",
            answer: "Rok isporuke zavisi od količine i trenutnih zaliha odgovarajućeg proizvoda. Uglavnom imamo proizvode na raspolaganju, ali za veće količine ili specifične zahteve, preporučujemo da nas kontaktirate za precizan rok isporuke."
        },
        {
            id: 7,
            question: "Da li nudite uslugu ugradnje?",
            answer: "Da, nudimo uslugu ugradnje po dogovoru. Naš stručni tim može profesionalno ugraditi naše proizvode, osiguravajući optimalan rezultat i dugotrajnost."
        }
    ];

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Pomoćna funkcija za dobijanje klasa animacije
    const getAnimationClasses = (delay: string = '') => `
        transition-all duration-700 ${delay} ease-out transform 
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
    `.trim();

    return (
        <section
            ref={sectionRef}
            id="cesta-pitanja"
            className="py-16 md:py-24 bg-stone-50 font-sans overflow-hidden"
        >
            <Container>
                <div className="max-w-4xl mx-auto">
                    {/* Zaglavlje */}
                    <div className={`text-center mb-12 md:mb-16 ${getAnimationClasses()}`}>
                        <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-4 uppercase tracking-wide">
                            Često postavljana <span className="font-medium">pitanja</span>
                        </h2>
                        <div className="w-16 h-1 bg-amber-500 mx-auto mb-6"></div>
                        <p className="text-stone-600 max-w-2xl mx-auto font-light">
                            Pronađite odgovore na najčešća pitanja o našim proizvodima, ugradnji i održavanju.
                            Ako ne vidite odgovor na vaše pitanje, slobodno nas kontaktirajte.
                        </p>
                    </div>

                    {/* FAQ Stavke */}
                    <div className={`space-y-3 ${getAnimationClasses('delay-200')}`}>
                        {faqs.map((faq, index) => (
                            <div
                                key={faq.id}
                                className="border border-stone-200 bg-white overflow-hidden transition-all duration-300 hover:shadow-sm"
                            >
                                <button
                                    className="w-full flex justify-between items-center p-4 md:p-6 text-left focus:outline-none"
                                    onClick={() => toggleFAQ(index)}
                                >
                                    <div className="flex items-center">
                                        <span className="text-xs font-light text-amber-500 mr-4 hidden md:block">
                                            {(index + 1).toString().padStart(2, '0')}
                                        </span>
                                        <span className="text-base md:text-lg font-medium text-stone-800">{faq.question}</span>
                                    </div>
                                    <div
                                        className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                                            openIndex === index
                                                ? 'bg-amber-500 text-white'
                                                : 'bg-stone-100 text-stone-600'
                                        }`}
                                    >
                                        <ChevronDown
                                            className={`w-4 h-4 transition-transform duration-300 ${
                                                openIndex === index ? 'transform rotate-180' : ''
                                            }`}
                                        />
                                    </div>
                                </button>

                                <div
                                    className={`overflow-hidden transition-all duration-300 ${
                                        openIndex === index
                                            ? 'max-h-96 opacity-100'
                                            : 'max-h-0 opacity-0'
                                    }`}
                                >
                                    <div className="px-6 pb-6 pt-0 border-t border-stone-100">
                                        <p className="text-stone-600 font-light pl-0 md:pl-10">{faq.answer}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Kontakt CTA */}
                    <div className={`mt-12 bg-amber-50 p-6 md:p-8 border border-amber-100 ${getAnimationClasses('delay-400')}`}>
                        <div className="md:flex md:items-center md:justify-between">
                            <div className="mb-6 md:mb-0">
                                <h3 className="text-xl font-medium text-stone-800 mb-2">Imate dodatna pitanja?</h3>
                                <p className="text-stone-600 font-light">Naš tim vam stoji na raspolaganju za sve informacije.</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <a
                                    href="/kontakt"
                                    className={`px-6 py-3 bg-amber-500 text-stone-900 rounded-sm hover:bg-amber-400 transition-all duration-300 inline-flex items-center justify-center text-sm uppercase tracking-wider font-light group ${
                                        hoveredButton === 'contact' ? 'shadow-md' : ''
                                    }`}
                                    onMouseEnter={() => setHoveredButton('contact')}
                                    onMouseLeave={() => setHoveredButton(null)}
                                >
                                    Kontaktirajte nas
                                    <ArrowRight className={`ml-2 h-4 w-4 transition-transform duration-300 ${
                                        hoveredButton === 'contact' ? 'translate-x-1' : ''
                                    }`} />
                                </a>
                                <a
                                    href="tel:+38765678634"
                                    className={`px-6 py-3 border border-stone-400 text-stone-800 rounded-sm hover:bg-white transition-all duration-300 inline-flex items-center justify-center text-sm uppercase tracking-wider font-light ${
                                        hoveredButton === 'call' ? 'border-amber-400' : ''
                                    }`}
                                    onMouseEnter={() => setHoveredButton('call')}
                                    onMouseLeave={() => setHoveredButton(null)}
                                >
                                    <Phone className="mr-2 h-4 w-4" />
                                    +387 65 678 634
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Informativni blokovi */}
                    <div className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 ${getAnimationClasses('delay-600')}`}>
                        <div className="bg-white p-6 border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4">
                                <span className="text-xl font-medium">01</span>
                            </div>
                            <h3 className="text-lg font-medium text-stone-800 mb-3">Kvalitet</h3>
                            <p className="text-stone-600 font-light">
                                Naši proizvodi su izrađeni od belih cementa sa aditivima, što im daje kvalitet i izdržljivost za unutrašnju i spoljašnju upotrebu.
                            </p>
                        </div>
                        <div className="bg-white p-6 border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4">
                                <span className="text-xl font-medium">02</span>
                            </div>
                            <h3 className="text-lg font-medium text-stone-800 mb-3">Otpornost</h3>
                            <p className="text-stone-600 font-light">
                                Dekorativne obloge su otporne na sve vrste vremenskih uslova - kišu, sneg, mraz, kao i na vlagu, vatru i druge spoljne uticaje.
                            </p>
                        </div>
                        <div className="bg-white p-6 border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4">
                                <span className="text-xl font-medium">03</span>
                            </div>
                            <h3 className="text-lg font-medium text-stone-800 mb-3">Podrška</h3>
                            <p className="text-stone-600 font-light">
                                Stojimo na raspolaganju za sve informacije o našim proizvodima, stručne savete i podršku pre, tokom i nakon kupovine.
                            </p>
                        </div>
                    </div>

                    {/* Radno vreme */}
                    <div className={`mt-16 text-center ${getAnimationClasses('delay-800')}`}>
                        <h3 className="text-lg font-medium text-stone-800 mb-4">Radno vreme</h3>
                        <div className="inline-flex justify-center space-x-8 md:space-x-16 bg-white py-4 px-8 shadow-sm border border-stone-200">
                            <div>
                                <p className="text-stone-600 font-light">Ponedeljak - Subota</p>
                                <p className="text-stone-800 font-medium">09:00 - 18:00</p>
                            </div>
                            <div>
                                <p className="text-stone-600 font-light">Nedelja</p>
                                <p className="text-stone-800 font-medium">Zatvoreno</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}