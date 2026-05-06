import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article' | 'product';
    keywords?: string[];
    locale?: string;
    alternateLanguages?: { [key: string]: string };
    noindex?: boolean;
    nofollow?: boolean;
    structuredData?: any;
    twitterHandle?: string;
    facebookAppId?: string;
}

export const SEO: React.FC<SEOProps> = ({
    title = 'FlixDesign - Sua plataforma de design',
    description = 'Encontre os melhores designs e recursos para seus projetos',
    image = '/og-image.jpg',
    url = 'https://flixdesign.com.br',
    type = 'website',
    keywords = ['design', 'recursos', 'criatividade', 'PSD', 'templates'],
    locale = 'pt_BR',
    alternateLanguages = {},
    noindex = false,
    nofollow = false,
    structuredData,
    twitterHandle = '@flixdesign',
    facebookAppId,
}) => {
    const siteTitle = 'FlixDesign';
    const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;
    const canonicalUrl = url.startsWith('http') ? url : `https://flixdesign.com.br${url}`;

    // Default structured data for the website
    const defaultStructuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteTitle,
        url: 'https://flixdesign.com.br',
        potentialAction: {
            '@type': 'SearchAction',
            target: 'https://flixdesign.com.br/search?q={search_term_string}',
            'query-input': 'required name=search_term_string'
        }
    };

    const finalStructuredData = structuredData || defaultStructuredData;

    return (
        <Helmet>
            {/* Basic meta tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords.join(', ')} />
            {noindex && <meta name="robots" content="noindex" />}
            {nofollow && <meta name="robots" content="nofollow" />}
            <link rel="canonical" href={canonicalUrl} />

            {/* Language and alternate languages */}
            <html lang={locale.split('_')[0]} />
            {Object.entries(alternateLanguages).map(([lang, url]) => (
                <link key={lang} rel="alternate" hrefLang={lang} href={url} />
            ))}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:locale" content={locale} />
            {facebookAppId && <meta property="fb:app_id" content={facebookAppId} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content={twitterHandle} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Additional meta tags */}
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="utf-8" />
            <meta name="theme-color" content="#11181D" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black" />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(finalStructuredData)}
            </script>
        </Helmet>
    );
}; 