import { useState, useEffect, useCallback } from 'react';
import { AlertCircle } from 'lucide-react';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fallbackSrc?: string;
  onError?: (error: Error) => void;
}

type LoadingState = 'initial' | 'loading' | 'loaded' | 'error';

export function Image({ 
  src, 
  alt, 
  className = '', 
  sizes = '100vw',
  priority = false,
  fallbackSrc,
  onError 
}: ImageProps) {
  const [loadingState, setLoadingState] = useState<LoadingState>('initial');
  const [isIntersecting, setIsIntersecting] = useState(priority);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 2;

  // Validate image URL
  const validateImageUrl = useCallback((url: string): boolean => {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.protocol === 'https:' && 
             parsedUrl.hostname === 'images.unsplash.com';
    } catch {
      return false;
    }
  }, []);

  // Sanitize image URL
  const sanitizeImageUrl = useCallback((url: string): string => {
    if (!validateImageUrl(url)) {
      console.error('Invalid image URL detected:', url);
      return fallbackSrc || '';
    }
    return url;
  }, [fallbackSrc]);

  const handleImageError = useCallback((error: Error | Event) => {
    if (retryCount < maxRetries) {
      setRetryCount(prev => prev + 1);
      setLoadingState('loading');
      setCurrentSrc(`${sanitizeImageUrl(src)}?retry=${retryCount + 1}`);
    } else if (fallbackSrc && currentSrc !== fallbackSrc) {
      setLoadingState('loading');
      setCurrentSrc(sanitizeImageUrl(fallbackSrc));
    } else {
      setLoadingState('error');
      if (onError && error instanceof Error) {
        onError(error);
      }
    }
  }, [src, fallbackSrc, retryCount, currentSrc, onError, sanitizeImageUrl]);

  useEffect(() => {
    if (priority) {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          setLoadingState('loading');
        }
      },
      {
        rootMargin: '50px',
      }
    );

    const element = document.querySelector(`[data-image-src="${sanitizeImageUrl(src)}"]`);
    if (element) {
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
    };
  }, [src, priority, sanitizeImageUrl]);

  useEffect(() => {
    const sanitizedSrc = sanitizeImageUrl(src);
    setCurrentSrc(sanitizedSrc);
    setRetryCount(0);
    setLoadingState('initial');
  }, [src, sanitizeImageUrl]);

  const generateSrcSet = (format: 'jpg' | 'webp') => {
    const widths = [640, 750, 828, 1080, 1200, 1920, 2048];
    const sanitizedUrl = sanitizeImageUrl(currentSrc);
    if (!sanitizedUrl) return '';
    
    const baseUrl = sanitizedUrl.split('?')[0];
    const formatParam = format === 'webp' ? '&fm=webp' : '';
    
    return widths
      .map(width => `${baseUrl}?w=${width}&q=75${formatParam} ${width}w`)
      .join(', ');
  };

  const renderLoadingState = () => {
    if (loadingState === 'loading' || (loadingState === 'initial' && !priority)) {
      return (
        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%]" />
      );
    }
    return null;
  };

  if (loadingState === 'error') {
    return (
      <div className={`bg-red-50 flex flex-col items-center justify-center p-4 rounded-md ${className}`}>
        <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
        <span className="text-red-700 text-sm text-center">
          Slika nije dostupna
        </span>
        {retryCount > 0 && (
          <button
            onClick={() => {
              setRetryCount(0);
              setLoadingState('loading');
              setCurrentSrc(sanitizeImageUrl(src));
            }}
            className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
          >
            Pokušajte ponovo
          </button>
        )}
      </div>
    );
  }

  return (
    <div 
      className="relative overflow-hidden"
      data-image-src={sanitizeImageUrl(src)}
    >
      {renderLoadingState()}
      <picture>
        <source
          type="image/webp"
          sizes={sizes}
          srcSet={isIntersecting ? generateSrcSet('webp') : undefined}
        />
        <source
          type="image/jpeg"
          sizes={sizes}
          srcSet={isIntersecting ? generateSrcSet('jpg') : undefined}
        />
        <img
          src={isIntersecting ? `${sanitizeImageUrl(currentSrc)}?w=1200&q=75` : 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'}
          alt={alt}
          className={`${className} transition-opacity duration-500 ${loadingState === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={() => setLoadingState('loaded')}
          onError={(e) => handleImageError(e)}
          crossOrigin="anonymous"
        />
      </picture>
    </div>
  );
}