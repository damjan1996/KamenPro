// src/components/schemas/HowToSchema.tsx - Schema for installation guides
import { useEffect } from 'react';

interface HowToStep {
    name: string;
    text: string;
    image?: string;
    url?: string;
}

interface HowToSchemaProps {
    name: string;
    description: string;
    image?: string;
    totalTime?: string;
    estimatedCost?: {
        currency: string;
        value: number;
    };
    supply?: string[];
    tool?: string[];
    steps: HowToStep[];
}

export default function HowToSchema({
    name,
    description,
    image,
    totalTime = 'PT4H', // ISO 8601 duration (4 hours)
    estimatedCost,
    supply = [],
    tool = [],
    steps
}: HowToSchemaProps) {
    useEffect(() => {
        const howToSchema = {
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": name,
            "description": description,
            "image": image ? [image] : undefined,
            "totalTime": totalTime,
            "estimatedCost": estimatedCost ? {
                "@type": "MonetaryAmount",
                "currency": estimatedCost.currency,
                "value": estimatedCost.value
            } : undefined,
            "supply": supply.map(item => ({
                "@type": "HowToSupply",
                "name": item
            })),
            "tool": tool.map(item => ({
                "@type": "HowToTool",
                "name": item
            })),
            "step": steps.map((step, index) => ({
                "@type": "HowToStep",
                "position": index + 1,
                "name": step.name,
                "text": step.text,
                "image": step.image ? [step.image] : undefined,
                "url": step.url
            }))
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(howToSchema);
        script.id = `howto-schema-${name.replace(/\s+/g, '-').toLowerCase()}`;

        // Remove existing schema if present
        const existingScript = document.getElementById(script.id);
        if (existingScript) {
            existingScript.remove();
        }

        document.head.appendChild(script);

        return () => {
            const scriptToRemove = document.getElementById(script.id);
            if (scriptToRemove) {
                scriptToRemove.remove();
            }
        };
    }, [name, description, image, totalTime, estimatedCost, supply, tool, steps]);

    return null;
}