import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Seo } from '../../components/Seo';
import HreflangTags from '../../components/HreflangTags';
import { getLocationBySlug } from '../../lib/locationData';
import { LocationHero } from './components/LocationHero';
import { LocationContent } from './components/LocationContent';
import { LocalProjects } from './components/LocalProjects';
import { LocalTestimonials } from './components/LocalTestimonials';
import { LocationContact } from './components/LocationContact';
import { ProductShowcase } from './components/ProductShowcase';
import { LocationFAQ } from './components/LocationFAQ';
import GMBWidget from '../../components/gmb/GMBWidget';
import InstallationServiceSchema from '../../components/schemas/InstallationServiceSchema';
import { NotFound } from '../NotFound';

export default function LocationPage() {
    const { location } = useParams<{ location: string }>();
    const locationData = location ? getLocationBySlug(location) : undefined;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    if (!locationData) {
        return <NotFound />;
    }

    const { city, cityGenitive, seoTitle, metaDescription, keywords, coordinates } = locationData;

    // Generate location-specific schema data
    const locationSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": `https://kamenpro.net/lokacije/${locationData.citySlug}`,
        "name": `KamenPro ${city}`,
        "description": `Profesionalni dekorativni kamen i zidne obloge u ${cityGenitive}. Besplatna dostava i stručna montaža.`,
        "url": `https://kamenpro.net/lokacije/${locationData.citySlug}`,
        "telephone": locationData.contactInfo.phone,
        "email": locationData.contactInfo.email,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": city,
            "addressRegion": "Republika Srpska",
            "addressCountry": "BA"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": coordinates.lat,
            "longitude": coordinates.lng
        },
        "areaServed": {
            "@type": "City",
            "name": city,
            "containedInPlace": {
                "@type": "Country",
                "name": "Bosnia and Herzegovina"
            }
        },
        "priceRange": "$$",
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "08:00",
                "closes": "17:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Saturday",
                "opens": "08:00",
                "closes": "14:00"
            }
        ],
        "image": [
            `https://kamenpro.net/images/lokacije/${locationData.citySlug}-showroom.jpg`,
            `https://kamenpro.net/images/lokacije/${locationData.citySlug}-proizvodi.jpg`,
            `https://kamenpro.net/images/lokacije/${locationData.citySlug}-projekti.jpg`
        ],
        "potentialAction": {
            "@type": "ContactAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": `https://kamenpro.net/kontakt?lokacija=${locationData.citySlug}`,
                "inLanguage": "bs",
                "actionPlatform": [
                    "http://schema.org/DesktopWebPlatform",
                    "http://schema.org/MobileWebPlatform"
                ]
            },
            "contactType": "customer service"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Dekorativni kamen proizvodi",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Dekorativni kamen",
                        "description": "Prirodni i umjetni dekorativni kamen za zidove"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Montaža kamena",
                        "description": "Profesionalna montaža dekorativnog kamena"
                    }
                }
            ]
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "124",
            "bestRating": "5",
            "worstRating": "1"
        }
    };

    // Breadcrumb schema
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Početna",
                "item": "https://kamenpro.net"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Lokacije",
                "item": "https://kamenpro.net/lokacije"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": city,
                "item": `https://kamenpro.net/lokacije/${locationData.citySlug}`
            }
        ]
    };

    return (
        <>
            <Seo
                title={seoTitle}
                description={metaDescription}
                canonical={`/lokacije/${locationData.citySlug}`}
                keywords={keywords.join(', ')}
                image={`/images/lokacije/${locationData.citySlug}-og.jpg`}
                schemaType="LocalBusiness"
                schemaData={locationSchema}
            />
            
            <HreflangTags 
                currentPath={`/lokacije/${locationData.citySlug}`}
                location={locationData.citySlug}
            />
            
            <InstallationServiceSchema location={locationData.citySlug} />
            
            {/* Additional schema markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema)
                }}
            />

            <main className="pt-20">
                <LocationHero locationData={locationData} />
                <LocationContent locationData={locationData} />
                <ProductShowcase city={city} />
                <LocalProjects locationData={locationData} />
                <LocalTestimonials locationData={locationData} />
                
                {/* GMB Integration Section */}
                <section className="py-12 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
                                Pronađite nas na Google Maps
                            </h2>
                            <GMBWidget 
                                locationSlug={locationData.citySlug}
                                showReviews={true}
                                showActions={true}
                            />
                        </div>
                    </div>
                </section>
                
                <LocationFAQ city={city} cityGenitive={cityGenitive} />
                <LocationContact locationData={locationData} />
            </main>
        </>
    );
}