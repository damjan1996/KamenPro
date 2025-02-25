// src/pages/products/components/InstallationInfo.tsx
import { useState, useEffect } from "react";
import { Container } from "../../../components/ui/Container";
import { motion } from "framer-motion";

export function InstallationInfo() {
    const [activeStep, setActiveStep] = useState(1);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setIsVisible(true);
            }
        }, { threshold: 0.2 });

        const section = document.getElementById("installation-info");
        if (section) observer.observe(section);

        return () => {
            if (section) observer.unobserve(section);
        };
    }, []);

    // Auto-rotate through steps
    useEffect(() => {
        if (!isVisible) return;

        const interval = setInterval(() => {
            setActiveStep(prev => prev < steps.length ? prev + 1 : 1);
        }, 4000);

        return () => clearInterval(interval);
    }, [isVisible]);

    const steps = [
        {
            id: 1,
            title: "Priprema površine",
            description: "Temeljno čišćenje i nivelisanje površine pre postavljanja za besprekorne rezultate."
        },
        {
            id: 2,
            title: "Postavljanje obloga",
            description: "Precizno postavljanje kamenih obloga prema definisanom dizajnu sa pažnjom na svaki detalj."
        },
        {
            id: 3,
            title: "Fugovanje",
            description: "Pravilno fugovanje za optimalnu strukturnu stabilnost i estetiku koja traje decenijama."
        },
        {
            id: 4,
            title: "Završna obrada",
            description: "Zaštitni premaz i finalna obrada za dugotrajnost i lepotu kamenih obloga u vašem prostoru."
        }
    ];

    return (
        <section id="installation-info" className="py-24 bg-stone-50">
            <Container>
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Leva strana - Slika */}
                    <motion.div
                        className="lg:w-1/2 relative"
                        initial={{ opacity: 0, x: -50 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            className="w-full h-[500px] overflow-hidden rounded-xl"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.img
                                src="/images/installation.jpg"
                                alt="Proces instalacije kamenih obloga"
                                className="w-full h-full object-cover"
                                animate={{ scale: isVisible ? 1 : 1.1 }}
                                transition={{ duration: 1.5 }}
                            />
                        </motion.div>

                        {/* Oznake stepa na slici */}
                        {steps.map((step) => (
                            <motion.div
                                key={`marker-${step.id}`}
                                className={`absolute w-8 h-8 rounded-full cursor-pointer transition-all duration-300
                                    ${activeStep === step.id ? 'bg-stone-800 border-2 border-white' : 'bg-white'}
                                    ${step.id === 1 ? 'top-1/4 left-1/4' :
                                    step.id === 2 ? 'top-1/3 right-1/4' :
                                        step.id === 3 ? 'bottom-1/3 left-1/3' :
                                            'bottom-1/4 right-1/3'}`}
                                initial={{ scale: 0 }}
                                animate={isVisible ? {
                                    scale: 1,
                                    boxShadow: activeStep === step.id ? '0 0 0 6px rgba(255,255,255,0.2)' : 'none'
                                } : { scale: 0 }}
                                transition={{ delay: 0.2 * step.id, duration: 0.5 }}
                                onClick={() => setActiveStep(step.id)}
                                whileHover={{ scale: 1.2 }}
                            />
                        ))}

                        {/* Dodatni elementi dizajna */}
                        <motion.div
                            className="absolute -bottom-8 -right-8 w-48 h-48 bg-stone-200 -z-10 rounded-xl"
                            initial={{ opacity: 0 }}
                            animate={isVisible ? { opacity: 0.3 } : { opacity: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        />
                        <motion.div
                            className="absolute -top-8 -left-8 w-24 h-24 bg-stone-300 -z-10 rounded-xl"
                            initial={{ opacity: 0 }}
                            animate={isVisible ? { opacity: 0.3 } : { opacity: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        />
                    </motion.div>

                    {/* Desna strana - Tekst */}
                    <div className="lg:w-1/2 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.7 }}
                            className="mb-12"
                        >
                            <span className="text-sm tracking-widest text-stone-500 uppercase">Stručnost</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mt-2 mb-4">Proces instalacije</h2>
                            <div className="h-1 w-24 bg-stone-800 mb-6"></div>
                            <p className="text-lg text-stone-600">
                                Naš stručni tim obezbeđuje besprekorno postavljanje kamenih obloga za optimalne rezultate i dugotrajnu lepotu.
                            </p>
                        </motion.div>

                        <div className="space-y-6">
                            {steps.map((step) => (
                                <motion.div
                                    key={step.id}
                                    className={`flex p-6 rounded-lg transition-all duration-300 cursor-pointer
                                        ${activeStep === step.id ? 'bg-white shadow-lg' : 'hover:bg-white hover:shadow-md'}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ delay: 0.1 * step.id, duration: 0.6 }}
                                    onClick={() => setActiveStep(step.id)}
                                    whileHover={{ x: 5 }}
                                >
                                    <div className="flex-shrink-0 mr-6">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium transition-colors
                                            ${activeStep === step.id ? 'bg-stone-800 text-white' : 'bg-stone-100 text-stone-800'}`}>
                                            {step.id.toString().padStart(2, '0')}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className={`text-xl font-semibold mb-2 transition-colors
                                            ${activeStep === step.id ? 'text-stone-800' : 'text-stone-700'}`}>
                                            {step.title}
                                        </h3>
                                        <p className="text-stone-600">{step.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            className="mt-10 flex"
                            initial={{ opacity: 0 }}
                            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                        >
                            <motion.button
                                className="px-8 py-3 bg-stone-800 text-white inline-flex items-center group hover:bg-stone-700 transition-colors"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span>Zakazati konsultaciju</span>
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
                    </div>
                </div>

                {/* Brojači za navigaciju */}
                <motion.div
                    className="flex justify-center mt-12 space-x-2"
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                >
                    {steps.map((step) => (
                        <motion.div
                            key={`step-${step.id}`}
                            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300
                                ${activeStep === step.id ? 'bg-stone-800 w-10' : 'bg-stone-300'}`}
                            onClick={() => setActiveStep(step.id)}
                            whileHover={{ scale: 1.2 }}
                        />
                    ))}
                </motion.div>
            </Container>
        </section>
    );
}