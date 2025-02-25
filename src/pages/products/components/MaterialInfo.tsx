// src/pages/products/components/MaterialInfo.tsx
import { useState, useEffect } from "react";
import { Container } from "../../../components/ui/Container";
import { motion } from "framer-motion";

export function MaterialInfo() {
    const [activeMaterial, setActiveMaterial] = useState<number | null>(1);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setIsVisible(true);
            }
        }, { threshold: 0.2 });

        const section = document.getElementById("material-info");
        if (section) observer.observe(section);

        return () => {
            if (section) observer.unobserve(section);
        };
    }, []);

    const materials = [
        {
            id: 1,
            name: "Prirodni kamen",
            description: "Izdržljiv, prirodan izgled sa jedinstvenim šarama i teksturama koje pružaju autentičnost prostoru.",
            image: "/images/materials/natural-stone.jpg"
        },
        {
            id: 2,
            name: "Mermer",
            description: "Elegantan i luksuzni izgled sa prepoznatljivim šarama koje stvaraju osećaj profinjenosti i ekskluzivnosti.",
            image: "/images/materials/marble.jpg"
        },
        {
            id: 3,
            name: "Travertin",
            description: "Topli tonovi i prirodna porozna struktura za rustičan izgled koji donosi mediteranski šarm u svaki enterijer.",
            image: "/images/materials/travertine.jpg"
        },
        {
            id: 4,
            name: "Kompozitni materijali",
            description: "Moderna alternativa sa poboljšanim tehničkim karakteristikama, jednostavnim održavanjem i dugovečnošću.",
            image: "/images/materials/composite.jpg"
        }
    ];

    return (
        <section id="material-info" className="py-24 bg-stone-50">
            <Container>
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Leva strana - Informacije */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="mb-8">
                            <motion.div
                                className="relative inline-block"
                                initial={{ opacity: 0 }}
                                animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <span className="absolute -top-5 left-0 text-stone-400 text-sm font-light tracking-widest">MATERIJALI</span>
                                <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-4">Materijali naših obloga</h2>
                            </motion.div>
                            <motion.div
                                className="h-1 w-16 bg-orange-500 mb-6"
                                initial={{ scaleX: 0 }}
                                animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            />
                            <motion.p
                                className="text-lg text-stone-600 mb-10 max-w-xl"
                                initial={{ opacity: 0 }}
                                animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                            >
                                Koristimo samo najkvalitetnije materijale koji su pažljivo odabrani za svaku namenu.
                                Svaki materijal ima jedinstvene karakteristike i estetski izgled.
                            </motion.p>
                        </div>

                        <motion.div
                            className="space-y-5"
                            initial={{ opacity: 0 }}
                            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            {materials.map((material) => (
                                <motion.div
                                    key={material.id}
                                    className={`border-l-4 pl-5 py-3 transition-all duration-300 cursor-pointer ${
                                        activeMaterial === material.id
                                            ? "border-orange-500 bg-white shadow-md"
                                            : "border-stone-200 hover:border-orange-300"
                                    }`}
                                    onClick={() => setActiveMaterial(material.id)}
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                                        activeMaterial === material.id ? "text-orange-500" : "text-stone-800"
                                    }`}>
                                        {material.name}
                                    </h3>
                                    <p className="text-stone-600">{material.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.button
                            className="mt-10 flex items-center space-x-2 text-orange-500 font-medium group"
                            initial={{ opacity: 0 }}
                            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.5, delay: 1 }}
                        >
                            <span>Saznajte više o našim materijalima</span>
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

                    {/* Desna strana - Slika */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="relative"
                    >
                        {/* Glavna slika */}
                        <motion.div
                            className="rounded-lg overflow-hidden shadow-xl"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.5 }}
                        >
                            <img
                                src="/images/materials.jpg"
                                alt="Materijali za kamene obloge"
                                className="w-full h-full object-cover"
                            />
                            {/* Overlay za sliku */}
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent pointer-events-none" />
                        </motion.div>

                        {/* Dekorativni elementi */}
                        <motion.div
                            className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full border border-stone-300 opacity-30 z-0"
                            initial={{ scale: 0 }}
                            animate={isVisible ? { scale: 1 } : { scale: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        />

                        {/* Plakat sa statistikama */}
                        <motion.div
                            className="absolute -top-10 -right-10 bg-white shadow-lg p-5 max-w-[180px]"
                            initial={{ opacity: 0, x: 50 }}
                            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                            transition={{ duration: 0.7, delay: 0.7 }}
                        >
                            <p className="text-xs text-stone-600 mb-3">Naši materijali su testirani za:</p>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs">Izdržljivost</span>
                                    <div className="w-20 h-2 bg-stone-200 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-orange-500"
                                            initial={{ width: 0 }}
                                            animate={isVisible ? { width: "95%" } : { width: 0 }}
                                            transition={{ duration: 1, delay: 1 }}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs">Otpornost</span>
                                    <div className="w-20 h-2 bg-stone-200 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-orange-500"
                                            initial={{ width: 0 }}
                                            animate={isVisible ? { width: "85%" } : { width: 0 }}
                                            transition={{ duration: 1, delay: 1.2 }}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs">Estetika</span>
                                    <div className="w-20 h-2 bg-stone-200 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-orange-500"
                                            initial={{ width: 0 }}
                                            animate={isVisible ? { width: "100%" } : { width: 0 }}
                                            transition={{ duration: 1, delay: 1.4 }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Dodatni citat */}
                <motion.div
                    className="mt-20 text-center max-w-3xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.7, delay: 1.2 }}
                >
                    <p className="italic text-stone-600">
                        "Dekorišite svaki centimetar vaše kuće da se oseća kao dom. Naši materijali inspirišu dizajne koji odražavaju vašu ličnost."
                    </p>
                </motion.div>
            </Container>
        </section>
    );
}