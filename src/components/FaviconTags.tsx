import { Helmet } from 'react-helmet-async';

export default function FaviconTags() {
    const baseUrl = 'https://kamenpro.net';
    
    return (
        <Helmet>
            {/* Standard Favicon */}
            <link rel="icon" type="image/png" href="/images/logo.png" />
            <link rel="shortcut icon" href="/images/logo.png" />
            
            {/* PNG Favicons für verschiedene Größen - alle zeigen auf logo.png */}
            <link rel="icon" type="image/png" sizes="16x16" href="/images/logo.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/images/logo.png" />
            <link rel="icon" type="image/png" sizes="48x48" href="/images/logo.png" />
            <link rel="icon" type="image/png" sizes="64x64" href="/images/logo.png" />
            <link rel="icon" type="image/png" sizes="128x128" href="/images/logo.png" />
            <link rel="icon" type="image/png" sizes="256x256" href="/images/logo.png" />
            
            {/* Apple Touch Icons - alle zeigen auf logo.png */}
            <link rel="apple-touch-icon" sizes="57x57" href="/images/logo.png" />
            <link rel="apple-touch-icon" sizes="60x60" href="/images/logo.png" />
            <link rel="apple-touch-icon" sizes="72x72" href="/images/logo.png" />
            <link rel="apple-touch-icon" sizes="76x76" href="/images/logo.png" />
            <link rel="apple-touch-icon" sizes="114x114" href="/images/logo.png" />
            <link rel="apple-touch-icon" sizes="120x120" href="/images/logo.png" />
            <link rel="apple-touch-icon" sizes="144x144" href="/images/logo.png" />
            <link rel="apple-touch-icon" sizes="152x152" href="/images/logo.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/images/logo.png" />
            
            {/* Android Chrome Icons - zeigen auf logo.png */}
            <link rel="icon" type="image/png" sizes="192x192" href="/images/logo.png" />
            <link rel="icon" type="image/png" sizes="512x512" href="/images/logo.png" />
            
            {/* Windows Metro Tiles - alle zeigen auf logo.png */}
            <meta name="msapplication-TileColor" content="#d97706" />
            <meta name="msapplication-TileImage" content="/images/logo.png" />
            <meta name="msapplication-square70x70logo" content="/images/logo.png" />
            <meta name="msapplication-square150x150logo" content="/images/logo.png" />
            <meta name="msapplication-wide310x150logo" content="/images/logo.png" />
            <meta name="msapplication-square310x310logo" content="/images/logo.png" />
            
            {/* Safari Pinned Tab */}
            <link rel="mask-icon" href="/images/logo.png" color="#d97706" />
            
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