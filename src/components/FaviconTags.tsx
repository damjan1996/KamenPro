import { Helmet } from 'react-helmet-async';

export default function FaviconTags() {
    const baseUrl = 'https://kamenpro.net';
    
    return (
        <Helmet>
            {/* Standard Favicon */}
            <link rel="icon" type="image/x-icon" href="/favicon.ico" />
            <link rel="shortcut icon" href="/favicon.ico" />
            
            {/* PNG Favicons für verschiedene Größen */}
            <link rel="icon" type="image/png" sizes="16x16" href="/images/logo-16x16.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/images/logo-32x32.png" />
            <link rel="icon" type="image/png" sizes="48x48" href="/images/logo-48x48.png" />
            <link rel="icon" type="image/png" sizes="64x64" href="/images/logo-64x64.png" />
            <link rel="icon" type="image/png" sizes="128x128" href="/images/logo-128x128.png" />
            <link rel="icon" type="image/png" sizes="256x256" href="/images/logo-256x256.png" />
            
            {/* Apple Touch Icons */}
            <link rel="apple-touch-icon" sizes="57x57" href="/images/logo-57x57.png" />
            <link rel="apple-touch-icon" sizes="60x60" href="/images/logo-60x60.png" />
            <link rel="apple-touch-icon" sizes="72x72" href="/images/logo-72x72.png" />
            <link rel="apple-touch-icon" sizes="76x76" href="/images/logo-76x76.png" />
            <link rel="apple-touch-icon" sizes="114x114" href="/images/logo-114x114.png" />
            <link rel="apple-touch-icon" sizes="120x120" href="/images/logo-120x120.png" />
            <link rel="apple-touch-icon" sizes="144x144" href="/images/logo-144x144.png" />
            <link rel="apple-touch-icon" sizes="152x152" href="/images/logo-152x152.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/images/logo-180x180.png" />
            
            {/* Android Chrome Icons */}
            <link rel="icon" type="image/png" sizes="192x192" href="/images/logo-192x192.png" />
            <link rel="icon" type="image/png" sizes="512x512" href="/images/logo-512x512.png" />
            
            {/* Windows Metro Tiles */}
            <meta name="msapplication-TileColor" content="#d97706" />
            <meta name="msapplication-TileImage" content="/images/logo-144x144.png" />
            <meta name="msapplication-square70x70logo" content="/images/logo-70x70.png" />
            <meta name="msapplication-square150x150logo" content="/images/logo-150x150.png" />
            <meta name="msapplication-wide310x150logo" content="/images/logo-310x150.png" />
            <meta name="msapplication-square310x310logo" content="/images/logo-310x310.png" />
            
            {/* Safari Pinned Tab */}
            <link rel="mask-icon" href="/images/logo.svg" color="#d97706" />
            
            {/* Web App Manifest */}
            <link rel="manifest" href="/manifest.json" />
            
            {/* Theme Colors */}
            <meta name="theme-color" content="#d97706" />
            <meta name="msapplication-navbutton-color" content="#d97706" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-title" content="KamenPro" />
            
            {/* PWA Tags */}
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="application-name" content="KamenPro" />
        </Helmet>
    );
}