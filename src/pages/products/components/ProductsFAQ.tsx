// src/pages/products/components/ProductsFAQ.tsx
import { useState, useEffect, useRef } from "react";
import { Container } from "../../../components/ui/Container";
import { ChevronDown } from "lucide-react";

export function ProductsFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [isVisible, setIsVisible] = useState(false);
    const accordionRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setIsVisible(true);
            }
        }, { threshold: 0.1 });

        const section = document.getElementById('faq-section');
        if (section) {
            observer.observe(section);
        }

        return () => {
            if (section) {
                observer.unobserve(section);
            }
        };
    }, []);

    // FAQ data
    const faqs = [
        {
            question: 'Koliko su trajne kamene obloge?',
            answer: 'Pravilno ugrađene i održavane, kamene obloge mogu trajati više decenija. Prirodni kamen je jedan od najtrajnijih građevinskih materijala koji postoji, što ga čini izuzetnom dugoročnom investicijom za vaš dom ili poslovni prostor.'
        },
        {
            question: 'Da li je potrebno posebno održavanje kamenih obloga?',
            answer: 'Kamene obloge zahtevaju minimalno održavanje. Za većinu tipova kamena, dovoljno je redovno čišćenje blagim sapunom i vodom. Preporučujemo nanošenje zaštitnog impregnacionog sredstva svakih nekoliko godina, u zavisnosti od vrste kamena i njegove izloženosti.'
        },
        {
            question: 'Da li su kamene obloge pogodne za kupatila i kuhinje?',
            answer: 'Da, mnoge vrste kamena su odlične za vlažne prostorije poput kupatila i kuhinja. Međutim, važno je izabrati pravu vrstu kamena i obezbediti adekvatnu zaštitu. Neki tipovi kamena, poput krečnjaka i mermera, su porozniji i mogu zahtevati češće tretiranje zaštitnim sredstvima u vlažnim okruženjima.'
        },
        {
            question: 'Da li mogu sami postaviti kamene obloge?',
            answer: 'Iako je samostalna ugradnja moguća za one sa iskustvom u građevinskim poslovima, preporučujemo profesionalnu ugradnju. Pravilna priprema površine, primena odgovarajućeg lepka i precizno postavljanje su ključni za dugotrajan i estetski privlačan rezultat.'
        },
        {
            question: 'Koje su prednosti kamenih obloga u odnosu na druge materijale?',
            answer: 'Kamene obloge nude brojne prednosti: izuzetnu dugotrajnost, otpornost na vatru, dobra toplotna izolacija, ekološka prihvatljivost, jedinstvena prirodna lepota i povećana vrednost nekretnine. Svaki komad prirodnog kamena je jedinstven, što vašem prostoru daje autentičan i luksuzni izgled koji je teško postići drugim materijalima.'
        }
    ];

    const toggleQuestion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq-section" className="py-16 md:py-24">
            <Container>
                <div className={`mb-12 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Česta pitanja</h2>
                    <p className="text-lg text-stone-600 max-w-3xl mx-auto">
                        Odgovori na najčešće postavljena pitanja o našim kamenim oblogama
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
                    <div className={`space-y-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-sm border border-stone-200"
                                ref={el => accordionRefs.current[index] = el}
                            >
                                <button
                                    onClick={() => toggleQuestion(index)}
                                    className="flex justify-between items-center w-full p-5 text-left focus:outline-none"
                                >
                                    <h3 className="text-lg font-medium">{faq.question}</h3>
                                    <ChevronDown
                                        className={`w-5 h-5 text-amber-600 transition-transform duration-300 ${openIndex === index ? 'transform rotate-180' : ''}`}
                                    />
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${
                                        openIndex === index
                                            ? 'max-h-96 opacity-100'
                                            : 'max-h-0 opacity-0'
                                    }`}
                                >
                                    <div className="p-5 pt-0 text-stone-600">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={`mt-12 text-center transition-all duration-500 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    <p className="text-lg text-stone-600 mb-4">Imate još pitanja?</p>
                    <a
                        href="/kontakt"
                        className="inline-flex items-center px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
                    >
                        Kontaktirajte nas
                    </a>
                </div>
            </Container>
        </section>
    );
}