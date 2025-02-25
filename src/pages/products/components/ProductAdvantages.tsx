// src/pages/products/components/ProductAdvantages.tsx
import { useState, useEffect } from "react";
import { Container } from "../../../components/ui/Container";
import { Shield, Clock, Leaf, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";

export function ProductAdvantages() {
    const [activeAdvantage, setActiveAdvantage] = useState<number | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setIsVisible(true);
            }
        }, { threshold: 0.1 });

        const section = document.getElementById("product-advantages");
        if (section) observer.observe(section);

        return () => {
            if (section) observer.unobserve(section);
        };
    }, []);

    const advantages = [
        {
            id: 1,
            icon: Shield,
            title: "Izdržljivost",
            description: "Naše kamene obloge su izuzetno izdržljive i otporne na habanje i vremenske uslove.",
            color: "bg-gradient-to-br from-orange-400 to-red-500"
        },
        {
            id: 2,
            icon: Clock,
            title: "Dugotrajnost",
            description: "Sa pravilnim održavanjem, naši proizvodi mogu trajati decenijama bez gubitka kvaliteta.",
            color: "bg-gradient-to-br from-blue-400 to-blue-600"
        },
        {
            id: 3,
            icon: Leaf,
            title: "Ekološki prihvatljivo",
            description: "Koristimo prirodne materijale i održive proizvodne procese za očuvanje životne sredine.",
            color: "bg-gradient-to-br from-green-400 to-green-600"
        },
        {
            id: 4,
            icon: ThumbsUp,
            title: "Jednostavno održavanje",
            description: "Naše obloge zahtevaju minimalno održavanje za očuvanje lepote i funkcionalnosti.",
            color: "bg-gradient-to-br from-purple-400 to-purple-600"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <section id="product-advantages" className="py-20 bg-stone-50">
            <Container>
                <div className="text-center mb-16">
                    <motion.span
                        className="text-sm font-medium text-stone-500 tracking-wider uppercase block mb-3"
                        initial={{ opacity: 0, y: -10 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                        transition={{ duration: 0.5 }}
                    >
                        Zašto izabrati nas
                    </motion.span>
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold text-stone-800 mb-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Prednosti naših proizvoda
                    </motion.h2>
                    <motion.div
                        className="h-1 w-24 bg-orange-500 mx-auto mb-6"
                        initial={{ scaleX: 0 }}
                        animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    />
                    <motion.p
                        className="max-w-2xl mx-auto text-lg text-stone-600"
                        initial={{ opacity: 0 }}
                        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        Istražite vrhunske kvalitete koje naši proizvodi donose vašem prostoru
                    </motion.p>
                </div>

                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                >
                    {advantages.map((advantage) => (
                        <motion.div
                            key={advantage.id}
                            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300"
                            variants={itemVariants}
                            onMouseEnter={() => setActiveAdvantage(advantage.id)}
                            onMouseLeave={() => setActiveAdvantage(null)}
                            whileHover={{ y: -10 }}
                        >
                            <div className={`${advantage.color} h-3 w-full`} />
                            <div className="p-6 md:p-8">
                                <motion.div
                                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 text-white ${advantage.color}`}
                                    animate={{
                                        scale: activeAdvantage === advantage.id ? 1.1 : 1,
                                        rotate: activeAdvantage === advantage.id ? 10 : 0
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <advantage.icon className="w-8 h-8" />
                                </motion.div>
                                <h3 className="text-xl md:text-2xl font-semibold text-stone-800 mb-3">{advantage.title}</h3>
                                <p className="text-stone-600">{advantage.description}</p>

                                <motion.div
                                    className="mt-6 flex items-center text-sm font-medium text-stone-500 group cursor-pointer"
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        opacity: activeAdvantage === advantage.id ? 1 : 0,
                                        y: activeAdvantage === advantage.id ? 0 : 10
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <span className="group-hover:text-orange-500 transition-colors">Saznajte više</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 ml-1 text-stone-400 group-hover:text-orange-500 transform group-hover:translate-x-1 transition-all"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.7, delay: 0.8 }}
                >
                    <motion.button
                        className="px-8 py-3 bg-stone-800 text-white rounded-full inline-flex items-center font-medium hover:bg-stone-700 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span>Pogledajte sve proizvode</span>
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

                {/* Dodatne kategorije */}
                <motion.div
                    className="mt-24 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.7, delay: 1 }}
                >
                    <motion.h3
                        className="text-2xl font-bold text-stone-800 mb-8 text-center"
                        initial={{ opacity: 0, y: -10 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                        transition={{ duration: 0.5, delay: 1.1 }}
                    >
                        Istražite naše kategorije
                    </motion.h3>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {[
                            { name: "Spavaća Soba", color: "from-orange-400 to-red-500" },
                            { name: "Dnevna Soba", color: "from-slate-100 to-slate-200" },
                            { name: "Trpezarija", color: "from-blue-400 to-blue-600" },
                            { name: "Čitaonica", color: "from-stone-100 to-stone-200" },
                            { name: "Kancelarija", color: "from-green-400 to-green-600" }
                        ].map((category, index) => (
                            <motion.div
                                key={index}
                                className={`bg-gradient-to-br ${category.color} rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5, delay: 1.2 + (index * 0.1) }}
                                whileHover={{ y: -5 }}
                            >
                                <h4 className={`text-lg font-medium ${category.color.includes('slate') || category.color.includes('stone') ? 'text-stone-800' : 'text-white'}`}>
                                    {category.name}
                                </h4>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}