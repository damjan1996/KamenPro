// src/components/ui/Image.tsx - Optimized for SEO, accessibility, and performance
import { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

interface ImageProps {
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
}

type LoadingState = 'initial' | 'loading' | 'loaded' | 'error';

export function Image({
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
                        onError
                      }: ImageProps) {
  const [loadingState, setLoadingState] = useState<LoadingState>('initial');
  const [imgSrc, setImgSrc] = useState<string>(src);

  useEffect(() => {
    // Reset the state when the source changes
    setLoadingState('initial');
    setImgSrc(src);
  }, [src]);

  useEffect(() => {
    if (loadingState === 'initial') {
      setLoadingState('loading');

      // Priority images should be preloaded
      if (priority && typeof window !== 'undefined') {
        const linkEl = document.createElement('link');
        linkEl.rel = 'preload';
        linkEl.as = 'image';
        linkEl.href = src;
        if (sizes) {
          linkEl.sizes = sizes;
        }
        document.head.appendChild(linkEl);
      }

      // Using the HTMLImageElement constructor
      const img = new window.Image();
      if (sizes) {
        img.sizes = sizes;
      }
      img.src = imgSrc;

      img.onload = () => {
        setLoadingState('loaded');
      };

      img.onerror = () => {
        const error = new Error(`Failed to load image: ${imgSrc}`);
        if (onError) {
          onError(error);
        } else {
          console.error(error);
        }

        if (fallbackSrc && imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc);
        } else {
          setLoadingState('error');
        }
      };
    }
  }, [imgSrc, loadingState, fallbackSrc, onError, priority, sizes, src]);

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
      if (fallbackSrc && imgSrc !== fallbackSrc) {
        setImgSrc(fallbackSrc);
      } else {
        setLoadingState('error');
      }
    },
    width: width,
    height: height,
    fetchPriority: priority ? 'high' : 'auto',
  };

  if (sizes) {
    imgProps.sizes = sizes;
  }

  return <img {...imgProps} />;
}