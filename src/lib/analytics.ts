// Google Analytics 4 Integration
// Replace 'G-XXXXXXXXXX' with your actual GA4 measurement ID

declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
        dataLayer?: any[];
    }
}

export const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID || 'G-XXXXXXXXXX';

// Initialize Google Analytics
export const initGA = () => {
    if (typeof window === 'undefined') return;

    // Load gtag script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script1);

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
        window.dataLayer?.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_TRACKING_ID, {
        page_path: window.location.pathname,
    });
};

// Track page views
export const trackPageView = (url: string) => {
    if (typeof window.gtag === 'undefined') return;

    window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
    });
};

// Track custom events
export const trackEvent = (
    action: string,
    category: string,
    label?: string,
    value?: number
) => {
    if (typeof window.gtag === 'undefined') return;

    window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
    });
};

// Pre-defined event trackers
export const events = {
    // Contact form events
    contactFormSubmit: () => {
        trackEvent('submit', 'Contact Form', 'Contact Form Submitted');
    },
    contactFormError: (error: string) => {
        trackEvent('error', 'Contact Form', error);
    },

    // Navigation events
    navigationClick: (destination: string) => {
        trackEvent('click', 'Navigation', destination);
    },

    // Service interest events
    serviceClick: (serviceName: string) => {
        trackEvent('click', 'Service', serviceName);
    },

    // Portfolio events
    portfolioView: (projectName: string) => {
        trackEvent('view', 'Portfolio', projectName);
    },

    // Download events
    downloadResource: (resourceName: string) => {
        trackEvent('download', 'Resources', resourceName);
    },

    // Booking events
    bookingStarted: () => {
        trackEvent('start', 'Booking', 'Consultation Booking Started');
    },
    bookingCompleted: () => {
        trackEvent('complete', 'Booking', 'Consultation Booking Completed');
    },

    // Newsletter events
    newsletterSubscribe: () => {
        trackEvent('subscribe', 'Newsletter', 'Newsletter Subscription');
    },

    // Engagement events
    scrollDepth: (percentage: number) => {
        trackEvent('scroll', 'Engagement', `${percentage}% Scrolled`, percentage);
    },
    timeOnPage: (seconds: number) => {
        trackEvent('time_on_page', 'Engagement', 'Time Spent', seconds);
    },

    // CTA clicks
    ctaClick: (ctaName: string) => {
        trackEvent('click', 'CTA', ctaName);
    },

    // External links
    externalLinkClick: (url: string) => {
        trackEvent('click', 'External Link', url);
    },
};

// Track scroll depth
export const trackScrollDepth = () => {
    let maxScroll = 0;
    const milestones = [25, 50, 75, 100];
    const tracked: number[] = [];

    const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / scrollHeight) * 100;

        if (scrolled > maxScroll) {
            maxScroll = scrolled;

            milestones.forEach((milestone) => {
                if (scrolled >= milestone && !tracked.includes(milestone)) {
                    tracked.push(milestone);
                    events.scrollDepth(milestone);
                }
            });
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
};

// Track time on page
export const trackTimeOnPage = () => {
    const startTime = Date.now();

    const handleBeforeUnload = () => {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        events.timeOnPage(timeSpent);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
};
