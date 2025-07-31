export default function MultiLocationBusinessSchema() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://kamenpro.net/#organization",
        "name": "KamenPro",
        "url": "https://kamenpro.net",
        "logo": "https://kamenpro.net/logo.png",
        "description": "Proizvođač dekorativnih kamenih obloga u Bosni i Hercegovini",
        "foundingDate": "2014",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Bijeljina",
            "addressRegion": "Republika Srpska",
            "addressCountry": "BA"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+387-65-678-634",
            "contactType": "customer service",
            "email": "info@kamenpro.net",
            "areaServed": ["BA"],
            "availableLanguage": ["bs", "sr", "hr", "en"]
        },
        "sameAs": [
            "https://www.facebook.com/kamenpro",
            "https://www.instagram.com/kamenpro"
        ],
        "location": [
            {
                "@type": "Place",
                "name": "KamenPro Bijeljina",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Bijeljina",
                    "addressRegion": "Republika Srpska",
                    "addressCountry": "BA"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 44.7619,
                    "longitude": 19.2144
                }
            },
            {
                "@type": "Place",
                "name": "KamenPro Brčko",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Brčko",
                    "addressRegion": "Brčko Distrikt",
                    "addressCountry": "BA"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 44.8694,
                    "longitude": 18.8081
                }
            },
            {
                "@type": "Place",
                "name": "KamenPro Tuzla",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Tuzla",
                    "addressRegion": "Federacija Bosne i Hercegovine",
                    "addressCountry": "BA"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 44.5382,
                    "longitude": 18.6734
                }
            }
        ],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Dekorativni kameni proizvodi",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Product",
                        "name": "Dekorativni kamen",
                        "description": "Prirodni i umjetni dekorativni kamen za zidove",
                        "category": "Građevinski materijali"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Montaža dekorativnog kamena",
                        "description": "Profesionalna ugradnja kamenih obloga",
                        "serviceType": "Građevinske usluge"
                    }
                }
            ]
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(organizationSchema)
            }}
        />
    );
}