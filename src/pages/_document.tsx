import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                {/* Google Analytics Tag */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-HKZ64S51GN"></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-HKZ64S51GN');
            `
                    }}
                />
            </Head>
            <body>
            <Main />
            <NextScript />
            </body>
        </Html>
    )
}