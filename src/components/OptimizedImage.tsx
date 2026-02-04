import { useState, useEffect, useRef } from 'react';

interface OptimizedImageProps {
    src: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
    priority?: boolean;
    objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
    onLoad?: () => void;
    onError?: () => void;
}

export function OptimizedImage({
    src,
    alt,
    className = '',
    width,
    height,
    priority = false,
    objectFit = 'cover',
    onLoad,
    onError,
}: OptimizedImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(priority);
    const [imageSrc, setImageSrc] = useState<string | undefined>(priority ? src : undefined);
    const imgRef = useRef<HTMLImageElement>(null);

    // Intersection Observer for lazy loading
    useEffect(() => {
        if (priority || !imgRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                        setImageSrc(src);
                    }
                });
            },
            {
                rootMargin: '50px', // Start loading 50px before entering viewport
            }
        );

        const currentImg = imgRef.current;
        observer.observe(currentImg);

        return () => {
            if (currentImg) {
                observer.unobserve(currentImg);
            }
        };
    }, [src, priority]);

    const handleLoad = () => {
        setIsLoaded(true);
        onLoad?.();
    };

    const handleError = () => {
        onError?.();
    };

    // Generate responsive srcset if width is provided
    const generateSrcSet = () => {
        if (!width) return undefined;

        // For external URLs (Unsplash, etc.), add size parameters
        if (src.includes('unsplash.com')) {
            return `${src}&w=${width} 1x, ${src}&w=${width * 2} 2x`;
        }

        return undefined;
    };

    const containerStyles = width && height ? { '--aspect-ratio': `${width} / ${height}` } as React.CSSProperties : {};
    const imgStyles = { '--object-fit': objectFit } as React.CSSProperties;

    return (
        <div style={containerStyles} className={`optimized-image-container ${className}`}>
            {/* Shimmer placeholder */}
            {!isLoaded && (
                <div className="optimized-image-placeholder" aria-hidden="true" />
            )}

            {/* Actual image */}
            <img
                ref={imgRef}
                src={imageSrc}
                alt={alt}
                style={imgStyles}
                className={`optimized-image ${isLoaded ? 'loaded' : ''}`}
                srcSet={generateSrcSet()}
                loading={priority ? 'eager' : 'lazy'}
                decoding="async"
                onLoad={handleLoad}
                onError={handleError}
                width={width}
                height={height}
            />
        </div>
    );
}

// Wrapper component that maintains aspect ratio
interface AspectRatioImageProps extends OptimizedImageProps {
    aspectRatio?: string; // e.g., "16/9", "4/3", "1/1"
}

export function AspectRatioImage({ aspectRatio = '16/9', ...props }: AspectRatioImageProps) {
    return (
        <div style={{ '--aspect-ratio': aspectRatio } as React.CSSProperties} className={`aspect-ratio-wrapper ${props.className || ''}`}>
            <OptimizedImage {...props} className="" />
        </div>
    );
}
