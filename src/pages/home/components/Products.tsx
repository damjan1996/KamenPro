// Diese Typdefinition hinzufügen, um Window um 'hj' zu erweitern
declare global {
    interface Window {
        hj?: (eventName: string, eventParams: Record<string, unknown>) => void;
    }
}

// src/pages/home/components/ProductsSection.tsx
import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "../../../components/ui/Container";
import { Image } from "../../../components/ui/Image";
import type { Product, Category } from "../../../lib/api";
// Import the functions as actual values for use
import { getAllProducts, getAllCategories } from "../../../lib/api";

// Erweiterten Produkttyp für die Komponente definieren
interface EnhancedProduct extends Product {
    categoryName?: string;
    imageUrl?: string;
    imageVariants?: string[];
}

// Tatsächliche Supabase Bild-URLs für Fallback
const PRODUCT_IMAGES: Record<string, string> = {
    "DOL-WHT": "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Dolomite/White/Dolomite%20-%20White%20I%20-%20Kvadrat.jpg",
    "DOL-GRY": "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Dolomite/Grey/Dolomite%20-%20Grey%20I%20-%20Kvadrat.jpg",
    "DOL-COF": "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Dolomite/Coffee/Dolomite%20-%20Coffee%20I%20-%20Kvadrat.jpg",
    "DOL-BRN": "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Dolomite/Brown/Dolomite%20-%20Brown%20I%20-%20Kvadrat.jpg",
    "DOL-ANT": "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Dolomite/Anthracite/Dolomite%20-%20Anthracite%20I%20-%20Kvadrat.jpg",
    "KAM-WHT": "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Kamen/White/Kamen%20-%20White%20-%20Kvadrat.jpg",
    "KAM-BLK": "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Kamen/Anthracite/Kamen%20-%20Anthracite%20-%20Kvadrat.jpg",
    "CIG-WHT": "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Cigla/Rustik/White/Cigla%20-%20Rustik%20-%20White%20-%20Kvadrat.jpg",
    "CIG-RED": "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Cigla/Rustik/Red/Cigla%20-%20Rustik%20-%20Red%20-%20Kvadrat.jpg"
};

// Produktbilder Mapping für alle verfügbaren Bilder
const PRODUCT_IMAGES_VARIANTS: Record<string, string[]> = {
    // Dolomite White Serie
    "DOL-WHT": [
        "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Dolomite/White/Dolomite%20-%20White%20I.jpg",
        "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Dolomite/White/Dolomite%20-%20White%20II.jpg",
        "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Dolomite/White/Dolomite%20-%20White%20III.jpg",
        "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Dolomite/White/Dolomite%20-%20White%20I%20-%20Dimenzije.jpg"
    ],
    // Other product image variants...
};

// Temporäre Mock-Daten für Entwicklungszwecke
const FALLBACK_PRODUCTS: Product[] = [
    {
        id: "d94aaee3-08fc-4c7f-b4f7-0066aab85532",
        sifra: "DOL-WHT",
        naziv: "Dolomite - White",
        cena_po_m2: 33.0,
        valuta: "BAM",
        opis: "Visokokvalitetne dekorativne kamene ploče u beloj boji za unutrašnje i spoljašnje zidove.",
        kategorija_id: "2be995c1-2c44-4d31-a62e-eed3afc2bb10",
        tezina_po_m2: 32.5,
        debljina_min: 15.0,
        debljina_max: 20.0,
        datum_kreiranja: "2025-03-09T20:11:56.054528+00:00",
        datum_azuriranja: "2025-03-09T20:11:56.054528+00:00"
    },
    // Other fallback products...
];

const FALLBACK_CATEGORIES: Category[] = [
    {
        id: "2be995c1-2c44-4d31-a62e-eed3afc2bb10",
        naziv: "Dekorativni kamen",
        opis: "Visokokvalitetne dekorativne kamene ploče za zidove",
        datum_kreiranja: "2025-03-09T20:10:22.204744+00:00"
    },
    // Other fallback categories...
];

// Timeout-Wrapper für API-Calls
const fetchWithTimeout = <T,>(promise: Promise<T>, timeout = 5000): Promise<T> => {
    const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), timeout);
    });
    return Promise.race([promise, timeoutPromise]);
};

