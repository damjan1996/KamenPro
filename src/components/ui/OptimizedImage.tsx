// src/components/ui/OptimizedImage.tsx - Enhanced version with automatic format selection
import { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fallbackSrc?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  onError?: (error: Error) => void;
  // New props for optimization
  autoFormat?: boolean;
  quality?: number;
  responsive?: boolean;
}

type LoadingState = 'initial' | 'loading' | 'loaded' | 'error';

export function OptimizedImage({
  src,
  alt,
  className = '',
  sizes = '100vw',
  priority = false,
  fallbackSrc = '/images/placeholder.jpg',
  width,
  height,
  loading = 'lazy',
  decoding = 'async',
  onError,
  autoFormat = true,
  quality = 85,
  responsive = true
}: OptimizedImageProps) {
  const [loadingState, setLoadingState] = useState<LoadingState>('initial');
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [srcSet, setSrcSet] = useState<string>('');

  // Generate optimized image sources
  const generateOptimizedSources = (originalSrc: string) => {
    if (!autoFormat || originalSrc.startsWith('http') || originalSrc.startsWith('data:')) {
      return { src: originalSrc, srcSet: '' };
    }

    const pathInfo = parseImagePath(originalSrc);
    if (!pathInfo) {
      return { src: originalSrc, srcSet: '' };
    }

    const { dir, name, ext } = pathInfo;
    
    // Check if browser supports modern formats
    const supportsWebP = checkWebPSupport();
    const supportsAVIF = checkAVIFSupport();
    
    let format = ext;
    if (supportsAVIF) {
      format = 'avif';
    } else if (supportsWebP) {
      format = 'webp';
    }

    // Generate responsive sizes
    const responsiveSizes = responsive ? [400, 800, 1200, 1920] : [width || 800];
    
    const srcSetEntries = responsiveSizes.map(size => {
      const optimizedPath = `/images/${dir}/${name}-${size}w.${format}`;
      return `${optimizedPath} ${size}w`;
    }).join(', ');

    const fallbackSrc = `/images/${dir}/${name}-optimized.${ext}`;

    return {
      src: fallbackSrc,
      srcSet: srcSetEntries
    };
  };

  useEffect(() => {
    // Reset the state when the source changes
    setLoadingState('initial');
    
    const optimizedSources = generateOptimizedSources(src);
    setImgSrc(optimizedSources.src);
    setSrcSet(optimizedSources.srcSet);
  }, [src, autoFormat, responsive, width]);

  useEffect(() => {
    if (loadingState === 'initial') {
      setLoadingState('loading');

      // Priority images should be preloaded
      if (priority && typeof window !== 'undefined') {
        preloadImage(imgSrc, srcSet, sizes);
      }

      // Test if optimized image exists
      const img = new window.Image();
      if (sizes && srcSet) {
        img.sizes = sizes;
        img.srcset = srcSet;
      }
      img.src = imgSrc;

      img.onload = () => {
        setLoadingState('loaded');
      };

      img.onerror = () => {
        const error = new Error(`Failed to load optimized image: ${imgSrc}`);
        if (onError) {
          onError(error);
        } else {
          console.warn(error);
        }

        // Fallback to original source
        if (imgSrc !== src) {
          setImgSrc(src);
          setSrcSet('');
        } else if (fallbackSrc && imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc);
          setSrcSet('');
        } else {
          setLoadingState('error');
        }
      };
    }
  }, [imgSrc, loadingState, fallbackSrc, onError, priority, sizes, src, srcSet]);

  // Base classes for different states
  const baseClasses = `${className}`;
  const loadingClasses = `${baseClasses} animate-pulse bg-gray-200`;
  const errorClasses = `${baseClasses} bg-gray-100 flex items-center justify-center`;

  if (loadingState === 'loading' && !priority) {
    return (
      <div
        className={loadingClasses}
        aria-busy="true"
        style={{
          aspectRatio: width && height ? width / height : undefined,
          width: width ? `${width}px` : undefined,
          height: height ? `${height}px` : undefined
        }}
      />
    );
  }

  if (loadingState === 'error') {
    return (
      <div
        className={errorClasses}
        role="alert"
        aria-label={`Failed to load image: ${alt}`}
        style={{
          aspectRatio: width && height ? width / height : undefined,
          width: width ? `${width}px` : undefined,
          height: height ? `${height}px` : undefined
        }}
      >
        <AlertCircle className="text-gray-400 h-8 w-8" aria-hidden="true" />
      </div>
    );
  }

  // Image props for SEO/Accessibility
  const imgProps: React.ImgHTMLAttributes<HTMLImageElement> = {
    src: imgSrc,
    alt,
    className: baseClasses,
    loading: priority ? 'eager' : loading,
    decoding: decoding,
    onLoad: () => setLoadingState('loaded'),
    onError: () => {
      const error = new Error(`Failed to load image: ${imgSrc}`);
      if (onError) {
        onError(error);
      }
      if (imgSrc !== src) {
        setImgSrc(src);
        setSrcSet('');
      } else if (fallbackSrc && imgSrc !== fallbackSrc) {
        setImgSrc(fallbackSrc);
        setSrcSet('');
      } else {
        setLoadingState('error');
      }
    },
    width: width,
    height: height,
    fetchPriority: priority ? 'high' : 'auto',
  };

  if (sizes && srcSet) {
    imgProps.sizes = sizes;
    imgProps.srcSet = srcSet;
  }

  return <img {...imgProps} />;
}

// Helper functions
function parseImagePath(src: string) {
  const match = src.match(/^\/images\/(.+?)\/([^/]+)\.(\w+)$/);
  if (!match) return null;
  
  return {
    dir: match[1],
    name: match[2],
    ext: match[3]
  };
}

function checkWebPSupport(): boolean {
  if (typeof window === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').indexOf('webp') > -1;
}

function checkAVIFSupport(): boolean {
  if (typeof window === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/avif').indexOf('avif') > -1;
}

function preloadImage(src: string, srcSet?: string, sizes?: string) {
  const linkEl = document.createElement('link');
  linkEl.rel = 'preload';
  linkEl.as = 'image';
  linkEl.href = src;
  
  if (srcSet) {
    linkEl.setAttribute('imagesrcset', srcSet);
  }
  if (sizes) {
    linkEl.setAttribute('imagesizes', sizes);
  }
  
  document.head.appendChild(linkEl);
}