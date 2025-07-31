import React, { useState, useRef, useEffect } from 'react';
import { generateDetailedAltTag, ImageContext } from '../lib/imageAltGenerator';

interface OptimizedImageProps {
    src: string;
    alt?: string;
    imageContext?: ImageContext;
    width?: number;
    height?: number;
    className?: string;
    loading?: 'lazy' | 'eager';
    priority?: boolean;
    sizes?: string;
    quality?: number;
    format?: 'webp' | 'avif' | 'auto';
    placeholder?: 'blur' | 'empty';
    blurDataURL?: string;
    onLoad?: () => void;
    onError?: () => void;
}

export default function OptimizedImage({
    src,
    alt,
    imageContext,
    width,
    height,
    className = '',
    loading = 'lazy',
    priority = false,
    sizes,
    quality = 85,
    format = 'auto',
    placeholder = 'blur',
    blurDataURL,
    onLoad,
    onError
}: OptimizedImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(priority);
    const [hasError, setHasError] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);
    const [currentSrc, setCurrentSrc] = useState<string>('');

    // Generate enhanced alt tag if not provided
    const getImageAlt = (): { alt: string; title: string } => {
        if (alt) {
            return { alt, title: alt };
        }
        
        // Extract filename from src
        const filename = src.split('/').pop() || 'image';
        const detailedAlt = generateDetailedAltTag(filename, imageContext);
        
        return {
            alt: detailedAlt.alt,
            title: detailedAlt.title || detailedAlt.alt
        };
    };

    const { alt: enhancedAlt, title: enhancedTitle } = getImageAlt();

    // Intersection Observer for lazy loading
    useEffect(() => {
        if (priority || loading === 'eager') {
            setIsInView(true);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                        observer.disconnect();
                    }
                });
            },
            {
                rootMargin: '50px'
            }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
    }, [priority, loading]);

    // Generate optimized image URLs
    const generateImageUrl = (originalSrc: string, format: string, quality: number, width?: number): string => {
        // If it's an external URL, return as-is
        if (originalSrc.startsWith('http')) {
            return originalSrc;
        }

        // For local images, we would integrate with an image optimization service
        // For now, we'll return the original src with query parameters
        const params = new URLSearchParams();
        if (quality && quality !== 85) params.set('q', quality.toString());
        if (width) params.set('w', width.toString());
        if (format !== 'auto') params.set('f', format);

        const queryString = params.toString();
        return queryString ? `${originalSrc}?${queryString}` : originalSrc;
    };

    // Generate srcSet for responsive images
    const generateSrcSet = (): string => {
        if (!width || src.startsWith('http')) return '';

        const breakpoints = [480, 768, 1024, 1280, 1920];
        const srcSet = breakpoints
            .filter(bp => bp <= width * 2) // Don't generate larger than 2x original
            .map(bp => {
                const url = generateImageUrl(src, format, quality, bp);
                return `${url} ${bp}w`;
            })
            .join(', ');

        return srcSet;
    };

    // Handle image load
    const handleLoad = () => {
        setIsLoaded(true);
        onLoad?.();
    };

    // Handle image error
    const handleError = () => {
        setHasError(true);
        onError?.();
    };

    // Update src when in view
    useEffect(() => {
        if (isInView) {
            setCurrentSrc(generateImageUrl(src, format, quality, width));
        }
    }, [isInView, src, format, quality, width]);

    // Placeholder blur data URL
    const getBlurDataURL = (): string => {
        if (blurDataURL) return blurDataURL;
        
        // Generate a simple blur placeholder
        const canvas = document.createElement('canvas');
        canvas.width = 10;
        canvas.height = 10;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.fillStyle = '#f3f4f6';
            ctx.fillRect(0, 0, 10, 10);
        }
        return canvas.toDataURL();
    };

    const containerStyle: React.CSSProperties = {
        display: 'inline-block',
        overflow: 'hidden',
        position: 'relative',
        ...(width && height && {
            width: `${width}px`,
            height: `${height}px`
        })
    };

    const imageStyle: React.CSSProperties = {
        transition: 'opacity 0.3s ease',
        opacity: isLoaded ? 1 : 0,
        ...(placeholder === 'blur' && !isLoaded && {
            filter: 'blur(10px)',
            transform: 'scale(1.1)'
        })
    };

    if (hasError) {
        return (
            <div 
                className={`bg-gray-200 flex items-center justify-center ${className}`}
                style={containerStyle}
            >
                <span className="text-gray-400 text-sm">Slika nije dostupna</span>
            </div>
        );
    }

    return (
        <div style={containerStyle} className={className}>
            {/* Blur placeholder */}
            {placeholder === 'blur' && !isLoaded && (
                <img
                    src={getBlurDataURL()}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    aria-hidden="true"
                />
            )}
            
            {/* Main image */}
            <img
                ref={imgRef}
                src={isInView ? currentSrc : undefined}
                srcSet={isInView ? generateSrcSet() : undefined}
                sizes={sizes}
                alt={enhancedAlt}
                title={enhancedTitle}
                width={width}
                height={height}
                loading={loading}
                decoding="async"
                style={imageStyle}
                className="w-full h-full object-cover"
                onLoad={handleLoad}
                onError={handleError}
                {...(priority && { fetchPriority: 'high' as any })}
            />
        </div>
    );
}

// Helper component for hero images (above the fold)
export function HeroImage(props: Omit<OptimizedImageProps, 'loading' | 'priority'>) {
    const heroContext: ImageContext = {
        context: 'hero',
        applicationArea: 'both',
        ...props.imageContext
    };
    return <OptimizedImage {...props} imageContext={heroContext} loading="eager" priority={true} />;
}

// Helper component for product images
export function ProductImage(props: OptimizedImageProps & { productName?: string; location?: string }) {
    const productContext: ImageContext = {
        context: 'product',
        productName: props.productName,
        location: props.location,
        ...props.imageContext
    };
    return <OptimizedImage {...props} imageContext={productContext} format="webp" quality={90} />;
}

// Helper component for thumbnail images
export function ThumbnailImage(props: OptimizedImageProps & { location?: string }) {
    const thumbnailContext: ImageContext = {
        context: 'thumbnail',
        location: props.location,
        ...props.imageContext
    };
    return <OptimizedImage {...props} imageContext={thumbnailContext} format="webp" quality={75} />;
}

// Helper component for location-specific images
export function LocationImage(props: OptimizedImageProps & { location: string; context?: string }) {
    const locationContext: ImageContext = {
        location: props.location,
        context: (props.context as any) || 'showroom',
        ...props.imageContext
    };
    return <OptimizedImage {...props} imageContext={locationContext} />;
}