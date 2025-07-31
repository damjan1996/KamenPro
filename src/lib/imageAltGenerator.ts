// Enhanced image alt tag generation with detailed location context for better SEO

export interface ImageContext {
    productName?: string;
    productType?: string;
    location?: string;
    context?: 'product' | 'project' | 'showroom' | 'installation' | 'hero' | 'thumbnail';
    roomType?: string;
    style?: string;
    color?: string;
    texture?: string;
    applicationArea?: 'interior' | 'exterior' | 'both';
    keywords?: string[];
}

export interface DetailedAltTag {
    alt: string;
    title?: string;
    description?: string;
    keywords: string[];
    seoScore: number;
}

// Main function to generate detailed alt tags
export function generateDetailedAltTag(
    filename: string,
    context: ImageContext = {}
): DetailedAltTag {
    const baseKeywords = ['dekorativni kamen', 'kamene obloge', 'zidne obloge'];
    let alt = '';
    let title = '';
    let description = '';
    const keywords: string[] = [...baseKeywords];
    
    // Extract information from filename if not provided in context
    const fileInfo = extractInfoFromFilename(filename);
    const mergedContext = { ...fileInfo, ...context };
    
    // Build alt tag based on context
    alt = buildAltText(mergedContext);
    title = buildTitleText(mergedContext);
    description = buildDescriptionText(mergedContext);
    
    // Add context-specific keywords
    keywords.push(...buildKeywords(mergedContext));
    
    // Calculate SEO score
    const seoScore = calculateSEOScore(alt, keywords);
    
    return {
        alt,
        title,
        description,
        keywords: [...new Set(keywords)], // Remove duplicates
        seoScore
    };
}

// Extract information from filename
function extractInfoFromFilename(filename: string): Partial<ImageContext> {
    const context: Partial<ImageContext> = {};
    const cleanName = filename.toLowerCase()
        .replace(/\.(jpg|jpeg|png|webp|avif)$/i, '')
        .replace(/[-_]/g, ' ');
    
    // Product type detection
    if (cleanName.includes('travertin')) {
        context.productName = 'Travertin';
        context.productType = 'prirodni kamen';
    } else if (cleanName.includes('cigla')) {
        context.productName = 'Dekorativna cigla';
        context.productType = 'umjetni kamen';
    } else if (cleanName.includes('dolomite')) {
        context.productName = 'Dolomit';
        context.productType = 'prirodni kamen';
    } else if (cleanName.includes('mozaik')) {
        context.productName = 'Kameni mozaik';
        context.productType = 'mozaik';
    }
    
    // Color detection
    if (cleanName.includes('white') || cleanName.includes('bijel')) {
        context.color = 'bijela';
    } else if (cleanName.includes('black') || cleanName.includes('crn')) {
        context.color = 'crna';
    } else if (cleanName.includes('anthracite') || cleanName.includes('antracit')) {
        context.color = 'antracit';
    } else if (cleanName.includes('beige') || cleanName.includes('bež')) {
        context.color = 'bež';
    }
    
    // Style detection
    if (cleanName.includes('rustik')) {
        context.style = 'rustikalni';
    } else if (cleanName.includes('modern')) {
        context.style = 'moderni';
    } else if (cleanName.includes('classic')) {
        context.style = 'klasični';
    }
    
    // Context detection from filename
    if (cleanName.includes('showroom') || cleanName.includes('izlog')) {
        context.context = 'showroom';
    } else if (cleanName.includes('project') || cleanName.includes('projekat')) {
        context.context = 'project';
    } else if (cleanName.includes('installation') || cleanName.includes('montaža')) {
        context.context = 'installation';
    }
    
    return context;
}

// Build main alt text
function buildAltText(context: ImageContext): string {
    let parts: string[] = [];
    
    // Start with product name if available
    if (context.productName) {
        parts.push(context.productName);
    } else if (context.productType) {
        parts.push(`Dekorativni ${context.productType}`);
    } else {
        parts.push('Dekorativni kamen');
    }
    
    // Add color
    if (context.color) {
        parts.push(`${context.color} boja`);
    }
    
    // Add style
    if (context.style) {
        parts.push(`${context.style} stil`);
    }
    
    // Add context-specific details
    switch (context.context) {
        case 'showroom':
            parts.push('u showroom-u');
            break;
        case 'project':
            parts.push('na realizovanom projektu');
            break;
        case 'installation':
            parts.push('tokom profesionalne montaže');
            break;
        case 'hero':
            parts.push('za dom i poslovni prostor');
            break;
    }
    
    // Add location
    if (context.location) {
        const locationName = getLocationDisplayName(context.location);
        parts.push(`u ${locationName}`);
    }
    
    // Add application area
    if (context.applicationArea) {
        switch (context.applicationArea) {
            case 'interior':
                parts.push('za enterijer');
                break;
            case 'exterior':
                parts.push('za eksterijer');
                break;
            case 'both':
                parts.push('za enterijer i eksterijer');
                break;
        }
    }
    
    return parts.join(' ');
}

// Build title text for title attribute
function buildTitleText(context: ImageContext): string {
    let title = '';
    
    if (context.productName && context.location) {
        const locationName = getLocationDisplayName(context.location);
        title = `${context.productName} - KamenPro ${locationName}`;
    } else if (context.productName) {
        title = `${context.productName} - KamenPro`;
    } else if (context.location) {
        const locationName = getLocationDisplayName(context.location);
        title = `Dekorativni kamen - KamenPro ${locationName}`;
    } else {
        title = 'Dekorativni kamen - KamenPro';
    }
    
    return title;
}

