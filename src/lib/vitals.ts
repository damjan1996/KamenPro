import type { Metric } from 'web-vitals';

function sendToAnalytics({ id, name, value, delta }: Metric) {
  // Here you would normally send to your analytics service
  // For now, we'll just log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log({ id, name, value, delta });
  }
}

export function reportWebVitals() {
  if (typeof window !== 'undefined') {
    // Use dynamic import for web-vitals
    Promise.all([
      import('web-vitals').then(({ onCLS }) => onCLS(sendToAnalytics)),
      import('web-vitals').then(({ onFID }) => onFID(sendToAnalytics)),
      import('web-vitals').then(({ onLCP }) => onLCP(sendToAnalytics)),
      import('web-vitals').then(({ onFCP }) => onFCP(sendToAnalytics)),
      import('web-vitals').then(({ onTTFB }) => onTTFB(sendToAnalytics))
    ]).catch(err => {
      console.error('Error loading web-vitals:', err);
    });
  }
}