export function ProductsSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeProduct, setActiveProduct] = useState<string | null>(null);
    const [products, setProducts] = useState<EnhancedProduct[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<EnhancedProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const sectionRef = useRef<HTMLElement | null>(null);

    // Laden der Produktdaten aus der API mit Fehlerbehandlung
    useEffect(() => {
        const startTime = Date.now();
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Versuche Kategorien zu laden mit Timeout
                let categoriesData: Category[] = [];
                try {
                    categoriesData = await fetchWithTimeout(getAllCategories(), 5000);
                    if (!categoriesData || categoriesData.length === 0) {
                        console.warn("Keine Kategorien gefunden, verwende Fallback-Daten");
                        categoriesData = FALLBACK_CATEGORIES;
                    }
                } catch (err) {
                    console.warn("Fehler oder Timeout beim Laden der Kategorien:", err);
                    categoriesData = FALLBACK_CATEGORIES;
                }

                // Versuche Produkte zu laden mit Timeout
                let productsData: Product[] = [];
                try {
                    productsData = await fetchWithTimeout(getAllProducts(), 5000);
                    if (!productsData || productsData.length === 0) {
                        console.warn("Keine Produkte gefunden, verwende Fallback-Daten");
                        productsData = FALLBACK_PRODUCTS;
                    }
                } catch (err) {
                    console.warn("Fehler oder Timeout beim Laden der Produkte:", err);
                    productsData = FALLBACK_PRODUCTS;
                }

                // Erweitere Produkte mit Kategorienamen und Bildpfaden
                const enhancedProducts: EnhancedProduct[] = productsData.map(product => {
                    const category = categoriesData.find(cat => cat.id === product.kategorija_id);

                    // Hauptbild und Bildvarianten für dieses Produkt abrufen
                    const imageUrl = PRODUCT_IMAGES[product.sifra as keyof typeof PRODUCT_IMAGES] ||
                        `https://via.placeholder.com/600x400?text=${encodeURIComponent(product.naziv)}`;

                    const imageVariants = PRODUCT_IMAGES_VARIANTS[product.sifra as keyof typeof PRODUCT_IMAGES_VARIANTS] || [imageUrl];

                    return {
                        ...product,
                        categoryName: category?.naziv || "Dekorativni kamen",
                        imageUrl,
                        imageVariants
                    };
                });

                setProducts(enhancedProducts);
                setFilteredProducts(enhancedProducts);

                // Hotjar-Event für erfolgreichen Ladevorgang
                if (window.hj) {
                    window.hj('event', {
                        name: 'products_loaded',
                        data: {
                            productCount: enhancedProducts.length,
                            loadTime: Date.now() - startTime
                        }
                    });
                }
            } catch (err) {
                console.error("Fehler beim Laden der Daten:", err);
                setError("Došlo je do greške prilikom učitavanja podataka.");

                // Fallback zu Testdaten mit richtigen Bild-URLs
                const fallbackProducts = FALLBACK_PRODUCTS.map(product => {
                    const imageUrl = PRODUCT_IMAGES[product.sifra as keyof typeof PRODUCT_IMAGES] ||
                        `https://via.placeholder.com/600x400?text=${encodeURIComponent(product.naziv)}`;

                    const imageVariants = PRODUCT_IMAGES_VARIANTS[product.sifra as keyof typeof PRODUCT_IMAGES_VARIANTS] || [imageUrl];

                    return {
                        ...product,
                        categoryName: "Dekorativni kamen",
                        imageUrl,
                        imageVariants
                    };
                });

                setProducts(fallbackProducts);
                setFilteredProducts(fallbackProducts);

                // Hotjar-Event für Fehler
                if (window.hj) {
                    window.hj('event', {
                        name: 'products_error',
                        data: {
                            errorType: err instanceof Error ? err.name : 'Unknown',
                            errorMessage: err instanceof Error ? err.message : 'Unknown error'
                        }
                    });
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData().catch(err => {
            console.error("Unhandled error in fetchData:", err);
            setError("Došlo je do neočekivane greške.");
            setLoading(false);
        });
    }, []);

    // Produkte in der gewünschten Reihenfolge sortieren
    useEffect(() => {
        if (products.length === 0) return;

        // Sortier-Reihenfolge definieren
        const priorityOrder: Record<string, number> = {
            // 1. Kamen Dolomite (alle Varianten)
            "DOL-WHT": 1,
            "DOL-GRY": 2,
            "DOL-COF": 3,
            "DOL-BRN": 4,
            "DOL-ANT": 5,
            // 2. Kamen Anthracite and White
            "KAM-BLK": 6,
            "KAM-WHT": 7,
            // 3. Rustik Cigla
            "CIG-RED": 8,
            "CIG-WHT": 9
        };

        // Sortiere Produkte nach Priorität
        const sortedProducts = [...products].sort((a, b) => {
            const priorityA = priorityOrder[a.sifra] || 100;
            const priorityB = priorityOrder[b.sifra] || 100;
            return priorityA - priorityB;
        });

        setFilteredProducts(sortedProducts);
    }, [products]);

    // Intersection Observer für bessere Performance
    useEffect(() => {
        const currentRef = sectionRef.current;
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0, // Triggers as soon as any part of the element is visible
                rootMargin: "200px 0px" // Load 200px before the element comes into view
            }
        );

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    // Kategorie-Tag Styling basierend auf Kategorie
    const getCategoryStyle = (categoryName: string | undefined) => {
        if (categoryName?.includes("cigla")) {
            return "bg-amber-100 text-amber-800";
        }
        return "bg-amber-100 text-amber-800";
    };

    return (
        <section
            ref={sectionRef}
            className="py-20 md:py-28 bg-white font-sans overflow-hidden"
        >
            <Container>
                {/* Header */}
                <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="max-w-4xl mx-auto mb-14 text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-light mb-4 tracking-wide">
                            Izuzetni proizvodi <br />
                            <span className="font-medium">dekorativnih obloga</span>
                        </h2>
                        <div className="w-16 h-1 bg-amber-500 mx-auto md:mx-0 mb-6"></div>
                        <p className="mb-8 text-stone-600 max-w-lg mx-auto md:mx-0 font-light">
                            Verujemo da dobro dizajniran prostor može unaprediti kvalitet vašeg života. Naše kamene obloge donose estetiku, funkcionalnost i trajnost.
                        </p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center min-h-[300px]">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
                    </div>
                ) : error ? (
                    <div className="p-6 bg-red-50 rounded-lg text-red-800 text-center">
                        <p>{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Erneut versuchen
                        </button>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="p-6 bg-amber-50 rounded-lg text-amber-800 text-center">
                        <p>Trenutno nema dostupnih proizvoda.</p>
                    </div>
                ) : (
                    <>
                        {/* Produktgrid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                            {filteredProducts.map((product, index) => (
                                <div
                                    key={product.id}
                                    className={`group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-500 transform ${
                                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                    }`}
                                    style={{ transitionDelay: `${200 + (index % 6) * 100}ms` }}
                                    onMouseEnter={() => setActiveProduct(product.id as string)}
                                    onMouseLeave={() => setActiveProduct(null)}
                                >
                                    <div className="overflow-hidden rounded-t-lg">
                                        <a href={`/proizvodi/${product.id}`} className="cursor-pointer block">
                                            <div className="aspect-video relative">
                                                <Image
                                                    src={product.imageUrl}
                                                    alt={product.naziv}
                                                    className={`object-cover w-full h-full transition-transform duration-700 ${
                                                        activeProduct === product.id ? 'scale-105' : 'scale-100'
                                                    }`}
                                                    width={600}
                                                    height={400}
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                    priority={index < 3}
                                                    loading={index < 3 ? "eager" : "lazy"}
                                                />
                                                <div className={`absolute inset-0 bg-gradient-to-t from-black/40 to-transparent transition-opacity duration-300 ${
                                                    activeProduct === product.id ? 'opacity-100' : 'opacity-0'
                                                }`}></div>

                                                {/* Produktcode-Badge */}
                                                <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-sm text-xs text-stone-700 font-medium">
                                                    {product.sifra}
                                                </div>
                                            </div>
                                        </a>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <div className={`inline-block px-3 py-1 rounded text-xs font-medium uppercase tracking-wider mb-2 ${getCategoryStyle(product.categoryName)}`}>
                                                    {product.categoryName}
                                                </div>
                                                <h3 className="text-xl font-medium text-stone-800 mb-2 group-hover:text-amber-600 transition-colors">
                                                    <a href={`/proizvodi/${product.id}`} className="hover:text-amber-600">
                                                        {product.naziv}
                                                    </a>
                                                </h3>
                                            </div>

                                            <div className="text-right">
                                                <div className="text-xl font-bold text-stone-800">{product.cena_po_m2} {product.valuta}</div>
                                                <div className="text-xs text-stone-500 font-light">po m²</div>
                                            </div>
                                        </div>

                                        {/* Product description has been removed */}

                                        {/* Image variants/thumbnails have been removed */}

                                        <div
                                            className="mt-5 h-px bg-stone-200 w-full transition-all duration-500"
                                            style={{
                                                transform: `scaleX(${activeProduct === product.id ? 1 : 0.3})`,
                                                transformOrigin: 'left'
                                            }}
                                        />

                                        {/* Link zu Produktdetails */}
                                        <a
                                            href={`/proizvodi/${product.id}`}
                                            className="mt-4 inline-flex items-center text-amber-600 hover:text-amber-700 font-light group-hover:font-medium transition-all"
                                        >
                                            Saznajte više
                                            <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Call To Action */}
                        <div className={`flex justify-center mt-16 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            <a
                                href="/proizvodi"
                                className="px-6 py-3 bg-stone-800 text-white rounded-sm hover:bg-stone-700 transition-all duration-300 inline-flex items-center justify-center font-light group"
                            >
                                Pogledajte sve proizvode
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </>
                )}
            </Container>
        </section>
    );
}