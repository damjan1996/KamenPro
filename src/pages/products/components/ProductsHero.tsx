// src/pages/products/components/ProductsHero.tsx
import { useState, useEffect } from "react";
import { Container } from "../../../components/ui/Container";

export function ProductsHero() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <section className="relative min-h-[90vh] flex items-center bg-stone-100 text-stone-800 overflow-hidden">
            <Container>
                <div className={`grid md:grid-cols-2 gap-8 items-center transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Naši proizvodi</h1>
                        <p className="text-lg md:text-xl mb-6">Otkrijte naš asortiman kamenih obloga visokog kvaliteta za unutrašnje i spoljašnje prostore</p>
                        <div className="flex space-x-4">
                            <a href="#kategorije" className="px-6 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors">
                                Kategorije
                            </a>
                            <a href="#proizvodi" className="px-6 py-3 border border-amber-600 text-amber-600 rounded-md hover:bg-amber-50 transition-colors">
                                Istaknuti proizvodi
                            </a>
                        </div>
                    </div>
                    <div className={`relative transition-transform duration-700 ${isVisible ? 'translate-x-0' : 'translate-x-20'}`}>
                        <img
                            src="/images/hero-product.jpg"
                            alt="Naši proizvodi"
                            className="rounded-lg shadow-xl w-full"
                        />
                        <div className="absolute -bottom-4 -left-4 bg-amber-100 p-4 rounded-lg shadow-lg">
                            <p className="text-amber-800 font-semibold">Premium kvalitet</p>
                            <p className="text-sm text-amber-700">Najbolji izbor kamenih obloga</p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}