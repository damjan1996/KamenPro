// src/pages/products/components/ProductsFAQ.tsx
import { useState, useEffect } from "react";
import { Container } from "../../../components/ui/Container";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ProductsFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setIsVisible(true);
            }
        }, { threshold: 0.1 });

        const section = document.getElementById("products-faq");
        if (section) observer.observe(section);

        return () => {
            if (section) observer.unobserve(section);
        };
    }, []);

    const faqs = [
        {
            id: 1,
            question: "Koji tip kamene obloge je najbolji za kupatilo?",
            answer: "Za kupatila preporučujemo travertin ili mermer sa zaštitnim premazom koji sprečava prodor vlage. Ovi materijali su izdržljivi u vlažnim uslovima i pružaju elegantan izgled."
        },
        {
            id: 2,
            question: "Koliko je teško održavati kamene obloge?",
            answer: "Održavanje kamenih obloga je jednostavno. Za redovno čišćenje dovoljna je voda i neutralni sapun. Preporučuje se periodično obnavljanje zaštitnog premaza, obično jednom u 1-2 godine, u zavisnosti od tipa kamena i izloženosti."
        },
        {
            id: 3,
            question: "Da li mogu sami da postavim kamene obloge?",
            answer: "Iako je moguće samostalno postavljanje, preporučujemo angažovanje profesionalaca, posebno za veće površine. Pravilno postavljanje zahteva iskustvo i alate kako bi se osigurali dugotrajnost i estetika."
        },
        {
            id: 4,
            question: "Koje su cene vaših kamenih obloga po kvadratnom metru?",
            answer: "Cene variraju u zavisnosti od tipa kamena, završne obrade i veličine. Prirodni kamen počinje od 25€/m², dok ekskluzivniji materijali mogu koštati 60-100€/m². Kontaktirajte nas za detaljniju ponudu."
        },
        {
            id: 5,
            question: "Koliko vremena je potrebno za isporuku nakon porudžbine?",
            answer: "Standardni proizvodi su obično dostupni u roku od 7-14 dana. Za posebne porudžbine ili veće količine, rok isporuke može biti 3-4 nedelje."
        }
    ];

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Animacijski varijanti za naslov
    const titleVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    // Animacijski varijanti za FAQ stavke
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <section id="products-faq" className="py-24 bg-stone-50">
            <Container>
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <motion.span
                            className="text-sm uppercase tracking-widest text-stone-500 block mb-2"
                            initial="hidden"
                            animate={isVisible ? "visible" : "hidden"}
                            variants={titleVariants}
                        >
                            Pitanja i odgovori
                        </motion.span>
                        <motion.h2
                            className="text-4xl md:text-5xl font-bold text-stone-800 mb-4"
                            initial="hidden"
                            animate={isVisible ? "visible" : "hidden"}
                            variants={titleVariants}
                        >
                            Često postavljana pitanja
                        </motion.h2>
                        <motion.div
                            className="h-px w-20 bg-stone-300 mx-auto mb-8"
                            initial={{ scaleX: 0 }}
                            animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                        />
                        <motion.p
                            className="text-stone-600 max-w-lg mx-auto"
                            initial={{ opacity: 0 }}
                            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            Pronađite odgovore na najčešća pitanja o našim proizvodima, instalaciji i održavanju
                        </motion.p>
                    </div>

                    <motion.div
                        className="space-y-4"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isVisible ? "visible" : "hidden"}
                    >
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={faq.id}
                                className="border border-stone-200 rounded-none overflow-hidden"
                                variants={itemVariants}
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                <button
                                    className={`w-full flex justify-between items-center p-6 text-left focus:outline-none transition-colors ${
                                        openIndex === index ? "bg-stone-50" : "bg-white hover:bg-stone-50"
                                    }`}
                                    onClick={() => toggleFAQ(index)}
                                >
                                    <div className="flex items-center">
                                        <span className="text-xs font-light text-stone-400 mr-4 hidden md:block">
                                            {(index + 1).toString().padStart(2, '0')}
                                        </span>
                                        <span className="text-lg font-medium text-stone-800">{faq.question}</span>
                                    </div>
                                    <motion.div
                                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className={`p-1 rounded-full ${openIndex === index ? 'bg-stone-800 text-white' : 'text-stone-800'}`}
                                    >
                                        <ChevronDown className="w-4 h-4" />
                                    </motion.div>
                                </button>

                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 pt-0 border-t border-stone-100">
                                                <p className="text-stone-600 pl-0 md:pl-10">{faq.answer}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        className="mt-12 flex flex-col md:flex-row justify-between items-center bg-stone-100 p-8 rounded-none"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                    >
                        <div className="mb-6 md:mb-0">
                            <h3 className="text-xl font-semibold text-stone-800 mb-2">Imate još pitanja?</h3>
                            <p className="text-stone-600">Naš tim je tu da vam pomogne sa svim dodatnim informacijama</p>
                        </div>
                        <motion.button
                            className="px-8 py-3 bg-stone-800 text-white inline-flex items-center group"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span>Kontaktirajte nas</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </motion.button>
                    </motion.div>

                    {/* Statistike */}
                    <motion.div
                        className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
                        initial={{ opacity: 0 }}
                        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.7, delay: 0.9 }}
                    >
                        <div className="p-4 border-t border-stone-200">
                            <div className="text-xl md:text-3xl font-bold text-stone-800">[30+]</div>
                            <div className="text-sm text-stone-500 mt-1">Godina iskustva</div>
                        </div>
                        <div className="p-4 border-t border-stone-200">
                            <div className="text-xl md:text-3xl font-bold text-stone-800">[90%]</div>
                            <div className="text-sm text-stone-500 mt-1">Zadovoljnih kupaca</div>
                        </div>
                        <div className="p-4 border-t border-stone-200">
                            <div className="text-xl md:text-3xl font-bold text-stone-800">[86]</div>
                            <div className="text-sm text-stone-500 mt-1">Profesionalaca</div>
                        </div>
                        <div className="p-4 border-t border-stone-200">
                            <div className="text-xl md:text-3xl font-bold text-stone-800">[254,267]</div>
                            <div className="text-sm text-stone-500 mt-1">m² ugrađenog materijala</div>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}