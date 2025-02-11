import { Helmet } from 'react-helmet-async';

interface SeoProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  image?: string;
}

export function Seo({ title, description, canonical, keywords, image = 'https://images.unsplash.com/photo-1604705528621-81b2e1f25c37?auto=format&fit=crop&q=80' }: SeoProps) {
  const siteName = 'KamenPro';
  const fullTitle = `${title} | ${siteName}`;
  const baseUrl = 'https://kamenpro.rs';
  const defaultKeywords = 'kamene obloge, prirodni kamen, zidne obloge, dekorativni kamen, enterijer, KamenPro';

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords ? `${defaultKeywords}, ${keywords}` : defaultKeywords} />
      <meta name="author" content="KamenPro" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="sr" />

      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="sr_RS" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical URL */}
      {canonical && (
        <>
          <link rel="canonical" href={`${baseUrl}${canonical}`} />
          <meta property="og:url" content={`${baseUrl}${canonical}`} />
        </>
      )}

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="theme-color" content="#1c1917" />
    </Helmet>
  );
}