// Build description for image metadata
function buildDescriptionText(context: ImageContext): string {
    let parts: string[] = [];
    
    if (context.productName) {
        parts.push(`Visokokvalitetni ${context.productName.toLowerCase()}`);
    } else {
        parts.push('Profesionalni dekorativni kamen');
    }
    
    if (context.location) {
        const locationName = getLocationDisplayName(context.location);
        parts.push(`dostupan u ${locationName}`);
    }
    
    parts.push('sa besplatnom dostavom i stručnom montažom');
    
    return parts.join(' ') + '.';
}

// Build SEO keywords array
function buildKeywords(context: ImageContext): string[] {
    const keywords: string[] = [];
    
    // Product-specific keywords
    if (context.productName) {
        keywords.push(context.productName.toLowerCase());
        keywords.push(`${context.productName.toLowerCase()} kamen`);
    }
    
    if (context.productType) {
        keywords.push(context.productType);
    }
    
    // Color keywords
    if (context.color) {
        keywords.push(`${context.color} kamen`);
        keywords.push(`${context.color} obloge`);
    }
    
    // Style keywords
    if (context.style) {
        keywords.push(`${context.style} kamen`);
        keywords.push(`${context.style} obloge`);
    }
    
    // Location keywords
    if (context.location) {
        const locationName = getLocationDisplayName(context.location);
        keywords.push(`dekorativni kamen ${locationName.toLowerCase()}`);
        keywords.push(`kamene obloge ${locationName.toLowerCase()}`);
        keywords.push(`zidne obloge ${locationName.toLowerCase()}`);
    }
    
    // Context keywords
    switch (context.context) {
        case 'showroom':
            keywords.push('showroom', 'izložba kamena');
            break;
        case 'project':
            keywords.push('projekat', 'realizacija', 'montaža kamena');
            break;
        case 'installation':
            keywords.push('ugradnja', 'montaža', 'stručna ugradnja');
            break;
    }
    
    // Application area keywords
    if (context.applicationArea) {
        switch (context.applicationArea) {
            case 'interior':
                keywords.push('enterijer', 'unutrašnji zidovi');
                break;
            case 'exterior':
                keywords.push('eksterijer', 'fasada', 'vanjski zidovi');
                break;
            case 'both':
                keywords.push('enterijer', 'eksterijer', 'fasada');
                break;
        }
    }
    
    return keywords;
}

// Calculate SEO score based on alt text quality and keyword density
function calculateSEOScore(alt: string, keywords: string[]): number {
    let score = 0;
    
    // Length score (optimal length 125-150 characters)
    const length = alt.length;
    if (length >= 50 && length <= 125) {
        score += 30;
    } else if (length > 125 && length <= 150) {
        score += 25;
    } else if (length > 150) {
        score += 15;
    } else {
        score += 10;
    }
    
    // Keyword presence score
    const altLower = alt.toLowerCase();
    let keywordMatches = 0;
    keywords.forEach(keyword => {
        if (altLower.includes(keyword.toLowerCase())) {
            keywordMatches++;
        }
    });
    score += Math.min(keywordMatches * 10, 40);
    
    // Descriptiveness score (presence of descriptive words)
    const descriptiveWords = ['visokokvalitetni', 'profesionalni', 'prirodni', 'umjetni', 'stručni'];
    let descriptiveMatches = 0;
    descriptiveWords.forEach(word => {
        if (altLower.includes(word)) {
            descriptiveMatches++;
        }
    });
    score += Math.min(descriptiveMatches * 5, 15);
    
    // Location context score
    if (altLower.includes('bijeljina') || altLower.includes('brčko') || altLower.includes('tuzla')) {
        score += 15;
    }
    
    return Math.min(score, 100); // Cap at 100
}

// Helper function to get display name for location
function getLocationDisplayName(locationSlug: string): string {
    switch (locationSlug.toLowerCase()) {
        case 'bijeljina': return 'Bijeljini';
        case 'brcko': return 'Brčkom';
        case 'tuzla': return 'Tuzli';
        default: return locationSlug;
    }
}

// Predefined alt tags for common KamenPro images
export const PREDEFINED_ALT_TAGS = {
    hero: {
        general: generateDetailedAltTag('hero-dekorativni-kamen.jpg', {
            context: 'hero',
            applicationArea: 'both',
            keywords: ['najbolji izbor', 'vrhunski kvalitet']
        }),
        bijeljina: generateDetailedAltTag('hero-bijeljina.jpg', {
            context: 'hero',
            location: 'bijeljina',
            applicationArea: 'both'
        }),
        brcko: generateDetailedAltTag('hero-brcko.jpg', {
            context: 'hero',
            location: 'brcko',
            applicationArea: 'both'
        }),
        tuzla: generateDetailedAltTag('hero-tuzla.jpg', {
            context: 'hero',
            location: 'tuzla',
            applicationArea: 'both'
        })
    },
    products: {
        travertin: generateDetailedAltTag('travertin-white.jpg', {
            productName: 'Travertin',
            productType: 'prirodni kamen',
            color: 'bijela',
            context: 'product',
            applicationArea: 'both'
        }),
        cigla: generateDetailedAltTag('cigla-rustik-red.jpg', {
            productName: 'Dekorativna cigla',
            productType: 'umjetni kamen',
            color: 'crvena',
            style: 'rustikalni',
            context: 'product',
            applicationArea: 'both'
        })
    },
    showroom: {
        general: generateDetailedAltTag('showroom-interior.jpg', {
            context: 'showroom',
            keywords: ['ekspozicija', 'izbor proizvoda']
        })
    }
};

// Export convenience function for React components
export function useImageAlt(filename: string, context?: ImageContext): DetailedAltTag {
    return generateDetailedAltTag(filename, context);
}