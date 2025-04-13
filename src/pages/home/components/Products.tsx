// src/components/home/components/ProductsSection.tsx
import { useState, useEffect, useRef } from "react";
import { ArrowRight, ChevronRight, ChevronLeft } from "lucide-react";
import { Container } from "../../../components/ui/Container";
import { getAllProducts, getAllCategories, Product, Category } from "../../../lib/api";

// Erweiterten Produkttyp für die Komponente definieren
interface EnhancedProduct extends Product {
    categoryName?: string;
    imageUrl?: string;
}

// Tatsächliche Supabase Bild-URLs für Fallback
const PRODUCT_IMAGES = {
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

// Temporäre Mock-Daten für Entwicklungszwecke
const FALLBACK_PRODUCTS: Product[] = [
    {
        id: "d94aaee3-08fc-4c7f-b4f7-0066aab85532",
        sifra: "DOL-WHT",
        naziv: "Dolomit - White",
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
    {
        id: "1b2b9f32-932d-42e3-8be9-6a9cdd628808",
        sifra: "DOL-GRY",
        naziv: "Dolomit - Grey",
        cena_po_m2: 35.0,
        valuta: "BAM",
        opis: "Visokokvalitetne dekorativne kamene ploče u sivoj boji za unutrašnje i spoljašnje zidove.",
        kategorija_id: "2be995c1-2c44-4d31-a62e-eed3afc2bb10",
        tezina_po_m2: 32.5,
        debljina_min: 15.0,
        debljina_max: 20.0,
        datum_kreiranja: "2025-03-09T20:11:56.054528+00:00",
        datum_azuriranja: "2025-03-09T20:11:56.054528+00:00"
    },
    {
        id: "f5e48404-064a-4415-862b-1e435b24d5b4",
        sifra: "DOL-COF",
        naziv: "Dolomit - Coffee",
        cena_po_m2: 35.0,
        valuta: "BAM",
        opis: "Visokokvalitetne dekorativne kamene ploče u kafa smeđoj boji za unutrašnje i spoljašnje zidove.",
        kategorija_id: "2be995c1-2c44-4d31-a62e-eed3afc2bb10",
        tezina_po_m2: 32.5,
        debljina_min: 15.0,
        debljina_max: 20.0,
        datum_kreiranja: "2025-03-09T20:11:56.054528+00:00",
        datum_azuriranja: "2025-03-09T20:11:56.054528+00:00"
    }
];

const FALLBACK_CATEGORIES: Category[] = [
    {
        id: "2be995c1-2c44-4d31-a62e-eed3afc2bb10",
        naziv: "Dekorativni kamen",
        opis: "Visokokvalitetne dekorativne kamene ploče za zidove",
        datum_kreiranja: "2025-03-09T20:10:22.204744+00:00"
    },
    {
        id: "88600ee1-28de-4385-a9ce-1c158d0f85ce",
        naziv: "Dekorativna rustik cigla",
        opis: "Rustik cigle za unutrašnje i spoljašnje zidove",
        datum_kreiranja: "2025-03-09T20:10:22.204744+00:00"
    }
];

export function ProductsSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [products, setProducts] = useState<EnhancedProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const sectionRef = useRef<HTMLElement | null>(null);

    // Laden der Produktdaten aus der API mit Fehlerbehandlung
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Versuche Kategorien zu laden
                let categoriesData: Category[] = [];
                try {
                    categoriesData = await getAllCategories();
                    if (!categoriesData || categoriesData.length === 0) {
                        console.warn("Keine Kategorien gefunden, verwende Fallback-Daten");
                        categoriesData = FALLBACK_CATEGORIES;
                    }
                } catch (err) {
                    console.warn("Fehler beim Laden der Kategorien:", err);
                    categoriesData = FALLBACK_CATEGORIES;
                }

                // Versuche Produkte zu laden
                let productsData: Product[] = [];
                try {
                    productsData = await getAllProducts();
                    if (!productsData || productsData.length === 0) {
                        console.warn("Keine Produkte gefunden, verwende Fallback-Daten");
                        productsData = FALLBACK_PRODUCTS;
                    }
                } catch (err) {
                    console.warn("Fehler beim Laden der Produkte:", err);
                    productsData = FALLBACK_PRODUCTS;
                }

                // Erweitere Produkte mit Kategorienamen und Bildpfaden
                const enhancedProducts: EnhancedProduct[] = productsData.map(product => {
                    const category = categoriesData.find(cat => cat.id === product.kategorija_id);

                    return {
                        ...product,
                        categoryName: category?.naziv || "Dekorativni kamen",
                        imageUrl: PRODUCT_IMAGES[product.sifra as keyof typeof PRODUCT_IMAGES] ||
                            `https://via.placeholder.com/600x400?text=${encodeURIComponent(product.naziv)}`
                    };
                });

                setProducts(enhancedProducts);
            } catch (err) {
                console.error("Fehler beim Laden der Daten:", err);
                setError("Došlo je do greške prilikom učitavanja podataka.");

                // Fallback zu Testdaten mit richtigen Bild-URLs
                setProducts(FALLBACK_PRODUCTS.map(product => ({
                    ...product,
                    categoryName: "Dekorativni kamen",
                    imageUrl: PRODUCT_IMAGES[product.sifra as keyof typeof PRODUCT_IMAGES] ||
                        `https://via.placeholder.com/600x400?text=${encodeURIComponent(product.naziv)}`
                })));
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

    // Intersection Observer für bessere Performance
    useEffect(() => {
        const currentRef = sectionRef.current;
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
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

    // Automatische Rotation der Produkte
    useEffect(() => {
        if (isVisible && !isHovered && products.length > 0) {
            const timer = setInterval(() => {
                setActiveIndex((prevIndex) => (prevIndex + 1) % products.length);
            }, 5000);

            return () => clearInterval(timer);
        }
    }, [isVisible, isHovered, products.length]);

    // Navigation functions
    const nextProduct = () => {
        if (products.length > 0) {
            setActiveIndex((prevIndex) => (prevIndex + 1) % products.length);
        }
    };

    const prevProduct = () => {
        if (products.length > 0) {
            setActiveIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
        }
    };

    // Hilfsfunktion um die Bildpfade zu erhalten
    const getImageUrl = (product: EnhancedProduct) => {
        return product.imageUrl || `https://via.placeholder.com/600x400?text=${encodeURIComponent(product.naziv)}`;
    };

    // Hilfsfunktion um den ersten Teil der Beschreibung zu erhalten
    const getShortDescription = (description: string, maxLength: number = 120) => {
        return description.length > maxLength
            ? `${description.substring(0, maxLength)}...`
            : description;
    };

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
                    </div>
                ) : products.length === 0 ? (
                    <div className="p-6 bg-amber-50 rounded-lg text-amber-800 text-center">
                        <p>Trenutno nema dostupnih proizvoda.</p>
                    </div>
                ) : (
                    <>
                        {/* Featured Product Showcase */}
                        <div
                            className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            {/* Product Info */}
                            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                                <div className="p-6 md:p-8 bg-stone-50 rounded-lg h-full flex flex-col justify-between shadow-sm">
                                    <div>
                                        <div className={`inline-block px-3 py-1 rounded text-xs font-medium uppercase tracking-wider mb-4 ${getCategoryStyle(products[activeIndex]?.categoryName)}`}>
                                            {products[activeIndex]?.categoryName || "Dekorativni kamen"}
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-light mb-4 text-stone-800">
                                            {products[activeIndex]?.naziv || ""}
                                        </h3>
                                        <p className="text-stone-600 mb-8 font-light">
                                            {getShortDescription(products[activeIndex]?.opis || "")}
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-6">
                                            {/* Indicators */}
                                            <div className="flex gap-3">
                                                {products.slice(0, 5).map((_, index) => (
                                                    <button
                                                        key={index}
                                                        aria-label={`Show product ${index + 1}`}
                                                        className={`h-1.5 rounded-full transition-all duration-300 ${
                                                            index === activeIndex
                                                                ? 'w-8 bg-amber-500'
                                                                : 'w-4 bg-stone-300 hover:bg-stone-400'
                                                        }`}
                                                        onClick={() => setActiveIndex(index)}
                                                    ></button>
                                                ))}
                                            </div>

                                            {/* Navigation Arrows */}
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={prevProduct}
                                                    className="w-8 h-8 flex items-center justify-center rounded-full border border-stone-200 text-stone-600 hover:bg-stone-100 hover:text-stone-800 transition-all"
                                                    aria-label="Previous product"
                                                >
                                                    <ChevronLeft className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={nextProduct}
                                                    className="w-8 h-8 flex items-center justify-center rounded-full border border-stone-200 text-stone-600 hover:bg-stone-100 hover:text-stone-800 transition-all"
                                                    aria-label="Next product"
                                                >
                                                    <ChevronRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* URL KORRIGIERT: /products/ -> /proizvodi/ */}
                                        <a
                                            href={`/proizvodi/${products[activeIndex]?.id}`}
                                            className="inline-flex items-center group text-amber-600 font-medium hover:text-amber-700"
                                        >
                                            Pogledajte detalje
                                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Product Image */}
                            <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                                <div className="relative overflow-hidden rounded-lg h-full shadow-md">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent z-10"></div>
                                    {products.map((product, index) => (
                                        <div
                                            key={product.id}
                                            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                                                index === activeIndex
                                                    ? 'opacity-100 translate-x-0'
                                                    : 'opacity-0 translate-x-full'
                                            }`}
                                        >
                                            <img
                                                src={getImageUrl(product)}
                                                alt={product.naziv}
                                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            {products.slice(0, 6).map((product) => (
                                <div key={product.id} className="group">
                                    <div className="relative overflow-hidden rounded-lg mb-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                                        <img
                                            src={getImageUrl(product)}
                                            alt={product.naziv}
                                            className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                            <div className="p-4">
                        <span className="inline-block px-2 py-1 bg-white/90 text-stone-800 text-xs font-medium rounded mb-2">
                          {`${product.cena_po_m2} ${product.valuta}/m²`}
                        </span>
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-medium text-stone-800 mb-1">{product.naziv}</h3>

                                    {/* URL KORRIGIERT: /products/ -> /proizvodi/ */}
                                    <a
                                        href={`/proizvodi/${product.id}`}
                                        className="mt-1 inline-flex items-center text-amber-600 hover:text-amber-700 font-light group-hover:font-medium transition-all"
                                    >
                                        Saznajte više
                                        <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            ))}
                        </div>

                        {/* Call To Action */}
                        <div className={`flex justify-center mt-16 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            {/* URL KORRIGIERT: /products -> /proizvodi */}
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