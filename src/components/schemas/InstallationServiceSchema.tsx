interface InstallationServiceSchemaProps {
    location?: string;
}

export default function InstallationServiceSchema({ location }: InstallationServiceSchemaProps) {
    const locationName = location ? getLocationName(location) : '';
    const serviceArea = location ? getServiceArea(location) : ['Bijeljina', 'Brčko', 'Tuzla'];
    
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `https://kamenpro.net/usluge/montaza${location ? `#${location}` : ''}`,
        "name": `Profesionalna Montaža Dekorativnog Kamena${locationName ? ` - ${locationName}` : ''}`,
        "description": "Stručna ugradnja dekorativnih kamenih obloga sa garancijom kvaliteta. Iskusni tim sa preko 10 godina iskustva u montaži prirodnog i umjetnog kamena.",
        "provider": {
            "@type": "LocalBusiness",
            "@id": "https://kamenpro.net/#organization",
            "name": "KamenPro"
        },
        "serviceType": "Montaža i ugradnja dekorativnog kamena",
        "category": "Construction Service",
        "areaServed": serviceArea.map(area => ({
            "@type": "City",
            "name": area,
            "containedInPlace": {
                "@type": "Country",
                "name": "Bosnia and Herzegovina"
            }
        })),
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Usluge Montaže",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Besplatna Procjena",
                        "description": "Besplatna procjena projekta na licu mjesta sa savjetovanjem o izboru materijala"
                    },
                    "price": "0",
                    "priceCurrency": "BAM"
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Profesionalna Montaža",
                        "description": "Stručna ugradnja dekorativnih kamenih obloga sa garancijom"
                    },
                    "priceRange": "15-35 BAM/m²",
                    "priceCurrency": "BAM"
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Dostava Materijala",
                        "description": "Sigurna dostava kamenih obloga direktno na lokaciju"
                    },
                    "price": "0",
                    "priceCurrency": "BAM",
                    "eligibleQuantity": {
                        "@type": "QuantitativeValue",
                        "minValue": 500,
                        "unitCode": "BAM",
                        "unitText": "KM vrijednost narudžbe"
                    }
                }
            ]
        },
        "offers": {
            "@type": "Offer",
            "priceRange": "15-35 BAM/m²",
            "priceCurrency": "BAM",
            "availability": "https://schema.org/InStock",
            "validFrom": new Date().toISOString().split('T')[0],
            "validThrough": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            "includesObject": [
                {
                    "@type": "TypeAndQuantityNode",
                    "amountOfThisGood": 1,
                    "typeOfGood": {
                        "@type": "Service",
                        "name": "Stručna procjena"
                    }
                },
                {
                    "@type": "TypeAndQuantityNode", 
                    "amountOfThisGood": 1,
                    "typeOfGood": {
                        "@type": "Service",
                        "name": "Profesionalna ugradnja"
                    }
                },
                {
                    "@type": "TypeAndQuantityNode",
                    "amountOfThisGood": 1,
                    "typeOfGood": {
                        "@type": "Warranty",
                        "name": "5 godina garancije"
                    }
                }
            ]
        },
        "additionalProperty": [
            {
                "@type": "PropertyValue",
                "name": "Iskustvo",
                "value": "10+ godina"
            },
            {
                "@type": "PropertyValue", 
                "name": "Garancija",
                "value": "5 godina na materijale, 2 godine na radove"
            },
            {
                "@type": "PropertyValue",
                "name": "Besplatna dostava",
                "value": "Za narudžbe preko 500 KM"
            },
            {
                "@type": "PropertyValue",
                "name": "Radni tim",
                "value": "Certificovani majstori"
            }
        ],
        "review": [
            {
                "@type": "Review",
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5"
                },
                "author": {
                    "@type": "Person",
                    "name": "Marko Pavlović"
                },
                "reviewBody": "Odličan kvalitet montaže i profesionalan pristup. Preporučujem KamenPro za sve projekte."
            }
        ],
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "87",
            "bestRating": "5",
            "worstRating": "1"
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

function getLocationName(slug: string): string {
    switch (slug) {
        case 'bijeljina': return 'Bijeljina';
        case 'brcko': return 'Brčko';
        case 'tuzla': return 'Tuzla';
        default: return '';
    }
}

function getServiceArea(slug: string): string[] {
    switch (slug) {
        case 'bijeljina': return ['Bijeljina', 'Janja', 'Dvorovi', 'Patkovača'];
        case 'brcko': return ['Brčko', 'Gornji Rahić', 'Donji Rahić', 'Brezovo Polje'];
        case 'tuzla': return ['Tuzla', 'Lukavac', 'Gračanica', 'Srebrenik', 'Živinice'];
        default: return ['Bijeljina', 'Brčko', 'Tuzla'];
    }
}