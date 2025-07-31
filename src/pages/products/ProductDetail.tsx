import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, getAllProducts, ProductDetail as ProductDetailType, Product } from '../../lib/api';
import { ArrowRight } from 'lucide-react';
import ProductGallery from './components/ProductGallery';
import ProductInfo from './components/ProductInfo';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { Container } from '../../components/ui/Container';
import { Image } from '../../components/ui/Image';
import { Alert } from '../../components/ui/Alert';
import { Seo } from '../../components/Seo';
import ProductSchema from '../../components/schemas/ProductSchema';
import BreadcrumbSchema from '../../components/schemas/BreadcrumbSchema';

// Enhanced product type to include additional properties
interface EnhancedProduct extends Product {
    categoryName?: string;
    imageUrl?: string;
}

// Fallback product images mapping if API fails
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

// Timeout wrapper for API calls
const fetchWithTimeout = <T,>(promise: Promise<T>, timeout = 5000): Promise<T> => {
    const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), timeout);
    });
    return Promise.race([promise, timeoutPromise]);
};

const ProductDetail: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const navigate = useNavigate();
    const [productDetail, setProductDetail] = useState<ProductDetailType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<EnhancedProduct[]>([]);
    const [loadingRelated, setLoadingRelated] = useState<boolean>(true);
    const [activeProduct, setActiveProduct] = useState<string | null>(null);
    const relatedSectionRef = useRef<HTMLDivElement>(null);
    const [isRelatedVisible, setIsRelatedVisible] = useState(false);

    // Fetch product details
    useEffect(() => {
        const fetchProductDetail = async () => {
            if (!productId) {
                setError('ID proizvoda nije pronađen.');
                setLoading(false);
                return;
            }

            try {
                const data = await getProductById(productId);
                if (!data) {
                    setError('Proizvod nije pronađen.');
                } else {
                    // Ensure we have exactly two images for the gallery
                    if (data.images && data.images.length > 0) {
                        // If more than two images, limit to first two
                        if (data.images.length > 2) {
                            data.images = data.images.slice(0, 2);
                        }
                        // If only one image, duplicate it
                        else if (data.images.length === 1) {
                            data.images = [data.images[0], data.images[0]];
                        }
                    }
                    // If no images, create placeholders
                    else {
                        // Erstellen von Platzhalterbildern mit allen erforderlichen Eigenschaften
                        data.images = [
                            {
                                id: 'placeholder1',
                                proizvod_id: data.product.id,
                                url_slike: '/images/placeholder-product.jpg',
                                tip_slike: 'placeholder',
                                alt_tekst: `${data.product.naziv} - slika 1`,
                                glavna_slika: true,
                                redosled_prikaza: 1,
                                datum_kreiranja: new Date().toISOString()
                            },
                            {
                                id: 'placeholder2',
                                proizvod_id: data.product.id,
                                url_slike: '/images/placeholder-product.jpg',
                                tip_slike: 'placeholder',
                                alt_tekst: `${data.product.naziv} - slika 2`,
                                glavna_slika: false,
                                redosled_prikaza: 2,
                                datum_kreiranja: new Date().toISOString()
                            }
                        ];
                    }

                    setProductDetail(data);

                    // Once we have the product details, load related products
                    fetchRelatedProducts(data.product.kategorija_id, data.product.id);
                }
            } catch (err) {
                console.error('Error fetching product details:', err);
                setError(
                    err instanceof Error
                        ? err.message
                        : 'Došlo je do greške prilikom učitavanja proizvoda.'
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetail().catch((err) => {
            console.error('Unhandled error in fetchProductDetail:', err);
            setError('Neočekivana greška prilikom učitavanja podataka.');
            setLoading(false);
        });
    }, [productId]);

    // Fetch related products from the same category
    const fetchRelatedProducts = async (categoryId: string, currentProductId: string) => {
        try {
            setLoadingRelated(true);
            const allProducts = await fetchWithTimeout(getAllProducts(), 5000);

            // Filter products from the same category excluding current product
            let filtered = allProducts.filter(
                product => product.kategorija_id === categoryId && product.id !== currentProductId
            );

            // Limit to 4 related products
            filtered = filtered.slice(0, 4);

            // Add image URLs to products
            const enhancedProducts: EnhancedProduct[] = filtered.map(product => {
                const imageUrl = PRODUCT_IMAGES[product.sifra as keyof typeof PRODUCT_IMAGES] ||
                    `https://via.placeholder.com/600x400?text=${encodeURIComponent(product.naziv)}`;

                return {
                    ...product,
                    imageUrl,
                    categoryName: "Dekorativni kamen", // Default category name
                };
            });

            setRelatedProducts(enhancedProducts);
        } catch (error) {
            console.error("Error fetching related products:", error);
        } finally {
            setLoadingRelated(false);
        }
    };

    // Intersection Observer for related products section
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    setIsRelatedVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1,
                rootMargin: "100px 0px"
            }
        );

        const currentRef = relatedSectionRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [productDetail]);

    // Function to go back to previous page
    const handleGoBack = () => {
        navigate(-1);
    };

    // Helper function to get short description
    const getShortDescription = (description: string, maxLength: number = 100) => {
        return description.length > maxLength
            ? `${description.substring(0, maxLength)}...`
            : description;
    };

    // Loading state with improved spinner
    if (loading) {
        return (
            <div className="pt-16 sm:pt-20 md:pt-24 bg-gray-50">
                <Container>
                    <div className="flex flex-col justify-center items-center min-h-[500px]">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-indigo-600"></div>
                        <p className="mt-4 text-gray-600">Učitavanje proizvoda...</p>
                    </div>
                </Container>
            </div>
        );
    }

    // Error state with improved error message
    if (error || !productDetail) {
        return (
            <div className="pt-16 sm:pt-20 md:pt-24 bg-gray-50">
                <Container>
                    <div className="py-12 max-w-xl mx-auto">
                        <Alert
                            variant="error"
                            title="Proizvod nije pronađen"
                            description={error || 'Nepoznata greška'}
                        >
                            <button
                                onClick={handleGoBack}
                                className="mt-4 px-6 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition flex items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Nazad na proizvode
                            </button>
                        </Alert>
                    </div>
                </Container>
            </div>
        );
    }

    const { product, images, inventory, category } = productDetail;

    return (
        <ErrorBoundary>
            <Seo
                title={`${product.naziv} | KamenPro`}
                description={product.opis.substring(0, 160)}
            />
            
            <ProductSchema
                name={product.naziv}
                description={product.opis}
                image={images[0]?.url_slike || '/images/placeholder-product.jpg'}
                price={product.cena_po_m2}
                currency="BAM"
                category={category.naziv}
                sku={product.sifra}
                material="Beli cement sa aditivima"
            />
            
            <BreadcrumbSchema
                items={[
                    { name: "Početna", url: "/" },
                    { name: "Proizvodi", url: "/proizvodi" },
                    { name: category.naziv, url: `/proizvodi/kategorija/${category.id}` },
                    { name: product.naziv, url: `/proizvodi/${product.id}` }
                ]}
            />

            {/* Breadcrumbs with improved styling - mobile optimized */}
            <div className="pt-16 sm:pt-20 md:pt-24 bg-gray-50 border-b border-gray-200">
                <Container>
                    <div className="py-3 md:py-4 overflow-x-auto">
                        <nav className="flex text-sm text-gray-600 whitespace-nowrap" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center">
                                <li className="inline-flex items-center">
                                    <a href="/" className="hover:text-indigo-600 transition">Početna</a>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                        <a href="/proizvodi" className="hover:text-indigo-600 transition">Proizvodi</a>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                        <a href={`/proizvodi/kategorija/${category.id}`} className="hover:text-indigo-600 transition">
                                            {category.naziv}
                                        </a>
                                    </div>
                                </li>
                                <li aria-current="page">
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                        <span className="font-medium text-gray-800">{product.naziv}</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                    </div>
                </Container>
            </div>

            {/* Main product content - mobile optimized */}
            <div className="py-6 md:py-16 bg-gray-50">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16">
                        {/* Product gallery - limited to exactly two images */}
                        <div>
                            <ProductGallery images={images} productName={product.naziv} />
                        </div>

                        {/* Product information */}
                        <div>
                            <ProductInfo
                                product={product}
                                category={category}
                                inventory={inventory}
                            />
                        </div>
                    </div>

                    {/* Product details section with tabs - mobile optimized */}
                    <div className="mt-10 md:mt-16 bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="p-5 md:p-8">
                            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Detaljne informacije</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                {/* Characteristics table - mobile optimized */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-3 md:mb-4">Karakteristike proizvoda</h3>
                                    <div className="overflow-hidden bg-gray-50 rounded-lg border border-gray-200">
                                        <div className="divide-y divide-gray-200">
                                            <div className="grid grid-cols-3 md:table-row">
                                                <div className="col-span-1 p-3 text-sm font-medium text-gray-900 bg-gray-100 md:table-cell">Materijal</div>
                                                <div className="col-span-2 p-3 text-sm text-gray-700 md:table-cell">
                                                    Beli cement sa aditivima i sredstvima za očvršćivanje
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-3 md:table-row">
                                                <div className="col-span-1 p-3 text-sm font-medium text-gray-900 bg-gray-100 md:table-cell">Standardne dimenzije</div>
                                                <div className="col-span-2 p-3 text-sm text-gray-700 md:table-cell">44cm x 8.5cm</div>
                                            </div>
                                            <div className="grid grid-cols-3 md:table-row">
                                                <div className="col-span-1 p-3 text-sm font-medium text-gray-900 bg-gray-100 md:table-cell">Primena</div>
                                                <div className="col-span-2 p-3 text-sm text-gray-700 md:table-cell">Unutrašnji i spoljašnji zidovi</div>
                                            </div>
                                            <div className="grid grid-cols-3 md:table-row">
                                                <div className="col-span-1 p-3 text-sm font-medium text-gray-900 bg-gray-100 md:table-cell">Otpornost na vremenske uslove</div>
                                                <div className="col-span-2 p-3 text-sm text-gray-700 md:table-cell">
                                                    Otporan na sve vrste vremenskih uslova - kiša, sneg, mraz
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-3 md:table-row">
                                                <div className="col-span-1 p-3 text-sm font-medium text-gray-900 bg-gray-100 md:table-cell">Vatrootpornost</div>
                                                <div className="col-span-2 p-3 text-sm text-gray-700 md:table-cell">Vatrootporan</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Full description - mobile optimized */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-3 md:mb-4">O proizvodu</h3>
                                    <div className="prose prose-stone max-w-none text-sm md:text-base">
                                        <p className="text-gray-700 leading-relaxed">{product.opis}</p>
                                    </div>

                                    {/* Installation info - mobile optimized */}
                                    <div className="mt-4 md:mt-6">
                                        <h3 className="text-lg font-semibold mb-3">Instalacija</h3>
                                        <div className="bg-blue-50 p-3 md:p-4 rounded-lg">
                                            <p className="text-gray-700 text-sm md:text-base">
                                                Jednostavna instalacija sa odgovarajućim lepkom za kamen ili cigle.
                                                Za najbolje rezultate, preporučujemo konsultacije sa profesionalnim instalaterom.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Related products section - mobile optimized */}
                    <div
                        ref={relatedSectionRef}
                        className={`mt-10 md:mt-16 transition-all duration-1000 ease-out ${isRelatedVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    >
                        <div className="flex items-center justify-between mb-4 md:mb-6">
                            <h2 className="text-xl md:text-2xl font-bold">Slični proizvodi</h2>
                            <a href={`/proizvodi/kategorija/${category.id}`} className="text-indigo-600 hover:text-indigo-800 font-medium text-sm md:text-base flex items-center">
                                Pogledaj sve
                                <ArrowRight className="ml-1 h-4 w-4" />
                            </a>
                        </div>

                        {loadingRelated ? (
                            <div className="flex justify-center items-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-2 border-t-indigo-600 border-r-indigo-600 border-b-transparent border-l-transparent"></div>
                            </div>
                        ) : relatedProducts.length === 0 ? (
                            <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-600">
                                Nema sličnih proizvoda u ovoj kategoriji.
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                                {relatedProducts.map((product, index) => (
                                    <div
                                        key={product.id}
                                        className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-500"
                                        style={{ transitionDelay: `${100 + index * 100}ms` }}
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
                                                        width={300}
                                                        height={200}
                                                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                                                        loading="lazy"
                                                    />
                                                    <div className={`absolute inset-0 bg-gradient-to-t from-black/40 to-transparent transition-opacity duration-300 ${
                                                        activeProduct === product.id ? 'opacity-100' : 'opacity-0'
                                                    }`}></div>
                                                </div>
                                            </a>
                                        </div>

                                        <div className="p-3 md:p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <div className="inline-block px-2 py-1 rounded text-xs font-medium bg-amber-100 text-amber-800 mb-1">
                                                        {product.categoryName}
                                                    </div>
                                                    <div className="text-sm md:text-base font-medium text-gray-800 line-clamp-1 group-hover:text-amber-600 transition-colors">
                                                        <a href={`/proizvodi/${product.id}`}>
                                                            {product.naziv}
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <p className="text-xs md:text-sm text-gray-600 line-clamp-1">
                                                    {getShortDescription(product.opis, 60)}
                                                </p>
                                                <div className="text-right whitespace-nowrap ml-2">
                                                    <div className="text-sm md:text-base font-bold text-gray-800">{product.cena_po_m2}</div>
                                                    <div className="text-xs text-gray-500">{product.valuta}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </Container>
            </div>
        </ErrorBoundary>
    );
};

export default ProductDetail;