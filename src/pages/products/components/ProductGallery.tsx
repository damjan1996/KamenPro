import React, { useState } from 'react';
import { ProductImage } from '../../../lib/api';
import { Image } from '../../../components/ui/Image';

interface ProductGalleryProps {
    images: ProductImage[];
    productName: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
    const [activeImageIndex, setActiveImageIndex] = useState<number>(
        // Finde den Index des Hauptbildes oder nutze das erste Bild
        images.findIndex(img => img.glavna_slika) !== -1
            ? images.findIndex(img => img.glavna_slika)
            : 0
    );

    // Wenn keine Bilder vorhanden sind, zeige ein Platzhalterbild an
    if (!images || images.length === 0) {
        return (
            <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Nema dostupnih slika</span>
            </div>
        );
    }

    return (
        <div>
            {/* Hauptbild */}
            <div className="aspect-square mb-4 border border-gray-200 rounded-lg overflow-hidden bg-white">
                <div className="w-full h-full relative">
                    <Image
                        src={images[activeImageIndex].url_slike}
                        alt={images[activeImageIndex].alt_tekst || productName}
                        className="object-contain p-2 w-full h-full"
                    />
                </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                    {images.map((image, index) => (
                        <button
                            key={image.id}
                            onClick={() => setActiveImageIndex(index)}
                            className={`aspect-square border overflow-hidden relative rounded-md ${
                                activeImageIndex === index
                                    ? 'border-gray-900 ring-1 ring-gray-900'
                                    : 'border-gray-200 hover:border-gray-300'
                            }`}
                        >
                            <Image
                                src={image.url_slike}
                                alt={image.alt_tekst || `${productName} - slika ${index + 1}`}
                                className="object-cover p-1 w-full h-full"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductGallery;