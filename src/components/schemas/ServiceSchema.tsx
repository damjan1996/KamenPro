interface ServiceSchemaProps {
    name: string;
    description: string;
    provider: string;
    serviceType: string;
    areaServed: string[];
    priceRange?: string;
    image?: string;
}

export default function ServiceSchema({
    name,
    description,
    provider = "KamenPro",
    serviceType,
    areaServed,
    priceRange = "$$",
    image
}: ServiceSchemaProps) {
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": name,
        "description": description,
        "provider": {
            "@type": "Organization",
            "name": provider,
            "@id": "https://kamenpro.net/#organization"
        },
        "serviceType": serviceType,
        "areaServed": areaServed.map(area => ({
            "@type": "City",
            "name": area
        })),
        ...(priceRange && { "priceRange": priceRange }),
        ...(image && { 
            "image": image.startsWith('http') ? image : `https://kamenpro.net${image}`
        }),
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": name,
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Besplatna procjena",
                        "description": "Besplatna procjena projekta na licu mjesta"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Profesionalna montaža",
                        "description": "Stručna ugradnja dekorativnog kamena"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Garancija",
                        "description": "5 godina garancije na proizvode i rad"
                    }
                }
            ]
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(serviceSchema)
            }}
        />
    );
}