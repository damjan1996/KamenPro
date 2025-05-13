// src/pages/products/components/FeaturedProducts.tsx
import React, { useState, useEffect, useRef } from "react";
import { Container } from "../../../components/ui/Container";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { getAllProducts, getAllCategories } from "../../../lib/api";

// Erweiterter Produkttyp für die Komponente
interface EnhancedProduct {
    id: string | number;
    name: string;
    description: string;
    image: string;
    imageVariants: string[]; // Alle Bildvarianten eines Produkts
    category: string;
    categoryId: string;
    price: string;
    unit: string;
    code: string;
}

// Named export für die Komponente
export function FeaturedProducts() {
    const [activeProduct, setActiveProduct] = useState<string | number | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [products, setProducts] = useState<EnhancedProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9;
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

    // Produktbilder Mapping für alle verfügbaren Bilder
    const getProductImages = (productCode: string): string[] => {
        const productImageMap: Record<string, string[]> = {
            // Dolomite White Serie
            "DOL-WHT": [
                "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Dolomite/White/Dolomite%20-%20White%20I.jpg",
                "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Dolomite/White/Dolomite%20-%20White%20II.jpg",
                "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Dolomite/White/Dolomite%20-%20White%20III.jpg",
                "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Dolomite/White/Dolomite%20-%20White%20I%20-%20Dimenzije.jpg"
            ],
            // Dolomite Coffee Serie
            "DOL-COF": [
                "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Dolomite/Coffee/Dolomite%20-%20Coffee%20I.jpg",
                "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Dolomite/Coffee/Dolomite%20-%20Coffee%20II.jpg",
                "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Dolomite/Coffee/Dolomite%20-%20Coffee%20III.jpg",
                "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Dolomite/Coffee/Dolomite%20-%20Coffee%20I%20-%20Dimenzije.jpg"
            ],
            // Dolomite Anthracite Serie
            "DOL-ANT": [
                "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Dolomite/Anthracite/Dolomite%20-%20Anthracite%20I.jpg",
                "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Dolomite/Anthracite/Dolomite%20-%20Anthracite%20II.jpg",
                "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Dolomite/Anthracite/Dolomite%20-%20Anthracite%20III.jpg",
                "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Dolomite/Anthracite/Dolomite%20-%20Anthracite%20I%20-%20Dimenzije.jpg"
            ],
            // Dolomite Brown Serie
            "DOL-BRN": [
                "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Dolomite/Brown/Dolomite%20-%20Brown%20I.jpg",
                "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Dolomite/Brown/Dolomite%20-%20Brown%20II.jpg",
                "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Dolomite/Brown/Dolomite%20-%20Brown%20III.jpg",
                "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Dolomite/Brown/Dolomite%20-%20Brown%20I%20-%20Dimenzije.jpg"
            ],
            // Dolomite Grey Serie
            "DOL-GRY": [
                "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Dolomite/Grey/Dolomite%20-%20Grey%20I.jpg",
                "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Dolomite/Grey/Dolomite%20-%20Grey%20II.jpg",
                "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Dolomite/Grey/Dolomite%20-%20Grey%20III.jpg",
                "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Dolomite/Grey/Dolomite%20-%20Grey%20I%20-%20Dimenzije.jpg"
            ],
            // Cigla Rustik Serie
            "CIG-RED": [
                "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Cigla/Rustik/Red/Cigla%20-%20Rustik%20-%20Red.jpg",
                "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Cigla/Rustik/Red/Cigla%20-%20Rustik%20-%20Red%20-%20Kvadrat.jpg",
                "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Cigla/Rustik/Red/Cigla%20-%20Rustik%20-%20Red%20-%20Dimenzije.jpg"
            ],
            "CIG-WHT": [
                "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Cigla/Rustik/White/Cigla%20-%20Rustik%20-%20White.jpg",
                "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Cigla/Rustik/White/Cigla%20-%20Rustik%20-%20White%20-%20Kvadrat.jpg",
                "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Cigla/Rustik/White/Cigla%20-%20Rustik%20-%20White%20-%20Dimenzije.jpg"
            ],
            // Kamen Serie
            "KAM-BLK": [
                "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Kamen/Anthracite/Kamen%20-%20Anthracite.jpg",
                "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Kamen/Anthracite/Kamen%20-%20Anthracite%20-%20Kvadrat.jpg",
                "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Kamen/Anthracite/Kamen%20-%20Anthracite%20-%20Dimenzije.jpg"
            ],
            "KAM-WHT": [
                "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Kamen/White/Kamen%20-%20White.jpg",
                "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Kamen/White/Kamen%20-%20White%20-%20Kvadrat.jpg",
                "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Kamen/White/Kamen%20-%20White%20-%20Dimenzije.jpg"
            ]
        };

        return productImageMap[productCode] || [
            // Fallback Bild wenn kein Code gefunden wurde
            "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/default-product.jpg"
        ];
    };

    // Hauptbild für Produkt-Code
    const getProductImage = (productCode: string): string => {
        const images = getProductImages(productCode);
        // Erstes Bild als Hauptbild zurückgeben
        return images.length > 0 ? images[0] : "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/default-product.jpg";
    };

    // Laden der Produktdaten aus der API
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // API-Aufrufe für Kategorien und Produkte
                const apiCategories = await getAllCategories();
                const apiProducts = await getAllProducts();

                if (apiCategories && apiProducts && apiCategories.length > 0 && apiProducts.length > 0) {
                    // Erstellen einer Map von Kategorie-IDs zu Kategorienamen
                    const categoryMap = new Map<string, string>();
                    apiCategories.forEach(category => {
                        categoryMap.set(category.id, category.naziv);
                    });

                    // Alle Produkte transformieren
                    const enhancedProducts: EnhancedProduct[] = apiProducts.map((product) => {
                        // Bilder für den Produkt-Code abrufen
                        const productImages = getProductImages(product.sifra);

                        return {
                            id: product.id,
                            name: product.naziv,
                            description: product.opis,
                            // Hauptbild für das Produkt
                            image: getProductImage(product.sifra),
                            // Alle Bildvarianten
                            imageVariants: productImages,
                            category: categoryMap.get(product.kategorija_id) || "Dekorativni materijal",
                            categoryId: product.kategorija_id,
                            price: product.cena_po_m2.toString(),
                            unit: "m²",
                            code: product.sifra
                        };
                    });

                    setProducts(enhancedProducts);
                } else {
                    // Setze auf Fallback-Produkte, wenn keine API-Daten vorhanden sind
                    const fallbackProducts = getFallbackProducts();
                    setProducts(fallbackProducts);
                }
            } catch (err) {
                console.error("Fehler beim Laden der Daten:", err);
                setError("Došlo je do greške prilikom učitavanja podataka.");
                const fallbackProducts = getFallbackProducts();
                setProducts(fallbackProducts);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Fallback-Produkte für den Fall, dass die API-Anfrage fehlschlägt
    // Reihenfolge neu angepasst: zuerst Dolomite, dann Kamen, zuletzt CIGLA
    const getFallbackProducts = (): EnhancedProduct[] => {
        return [
            // 1. Dolomite Varianten
            {
                id: 1,
                name: "Dolomite - White",
                description: "Visokokvalitetne dekorativne kamene ploče u beloj boji za unutrašnje i spoljašnje zidove, sa prirodnom kamenom optikom.",
                image: "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Dolomite/White/Dolomite%20-%20White%20I.jpg",
                imageVariants: getProductImages("DOL-WHT"),
                category: "Dekorativni kamen",
                categoryId: "1",
                price: "33",
                unit: "m²",
                code: "DOL-WHT"
            },
            {
                id: 6,
                name: "Dolomite - Grey",
                description: "Dekorativne kamene ploče u sivoj boji koje pružaju neutralan i elegantan izgled svakom prostoru.",
                image: "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Dolomite/Grey/Dolomite%20-%20Grey%20I.jpg",
                imageVariants: getProductImages("DOL-GRY"),
                category: "Dekorativni kamen",
                categoryId: "1",
                price: "32",
                unit: "m²",
                code: "DOL-GRY"
            },
            {
                id: 3,
                name: "Dolomite - Coffee",
                description: "Dekorativne kamene ploče u kafa smeđoj boji koje stvaraju ugodan i elegantan ambijent u svakom prostoru.",
                image: "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Dolomite/Coffee/Dolomite%20-%20Coffee%20I.jpg",
                imageVariants: getProductImages("DOL-COF"),
                category: "Dekorativni kamen",
                categoryId: "1",
                price: "35",
                unit: "m²",
                code: "DOL-COF"
            },
            {
                id: 5,
                name: "Dolomite - Brown",
                description: "Dekorativne kamene ploče u smeđoj boji koje pružaju topao i prirodan izgled svakom enterijeru i eksterijeru.",
                image: "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Dolomite/Brown/Dolomite%20-%20Brown%20I.jpg",
                imageVariants: getProductImages("DOL-BRN"),
                category: "Dekorativni kamen",
                categoryId: "1",
                price: "34",
                unit: "m²",
                code: "DOL-BRN"
            },
            {
                id: 4,
                name: "Dolomite - Anthracite",
                description: "Dekorativne kamene ploče u antracit boji koje stvaraju moderan i sofisticiran izgled u svakom prostoru.",
                image: "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Dolomite/Anthracite/Dolomite%20-%20Anthracite%20I.jpg",
                imageVariants: getProductImages("DOL-ANT"),
                category: "Dekorativni kamen",
                categoryId: "1",
                price: "33",
                unit: "m²",
                code: "DOL-ANT"
            },
            // 2. Kamen Varianten
            {
                id: 8,
                name: "Kamen - Anthracite",
                description: "Dekorativni kamen u antracit boji pogodan za unutrašnje i spoljašnje zidove, pruža robustan i elegantan izgled.",
                image: "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Kamen/Anthracite/Kamen%20-%20Anthracite.jpg",
                imageVariants: getProductImages("KAM-BLK"),
                category: "Dekorativni kamen",
                categoryId: "1",
                price: "36",
                unit: "m²",
                code: "KAM-BLK"
            },
            {
                id: 9,
                name: "Kamen - White",
                description: "Dekorativni kamen u beloj boji za unutrašnje i spoljašnje zidove, pruža svetao i prirodan izgled svakom prostoru.",
                image: "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Kamen/White/Kamen%20-%20White.jpg",
                imageVariants: getProductImages("KAM-WHT"),
                category: "Dekorativni kamen",
                categoryId: "1",
                price: "35",
                unit: "m²",
                code: "KAM-WHT"
            },
            // 3. Cigla Varianten (an letzter Stelle)
            {
                id: 2,
                name: "Cigla - Rustik - Red",
                description: "Dekorativne rustik cigle u crvenoj boji koje donose toplinu i karakter svakom prostoru, za unutrašnje i spoljašnje zidove.",
                image: "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Cigla/Rustik/Red/Cigla%20-%20Rustik%20-%20Red.jpg",
                imageVariants: getProductImages("CIG-RED"),
                category: "Dekorativna rustik cigla",
                categoryId: "2",
                price: "28",
                unit: "m²",
                code: "CIG-RED"
            },
            {
                id: 7,
                name: "Cigla - Rustik - White",
                description: "Dekorativne rustik cigle u beloj boji koje pružaju svetao i čist izgled svakom prostoru.",
                image: "https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Cigla/Rustik/White/Cigla%20-%20Rustik%20-%20White.jpg",
                imageVariants: getProductImages("CIG-WHT"),
                category: "Dekorativna rustik cigla",
                categoryId: "2",
                price: "30",
                unit: "m²",
                code: "CIG-WHT"
            }
        ];
    };

    // Pagination-Logik
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / productsPerPage);

    // Seiten-Navigation
    const paginate = (pageNumber: number) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            // Zum Anfang der Produktliste scrollen
            document.getElementById('products-grid')?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section ref={sectionRef} id="all-products" className="py-16 md:py-24 bg-stone-50 font-sans">
            <Container>
                <div className="flex flex-col items-center mb-16">
                    <div
                        className={`text-center transition-all duration-700 transform ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                    >
                        <span className="text-amber-600 mb-2 text-sm font-medium tracking-wider uppercase">SVI PROIZVODI</span>
                        <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-4 tracking-wide">
                            <span className="text-stone-400">Naša kompletna</span> <span className="font-medium">ponuda</span>
                        </h2>
                        <div className="w-16 h-1 bg-amber-500 mx-auto mb-6"></div>
                        <p className="text-stone-600 text-center max-w-xl mx-auto mb-8 font-light">
                            Istražite našu kompletnu ponudu dekorativnih obloga za vaš dom ili poslovni prostor
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
                    <>
                        {/* Produkt-Grid */}
                        <div
                            id="products-grid"
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {currentProducts.length > 0 ? (
                                currentProducts.map((product, index) => (
                                    <div
                                        key={product.id}
                                        className={`group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-500 transform ${
                                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                        }`}
                                        style={{ transitionDelay: `${200 + (index % productsPerPage) * 100}ms` }}
                                        onMouseEnter={() => setActiveProduct(product.id)}
                                        onMouseLeave={() => setActiveProduct(null)}
                                    >
                                        <div className="overflow-hidden rounded-t-lg">
                                            <a href={`/proizvodi/${product.id}`} className="cursor-pointer block">
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

                                                    {/* Produktcode-Badge */}
                                                    <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-sm text-xs text-stone-700 font-medium">
                                                        {product.code}
                                                    </div>
                                                </div>
                                            </a>
                                        </div>

                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <div className="text-sm font-medium text-amber-600 mb-2">{product.category}</div>
                                                    <h3 className="text-xl font-medium text-stone-800 mb-2 group-hover:text-amber-600 transition-colors">
                                                        <a href={`/proizvodi/${product.id}`} className="hover:text-amber-600">
                                                            {product.name}
                                                        </a>
                                                    </h3>
                                                </div>

                                                <div className="text-right">
                                                    <div className="text-xl font-bold text-stone-800">{product.price} BAM</div>
                                                    <div className="text-xs text-stone-500 font-light">po {product.unit}</div>
                                                </div>
                                            </div>

                                            <div
                                                className="mt-5 h-px bg-stone-200 w-full transition-all duration-500"
                                                style={{
                                                    transform: `scaleX(${activeProduct === product.id ? 1 : 0.3})`,
                                                    transformOrigin: 'left'
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-3 py-16 text-center">
                                    <div className="text-stone-500 mb-4">Trenutno nema proizvoda</div>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {products.length > productsPerPage && (
                            <div className="mt-12 flex justify-center items-center">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => paginate(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className={`w-10 h-10 flex items-center justify-center rounded-md ${
                                            currentPage === 1
                                                ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                                                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                                        } transition-colors`}
                                    >
                                        <ChevronLeft className="h-5 w-5" />
                                    </button>

                                    {/* Seitenzahlen */}
                                    <div className="flex gap-2">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                                            .filter(page => {
                                                // Zeige nur die erste, letzte und Seiten um die aktuelle Seite
                                                return (
                                                    page === 1 ||
                                                    page === totalPages ||
                                                    (page >= currentPage - 1 && page <= currentPage + 1)
                                                );
                                            })
                                            .map((page, index, array) => (
                                                <React.Fragment key={page}>
                                                    {index > 0 && array[index - 1] !== page - 1 && (
                                                        <span className="w-10 h-10 flex items-center justify-center text-stone-400">...</span>
                                                    )}
                                                    <button
                                                        onClick={() => paginate(page)}
                                                        className={`w-10 h-10 flex items-center justify-center rounded-md ${
                                                            currentPage === page
                                                                ? 'bg-amber-500 text-white'
                                                                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                                                        } transition-colors`}
                                                    >
                                                        {page}
                                                    </button>
                                                </React.Fragment>
                                            ))}
                                    </div>

                                    <button
                                        onClick={() => paginate(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className={`w-10 h-10 flex items-center justify-center rounded-md ${
                                            currentPage === totalPages
                                                ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                                                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                                        } transition-colors`}
                                    >
                                        <ChevronRight className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* Call-to-action Kontakt-Box */}
                <div
                    className={`mt-20 p-8 bg-amber-50 rounded-lg text-center border border-amber-100 transition-all duration-700 delay-600 transform ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                >
                    <p className="italic text-stone-700 max-w-3xl mx-auto font-light text-lg">
                        "Imate pitanja o našim proizvodima ili vam je potrebna pomoć pri odabiru? Naš stručni tim vam stoji na raspolaganju."
                    </p>

                    <div className="mt-6 flex justify-center gap-4">
                        <a
                            href="/kontakt"
                            className="px-6 py-3 bg-amber-500 text-white rounded-sm flex items-center hover:bg-amber-600 transition-all duration-300 shadow-md"
                        >
                            <span>Kontaktirajte nas</span>
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </Container>
        </section>
    );
}

// Default export für die Komponente
export default FeaturedProducts;