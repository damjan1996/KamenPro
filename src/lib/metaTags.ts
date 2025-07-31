export interface MetaTagsConfig {
    title: string;
    description: string;
    keywords: string[];
    canonical?: string;
    ogImage?: string;
    alternateLanguages?: { hreflang: string; href: string }[];
    structuredData?: any;
}

export const defaultMetaTags: Partial<MetaTagsConfig> = {
    keywords: [
        'kamene obloge',
        'dekorativni kamen',
        'zidne obloge',
        'prirodni kamen',
        'fasadni kamen',
        'enterijer kamen',
        'bijeljina',
        'brčko',
        'tuzla',
        'bosna i hercegovina',
        'kamenpro'
    ]
};

export const locationMetaTags = {
    bijeljina: {
        title: 'Dekorativni Kamen Bijeljina | Zidne Obloge | KamenPro',
        description: 'Kupiti dekorativni kamen u Bijeljini. Profesionalne dekorativne zidne obloge sa besplatnom dostavom i montažom. Kontaktirajte KamenPro danas!',
        keywords: [
            'dekorativni kamen bijeljina',
            'kamene obloge bijeljina',
            'zidne obloge bijeljina',
            'prirodni kamen bijeljina',
            'fasadni kamen bijeljina',
            'kupiti dekorativni kamen bijeljina',
            'kamenpro bijeljina'
        ]
    },
    brcko: {
        title: 'Dekorativni Kamen Brčko | Zidne Obloge | KamenPro',
        description: 'Kupiti dekorativni kamen u Brčkom. Vrhunske dekorativne zidne obloge za vaš dom ili poslovni prostor. Besplatna procjena projekta.',
        keywords: [
            'dekorativni kamen brčko',
            'kamene obloge brčko',
            'zidne obloge brčko',
            'prirodni kamen brčko',
            'fasadni kamen brčko',
            'kupiti dekorativni kamen brčko',
            'kamenpro brčko',
            'brčko distrikt'
        ]
    },
    tuzla: {
        title: 'Dekorativni Kamen Tuzla | Zidne Obloge | KamenPro',
        description: 'Kupiti dekorativni kamen u Tuzli. Kvalitetne dekorativne zidne obloge sa garancijom. Pogledajte našu ponudu i kontaktirajte nas.',
        keywords: [
            'dekorativni kamen tuzla',
            'kamene obloge tuzla',
            'zidne obloge tuzla',
            'prirodni kamen tuzla',
            'fasadni kamen tuzla',
            'kupiti dekorativni kamen tuzla',
            'kamenpro tuzla',
            'tuzlanski kanton'
        ]
    }
};

export const productMetaTags = {
    default: {
        title: 'Proizvodi | Dekorativni Kamen | KamenPro',
        description: 'Otkrijte naš širok izbor dekorativnog kamena. Prirodne i umjetne kamene obloge za enterijer i eksterijer. Najbolje cijene u BiH.',
        keywords: [
            'proizvodi dekorativni kamen',
            'katalog kamenih obloga',
            'vrste dekorativnog kamena',
            'cijena dekorativni kamen',
            'kupiti kamene obloge'
        ]
    }
};

export function generatePageTitle(title: string, location?: string): string {
    if (location) {
        return `${title} ${location} | KamenPro`;
    }
    return `${title} | KamenPro`;
}

export function generateMetaDescription(description: string, location?: string): string {
    if (location) {
        return description.replace(/\{location\}/g, location);
    }
    return description;
}

export function generateKeywords(baseKeywords: string[], locationKeywords?: string[]): string {
    const combined = [...baseKeywords];
    if (locationKeywords) {
        combined.push(...locationKeywords);
    }
    combined.push(...defaultMetaTags.keywords!);
    
    // Remove duplicates and limit to 20 keywords
    return [...new Set(combined)].slice(0, 20).join(', ');
}

export function generateCanonicalUrl(path: string): string {
    const baseUrl = 'https://kamenpro.net';
    return `${baseUrl}${path}`;
}