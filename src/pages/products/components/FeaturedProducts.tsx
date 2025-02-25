// src/pages/products/components/FeaturedProducts.tsx
import { useState, useEffect } from "react";
import { Container } from "../../../components/ui/Container";
import { motion } from "framer-motion";

export function FeaturedProducts() {
    const [activeProduct, setActiveProduct] = useState<number | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setIsVisible(true);
            }
        }, { threshold: 0.1 });

        const section = document.getElementById("featured-products");
        if (section) observer.observe(section);

        return () => {
            if (section) observer.unobserve(section);
        };
    }, []);

    const products = [
        {
            id: 1,
            name: "Prirodni Kamen Classic",
            description: "Tradicionalne kamene obloge sa klasičnim izgledom koje dodaju sofisticiranost svakom prostoru.",
            image: "/images/product-1.jpg",
            category: "Zidne obloge",
            price: "52",
            unit: "m²"
        },
        {
            id: 2,
            name: "Modern Slate",
            description: "Moderan izgled sa elegantnom završnom obradom idealan za savremene enterijere.",
            image: "/images/product-2.jpg",
            category: "Podne obloge",
            price: "64",
            unit: "m²"
        },
        {
            id: 3,
            name: "Travertin Beige",
            description: "Topli tonovi za prirodan i pozivajući ambijent koji stvara harmoničan životni prostor.",
            image: "/images/product-3.jpg",
            category: "Zidne obloge",
            price: "48",
            unit: "m²"
        }
    ];

    // Animacija za naslov sekcije
    const titleVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    // Animacija za linije ispod naslova
    const lineVariants = {
        hidden: { scaleX: 0 },
        visible: { scaleX: 1, transition: { duration: 0.5, delay: 0.2 } }
    };

    // Animacija za kontejner proizvoda
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    // Animacija za pojedinačni proizvod
    const productVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <section id="featured-products" className="py-24 bg-stone-50">
            <Container>
                <div className="flex flex-col items-center mb-16">
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold text-stone-800 mb-4"
                        variants={titleVariants}
                        initial="hidden"
                        animate={isVisible ? "visible" : "hidden"}
                    >
                        Istaknuti proizvodi
                    </motion.h2>
                    <motion.div
                        className="w-16 h-1 bg-orange-500 mb-6"
                        variants={lineVariants}
                        initial="hidden"
                        animate={isVisible ? "visible" : "hidden"}
                    />
                    <motion.p
                        className="text-stone-600 text-center max-w-xl mb-8"
                        initial={{ opacity: 0 }}
                        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        Transformišite svoj prostor sa našim premium kolekcijama prirodnog kamena
                    </motion.p>
                </div>

                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-12"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                >
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            className="group relative"
                            variants={productVariants}
                            onMouseEnter={() => setActiveProduct(product.id)}
                            onMouseLeave={() => setActiveProduct(null)}
                        >
                            <div className="overflow-hidden mb-5">
                                <motion.div
                                    className="aspect-w-16 aspect-h-9 relative"
                                    initial={{ scale: 1 }}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.7 }}
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="object-cover w-full h-full"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    <motion.div
                                        className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100"
                                        initial={{ y: 20 }}
                                        whileHover={{ y: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <button className="flex items-center space-x-2 bg-orange-500 px-4 py-2 rounded-sm hover:bg-orange-600 transition-colors">
                                            <span>Pogledaj detalje</span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </button>
                                    </motion.div>
                                </motion.div>
                            </div>

                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="text-sm font-medium text-orange-500 mb-2">{product.category}</div>
                                    <h3 className="text-xl font-semibold text-stone-800 mb-2 group-hover:text-orange-500 transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="text-stone-600 line-clamp-2">{product.description}</p>
                                </div>

                                <div className="text-right">
                                    <div className="text-xl font-bold text-stone-800">{product.price}€</div>
                                    <div className="text-xs text-stone-500">po {product.unit}</div>
                                </div>
                            </div>

                            <motion.div
                                className="mt-5 h-px bg-stone-200 w-full"
                                initial={{ scaleX: 0 }}
                                animate={{
                                    scaleX: activeProduct === product.id ? 1 : 0.3
                                }}
                                transition={{ duration: 0.5 }}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className="mt-16 flex justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <motion.button
                        className="px-8 py-3 bg-stone-800 text-white flex items-center space-x-2 group hover:bg-stone-700 transition-colors"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span>Istražite kompletnu ponudu</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </motion.button>
                </motion.div>

                <motion.div
                    className="mt-24 text-center"
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.7, delay: 1 }}
                >
                    <p className="italic text-stone-600 max-w-3xl mx-auto">
                        "Ključna razlika između običnog i posebnog - naši prostori su jednako nijansirani kao i životni stilovi koje odražavaju."
                    </p>
                </motion.div>
            </Container>
        </section>
    );
}