// src/pages/contact/components/FAQ.tsx
import { useState, useEffect, useRef } from "react";
import { ChevronDown, Search, MessageCircle, ArrowRight } from "lucide-react";
import { Container } from "../../../components/ui/Container";

interface FAQItem {
    question: string;
    answer: string;
    category: string;
}

export function FAQSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedHeight, setExpandedHeight] = useState<Record<number, number>>({});
    const answerRefs = useRef<(HTMLDivElement | null)[]>([]);
    const sectionRef = useRef<HTMLElement | null>(null);

    // Realni FAQ podaci iz KamenPro dokumentacije
    const faqItems: FAQItem[] = [
        {
            question: "Koji su standardni materijali koje koristite u proizvodnji?",
            answer: "Dekorativni kamen radimo na bazi belog cementa i drugih aditiva kao i boja, što mu daje kvalitet i mogućnost upotrebe na vanjskim i unutrašnjim zidovima.",
            category: "materijali"
        },
        {
            question: "Koje su prednosti vaših proizvoda u odnosu na konkurenciju?",
            answer: "Počevši od toga da vodimo računa o kvalitetu kroz ručnu proizvodnju i upotrebu najkavlitetnijih, proverenih materijala za proizvodnju dekorativnog kamena do toga da mu damo dovoljno vremenskog prostora ukoliko bi se on mogao formirati tokom sušenja.",
            category: "kvalitet"
        },
        {
            question: "Da li su vaši proizvodi otporni na vlagu, vatru ili druge spoljne uticaje?",
            answer: "Da, naši proizvodi su otporni na svaku vrstu vremenskih uslova - kišu, sneg ili nevreme. Takođe su otporni na vlagu, vatru i ostale spoljne uticaje vanjske upotrebe.",
            category: "karakteristike"
        },
        {
            question: "Kako se pravilno postavljaju vaše zidne obloge?",
            answer: "Pre postavljanja obloga na zidnu površinu potrebno je pravilna priprema površine što znači da površina treba biti čista i u stanju da bude grundirana pre nego što se postavlja lepak za kamen.",
            category: "instalacija"
        },
        {
            question: "Koji lepak preporučujete za ugradnju?",
            answer: "Izbor lepka zavisi od toga da li se lepi na vanjske ili unutrašnje zidove. Preporučujemo lepak koji je namenjen za kamen ili cigle.",
            category: "instalacija"
        },
        {
            question: "Da li nudite uslugu ugradnje ili samo prodajete proizvode?",
            answer: "Postoji mogućnost ugradnje po dogovoru. Takođe pružamo tehničku podršku i savete kupcima koji sami ugrađuju naše proizvode.",
            category: "usluge"
        },
        {
            question: "Koja je cena po m² za različite vrste obloga koje nudite?",
            answer: "Cena dekorativnog kamena se kreće između 33 BAM do 40 BAM. Cena dekorativne rustik cigle se kreće od 25 BAM do 30 BAM. Za veće količine nudimo popuste po dogovoru.",
            category: "cene"
        }
    ];

    // Filter FAQ stavki prema terminu pretrage
    const filteredFAQs = faqItems.filter(
        (item) =>
            item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

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

    useEffect(() => {
        // Merenje visine elemenata odgovora
        answerRefs.current.forEach((ref, index) => {
            if (ref) {
                setExpandedHeight((prev) => ({
                    ...prev,
                    [index]: ref.scrollHeight
                }));
            }
        });
    }, [filteredFAQs]);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    // Pomoćna funkcija za animacijske klase
    const getAnimationClasses = (delay: string = "") => {
        return `transition-all duration-700 transform ${delay} ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`;
    };

    // Komponenta za pojedinačno FAQ pitanje
    const FAQItem = ({ item, index }: { item: FAQItem; index: number }) => (
        <div
            className={getAnimationClasses(`delay-${300 + index * 100}`)}
            style={{ transitionDelay: `${300 + index * 100}ms` }}
        >
            <div
                className={`border rounded-lg overflow-hidden transition-all duration-300 ${
                    activeIndex === index
                        ? "border-amber-200 shadow-md bg-white"
                        : "border-stone-200 bg-white hover:border-amber-100 hover:shadow-sm"
                }`}
            >
                {/* Pitanje zaglavlje */}
                <button
                    className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={activeIndex === index}
                >
                    <h3
                        className={`text-lg font-medium pr-8 transition-colors duration-300 ${
                            activeIndex === index ? "text-amber-700" : "text-stone-800"
                        }`}
                    >
                        {item.question}
                    </h3>
                    <span
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                            activeIndex === index ? "bg-amber-100 rotate-180" : "bg-stone-100"
                        }`}
                    >
                        <ChevronDown
                            className={`w-5 h-5 transition-colors duration-300 ${
                                activeIndex === index ? "text-amber-600" : "text-stone-500"
                            }`}
                        />
                    </span>
                </button>

                {/* Odgovor sadržaj */}
                <div
                    className="overflow-hidden transition-all duration-500 ease-in-out"
                    style={{
                        maxHeight: activeIndex === index ? `${expandedHeight[index]}px` : "0px",
                        opacity: activeIndex === index ? 1 : 0
                    }}
                >
                    <div
                        ref={(el) => {
                            answerRefs.current[index] = el;
                        }}
                        className="px-6 pb-6"
                    >
                        <div className="pt-2 border-t border-stone-100"></div>
                        <p className="mt-4 text-stone-600 leading-relaxed font-light">
                            {item.answer}
                        </p>

                        {/* Kategorija tag i dugmići za povratne informacije */}
                        <div className="mt-4 flex flex-wrap items-center justify-between">
                          <span className="inline-block bg-amber-50 text-amber-800 text-xs px-2 py-1 rounded-full mt-2 font-light">
                            {item.category}
                          </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <section
            ref={sectionRef}
            id="faq-section"
            className="py-16 md:py-24 bg-white font-sans relative overflow-hidden"
        >
            {/* Dekorativni elementi */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-amber-50 rounded-full opacity-30 blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-50 rounded-full opacity-30 blur-3xl transform translate-x-1/2 translate-y-1/2"></div>

            <Container>
                <div className={`text-center mb-16 ${getAnimationClasses("duration-1000 ease-out")}`}>
                    <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-4 tracking-wide uppercase">
                        Često postavljena <span className="font-medium">pitanja</span>
                    </h2>
                    <div className="w-16 h-1 bg-amber-500 mx-auto mb-6"></div>
                    <p className="text-stone-600 max-w-2xl mx-auto font-light">
                        Pronađite odgovore na najčešća pitanja o našim proizvodima i uslugama. Ako ne možete
                        pronaći odgovor koji tražite, slobodno nas kontaktirajte direktno.
                    </p>
                </div>

                {/* Pretraga */}
                <div className={getAnimationClasses("delay-200")}>
                    <div className="max-w-2xl mx-auto mb-12">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Pretražite pitanja..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full py-3 pl-12 pr-4 bg-white border border-stone-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all duration-300"
                            />
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5" />
                        </div>
                    </div>
                </div>

                {/* FAQ akordeoni */}
                <div className="max-w-3xl mx-auto">
                    {filteredFAQs.length > 0 ? (
                        <div className="space-y-4">
                            {filteredFAQs.map((item, index) => (
                                <FAQItem key={index} item={item} index={index} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center p-8 bg-stone-50 rounded-lg">
                            <p className="text-stone-600 font-light">
                                Nema rezultata za vašu pretragu. Pokušajte sa drugačijim terminima.
                            </p>
                        </div>
                    )}

                    {/* Postavite dodatno pitanje */}
                    <div className={getAnimationClasses("delay-700 mt-12 text-center")}>
                        <p className="text-stone-600 mb-4 font-light">Niste pronašli odgovor na vaše pitanje?</p>
                        <a
                            href="#kontakt-forma"
                            className="inline-flex items-center px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-900 rounded-sm shadow-md transition-all duration-300 group"
                        >
                            <span>Kontaktirajte nas</span>
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </Container>

            {/* Ploveće dugme za akciju optimizovano za mobilne uređaje */}
            <div className="md:hidden fixed bottom-6 right-6 z-20">
                <a
                    href="#kontakt-forma"
                    className="flex items-center justify-center w-12 h-12 bg-amber-500 text-stone-900 rounded-full shadow-lg hover:bg-amber-400 transition-colors"
                >
                    <MessageCircle className="w-6 h-6" />
                </a>
            </div>

            {/* Animirani dekorativni elementi */}
            <div
                className="absolute top-1/4 left-10 w-3 h-3 rounded-full bg-amber-400 opacity-30 animate-pulse"
                style={{ animationDuration: "3s" }}
            ></div>
            <div
                className="absolute top-1/3 right-1/4 w-4 h-4 rounded-full bg-amber-400 opacity-20 animate-pulse"
                style={{ animationDuration: "4s" }}
            ></div>
            <div
                className="absolute bottom-1/4 right-10 w-3 h-3 rounded-full bg-amber-400 opacity-20 animate-pulse"
                style={{ animationDuration: "5s" }}
            ></div>
        </section>
    );
}