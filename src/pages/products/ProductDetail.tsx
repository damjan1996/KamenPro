import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, ProductDetail as ProductDetailType } from '../../lib/api';
import ProductGallery from './components/ProductGallery';
import ProductInfo from './components/ProductInfo';
import ProductCharacteristics from './components/ProductCharacteristics';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { Container } from '../../components/ui/Container';
import { Alert } from '../../components/ui/Alert';
import { Seo } from '../../components/Seo';

const ProductDetail: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const navigate = useNavigate();
    const [productDetail, setProductDetail] = useState<ProductDetailType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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
                    setProductDetail(data);
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

    // Funkcija za povratak na prethodnu stranicu
    const handleGoBack = () => {
        navigate(-1);
    };

    if (loading) {
        return (
            <div className="pt-14 sm:pt-16 md:pt-18">
                <Container>
                    <div className="flex justify-center items-center min-h-[400px]">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                    </div>
                </Container>
            </div>
        );
    }

    if (error || !productDetail) {
        return (
            <div className="pt-14 sm:pt-16 md:pt-18">
                <Container>
                    <div className="py-10">
                        <Alert
                            variant="error"
                            title="Greška"
                            description={error || 'Nepoznata greška'}
                        >
                            <button
                                onClick={handleGoBack}
                                className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded transition"
                            >
                                Nazad
                            </button>
                        </Alert>
                    </div>
                </Container>
            </div>
        );
    }

    const { product, characteristics, images, inventory, category } = productDetail;

    return (
        <ErrorBoundary>
            <Seo
                title={`${product.naziv} | KamenPro`}
                description={product.opis.substring(0, 160)}
            />

            {/* Separate Breadcrumbs-Komponente mit eigenem Padding */}
            <div className="pt-14 sm:pt-16 md:pt-18 bg-gray-50">
                <Container>
                    {/* Breadcrumbs mit zusätzlichem Padding nach oben */}
                    <div className="py-4">
                        <nav className="flex text-sm text-gray-600" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                                <li className="inline-flex items-center">
                                    <a href="/" className="hover:text-gray-900">Početna</a>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <span className="mx-2">/</span>
                                        <a href="/proizvodi" className="hover:text-gray-900">Proizvodi</a>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <span className="mx-2">/</span>
                                        <a href={`/proizvodi/kategorija/${category.id}`} className="hover:text-gray-900">
                                            {category.naziv}
                                        </a>
                                    </div>
                                </li>
                                <li aria-current="page">
                                    <div className="flex items-center">
                                        <span className="mx-2">/</span>
                                        <span className="font-medium text-gray-800">{product.naziv}</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                    </div>
                </Container>
            </div>

            {/* Hauptinhalt der Produktseite ohne zusätzliches Padding oben */}
            <div className="py-6 md:py-12 bg-gray-50">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Produktbilder */}
                        <div>
                            <ProductGallery images={images} productName={product.naziv} />
                        </div>

                        {/* Produktinformationen */}
                        <div>
                            <ProductInfo
                                product={product}
                                category={category}
                                inventory={inventory}
                            />

                            {/* Produkteigenschaften */}
                            <div className="mt-10">
                                <ProductCharacteristics characteristics={characteristics} />
                            </div>
                        </div>
                    </div>

                    {/* Vollständige Beschreibung */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold mb-4">O proizvodu</h2>
                        <div className="prose prose-stone max-w-none">
                            <p>{product.opis}</p>
                        </div>
                    </div>

                    {/* CTA Sektion */}
                    <div className="mt-12 bg-gray-100 p-6 rounded-lg">
                        <h2 className="text-xl font-bold mb-3">Imate pitanja?</h2>
                        <p className="mb-4">Kontaktirajte nas za više informacija o ovom proizvodu ili za posebne zahteve.</p>
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="/kontakt"
                                className="inline-block bg-gray-900 text-white px-6 py-3 rounded hover:bg-gray-800 transition"
                            >
                                Kontaktirajte nas
                            </a>
                            <a
                                href="tel:+38765678634"
                                className="inline-block bg-white border border-gray-300 px-6 py-3 rounded hover:bg-gray-50 transition"
                            >
                                Pozovite nas
                            </a>
                        </div>
                    </div>
                </Container>
            </div>
        </ErrorBoundary>
    );
};

export default ProductDetail;