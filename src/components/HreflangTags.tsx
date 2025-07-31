import { Helmet } from 'react-helmet-async';

interface HreflangTagsProps {
    currentPath: string;
    location?: string;
}

export default function HreflangTags({ currentPath, location }: HreflangTagsProps) {
    const baseUrl = 'https://kamenpro.net';
    
    // Simplified hreflang tags focusing on Bosnia and Herzegovina
    const hreflangTags = [
        // Primary language variants for Bosnia and Herzegovina
        { hreflang: 'sr-BA', href: `${baseUrl}${currentPath}` }, // Serbian in Bosnia
        { hreflang: 'bs-BA', href: `${baseUrl}${currentPath}` }, // Bosnian in Bosnia
        { hreflang: 'hr-BA', href: `${baseUrl}${currentPath}` }, // Croatian in Bosnia
        // Default/fallback
        { hreflang: 'x-default', href: `${baseUrl}${currentPath}` }
    ];

    // If this is a location page, add location-specific hreflang variations
    const locationHreflangTags = location ? [
        // Location-specific variants for better regional targeting
        { hreflang: 'sr', href: `${baseUrl}/lokacije/${location}` },
        { hreflang: 'sr-RS', href: `${baseUrl}/lokacije/${location}` },
        { hreflang: 'sr-BA', href: `${baseUrl}/lokacije/${location}` },
        { hreflang: 'bs-BA', href: `${baseUrl}/lokacije/${location}` },
        { hreflang: 'x-default', href: `${baseUrl}/lokacije/${location}` }
    ] : [];

    // Regional SEO optimization - specify the primary region for each location
    const getRegionalTags = (locationSlug: string) => {
        switch (locationSlug) {
            case 'bijeljina':
                return [
                    { hreflang: 'sr-RS', href: `${baseUrl}/lokacije/bijeljina` }, // Republika Srpska
                    { hreflang: 'sr-BA', href: `${baseUrl}/lokacije/bijeljina` }  // Bosnia and Herzegovina
                ];
            case 'brcko':
                return [
                    { hreflang: 'sr-BA', href: `${baseUrl}/lokacije/brcko` },     // Brčko Distrikt
                    { hreflang: 'bs-BA', href: `${baseUrl}/lokacije/brcko` },     // Bosnian in Brčko
                    { hreflang: 'hr-BA', href: `${baseUrl}/lokacije/brcko` }      // Croatian in Brčko
                ];
            case 'tuzla':
                return [
                    { hreflang: 'bs-BA', href: `${baseUrl}/lokacije/tuzla` },     // Federation of BiH
                    { hreflang: 'sr-BA', href: `${baseUrl}/lokacije/tuzla` }      // Serbian in Federation
                ];
            default:
                return [];
        }
    };

    const finalHreflangTags = location 
        ? [...getRegionalTags(location), ...hreflangTags.slice(-1)] // Add x-default
        : hreflangTags;

    return (
        <Helmet>
            {finalHreflangTags.map((tag, index) => (
                <link
                    key={`${tag.hreflang}-${index}`}
                    rel="alternate"
                    hrefLang={tag.hreflang}
                    href={tag.href}
                />
            ))}
            
            {/* Language meta tags for better regional targeting */}
            <meta name="language" content="sr" />
            <meta name="content-language" content="sr-BA" />
            <meta httpEquiv="content-language" content="sr-BA" />
            
            {/* Geo targeting for Bosnia and Herzegovina */}
            <meta name="geo.region" content="BA" />
            <meta name="geo.country" content="BA" />
            {location && (
                <>
                    <meta name="geo.placename" content={getLocationName(location)} />
                    <meta name="ICBM" content={getLocationCoordinates(location)} />
                </>
            )}
        </Helmet>
    );
}

// Helper functions
function getLocationName(locationSlug: string): string {
    switch (locationSlug) {
        case 'bijeljina': return 'Bijeljina, Republika Srpska, Bosnia and Herzegovina';
        case 'brcko': return 'Brčko, Brčko Distrikt, Bosnia and Herzegovina';
        case 'tuzla': return 'Tuzla, Federacija Bosne i Hercegovine, Bosnia and Herzegovina';
        default: return 'Bosnia and Herzegovina';
    }
}

function getLocationCoordinates(locationSlug: string): string {
    switch (locationSlug) {
        case 'bijeljina': return '44.7619, 19.2144';
        case 'brcko': return '44.8694, 18.8081';
        case 'tuzla': return '44.5382, 18.6734';
        default: return '44.0000, 18.0000';
    }
}