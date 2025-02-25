// src/pages/products/components/ProductsHero.tsx
import { useState, useEffect } from "react";
import { Container } from "../../../components/ui/Container";
import { motion } from "framer-motion";

export function ProductsHero() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <section className="relative min-h-[90vh] flex items-center bg-stone-100 text-stone-800 overflow-hidden">
            <Container>
                <div className="grid md:grid-cols-2 gap-8 items-center pt-24 pb-16 md:py-0">
                    {/* Text Content */}
                    <motion.div
                        className="relative z-10 max-w-xl"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                            Naši proizvodi
                        </h1>
                        <p className="text-xl text-stone-600 mb-8 leading-relaxed">
                            Istražite našu ponudu visokokvalitetnih kamenih obloga koje će transformisati vaš prostor.
                        </p>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-block"
                        >
                            <button className="px-8 py-3 bg-stone-800 text-white rounded-none hover:bg-stone-700 transition-colors duration-300 text-base flex items-center group">
                                Pogledajte više
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </motion.div>
                    </motion.div>

                    {/* Image Content */}
                    <motion.div
                        className="relative h-80 md:h-[500px] overflow-hidden rounded-lg"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-stone-800/20 to-transparent z-10"></div>
                        <motion.div
                            className="absolute inset-0 bg-center bg-cover"
                            style={{ backgroundImage: "url('/images/home_header.png')" }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 1.2 }}
                        />

                        {/* Decorative elements like the Poliform design */}
                        <div className="absolute bottom-6 right-6 z-20">
                            <motion.div
                                className="text-white text-xs uppercase tracking-widest flex items-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1, duration: 0.8 }}
                            >
                                <span className="mr-2 text-stone-200">Elegantno • Trajno • Moderno</span>
                                <div className="h-10 w-10 rounded-full border border-white/30 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                    </svg>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </Container>

            {/* Additional circular design element */}
            <motion.div
                className="absolute -bottom-16 -left-16 w-32 h-32 md:w-64 md:h-64 rounded-full border border-stone-300 opacity-50"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
            />
            <motion.div
                className="absolute top-16 -right-16 w-32 h-32 md:w-64 md:h-64 rounded-full border border-stone-300 opacity-50"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, delay: 1 }}
            />
        </section>
    );
}