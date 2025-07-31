// src/components/ui/RelatedProducts.tsx - Enhanced component for better internal linking
import { useState, useEffect } from 'react';
import { ArrowRight, Star, Eye } from 'lucide-react';
import { Image } from './Image';
import { Product } from '../../lib/api';

interface RelatedProductsProps {
    currentProduct: Product;
    category: { id: string; naziv: string };
    relatedProducts: EnhancedProduct[];
    loading?: boolean;
}

interface EnhancedProduct extends Product {
    categoryName?: string;
    imageUrl?: string;
    viewCount?: number;
    rating?: number;
    isPopular?: boolean;
    tags?: string[];
}

export function RelatedProducts({ 
    currentProduct, 
    category, 
    relatedProducts, 
    loading = false 
}: RelatedProductsProps) {
    const [activeProduct, setActiveProduct] = useState<string | null>(null);
    const [viewedProducts, setViewedProducts] = useState<Set<string>>(new Set());

    // Track product views for better recommendations
    useEffect(() => {
        const viewed = localStorage.getItem('kamenpro-viewed-products');
        if (viewed) {
            setViewedProducts(new Set(JSON.parse(viewed)));
        }
    }, []);

    const trackProductView = (productId: string) => {
        const newViewed = new Set([...viewedProducts, productId]);
        setViewedProducts(newViewed);
        localStorage.setItem('kamenpro-viewed-products', JSON.stringify([...newViewed]));
    };

    // Enhanced related products with better categorization
    const categorizeProducts = (products: EnhancedProduct[]) => {
        const categories = {
            sameCategory: products.filter(p => p.kategorija_id === currentProduct.kategorija_id && p.id !== currentProduct.id),
            similarPrice: products.filter(p => {
                const priceDiff = Math.abs(p.cena_po_m2 - currentProduct.cena_po_m2);
                return priceDiff <= currentProduct.cena_po_m2 * 0.3 && p.id !== currentProduct.id;
            }),
            popular: products.filter(p => p.isPopular && p.id !== currentProduct.id),
            recentlyViewed: products.filter(p => viewedProducts.has(p.id) && p.id !== currentProduct.id)
        };

        // Prioritize: same category > similar price > popular > recently viewed
        const prioritized = [
            ...categories.sameCategory.slice(0, 2),
            ...categories.similarPrice.slice(0, 1),
            ...categories.popular.slice(0, 1),
            ...categories.recentlyViewed.slice(0, 1)
        ];

        // Remove duplicates and limit to 4 products
        return prioritized
            .filter((product, index, self) => self.findIndex(p => p.id === product.id) === index)
            .slice(0, 4);
    };

    const enhancedRelatedProducts = categorizeProducts(relatedProducts);

    if (loading) {
        return (
            <section className="py-8 md:py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Slični proizvodi</h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-sm p-4">
                                <div className="aspect-video bg-gray-200 rounded-lg animate-pulse mb-3"></div>
                                <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (enhancedRelatedProducts.length === 0) {
        return (
            <section className="py-8 md:py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="bg-white p-6 rounded-lg text-center">
                        <h2 className="text-xl font-medium text-gray-900 mb-2">Istražite naše proizvode</h2>
                        <p className="text-gray-600 mb-4">Pogledajte kompletnu ponudu dekorativnih kamenih obloga</p>
                        <a 
                            href="/proizvodi" 
                            className="inline-flex items-center px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                        >
                            Vrati se na proizvode
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-8 md:py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Header with category link */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Slični proizvodi</h2>
                        <p className="text-gray-600 text-sm mt-1">Iz kategorije: {category.naziv}</p>
                    </div>
                    <a 
                        href={`/proizvodi/kategorija/${category.id}`} 
                        className="text-amber-600 hover:text-amber-800 font-medium text-sm md:text-base flex items-center group"
                    >
                        Pogledaj sve
                        <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                {/* Products grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {enhancedRelatedProducts.map((product, index) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            index={index}
                            isActive={activeProduct === product.id}
                            onMouseEnter={() => setActiveProduct(product.id)}
                            onMouseLeave={() => setActiveProduct(null)}
                            onView={() => trackProductView(product.id)}
                            wasViewed={viewedProducts.has(product.id)}
                        />
                    ))}
                </div>

                {/* Additional navigation links */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a 
                            href="/proizvodi"
                            className="text-sm text-gray-600 hover:text-amber-600 transition-colors"
                        >
                            Svi proizvodi
                        </a>
                        <a 
                            href={`/proizvodi/kategorija/${category.id}`}
                            className="text-sm text-gray-600 hover:text-amber-600 transition-colors"
                        >
                            {category.naziv}
                        </a>
                        <a 
                            href="/reference"
                            className="text-sm text-gray-600 hover:text-amber-600 transition-colors"
                        >
                            Naši projekti
                        </a>
                        <a 
                            href="/kontakt"
                            className="text-sm text-gray-600 hover:text-amber-600 transition-colors"
                        >
                            Kontakt za savet
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Individual product card component
interface ProductCardProps {
    product: EnhancedProduct;
    index: number;
    isActive: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onView: () => void;
    wasViewed: boolean;
}

function ProductCard({ 
    product, 
    index, 
    isActive, 
    onMouseEnter, 
    onMouseLeave, 
    onView,
    wasViewed
}: ProductCardProps) {
    const handleClick = () => {
        onView();
    };

    return (
        <div
            className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-500 overflow-hidden"
            style={{ transitionDelay: `${100 + index * 100}ms` }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {/* Product badges */}
            <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                {product.isPopular && (
                    <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                        <Star className="h-3 w-3 mr-1" />
                        Popularan
                    </span>
                )}
                {wasViewed && (
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        Viđen
                    </span>
                )}
            </div>

            {/* Product image */}
            <div className="overflow-hidden">
                <a 
                    href={`/proizvodi/${product.id}`} 
                    className="cursor-pointer block"
                    onClick={handleClick}
                    title={`Pogledajte ${product.naziv} - ${product.cena_po_m2} BAM/m²`}
                >
                    <div className="aspect-video relative">
                        <Image
                            src={product.imageUrl || '/images/placeholder-product.jpg'}
                            alt={`${product.naziv} - dekorativna kamena obloga po ceni od ${product.cena_po_m2} BAM/m²`}
                            className={`object-cover w-full h-full transition-transform duration-700 ${
                                isActive ? 'scale-105' : 'scale-100'
                            }`}
                            width={300}
                            height={200}
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                            loading="lazy"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t from-black/40 to-transparent transition-opacity duration-300 ${
                            isActive ? 'opacity-100' : 'opacity-0'
                        }`}></div>
                        
                        {/* Hover overlay */}
                        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                            isActive ? 'opacity-100' : 'opacity-0'
                        }`}>
                            <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                                Pogledaj detalje
                            </span>
                        </div>
                    </div>
                </a>
            </div>

            {/* Product info */}
            <div className="p-3 md:p-4">
                <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                        <a 
                            href={`/proizvodi/${product.id}`}
                            onClick={handleClick}
                            className="text-sm md:text-base font-medium text-gray-900 hover:text-amber-600 transition-colors line-clamp-2"
                        >
                            {product.naziv}
                        </a>
                        {product.categoryName && (
                            <p className="text-xs text-gray-500 mt-1">{product.categoryName}</p>
                        )}
                    </div>
                </div>
                
                <div className="flex items-center justify-between">
                    <div className="text-sm md:text-base font-bold text-amber-600">
                        {product.cena_po_m2} {product.valuta}/m²
                    </div>
                    {product.rating && (
                        <div className="flex items-center text-xs text-gray-500">
                            <Star className="h-3 w-3 text-yellow-400 mr-1" />
                            {product.rating.toFixed(1)}
                        </div>
                    )}
                </div>

                {/* Product tags/features */}
                {product.tags && product.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                        {product.tags.slice(0, 2).map((tag, tagIndex) => (
                            <span 
                                key={tagIndex}
                                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Quick action button */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                    <a
                        href={`/proizvodi/${product.id}`}
                        onClick={handleClick}
                        className="w-full text-center bg-gray-50 hover:bg-amber-50 text-gray-700 hover:text-amber-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                    >
                        Više detalja
                        <ArrowRight className="ml-1 h-3 w-3" />
                    </a>
                </div>
            </div>
        </div>
    );
}