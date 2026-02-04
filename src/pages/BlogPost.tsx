import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { OptimizedImage } from '@/components/OptimizedImage';
import { StructuredData, createArticleSchema, createBreadcrumbSchema } from '@/components/SEO/StructuredData';

// Mock blog post data - replace with actual API call
const blogPost = {
    id: 1,
    title: '10 Essential Web Design Trends for 2026',
    slug: '10-essential-web-design-trends-2026',
    excerpt: 'Discover the latest web design trends that will dominate the digital landscape in 2026.',
    content: `
# Introduction

Web design is constantly evolving, and 2026 is no exception. As we move forward, new technologies and user expectations are shaping the way we create digital experiences. In this comprehensive guide, we'll explore the top 10 web design trends that are defining the industry in 2026.

## 1. AI-Powered Personalization

Artificial intelligence is revolutionizing how websites deliver personalized content to users. From dynamic layouts to customized recommendations, AI is making every visit unique.

## 2. Immersive 3D Elements

Three-dimensional graphics are becoming more mainstream, creating engaging and interactive experiences that captivate users and enhance storytelling.

## 3. Minimalist Maximalism

This paradoxical trend combines bold, vibrant designs with clean, uncluttered layouts. It's about making a statement while maintaining usability.

## 4. Dark Mode as Standard

Dark mode is no longer an afterthought. It's becoming a fundamental design requirement, with dedicated color schemes and thoughtful implementation.

## 5. Micro-interactions and Animations

Subtle animations and micro-interactions guide users through your site, providing feedback and creating delightful experiences.

## 6. Voice User Interface (VUI)

With the rise of voice assistants, designing for voice interactions is becoming crucial for accessibility and convenience.

## 7. Sustainable Web Design

Eco-conscious design focuses on reducing carbon footprints through optimized code, efficient hosting, and thoughtful resource management.

## 8. Advanced Typography

Custom fonts and variable typography are creating unique brand identities and improving readability across devices.

## 9. Asymmetric Layouts

Breaking away from traditional grid systems, asymmetric designs create visual interest and guide user attention effectively.

## 10. Augmented Reality Integration

AR is moving from novelty to necessity, allowing users to visualize products and services in their own environment.

## Conclusion

These trends represent the cutting edge of web design in 2026. By incorporating these elements thoughtfully, you can create websites that are not only visually stunning but also highly functional and user-friendly.

Ready to modernize your website? [Contact us](/contact) to get started!
  `,
    author: 'WibraniumTech Team',
    category: 'Web Design',
    tags: ['Design', 'Trends', 'UX/UI', '2026'],
    publishedDate: '2026-01-15',
    modifiedDate: '2026-01-20',
    readTime: 8,
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&h=600&fit=crop',
};

const relatedPosts = [
    {
        id: 2,
        title: 'How to Choose the Right CRM for Your Business',
        slug: 'how-to-choose-right-crm',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
        category: 'Business',
    },
    {
        id: 3,
        title: 'SEO Best Practices for E-Commerce',
        slug: 'seo-best-practices-ecommerce',
        image: 'https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?w=400&h=300&fit=crop',
        category: 'SEO',
    },
    {
        id: 4,
        title: 'Mobile App Development: Native vs Cross-Platform',
        slug: 'native-vs-cross-platform-mobile-apps',
        image: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=400&h=300&fit=crop',
        category: 'Mobile',
    },
];

export default function BlogPost() {
    const { slug } = useParams();

    const shareUrl = `https://wibraniumtech.com/blog/${slug}`;
    const shareTitle = blogPost.title;

    const handleShare = (platform: string) => {
        const urls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
        };

        window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400');
    };

    // Create structured data
    const articleSchema = createArticleSchema(
        blogPost.title,
        blogPost.excerpt,
        blogPost.image,
        blogPost.publishedDate,
        blogPost.modifiedDate
    );

    const breadcrumbSchema = createBreadcrumbSchema([
        { name: 'Home', url: 'https://wibraniumtech.com' },
        { name: 'Blog', url: 'https://wibraniumtech.com/blog' },
        { name: blogPost.title, url: shareUrl },
    ]);

    return (
        <Layout>
            <StructuredData data={articleSchema} />
            <StructuredData data={breadcrumbSchema} />

            {/* Article Header */}
            <article className="py-16">
                <div className="container-custom">
                    <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Blog
                    </Link>

                    <div className="max-w-4xl mx-auto">
                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <Badge>{blogPost.category}</Badge>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    {new Date(blogPost.publishedDate).toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {blogPost.readTime} min read
                                </span>
                                <span className="flex items-center gap-1">
                                    <User className="h-4 w-4" />
                                    {blogPost.author}
                                </span>
                            </div>
                        </div>

                        {/* Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="heading-2 mb-6"
                        >
                            {blogPost.title}
                        </motion.h1>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {blogPost.tags.map((tag) => (
                                <Badge key={tag} variant="outline">
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        {/* Featured Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="rounded-2xl overflow-hidden mb-12"
                        >
                            <OptimizedImage
                                src={blogPost.image}
                                alt={blogPost.title}
                                className="w-full h-96"
                                priority
                            />
                        </motion.div>

                        {/* Share Buttons */}
                        <div className="flex items-center gap-3 mb-12">
                            <span className="text-sm font-medium">Share:</span>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleShare('facebook')}
                                className="h-9 w-9"
                            >
                                <Facebook className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleShare('twitter')}
                                className="h-9 w-9"
                            >
                                <Twitter className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleShare('linkedin')}
                                className="h-9 w-9"
                            >
                                <Linkedin className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="prose prose-lg dark:prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: blogPost.content.replace(/\n/g, '<br/>') }}
                        />

                        {/* CTA */}
                        <div className="mt-16 p-8 bg-secondary/50 rounded-2xl text-center">
                            <h3 className="text-2xl font-bold mb-3">Ready to Transform Your Business?</h3>
                            <p className="text-muted-foreground mb-6">
                                Let's discuss how we can help you implement these trends and create an exceptional digital experience.
                            </p>
                            <Button asChild size="lg" className="btn-primary">
                                <Link to="/contact">Get in Touch</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </article>

            {/* Related Posts */}
            <section className="py-16 bg-secondary/30">
                <div className="container-custom">
                    <h2 className="text-2xl font-bold mb-8 text-center">Related Articles</h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {relatedPosts.map((post) => (
                            <Link
                                key={post.id}
                                to={`/blog/${post.slug}`}
                                className="group bg-card rounded-xl overflow-hidden border border-border hover-lift"
                            >
                                <div className="relative h-48">
                                    <OptimizedImage
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full"
                                    />
                                </div>
                                <div className="p-4">
                                    <Badge variant="secondary" className="mb-2 text-xs">
                                        {post.category}
                                    </Badge>
                                    <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
}
