// src/pages/products/components/ProductCategories.tsx
import { useState, useEffect } from "react";
import { Container } from "../../../components/ui/Container";

export function ProductCategories() {
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Intersection Observer for scroll animation
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setIsVisible(true);
            }
        }, { threshold: 0.1 });

        const section = document.getElementById('categories-section');
        if (section) {
            observer.observe(section);
        }

        return () => {
            if (section) {
                observer.unobserve(section);
            }
        };
    }, []);

    // Product categories data
    const categories = [
        {
            id: 1,
            name: 'Zidne obloge',
            description: 'Prirodni kamen za dekoraciju unutrašnjih i spoljašnjih zidova.',
            image: '/images/wall-cladding.jpg',
            link: '/proizvodi/zidne-obloge'
        },
        {
            id: 2,
            name: 'Podne obloge',
            description: 'Izdržljive i elegantne kamene ploče za podove.',
            image: '/images/floor-tiles.jpg',
            link: '/proizvodi/podne-obloge'
        },
        {
            id: 3,
            name: 'Fasade',
            description: 'Trajne i vizuelno upečatljive kamene fasade za spoljašnje površine.',
            image: '/images/facades.jpg',
            link: '/proizvodi/fasade'
        },
        {
            id: 4,
            name: 'Specijalni elementi',
            description: 'Stepenice, ivičnjaci i specijalno dizajnirani elementi od kamena.',
            image: '/images/special-elements.jpg',
            link: '/proizvodi/specijalni-elementi'
        }
    ];

    return (
        <section id="categories-section" className="py-16 md:py-24 bg-stone-50">
            <Container>
                <div className={`mb-12 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Kategorije proizvoda</h2>
                    <p className="text-lg text-stone-600 max-w-3xl mx-auto">
                        Istražite naš širok asortiman kamenih proizvoda za različite primene
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category, index) => (
                        <div
                            key={category.id}
                            className={`transition-all duration-700 delay-${index * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                            onMouseEnter={() => setHoveredId(category.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            <a
                                href={category.link}
                                className="block group h-full relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="aspect-w-4 aspect-h-3 w-full">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className={`w-full h-full object-cover transition-transform duration-500 ${hoveredId === category.id ? 'scale-110' : 'scale-100'}`}
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 text-white">
                                    <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                                    <p className={`text-sm text-stone-200 transition-all duration-300 ${hoveredId === category.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                        {category.description}
                                    </p>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}