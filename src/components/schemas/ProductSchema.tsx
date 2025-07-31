interface ProductSchemaProps {
    name: string;
    description: string;
    image: string;
    price: number;
    currency?: string;
    availability?: string;
    category?: string;
    brand?: string;
    sku?: string;
    material?: string;
    aggregateRating?: {
        ratingValue: number;
        reviewCount: number;
    };
}

export default function ProductSchema({
    name,
    description,
    image,
    price,
    currency = "BAM",
    availability = "https://schema.org/InStock",
    category = "Dekorativni kamen",
    brand = "KamenPro",
    sku,
    material,
    aggregateRating
}: ProductSchemaProps) {
    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": name,
        "description": description,
        "image": image.startsWith('http') ? image : `https://kamenpro.net${image}`,
        "brand": {
            "@type": "Brand",
            "name": brand
        },
        "category": category,
        ...(sku && { "sku": sku }),
        ...(material && { "material": material }),
        "offers": {
            "@type": "Offer",
            "url": typeof window !== 'undefined' ? window.location.href : '',
            "priceCurrency": currency,
            "price": price,
            "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
            "availability": availability,
            "seller": {
                "@type": "Organization",
                "name": "KamenPro"
            },
            "shippingDetails": {
                "@type": "OfferShippingDetails",
                "shippingRate": {
                    "@type": "MonetaryAmount",
                    "value": "0",
                    "currency": "BAM"
                },
                "shippingDestination": {
                    "@type": "DefinedRegion",
                    "addressCountry": "BA",
                    "addressRegion": ["Bijeljina", "Brčko", "Tuzla"]
                },
                "deliveryTime": {
                    "@type": "ShippingDeliveryTime",
                    "handlingTime": {
                        "@type": "QuantitativeValue",
                        "minValue": 0,
                        "maxValue": 1,
                        "unitCode": "DAY"
                    },
                    "transitTime": {
                        "@type": "QuantitativeValue",
                        "minValue": 1,
                        "maxValue": 2,
                        "unitCode": "DAY"
                    }
                }
            }
        },
        ...(aggregateRating && {
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": aggregateRating.ratingValue,
                "reviewCount": aggregateRating.reviewCount,
                "bestRating": "5",
                "worstRating": "1"
            }
        }),
        "additionalProperty": [
            {
                "@type": "PropertyValue",
                "name": "Garancija",
                "value": "5 godina"
            },
            {
                "@type": "PropertyValue",
                "name": "Montaža",
                "value": "Dostupna profesionalna montaža"
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(productSchema)
            }}
        />
    );
}