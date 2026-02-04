import { useEffect } from 'react';

interface OrganizationSchema {
    '@context': string;
    '@type': string;
    name: string;
    url: string;
    logo: string;
    description: string;
    address?: {
        '@type': string;
        addressCountry: string;
        addressLocality?: string;
    };
    contactPoint?: {
        '@type': string;
        telephone: string;
        contactType: string;
        email?: string;
    };
    sameAs?: string[];
}

interface ArticleSchema {
    '@context': string;
    '@type': string;
    headline: string;
    description: string;
    image: string;
    author: {
        '@type': string;
        name: string;
    };
    publisher: {
        '@type': string;
        name: string;
        logo: {
            '@type': string;
            url: string;
        };
    };
    datePublished: string;
    dateModified?: string;
}

interface ServiceSchema {
    '@context': string;
    '@type': string;
    serviceType: string;
    provider: {
        '@type': string;
        name: string;
    };
    areaServed: string;
    description: string;
}

type StructuredDataType = OrganizationSchema | ArticleSchema | ServiceSchema | any;

interface StructuredDataProps {
    data: StructuredDataType;
}

export function StructuredData({ data }: StructuredDataProps) {
    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(data);
        script.id = 'structured-data';

        const existingScript = document.getElementById('structured-data');
        if (existingScript) {
            existingScript.remove();
        }

        document.head.appendChild(script);

        return () => {
            const scriptToRemove = document.getElementById('structured-data');
            if (scriptToRemove) {
                scriptToRemove.remove();
            }
        };
    }, [data]);

    return null;
}

// Pre-defined structured data for common pages
export const organizationSchema: OrganizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'WibraniumTech',
    url: 'https://wibraniumtech.com',
    logo: 'https://wibraniumtech.com/logo.png',
    description: 'Building Smart Digital Solutions for Growing Businesses. Professional website development, app development, SEO services, video editing, and CRM software solutions.',
    address: {
        '@type': 'PostalAddress',
        addressCountry: 'IN',
    },
    sameAs: [
        'https://www.facebook.com/wibraniumtech',
        'https://www.twitter.com/wibraniumtech',
        'https://www.linkedin.com/company/wibraniumtech',
        'https://www.instagram.com/wibraniumtech',
    ],
};

export const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://wibraniumtech.com',
    name: 'WibraniumTech',
    image: 'https://wibraniumtech.com/logo.png',
    description: 'Digital agency specializing in web development, mobile apps, SEO, and custom software solutions.',
    url: 'https://wibraniumtech.com',
    telephone: '+91-XXXXXXXXXX',
    priceRange: '$$',
    address: {
        '@type': 'PostalAddress',
        addressCountry: 'IN',
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: 0,
        longitude: 0,
    },
    openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
    },
};

export const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'WibraniumTech',
    url: 'https://wibraniumtech.com',
    potentialAction: {
        '@type': 'SearchAction',
        target: 'https://wibraniumtech.com/search?q={search_term_string}',
        'query-input': 'required name=search_term_string',
    },
};

export const servicesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [
        {
            '@type': 'Service',
            name: 'Website Development',
            description: 'Custom websites that are fast, responsive, and SEO-ready.',
            provider: {
                '@type': 'Organization',
                name: 'WibraniumTech',
            },
        },
        {
            '@type': 'Service',
            name: 'App Development',
            description: 'Native and cross-platform mobile apps for Android & iOS.',
            provider: {
                '@type': 'Organization',
                name: 'WibraniumTech',
            },
        },
        {
            '@type': 'Service',
            name: 'SEO Services',
            description: 'Boost your Google rankings with proven SEO strategies.',
            provider: {
                '@type': 'Organization',
                name: 'WibraniumTech',
            },
        },
        {
            '@type': 'Service',
            name: 'Video Editing',
            description: 'Professional video editing for promotional content and social media.',
            provider: {
                '@type': 'Organization',
                name: 'WibraniumTech',
            },
        },
        {
            '@type': 'Service',
            name: 'CRM Software',
            description: 'Custom CRM systems with automation and analytics.',
            provider: {
                '@type': 'Organization',
                name: 'WibraniumTech',
            },
        },
    ],
};

// Helper to create article schema
export const createArticleSchema = (
    title: string,
    description: string,
    image: string,
    publishedDate: string,
    modifiedDate?: string
): ArticleSchema => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: image,
    author: {
        '@type': 'Organization',
        name: 'WibraniumTech',
    },
    publisher: {
        '@type': 'Organization',
        name: 'WibraniumTech',
        logo: {
            '@type': 'ImageObject',
            url: 'https://wibraniumtech.com/logo.png',
        },
    },
    datePublished: publishedDate,
    dateModified: modifiedDate || publishedDate,
});

// Helper to create breadcrumb schema
export const createBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
    })),
});
