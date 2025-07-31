// src/components/schemas/ReviewSchema.tsx
import { useEffect } from 'react';

interface Review {
    author: string;
    rating: number;
    text: string;
    date: string;
    title?: string;
}

interface ReviewSchemaProps {
    reviews: Review[];
    productName?: string;
    averageRating?: number;
    reviewCount?: number;
}

export default function ReviewSchema({ 
    reviews, 
    productName = "KamenPro dekorativne kamene obloge",
    averageRating,
    reviewCount 
}: ReviewSchemaProps) {
    useEffect(() => {
        // Calculate average rating if not provided
        const calculatedAverage = averageRating || 
            (reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0);
        
        const calculatedCount = reviewCount || reviews.length;

        // Generate review schema for individual reviews
        const reviewSchemas = reviews.map(review => ({
            "@type": "Review",
            "author": {
                "@type": "Person",
                "name": review.author
            },
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": review.rating,
                "bestRating": "5",
                "worstRating": "1"
            },
            "reviewBody": review.text,
            "datePublished": review.date,
            "name": review.title || `Recenzija za ${productName}`,
            "itemReviewed": {
                "@type": "Product",
                "name": productName,
                "brand": {
                    "@type": "Brand",
                    "name": "KamenPro"
                }
            }
        }));

        // Generate aggregate rating schema if we have reviews
        const aggregateRatingSchema = calculatedCount > 0 ? {
            "@type": "AggregateRating",
            "ratingValue": calculatedAverage.toFixed(1),
            "reviewCount": calculatedCount,
            "bestRating": "5",
            "worstRating": "1"
        } : null;

        // Create the main product with reviews schema
        const productWithReviewsSchema = {
            "@context": "http://schema.org",
            "@type": "Product",
            "name": productName,
            "brand": {
                "@type": "Brand",
                "name": "KamenPro"
            },
            "manufacturer": {
                "@type": "Organization",
                "name": "KamenPro",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Bulevar Kralja Petra I Karađorđevića 108",
                    "addressLocality": "Bijeljina",
                    "postalCode": "76300",
                    "addressCountry": "RS"
                }
            },
            ...(aggregateRatingSchema && { "aggregateRating": aggregateRatingSchema }),
            "review": reviewSchemas
        };

        // Create script element and add to head
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(productWithReviewsSchema);
        
        // Add unique identifier to avoid duplicates
        script.id = `review-schema-${productName.replace(/\s+/g, '-').toLowerCase()}`;
        
        // Remove existing schema if present
        const existingScript = document.getElementById(script.id);
        if (existingScript) {
            existingScript.remove();
        }
        
        document.head.appendChild(script);

        // Cleanup function
        return () => {
            const scriptToRemove = document.getElementById(script.id);
            if (scriptToRemove) {
                scriptToRemove.remove();
            }
        };
    }, [reviews, productName, averageRating, reviewCount]);

    return null; // This component doesn't render anything visible
}

// Export types for use in other components
export type { Review, ReviewSchemaProps };