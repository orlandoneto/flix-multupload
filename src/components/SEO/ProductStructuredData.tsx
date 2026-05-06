interface ProductStructuredDataProps {
    name: string;
    description: string;
    image: string;
    url: string;
    price: number;
    currency: string;
    availability: 'InStock' | 'OutOfStock' | 'PreOrder';
    category: string;
    brand: string;
    sku: string;
    rating?: {
        ratingValue: number;
        reviewCount: number;
    };
}

interface ProductStructuredData {
    '@context': string;
    '@type': string;
    name: string;
    description: string;
    image: string;
    url: string;
    sku: string;
    brand: { '@type': string; name: string };
    category: string;
    offers: {
        '@type': string;
        price: number;
        priceCurrency: string;
        availability: string;
        url: string;
        seller: { '@type': string; name: string };
    };
    aggregateRating?: {
        '@type': string;
        ratingValue: number;
        reviewCount: number;
    };
}

export const generateProductStructuredData = ({
    name,
    description,
    image,
    url,
    price,
    currency,
    availability,
    category,
    brand,
    sku,
    rating,
}: ProductStructuredDataProps): ProductStructuredData => {
    const structuredData: ProductStructuredData = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name,
        description,
        image,
        url,
        sku,
        brand: {
            '@type': 'Brand',
            name: brand,
        },
        category,
        offers: {
            '@type': 'Offer',
            price,
            priceCurrency: currency,
            availability: `https://schema.org/${availability}`,
            url,
            seller: {
                '@type': 'Organization',
                name: 'DesignFlix',
            },
        },
    };

    if (rating) {
        structuredData.aggregateRating = {
            '@type': 'AggregateRating',
            ratingValue: rating.ratingValue,
            reviewCount: rating.reviewCount,
        };
    }

    return structuredData;
}; 


