// src/pages/products/components/ProductCategories.tsx
import { useState, useEffect } from "react";
import { Container } from "../../../components/ui/Container";
import { motion } from "framer-motion";

export function ProductCategories() {
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Intersection Observer za animaciju pri scrollu
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setIsVisible(true);
            }
        }, { threshold: 0.1 });

        const section = document.getElementById("product-categories");
        if (section) observer.observe(section);

        return () => {
            if (section) observer.unobserve(section);
        };
    }, []);

    const categories = [
        { id: 1, name: "Zidne obloge", image: "/images/category-wall.jpg", description: "Prirodni kamen za autentičan dizajn zidova" },
        { id: 2, name: "Podne obloge", image: "/images/category-floor.jpg", description: "Trajna rešenja za podove visokog kvaliteta" },
        { id: 3, name: "Dekorativni elementi", image: "/images/category-decorative.jpg", description: "Jedinstveni detalji koji oplemenjuju prostor" },
        { id: 4, name: "Posebna rešenja", image: "/images/category-special.jpg", description: "Prilagođeni dizajn za specifične potrebe" }
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
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <section id="product-categories" className="py-24 bg-stone-50">
            <Container>
                <div className="flex flex-col items-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                        transition={{ duration: 0.6 }}
                        className="relative inline-block"
                    >
                        <span className="absolute -top-5 left-0 text-stone-400 text-sm font-light tracking-widest">ISTRAŽITE</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-3">Kategorije proizvoda</h2>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={isVisible ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="h-px w-24 bg-orange-500 mb-6"
                    />
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="text-stone-600 text-center max-w-lg"
                    >
                        Transformišite vaš prostor našim vrhunskim proizvodima, kreiranim da traju i inspirišu
                    </motion.p>
                </div>

                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                >
                    {categories.map((category) => (
                        <motion.div
                            key={category.id}
                            className="group relative overflow-hidden"
                            variants={itemVariants}
                            onMouseEnter={() => setHoveredId(category.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            <div className="aspect-[3/4] overflow-hidden">
                                <motion.img
                                    src={category.image}
                                    alt={category.name}
                                    className="object-cover w-full h-full"
                                    initial={{ scale: 1 }}
                                    animate={{
                                        scale: hoveredId === category.id ? 1.1 : 1,
                                    }}
                                    transition={{ duration: 0.7, ease: "easeOut" }}
                                />
                            </div>

                            <motion.div
                                className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/30 to-transparent"
                                initial={{ opacity: 0.4 }}
                                animate={{
                                    opacity: hoveredId === category.id ? 0.75 : 0.4,
                                }}
                                transition={{ duration: 0.3 }}
                            />

                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                                <h3 className="text-xl md:text-2xl font-semibold mb-2 tracking-wide">{category.name}</h3>

                                <motion.div
                                    initial={{ height: "0", opacity: 0 }}
                                    animate={{
                                        height: hoveredId === category.id ? "auto" : "0",
                                        opacity: hoveredId === category.id ? 1 : 0
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <p className="text-stone-200 text-sm mb-4">{category.description}</p>
                                </motion.div>

                                <motion.button
                                    className="flex items-center text-white text-sm border-b border-white/30 pb-1 group-hover:border-white transition-colors"
                                    initial={{ x: 0 }}
                                    animate={{
                                        x: hoveredId === category.id ? 5 : 0
                                    }}
                                    transition={{ duration: 0.2 }}
                                >
                                    Pogledajte više
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </motion.button>
                            </div>

                            {/* Dekorativni element - brojevi */}
                            <motion.div
                                className="absolute top-6 right-6 font-light text-xs opacity-60 text-white"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{
                                    opacity: hoveredId === category.id ? 1 : 0.6,
                                    y: hoveredId === category.id ? 0 : -10
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                0{category.id}
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Statistika na dnu */}
                <motion.div
                    className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                >
                    <div className="flex flex-col items-center">
                        <span className="text-4xl font-bold text-stone-800">300<span className="text-orange-500">+</span></span>
                        <p className="text-stone-600 text-sm mt-2">Uspešnih projekata</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-4xl font-bold text-stone-800">200<span className="text-orange-500">+</span></span>
                        <p className="text-stone-600 text-sm mt-2">Verzija proizvoda</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-4xl font-bold text-stone-800">180<span className="text-orange-500">K</span></span>
                        <p className="text-stone-600 text-sm mt-2">Zadovoljnih kupaca</p>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}