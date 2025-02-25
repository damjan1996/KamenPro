// src/pages/contact/components/FAQ.tsx
import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Search, Plus, MessageCircle } from 'lucide-react';

export const FAQSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedHeight, setExpandedHeight] = useState({});
    const answerRefs = useRef([]);

    const faqItems = [
        {
            question: "Koliko košta konsultacija?",
            answer: "Inicijalne konsultacije su besplatne za sve potencijalne klijente. Tokom ove konsultacije razgovaramo o vašim potrebama, idejama i budžetu. Nakon toga, za detaljnije planiranje i posete lokaciji naplaćujemo konsultaciju koja se kasnije oduzima od ukupne cene projekta ako odlučite da sarađujemo.",
            category: "cene"
        },
        {
            question: "Koliko dugo traju projekti?",
            answer: "Vremenski okvir projekta zavisi od njegove veličine i složenosti. Manji projekti poput oblaganja pojedinačnih zidova mogu biti završeni za 1-2 nedelje. Srednji projekti obično traju 3-4 nedelje, dok veći projekti, kao što su kompletna renoviranja, mogu trajati 2-3 meseca. Za svaki projekat pravimo detaljan vremenski plan koji delimo sa vama pre početka radova.",
            category: "projekti"
        },
        {
            question: "Da li radite i van Beograda?",
            answer: "Da, pružamo usluge na celoj teritoriji Srbije. Za projekte izvan Beograda naplaćujemo dodatne troškove transporta i smeštaja ako je potrebno. Imamo iskustva sa projektima širom zemlje i možemo organizovati logistiku efikasno za bilo koju lokaciju.",
            category: "lokacija"
        },
        {
            question: "Kakva je garancija na vaše usluge?",
            answer: "Na sve materijale dajemo garanciju od minimum 5 godina, dok na izvedene radove nudimo garanciju od 2 godine. Ovo pokriva sve potencijalne probleme sa materijalima ili izvođenjem. Dodatno, nudimo i godišnji pregled stanja i održavanje za naše klijente po povoljnijim cenama nakon isteka garantnog roka.",
            category: "garancija"
        },
        {
            question: "Da li mogu da posetim vaš salon?",
            answer: "Naravno, naš izložbeni salon je otvoren za posete tokom redovnog radnog vremena. U salonu možete videti uzorke svih materijala koje koristimo, primere završenih projekata i razgovarati sa našim dizajnerima. Preporučujemo da zakažete posetu unapred kako bismo vam mogli posvetiti punu pažnju i pripremiti uzorke koji bi vas mogli zanimati.",
            category: "posete"
        },
        {
            question: "Koje vrste kamena nudite?",
            answer: "Nudimo širok spektar prirodnih i veštačkih kamenih materijala. Od prirodnih imamo: mermer, granit, travertin, krečnjak, kvarcit i škriljac. Od veštačkih nudimo kvarcne kompozite, porcelan i teraco. Svaki materijal ima svoje specifične karakteristike, prednosti i namene, o čemu vas naši stručnjaci mogu detaljno informisati.",
            category: "materijali"
        },
        {
            question: "Da li radite i enterijere i eksterijere?",
            answer: "Da, specijalizovani smo za rad na oba tipa projekata. Za enterijere radimo podove, zidove, kupatila, kuhinje i dekorativne elemente. Za eksterijere izvodimo fasade, terase, staze, bazene i dekorativne elemente za baštenske prostore. Materijali se biraju prema nameni, uzimajući u obzir otpornost na atmosferske uslove za spoljne radove.",
            category: "projekti"
        }
    ];

    // Filter FAQ items by search term
    const filteredFAQs = faqItems.filter(item =>
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        const section = document.querySelector('.faq-section');
        if (section) {
            observer.observe(section);
        }

        return () => {
            if (section) {
                observer.unobserve(section);
            }
        };
    }, []);

    useEffect(() => {
        // Measure height of answer elements
        answerRefs.current.forEach((ref, index) => {
            if (ref) {
                setExpandedHeight(prev => ({
                    ...prev,
                    [index]: ref.scrollHeight
                }));
            }
        });
    }, [filteredFAQs]);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="faq-section py-20 relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-50 rounded-full opacity-30 blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-50 rounded-full opacity-30 blur-3xl transform translate-x-1/2 translate-y-1/2"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className={`text-center mb-16 transition-all duration-1000 ease-out ${
                    isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
                }`}>
                    <span className="inline-block text-blue-600 text-sm font-medium tracking-wider uppercase mb-2">Odgovori na vaša pitanja</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Često Postavljena Pitanja</h2>
                    <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Pronađite odgovore na najčešća pitanja o našim uslugama. Ako ne možete pronaći odgovor koji tražite, slobodno nas kontaktirajte direktno.
                    </p>
                </div>

                {/* Search bar */}
                <div className={`max-w-2xl mx-auto mb-12 transition-all duration-700 delay-200 ${
                    isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
                }`}>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Pretražite pitanja..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full py-3 pl-12 pr-4 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all duration-300"
                        />
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                </div>

                {/* FAQ accordions */}
                <div className="max-w-3xl mx-auto">
                    {filteredFAQs.length > 0 ? (
                        <div className="space-y-4">
                            {filteredFAQs.map((item, index) => (
                                <div
                                    key={index}
                                    className={`transition-all duration-700 transform ${
                                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                    }`}
                                    style={{ transitionDelay: `${300 + index * 100}ms` }}
                                >
                                    <div
                                        className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                                            activeIndex === index
                                                ? 'border-blue-200 shadow-md bg-white'
                                                : 'border-gray-200 bg-white hover:border-blue-100 hover:shadow-sm'
                                        }`}
                                    >
                                        {/* Question header */}
                                        <button
                                            className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
                                            onClick={() => toggleAccordion(index)}
                                            aria-expanded={activeIndex === index}
                                        >
                                            <h3 className={`text-lg font-semibold pr-8 transition-colors duration-300 ${
                                                activeIndex === index ? 'text-blue-700' : 'text-gray-800'
                                            }`}>
                                                {item.question}
                                            </h3>
                                            <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                                                activeIndex === index ? 'bg-blue-100 rotate-180' : 'bg-gray-100'
                                            }`}>
                                                <ChevronDown className={`w-5 h-5 transition-colors duration-300 ${
                                                    activeIndex === index ? 'text-blue-600' : 'text-gray-500'
                                                }`} />
                                            </span>
                                        </button>

                                        {/* Answer content */}
                                        <div
                                            className="overflow-hidden transition-all duration-500 ease-in-out"
                                            style={{
                                                maxHeight: activeIndex === index ? `${expandedHeight[index]}px` : '0px',
                                                opacity: activeIndex === index ? 1 : 0
                                            }}
                                        >
                                            <div
                                                ref={el => answerRefs.current[index] = el}
                                                className="px-6 pb-6"
                                            >
                                                <div className="pt-2 border-t border-gray-100"></div>
                                                <p className="mt-4 text-gray-600 leading-relaxed">
                                                    {item.answer}
                                                </p>

                                                {/* Category tag and feedback buttons */}
                                                <div className="mt-4 flex flex-wrap items-center justify-between">
                                                    <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full mt-2">
                                                        {item.category}
                                                    </span>

                                                    <div className="flex items-center space-x-2 mt-2">
                                                        <button className="text-xs text-gray-500 hover:text-blue-600 transition-colors flex items-center">
                                                            <MessageCircle className="w-3 h-3 mr-1" />
                                                            Postavite dodatno pitanje
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center p-8 bg-gray-50 rounded-lg">
                            <p className="text-gray-600">Nema rezultata za vašu pretragu. Pokušajte sa drugačijim terminima.</p>
                        </div>
                    )}

                    {/* Ask additional question */}
                    <div className={`mt-12 text-center transition-all duration-700 delay-700 ${
                        isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
                    }`}>
                        <p className="text-gray-600 mb-4">Niste pronašli odgovor na vaše pitanje?</p>
                        <a
                            href="#contact-form"
                            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-all duration-300 hover:shadow group"
                        >
                            <Plus className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:rotate-90" />
                            <span>Postavite nam pitanje</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Mobile optimized floating action button */}
            <div className="md:hidden fixed bottom-6 right-6 z-20">
                <a
                    href="#contact-form"
                    className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                >
                    <MessageCircle className="w-6 h-6" />
                </a>
            </div>

            {/* Animated decorative elements */}
            <div className="absolute top-1/4 left-10 w-3 h-3 rounded-full bg-blue-400 opacity-30 animate-pulse" style={{ animationDuration: '3s' }}></div>
            <div className="absolute top-1/3 right-1/4 w-4 h-4 rounded-full bg-purple-400 opacity-20 animate-pulse" style={{ animationDuration: '4s' }}></div>
            <div className="absolute bottom-1/4 right-10 w-3 h-3 rounded-full bg-blue-400 opacity-20 animate-pulse" style={{ animationDuration: '5s' }}></div>
        </section>
    );
};