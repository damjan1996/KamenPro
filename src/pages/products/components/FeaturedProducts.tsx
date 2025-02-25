// src/pages/products/components/FeaturedProducts.tsx
import { useState, useEffect } from "react";
import { Container } from "../../../components/ui/Container";

export function FeaturedProducts() {
    const [activeProduct, setActiveProduct] = useState<number | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setIsVisible(true);
            }
        }, { threshold: 0.1 });

        const section = document.getElementById('featured-products-section');
        if (section) {
            observer.observe(section);
        }

        return () => {
            if (section) {
                observer.unobserve(section);
            }
        };
    }, []);

    // Featured products data
    const products = [
        {
            id: 1,
            name: 'Travertin klasik',
            description: 'Vanvremenska elegancija prirodnog travertina sa jedinstvenim šarama.',
            images: ['/images/travertin-classic.jpg', '/images/travertin-classic-2.jpg'],
            price: 'Od 3.500 RSD/m²',
            category: 'Zidne obloge'
        },
        {
            id: 2,
            name: 'Kvarcit sivi',
            description: 'Izdržljiva i moderna siva kvarcitna obloga savršena za kontrasne dizajne.',
            images: ['/images/quartzite-gray.jpg', '/images/quartzite-gray-2.jpg'],
            price: 'Od 4.200 RSD/m²',
            category: 'Podne obloge'
        },
        {
            id: 3,
            name: 'Mermerna mozaik ploča',
            description: 'Luksuzni mermerini mozaici za dekorativne zidne površine.',
            images: ['/images/marble-mosaic.jpg', '/images/marble-mosaic-2.jpg'],
            price: 'Od 6.800 RSD/m²',
            category: 'Specijalni elementi'
        },
        {
            id: 4,
            name: 'Granit crni',
            description: 'Izdržljivi i elegantni crni granit za spoljašnje površine.',
            images: ['/images/granite-black.jpg', '/images/granite-black-2.jpg'],
            price: 'Od 5.500 RSD/m²',
            category: 'Fasade'
        }
    ];

    return (
        <section id="featured-products-section" className="py-16 md:py-24">
            <Container>
                <div className={`mb-12 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Istaknuti proizvodi</h2>
                    <p className="text-lg text-stone-600 max-w-3xl mx-auto">
                        Naši najpopularniji proizvodi odabrani za vaš naredni projekat
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {products.map((product, index) => (
                        <div
                            key={product.id}
                            className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-700 delay-${index * 150} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                            onMouseEnter={() => setActiveProduct(product.id)}
                            onMouseLeave={() => setActiveProduct(null)}
                        >
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-1/2 relative overflow-hidden">
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className={`w-full h-64 md:h-full object-cover transition-transform duration-500 ${activeProduct === product.id ? 'scale-110' : 'scale-100'}`}
                                    />
                                    <div className="absolute top-2 right-2 bg-amber-600 text-white px-3 py-1 text-sm rounded">
                                        {product.category}
                                    </div>
                                </div>
                                <div className="md:w-1/2 p-6 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                                        <p className="text-stone-600 mb-4">{product.description}</p>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-amber-600 font-bold text-lg mb-3">{product.price}</p>
                                        <div className="flex space-x-3">
                                            <a
                                                href={`/proizvodi/${product.id}`}
                                                className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors flex-1 text-center"
                                            >
                                                Detaljnije
                                            </a>
                                            <button
                                                className="px-4 py-2 border border-amber-600 text-amber-600 rounded hover:bg-amber-50 transition-colors"
                                            >
                                                Uzorak
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={`mt-12 text-center transition-all duration-500 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    <a
                        href="/proizvodi/svi"
                        className="inline-flex items-center px-6 py-3 border-2 border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50 transition-colors font-medium"
                    >
                        Pogledajte sve proizvode
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </a>
                </div>
            </Container>
        </section>
    );
}