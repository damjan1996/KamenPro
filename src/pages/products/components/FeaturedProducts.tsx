// src/pages/products/components/FeaturedProducts.tsx
import { useState, useEffect, useRef } from "react";
import { Container } from "../../../components/ui/Container";
import { ArrowRight } from "lucide-react";
import { getAllProducts, getAllCategories, Product } from "../../../lib/api";

// Erweiterter Produkttyp für die Komponente
interface EnhancedProduct {
    id: string | number;
    name: string;
    description: string;
    image: string;
    category: string;
    price: string;
    unit: string;
}

export function FeaturedProducts() {
    const [activeProduct, setActiveProduct] = useState<string | number | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [products, setProducts] = useState<EnhancedProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setIsVisible(true);
            }
        }, { threshold: 0.1 });

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    // Laden der Produktdaten aus der API
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Produktbilder für bestimmte Produktcodes
                const productImages: {[key: string]: string} = {
                    "DOL-WHT": "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Dolomite/White/Dolomite%20-%20White%20I.jpg",
                    "CIG-RED": "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Cigla/Rustik/Red/Cigla%20-%20Rustik%20-%20Red.jpg",
                    "DOL-COF": "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Dolomite/Coffee/Dolomite%20-%20Coffee%20I.jpg"
                };

                // API-Aufrufe für Kategorien und Produkte
                const apiCategories = await getAllCategories();
                const apiProducts = await getAllProducts();

                if (apiCategories && apiProducts && apiCategories.length > 0 && apiProducts.length > 0) {
                    // Erstellen einer Map von Kategorie-IDs zu Kategorienamen
                    const categoryMap = new Map<string, string>();
                    apiCategories.forEach(category => {
                        categoryMap.set(category.id, category.naziv);
                    });

                    // Bevorzugte Produktcodes für Featured Products
                    const preferredCodes = ["DOL-WHT", "CIG-RED", "DOL-COF"];

                    // Filtere Produkte nach bevorzugten Codes oder wähle die ersten drei
                    let featuredProducts: Product[] = [];

                    // Erst versuchen, Produkte mit bevorzugten Codes zu finden
                    for (const code of preferredCodes) {
                        const product = apiProducts.find(p => p.sifra === code);
                        if (product) {
                            featuredProducts.push(product);
                        }
                    }

                    // Falls nicht genug gefunden wurden, fülle mit anderen Produkten auf
                    if (featuredProducts.length < 3) {
                        const otherProducts = apiProducts
                            .filter(p => !featuredProducts.some(fp => fp.id === p.id))
                            .slice(0, 3 - featuredProducts.length);

                        featuredProducts = [...featuredProducts, ...otherProducts];
                    }

                    // Auf maximal 3 Produkte beschränken
                    featuredProducts = featuredProducts.slice(0, 3);

                    // Transformiere in EnhancedProduct-Format
                    const enhancedProducts: EnhancedProduct[] = featuredProducts.map((product, index) => {
                        return {
                            id: product.id,
                            name: product.naziv,
                            description: product.opis,
                            // Verwende passende Bildpfade oder Standard-Bildpfade
                            image: productImages[product.sifra] ||
                                `https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Page/Products/Featured/product-${index + 1}.jpg`,
                            category: categoryMap.get(product.kategorija_id) || "Dekorativni materijal",
                            price: product.cena_po_m2.toString(),
                            unit: "m²"
                        };
                    });

                    setProducts(enhancedProducts);
                } else {
                    // Setze auf Fallback-Produkte, wenn keine API-Daten vorhanden sind
                    setProducts(getFallbackProducts());
                }
            } catch (err) {
                console.error("Fehler beim Laden der Daten:", err);
                setError("Došlo je do greške prilikom učitavanja podataka.");
                setProducts(getFallbackProducts());
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Fallback-Produkte für den Fall, dass die API-Anfrage fehlschlägt
    const getFallbackProducts = (): EnhancedProduct[] => {
        return [
            {
                id: 1,
                name: "Dolomit - White",
                description: "Visokokvalitetne dekorativne kamene ploče u beloj boji za unutrašnje i spoljašnje zidove, sa prirodnom kamenom optikom.",
                image: "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Dolomite/White/Dolomite%20-%20White%20I.jpg",
                category: "Dekorativni kamen",
                price: "33",
                unit: "m²"
            },
            {
                id: 2,
                name: "Cigla - Rustik - Red",
                description: "Dekorativne rustik cigle u crvenoj boji koje donose toplinu i karakter svakom prostoru, za unutrašnje i spoljašnje zidove.",
                image: "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Cigla/Rustik/Red/Cigla%20-%20Rustik%20-%20Red.jpg",
                category: "Dekorativna rustik cigla",
                price: "28",
                unit: "m²"
            },
            {
                id: 3,
                name: "Dolomit - Coffee",
                description: "Dekorativne kamene ploče u kafa smeđoj boji koje stvaraju ugodan i elegantan ambijent u svakom prostoru.",
                image: "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Dolomite/Coffee/Dolomite%20-%20Coffee%20I.jpg",
                category: "Dekorativni kamen",
                price: "35",
                unit: "m²"
            }
        ];
    };

    return (
        <section ref={sectionRef} id="featured-products" className="py-16 md:py-24 bg-stone-50 font-sans">
            <Container>
                <div className="flex flex-col items-center mb-16">
                    <div
                        className={`text-center transition-all duration-700 transform ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                    >
                        <span className="text-amber-600 mb-2 text-sm font-medium tracking-wider uppercase">TOP IZBOR</span>
                        <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-4 tracking-wide">
                            <span className="text-stone-400">Istaknuti</span> <span className="font-medium">proizvodi</span>
                        </h2>
                        <div className="w-16 h-1 bg-amber-500 mx-auto mb-6"></div>
                        <p className="text-stone-600 text-center max-w-xl mx-auto mb-8 font-light">
                            Transformišite svoj prostor sa našim visokokvalitetnim dekorativnim kamenim oblogama
                        </p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center min-h-[400px]">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
                    </div>
                ) : error ? (
                    <div className="p-6 bg-red-50 rounded-lg text-red-800 text-center mb-8">
                        <p>{error}</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product, index) => (
                            <div
                                key={product.id}
                                className={`group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-500 transform ${
                                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}
                                style={{ transitionDelay: `${200 + index * 100}ms` }}
                                onMouseEnter={() => setActiveProduct(product.id)}
                                onMouseLeave={() => setActiveProduct(null)}
                            >
                                <div className="overflow-hidden rounded-t-lg">
                                    <div className="aspect-video relative">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className={`object-cover w-full h-full transition-transform duration-700 ${
                                                activeProduct === product.id ? 'scale-105' : 'scale-100'
                                            }`}
                                        />
                                        <div className={`absolute inset-0 bg-gradient-to-t from-black/40 to-transparent transition-opacity duration-300 ${
                                            activeProduct === product.id ? 'opacity-100' : 'opacity-0'
                                        }`}></div>

                                        <div
                                            className={`absolute bottom-4 left-4 text-white transition-all duration-300 ${
                                                activeProduct === product.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                            }`}
                                        >
                                            <a
                                                href={`/proizvodi/${product.id}`}
                                                className="inline-flex items-center bg-amber-500 px-4 py-2 rounded-sm hover:bg-amber-600 transition-all duration-300 text-sm shadow-md"
                                            >
                                                <span>Detalji</span>
                                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <div className="text-sm font-medium text-amber-600 mb-2">{product.category}</div>
                                            <h3 className="text-xl font-medium text-stone-800 mb-2 group-hover:text-amber-600 transition-colors">
                                                {product.name}
                                            </h3>
                                        </div>

                                        <div className="text-right">
                                            <div className="text-xl font-bold text-stone-800">{product.price} BAM</div>
                                            <div className="text-xs text-stone-500 font-light">po {product.unit}</div>
                                        </div>
                                    </div>

                                    <p className="text-stone-600 text-sm font-light line-clamp-2 min-h-[2.5rem]">{product.description}</p>

                                    <div
                                        className="mt-5 h-px bg-stone-200 w-full transition-all duration-500"
                                        style={{
                                            transform: `scaleX(${activeProduct === product.id ? 1 : 0.3})`,
                                            transformOrigin: 'left'
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div
                    className={`mt-12 flex justify-center transition-all duration-700 delay-500 transform ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                >
                    <a
                        href="/proizvodi#proizvodi"
                        className="px-6 py-3 bg-stone-800 text-white rounded-sm flex items-center hover:bg-stone-700 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        <span className="font-light">Istražite kompletnu ponudu</span>
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                <div
                    className={`mt-20 p-8 bg-amber-50 rounded-lg text-center border border-amber-100 transition-all duration-700 delay-600 transform ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                >
                    <p className="italic text-stone-700 max-w-3xl mx-auto font-light text-lg">
                        "Ključna razlika između običnog i posebnog - naše dekorativne obloge transformišu svaki prostor
                        u jedinstveno i upečatljivo okruženje, dostupno svakom domu i poslovnom prostoru."
                    </p>

                    <div className="mt-6 flex justify-center gap-4">
                        <a
                            href="/reference"
                            className="text-amber-600 hover:text-amber-700 transition-colors font-medium inline-flex items-center"
                        >
                            <span>Pogledajte naše projekte</span>
                            <ArrowRight className="ml-1 h-4 w-4" />
                        </a>

                        <span className="text-stone-400">|</span>

                        <a
                            href="/kontakt"
                            className="text-amber-600 hover:text-amber-700 transition-colors font-medium inline-flex items-center"
                        >
                            <span>Kontaktirajte nas</span>
                            <ArrowRight className="ml-1 h-4 w-4" />
                        </a>
                    </div>
                </div>
            </Container>
        </section>
    );
}