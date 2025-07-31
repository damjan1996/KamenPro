// Image optimization utilities for SEO and performance

export interface ImageOptimizationOptions {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'avif' | 'jpeg' | 'png' | 'auto';
    fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
    position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
}

export interface ResponsiveImageSet {
    src: string;
    srcSet: string;
    sizes: string;
    width: number;
    height: number;
}

// Standard breakpoints for responsive images
export const BREAKPOINTS = {
    xs: 480,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536
};

// Generate optimized image URL with parameters
export function generateOptimizedImageUrl(
    src: string, 
    options: ImageOptimizationOptions = {}
): string {
    // If external URL, return as-is (in production, you might proxy through your optimization service)
    if (src.startsWith('http') && !src.includes('kamenpro.net')) {
        return src;
    }

    const {
        width,
        height,
        quality = 85,
        format = 'auto',
        fit = 'cover',
        position = 'center'
    } = options;

    const params = new URLSearchParams();
    
    if (width) params.set('w', width.toString());
    if (height) params.set('h', height.toString());
    if (quality !== 85) params.set('q', quality.toString());
    if (format !== 'auto') params.set('f', format);
    if (fit !== 'cover') params.set('fit', fit);
    if (position !== 'center') params.set('pos', position);

    const queryString = params.toString();
    const baseUrl = src.startsWith('http') ? src : `https://kamenpro.net${src}`;
    
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

// Generate responsive image set for different screen sizes
export function generateResponsiveImageSet(
    src: string,
    baseWidth: number,
    baseHeight?: number,
    options: Omit<ImageOptimizationOptions, 'width' | 'height'> = {}
): ResponsiveImageSet {
    const aspectRatio = baseHeight ? baseHeight / baseWidth : undefined;
    
    // Generate srcSet for different screen densities and sizes
    const breakpointWidths = Object.values(BREAKPOINTS)
        .filter(bp => bp <= baseWidth * 2) // Don't generate larger than 2x original
        .sort((a, b) => a - b);

    // Add the base width if it's not in breakpoints
    if (!breakpointWidths.includes(baseWidth)) {
        breakpointWidths.push(baseWidth);
        breakpointWidths.sort((a, b) => a - b);
    }

    const srcSetEntries = breakpointWidths.map(width => {
        const height = aspectRatio ? Math.round(width * aspectRatio) : undefined;
        const url = generateOptimizedImageUrl(src, { ...options, width, height });
        return `${url} ${width}w`;
    });

    const srcSet = srcSetEntries.join(', ');

    // Generate sizes attribute based on common layout patterns
    const sizes = generateSizesAttribute(baseWidth);

    return {
        src: generateOptimizedImageUrl(src, { ...options, width: baseWidth, height: baseHeight }),
        srcSet,
        sizes,
        width: baseWidth,
        height: baseHeight || 0
    };
}

// Generate sizes attribute for responsive images
export function generateSizesAttribute(maxWidth: number): string {
    const sizes = [];
    
    // Mobile: full width up to 640px
    sizes.push('(max-width: 640px) 100vw');
    
    // Tablet: 80% width up to 1024px
    sizes.push('(max-width: 1024px) 80vw');
    
    // Desktop: fixed max width
    sizes.push(`${maxWidth}px`);
    
    return sizes.join(', ');
}

// Preload critical images for better LCP
export function preloadImage(src: string, options: ImageOptimizationOptions = {}): void {
    if (typeof window === 'undefined') return;
    
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = generateOptimizedImageUrl(src, options);
    
    // Add responsive preloading for hero images
    if (options.width) {
        const responsiveSet = generateResponsiveImageSet(src, options.width, options.height, options);
        link.setAttribute('imagesrcset', responsiveSet.srcSet);
        link.setAttribute('imagesizes', responsiveSet.sizes);
    }
    
    document.head.appendChild(link);
}

// Generate blur placeholder data URL
export function generateBlurDataURL(width = 10, height = 10, color = '#f3f4f6'): string {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';
    
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
    
    return canvas.toDataURL();
}

// Image format detection and support
export function getBestImageFormat(): 'avif' | 'webp' | 'jpeg' {
    if (typeof window === 'undefined') return 'jpeg';
    
    // Check AVIF support
    const avifCanvas = document.createElement('canvas');
    avifCanvas.width = 1;
    avifCanvas.height = 1;
    const avifSupported = avifCanvas.toDataURL('image/avif').indexOf('image/avif') === 5;
    
    if (avifSupported) return 'avif';
    
    // Check WebP support
    const webpCanvas = document.createElement('canvas');
    webpCanvas.width = 1;
    webpCanvas.height = 1;
    const webpSupported = webpCanvas.toDataURL('image/webp').indexOf('image/webp') === 5;
    
    if (webpSupported) return 'webp';
    
    return 'jpeg';
}

// SEO-optimized image metadata
export interface ImageSEOMetadata {
    alt: string;
    title?: string;
    caption?: string;
    keywords?: string[];
    location?: string;
    schema?: any;
}

export function generateImageSEOMetadata(
    filename: string,
    product?: string,
    location?: string
): ImageSEOMetadata {
    const baseAlt = filename
        .replace(/\.(jpg|jpeg|png|webp|avif)$/i, '')
        .replace(/[-_]/g, ' ')
        .toLowerCase();
    
    let alt = baseAlt;
    let title = baseAlt;
    const keywords: string[] = [baseAlt];
    
    if (product) {
        alt = `${product} - ${baseAlt}`;
        title = `${product} | KamenPro`;
        keywords.push(product, 'dekorativni kamen');
    }
    
    if (location) {
        alt += ` ${location}`;
        title += ` | ${location}`;
        keywords.push(location, `dekorativni kamen ${location}`);
    }
    
    return {
        alt: alt.charAt(0).toUpperCase() + alt.slice(1),
        title,
        keywords,
        location,
        schema: product ? {
            "@type": "ImageObject",
            "contentUrl": "", // Will be filled by the component
            "name": title,
            "description": alt,
            "keywords": keywords.join(', ')
        } : undefined
    };
}

// Critical image optimization for Core Web Vitals
export const CRITICAL_IMAGE_CONFIG = {
    hero: {
        quality: 90,
        format: 'webp' as const,
        priority: true,
        sizes: '100vw'
    },
    product: {
        quality: 85,
        format: 'webp' as const,
        priority: false,
        sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
    },
    thumbnail: {
        quality: 75,
        format: 'webp' as const,
        priority: false,
        sizes: '(max-width: 640px) 50vw, 25vw'
    }
};