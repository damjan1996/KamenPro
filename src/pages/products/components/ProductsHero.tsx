// src/pages/products/components/ProductsHero.tsx
import { useState, useEffect, useRef } from "react";
import { Container } from "../../../components/ui/Container";
import { ArrowRight } from "lucide-react";
import { getAllProducts, getAllCategories, Product, Category } from "../../../lib/api";

// Erweiterten Produkttyp für die Komponente definieren
interface EnhancedProduct extends Product {
    categoryName?: string;
}

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
    {
        id: "f5e48404-064a-4415-862b-1e435b24d5b4",
        sifra: "CIG-RED",
        naziv: "Cigla - Rustik - Red",
        cena_po_m2: 25.0,
        valuta: "BAM",
        opis: "Topao, klasičan izgled za tradicionalne i moderne enterijere.",
        kategorija_id: "88600ee1-28de-4385-a9ce-1c158d0f85ce",
        tezina_po_m2: 28.5,
        debljina_min: 12.0,
        debljina_max: 18.0,
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

export function ProductsHero() {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
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

                // Erweitere Produkte mit Kategorienamen
                const enhancedProducts: EnhancedProduct[] = productsData.map(product => {
                    const category = categoriesData.find(cat => cat.id === product.kategorija_id);
                    return {
                        ...product,
                        categoryName: category?.naziv || "Dekorativni kamen"
                    };
                });

                // Wir wollen nur zwei Produkte für die Hero-Sektion
                // Ideal ist ein Dolomite und eine Cigla-Variante
                const filteredProducts = enhancedProducts.filter(product =>
                    product.sifra === "DOL-WHT" || product.sifra === "CIG-RED"
                );

                // Fallback falls die spezifischen Produkte nicht gefunden wurden
                const heroProducts = filteredProducts.length >= 2 ?
                    filteredProducts :
                    enhancedProducts.slice(0, 2);

                setProducts(heroProducts);
            } catch (err) {
                console.error("Fehler beim Laden der Daten:", err);
                setError("Došlo je do greške prilikom učitavanja podataka.");

                // Fallback zu Testdaten
                setProducts(FALLBACK_PRODUCTS.map(product => ({
                    ...product,
                    categoryName: product.kategorija_id === "2be995c1-2c44-4d31-a62e-eed3afc2bb10" ?
                        "Dekorativni kamen" : "Dekorativna rustik cigla"
                })));
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Inicijalna animacija pri učitavanju
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 300);

        // Praćenje skrola za animacije
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const maxScroll = window.innerHeight * 0.5;
            const progress = Math.min(scrollTop / maxScroll, 1);
            setScrollProgress(progress);
        };

        // Intersection Observer za animacije pri skrolovanju
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', handleScroll);
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-[85vh] flex items-center overflow-hidden font-sans"
        >
            {/* Pozadinska slika sa gradijentom */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/60 z-10"></div>
                <img
                    src="/images/products/pozadina%20ii.jpg"
                    alt="KamenPro dekorativne kamene obloge"
                    className="w-full h-full object-cover object-center z-0 transition-transform duration-10000 ease-out"
                    style={{
                        transform: `scale(${1 + scrollProgress * 0.05})`,
                        opacity: 1 - scrollProgress * 0.3
                    }}
                />
            </div>

            {/* Dekorativni elementi */}
            <div className="absolute top-1/4 right-[10%] w-32 h-32 rounded-full border border-white/20 opacity-30 animate-pulse hidden lg:block"></div>
            <div className="absolute bottom-1/4 left-[10%] w-48 h-48 rounded-full border border-white/10 opacity-20 animate-pulse hidden lg:block" style={{ animationDelay: '1s' }}></div>

            <Container className="relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Leva kolona - Glavni tekst */}
                    <div>
                        <div className={`transition-all duration-1000 ease-out ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}>
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="h-[2px] w-10 bg-amber-500"></div>
                                <span className="font-light uppercase tracking-widest text-amber-100 text-sm">Naša ponuda</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6 tracking-wide leading-tight">
                                <span className="block">Dekorativne</span>
                                <span className="block font-medium text-amber-400">kamene obloge</span>
                            </h1>
                        </div>

                        <div className={`transition-all duration-1000 delay-300 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}>
                            <p className="text-lg text-white/90 mb-8 leading-relaxed font-light max-w-lg">
                                Istražite našu kolekciju visokokvalitetnih dekorativnih kamenih i ciglenih obloga koje
                                kombinuju prirodnu estetiku sa praktičnošću savremenih materijala, otpornih na sve
                                vremenske uslove.
                            </p>
                        </div>

                        <div className={`transition-all duration-1000 delay-500 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}>
                            <a
                                href="#proizvodi"
                                className="group inline-flex items-center bg-amber-500 text-stone-900 px-6 py-3 rounded-sm hover:bg-amber-400 transition-all duration-300 text-sm uppercase tracking-wider font-light shadow-md hover:shadow-lg"
                            >
                                <span>Pogledajte proizvode</span>
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a
                                href="/kontakt"
                                className="group inline-flex items-center ml-4 border border-white/70 text-white px-6 py-3 rounded-sm hover:bg-white/10 transition-all duration-300 text-sm uppercase tracking-wider font-light"
                            >
                                <span>Kontaktirajte nas</span>
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </div>

                    {/* Desna kolona - Proizvodi kartice */}
                    <div className={`transition-all duration-1000 delay-700 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}>
                        {loading ? (
                            <div className="flex justify-center items-center min-h-[300px]">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                            </div>
                        ) : error ? (
                            <div className="p-6 bg-black/30 backdrop-blur-sm rounded-lg text-white/90 text-center">
                                <p>{error}</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-amber-500/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                                        <h3 className="text-xl font-medium text-white mb-2">
                                            {products[0]?.categoryName || "Dekorativni kamen"}
                                        </h3>
                                        <p className="text-white/70 text-sm font-light mb-4">
                                            Prirodan izgled sa raznolikim teksturama za svaki prostor
                                        </p>
                                        <div className="text-amber-400 text-sm font-medium">33-40 BAM/m²</div>
                                    </div>

                                    <div className="relative h-40 overflow-hidden rounded-lg shadow-md group">
                                        <img
                                            src="https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Dolomite/White/Dolomite%20-%20White%20I.jpg"
                                            alt={products[0]?.naziv || "Dekorativni kamen"}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        <div className="absolute bottom-3 left-3 right-3">
                                            <div className="text-white text-sm font-light">
                                                {products[0]?.naziv || "Dolomite - White"}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="relative h-40 overflow-hidden rounded-lg shadow-md group">
                                        <img
                                            src="https://yodddwoxxifcuawbmzop.supabase.co/storage/v1/object/public/product-images/Cigla/Rustik/Red/Cigla%20-%20Rustik%20-%20Red.jpg"
                                            alt={products[1]?.naziv || "Rustik cigla"}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        <div className="absolute bottom-3 left-3 right-3">
                                            <div className="text-white text-sm font-light">
                                                {products[1]?.naziv || "Cigla - Rustik - Red"}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-amber-500/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                                        <h3 className="text-xl font-medium text-white mb-2">
                                            {products[1]?.categoryName || "Rustik cigla"}
                                        </h3>
                                        <p className="text-white/70 text-sm font-light mb-4">
                                            Topao, klasičan izgled za tradicionalne i moderne enterijere
                                        </p>
                                        <div className="text-amber-400 text-sm font-medium">25-30 BAM/m²</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mt-4 p-4 bg-amber-500/10 backdrop-blur-sm rounded-lg border border-amber-500/20">
                            <div className="flex items-center">
                                <div className="mr-4">
                                    <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white">
                                        <span className="text-lg font-medium">6+</span>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-white font-medium">Godina iskustva</h4>
                                    <p className="text-white/70 text-sm font-light">Kvalitet i pouzdanost od 2019. godine</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            <style>{`
                @keyframes scroll {
                    0% { transform: translateY(0); opacity: 1; }
                    30% { transform: translateY(4px); opacity: 1; }
                    60% { transform: translateY(0); opacity: 0.5; }
                    100% { transform: translateY(0); opacity: 1; }
                }

                .animate-scroll {
                    animation: scroll 1.5s ease-in-out infinite;
                }

                @keyframes pulse {
                    0% { opacity: 0.4; }
                    50% { opacity: 0.7; }
                    100% { opacity: 0.4; }
                }

                .animate-pulse {
                    animation: pulse 3s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
}