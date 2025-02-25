// src/pages/products/components/ProductCTA.tsx
import { useState, useEffect } from "react";
import { Container } from "../../../components/ui/Container";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function ProductCTA() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setIsVisible(true);
            }
        }, { threshold: 0.2 });

        const section = document.getElementById("product-cta");
        if (section) observer.observe(section);

        return () => {
            if (section) observer.unobserve(section);
        };
    }, []);

    return (
        <section id="product-cta" className="py-24 bg-stone-900 text-white relative overflow-hidden">
            {/* Dekorativni elementi */}
            <motion.div
                className="absolute top-0 left-0 w-full h-1 bg-stone-800"
                initial={{ scaleX: 0 }}
                animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1.5 }}
            />

            <motion.div
                className="absolute -left-20 top-1/2 transform -translate-y-1/2 w-40 h-40 rounded-full border border-stone-800 opacity-20"
                initial={{ scale: 0 }}
                animate={isVisible ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
            />

            <Container className="relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-5 gap-12 items-center">
                        <div className="md:col-span-3">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                transition={{ duration: 0.7 }}
                            >
                                <div className="relative inline-block mb-6">
                                    <span className="text-xs tracking-widest uppercase text-stone-400">Početak projekta</span>
                                    <h2 className="text-4xl md:text-5xl font-normal mt-3 tracking-tight leading-tight">
                                        Transformišite <br className="hidden md:block" />
                                        <span className="italic font-light">svoj prostor</span>
                                    </h2>
                                </div>

                                <motion.div
                                    className="h-px w-16 bg-stone-700 mb-8"
                                    initial={{ scaleX: 0 }}
                                    animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                />

                                <p className="text-lg text-stone-300 mb-8 leading-relaxed">
                                    Naš tim stručnjaka je tu da vam pomogne u odabiru savršenih kamenih obloga za vaš projekat.
                                    Ostvarite viziju vašeg enterijera uz našu profesionalnu podršku.
                                </p>

                                <div className="text-sm text-stone-400 flex items-center mb-4">
                                    <div className="w-6 h-px bg-stone-700 mr-4"></div>
                                    Kontaktirajte nas za besplatnu konsultaciju
                                </div>
                            </motion.div>
                        </div>

                        <motion.div
                            className="md:col-span-2"
                            initial={{ opacity: 0, x: 30 }}
                            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                        >
                            <div className="flex flex-col space-y-4">
                                <div className="relative">
                                    <input
                                        type="email"
                                        placeholder="Vaša email adresa"
                                        className="w-full px-6 py-4 bg-transparent border border-stone-800 focus:border-stone-600 transition-colors text-white placeholder-stone-500 outline-none"
                                    />
                                </div>

                                <motion.div
                                    className="flex flex-col sm:flex-row gap-4"
                                    initial={{ opacity: 0 }}
                                    animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex-1"
                                    >
                                        <Link
                                            to="/kontakt"
                                            className="w-full inline-flex items-center justify-center px-6 py-4 bg-stone-800 text-white font-normal hover:bg-stone-700 transition-colors group"
                                        >
                                            <span>Zakažite demo</span>
                                            <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </motion.div>

                                    <motion.div
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex-1"
                                    >
                                        <Link
                                            to="/reference"
                                            className="w-full inline-flex items-center justify-center px-6 py-4 border border-stone-700 text-white font-normal hover:bg-stone-800 transition-colors"
                                        >
                                            <span>Naši projekti</span>
                                        </Link>
                                    </motion.div>
                                </motion.div>
                            </div>

                            <motion.div
                                className="flex items-center mt-8 text-sm text-stone-400"
                                initial={{ opacity: 0 }}
                                animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                            >
                                <div className="flex mr-6 items-center">
                                    <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                                        <img src="/images/manager-portrait.jpg" alt="Menadžer" className="w-full h-full object-cover" />
                                    </div>
                                    <span>Srđan Savić</span>
                                </div>
                                <div>Menadžer</div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Numerički indikatori */}
                    <motion.div
                        className="absolute -left-12 top-1/3 flex items-center"
                        initial={{ opacity: 0 }}
                        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.7, delay: 1 }}
                    >
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center justify-center text-lg text-stone-500 font-light">01</div>
                            <svg width="100" height="100" viewBox="0 0 100 100" className="opacity-20">
                                <circle cx="50" cy="50" r="40" stroke="#555" strokeWidth="1" fill="none" />
                                <line x1="50" y1="10" x2="50" y2="90" stroke="#555" strokeWidth="1" />
                                <line x1="10" y1="50" x2="90" y2="50" stroke="#555" strokeWidth="1" />
                            </svg>
                        </div>
                    </motion.div>

                    <motion.div
                        className="absolute -right-12 bottom-1/3 flex items-center"
                        initial={{ opacity: 0 }}
                        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.7, delay: 1.2 }}
                    >
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center justify-center text-lg text-stone-500 font-light">02</div>
                            <svg width="100" height="100" viewBox="0 0 100 100" className="opacity-20">
                                <circle cx="50" cy="50" r="40" stroke="#555" strokeWidth="1" fill="none" />
                                <line x1="50" y1="10" x2="50" y2="90" stroke="#555" strokeWidth="1" />
                                <line x1="10" y1="50" x2="90" y2="50" stroke="#555" strokeWidth="1" />
                            </svg>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}