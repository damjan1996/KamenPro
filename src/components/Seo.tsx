import { Helmet } from 'react-helmet-async';

interface SeoProps {
    title: string;
    description: string;
    canonical?: string;
    keywords?: string;
    image?: string;
    schemaType?: 'Organization' | 'Product' | 'Article' | 'LocalBusiness' | 'WebPage';
    schemaData?: Record<string, any>;
    noindex?: boolean;
}

export function Seo({
                        title,
                        description,
                        canonical,
                        keywords,
                        image = 'https://kamenpro.net/images/logo.png',
                        schemaType = 'WebPage',
                        schemaData = {},
                        noindex = false
                    }: SeoProps) {
    const siteName = 'KamenPro';
    const fullTitle = `${title} | ${siteName}`;
    const baseUrl = 'https://kamenpro.net';
    const defaultKeywords = 'kamene obloge, prirodni kamen, zidne obloge, dekorativni kamen, enterijer, KamenPro, bijeljina, bosnia, hercegovina';
    const fullKeywords = keywords ? `${defaultKeywords}, ${keywords}` : defaultKeywords;
    const canonicalUrl = canonical ? `${baseUrl}${canonical}` : undefined;
    const fullImage = image.startsWith('http') ? image : `${baseUrl}${image}`;

    // Generate basic schema.org structured data
    const generateStructuredData = () => {
        const baseSchema = {
            '@context': 'https://schema.org',
            '@type': schemaType,
            url: canonicalUrl || baseUrl,
            name: title,
            description: description,
            image: fullImage,
        };

        // Add organization data
        if (schemaType === 'Organization' || schemaType === 'LocalBusiness') {
            return {
                ...baseSchema,
                logo: `${baseUrl}/images/logo.png`,
                contactPoint: {
                    '@type': 'ContactPoint',
                    telephone: '+38765678634',
                    contactType: 'customer service',
                    email: 'info@kamenpro.net',
                    areaServed: 'BA',
                    availableLanguage: ['Bosnian', 'Serbian', 'Croatian', 'English']
                },
                address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Bijeljina',
                    addressRegion: 'Republika Srpska',
                    addressCountry: 'BA'
                },
                ...schemaData
            };
        }

        // Add product data
        if (schemaType === 'Product') {
            return {
                ...baseSchema,
                brand: {
                    '@type': 'Brand',
                    name: 'KamenPro'
                },
                offers: {
                    '@type': 'Offer',
                    priceCurrency: 'BAM',
                    availability: 'https://schema.org/InStock',
                    ...schemaData.offers
                },
                ...schemaData
            };
        }

        // Add article data
        if (schemaType === 'Article') {
            return {
                ...baseSchema,
                publisher: {
                    '@type': 'Organization',
                    name: 'KamenPro',
                    logo: {
                        '@type': 'ImageObject',
                        url: `${baseUrl}/images/logo.png`
                    }
                },
                datePublished: schemaData.datePublished || new Date().toISOString(),
                dateModified: schemaData.dateModified || new Date().toISOString(),
                author: {
                    '@type': 'Person',
                    name: schemaData.author || 'KamenPro Team'
                },
                ...schemaData
            };
        }

        // Return base schema with any additional data for WebPage
        return {
            ...baseSchema,
            ...schemaData
        };
    };

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={fullKeywords} />
            <meta name="author" content="KamenPro" />
            
            {/* Geo Tags for Local SEO */}
            <meta name="geo.region" content="BA-BIH" />
            <meta name="geo.placename" content="Bijeljina" />
            <meta name="geo.position" content="44.758885;19.214172" />
            <meta name="ICBM" content="44.758885, 19.214172" />
            
            {/* Business Info */}
            <meta name="business:contact_data:street_address" content="Bulevar Kralja Petra I Karađorđevića 108" />
            <meta name="business:contact_data:locality" content="Bijeljina" />
            <meta name="business:contact_data:region" content="Republika Srpska" />
            <meta name="business:contact_data:postal_code" content="76300" />
            <meta name="business:contact_data:country_name" content="Bosnia and Herzegovina" />

            {noindex ? (
                <meta name="robots" content="noindex, nofollow" />
            ) : (
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
            )}

            <meta name="language" content="sr" />

            {/* Open Graph Tags */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={schemaType === 'Article' ? 'article' : 'website'} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:image" content={fullImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:locale" content="sr_RS" />

            {/* Twitter Card Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullImage} />

            {/* Canonical URL */}
            {canonicalUrl && (
                <>
                    <link rel="canonical" href={canonicalUrl} />
                    <meta property="og:url" content={canonicalUrl} />
                </>
            )}

            {/* Mobile Tags */}
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="theme-color" content="#1c1917" />
            <meta name="format-detection" content="telephone=no" />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(generateStructuredData())}
            </script>
        </Helmet>
    );
}