import { useState, useEffect } from 'react';
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
                        fallbackSrc = '/images/placeholder.jpg',
                        onError
                      }: ImageProps) {
  const [loadingState, setLoadingState] = useState<LoadingState>('initial');
  const [imgSrc, setImgSrc] = useState<string>(src);

  useEffect(() => {
    // Wenn sich die Quelle ändert, setzen wir den Status zurück
    setLoadingState('initial');
    setImgSrc(src);
  }, [src]);

  useEffect(() => {
    if (loadingState === 'initial') {
      setLoadingState('loading');
      // Verwenden des HTMLImageElement Konstruktors
      const img = new window.Image();
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
  }, [imgSrc, loadingState, fallbackSrc, onError]);

  // Basisklassen für verschiedene Zustände
  const baseClasses = `${className}`;
  const loadingClasses = `${baseClasses} animate-pulse bg-gray-200`;
  const errorClasses = `${baseClasses} bg-gray-100 flex items-center justify-center`;

  if (loadingState === 'loading' && !priority) {
    return <div className={loadingClasses} aria-busy="true" />;
  }

  if (loadingState === 'error') {
    return (
        <div className={errorClasses} role="alert" aria-label={`Failed to load image: ${alt}`}>
          <AlertCircle className="text-gray-400 h-8 w-8" />
        </div>
    );
  }

  // Durchlässig für SEO/Barrierefreiheit
  const imgProps: React.ImgHTMLAttributes<HTMLImageElement> = {
    src: imgSrc,
    alt,
    className: baseClasses,
    loading: priority ? 'eager' : 'lazy',
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
  };

  if (sizes) {
    imgProps.sizes = sizes;
  }

  return <img {...imgProps} />;
}