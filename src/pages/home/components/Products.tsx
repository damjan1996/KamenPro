// src/components/home/components/ProductsSection.tsx
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "../../../components/ui/Container";

// Uzorci proizvoda
const featuredProducts = [
    {
        id: 1,
        name: 'Prirodni kamen - Travertin',
        description: 'Elegantne kamene ploče za zidove sa prirodnim dezenom, idealne za stvaranje toplog i luksuznog ambijenta.',
        image: '/images/travertin.jpg',
        category: 'zidne-obloge',
        subtitle: 'Premium kolekcija'
    },
    {
        id: 2,
        name: 'Dekorativni panel - Rustik',
        description: 'Reljefna struktura koja daje toplinu i karakter vašem prostoru, inspirisana tradicionalnim zanatskim tehnikama.',
        image: '/images/rustik.jpg',
        category: 'paneli',
        subtitle: 'Klasičan stil'
    },
    {
        id: 3,
        name: 'Mermer - Carrara',
        description: 'Luksuzne mermerne ploče za enterijer vrhunskog kvaliteta, poznate po svojoj eleganciji i bezvremenskom izgledu.',
        image: '/images/mermer.jpg',
        category: 'mermer',
        subtitle: 'Luksuzna linija'
    }
];

export function ProductsSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const element = document.getElementById('products-section');
            if (element) {
                const position = element.getBoundingClientRect();
                if (position.top < window.innerHeight * 0.75) {
                    setIsVisible(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (isVisible) {
            const timer = setInterval(() => {
                setActiveIndex((prevIndex) => (prevIndex + 1) % featuredProducts.length);
            }, 5000);

            return () => clearInterval(timer);
        }
    }, [isVisible]);

    return (
        <section id="products-section" className="py-20 md:py-32 bg-white">
            <Container>
                <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="max-w-4xl mx-auto mb-14">
                        <h2 className="text-4xl md:text-5xl font-light mb-6">
                            Izuzetni proizvodi <br />
                            <span className="font-semibold">dekorativnih obloga</span>
                        </h2>

                        <p className="mb-8 text-gray-600 max-w-lg">
                            Verujemo da dobro dizajniran prostor može unaprediti kvalitet vašeg života. Naše kamene obloge donose estetiku, funkcionalnost i trajnost.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 lg:gap-16 mb-12">
                    <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="h-full">
                            <h3 className="text-2xl font-medium mb-4">
                                {featuredProducts[activeIndex].subtitle}
                            </h3>
                            <h4 className="text-3xl font-light mb-6">
                                {featuredProducts[activeIndex].name}
                            </h4>
                            <p className="text-gray-600 mb-8">
                                {featuredProducts[activeIndex].description}
                            </p>

                            <div className="flex gap-4 mb-8">
                                {featuredProducts.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`h-1 ${index === activeIndex ? 'w-10 bg-black' : 'w-6 bg-gray-300'} transition-all duration-300`}
                                        onClick={() => setActiveIndex(index)}
                                    ></button>
                                ))}
                            </div>

                            <a
                                href={`/proizvodi/${featuredProducts[activeIndex].category}`}
                                className="inline-flex items-center text-black font-medium hover:underline group"
                            >
                                Pogledajte detalje
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </div>

                    <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                        <div className="relative overflow-hidden rounded-lg group h-full">
                            <img
                                src={featuredProducts[activeIndex].image}
                                alt={featuredProducts[activeIndex].name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-300"></div>
                        </div>
                    </div>
                </div>

                <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    {featuredProducts.map((product) => (
                        <div key={product.id} className="group">
                            <div className="relative overflow-hidden rounded-lg mb-4">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-60 object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-300"></div>
                            </div>
                            <h3 className="text-lg font-medium">{product.name}</h3>
                            <a
                                href={`/proizvodi/${product.category}`}
                                className="mt-2 inline-flex items-center text-black hover:underline group-hover:underline"
                            >
                                Saznajte više
                                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    ))}
                </div>

                <div className={`flex justify-center mt-16 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <a
                        href="/proizvodi"
                        className="border-b border-black pb-1 inline-flex items-center text-black font-medium hover:border-opacity-50 transition-all"
                    >
                        Pogledajte sve projekte
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                </div>
            </Container>
        </section>
    );
}