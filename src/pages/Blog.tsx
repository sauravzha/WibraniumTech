import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SectionHeading } from '@/components/SectionHeading';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, User, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { OptimizedImage } from '@/components/OptimizedImage';

// Mock blog data - replace with actual API call
const blogPosts = [
    {
        id: 1,
        title: '10 Essential Web Design Trends for 2026',
        slug: '10-essential-web-design-trends-2026',
        excerpt: 'Discover the latest web design trends that will dominate the digital landscape in 2026 and how to implement them effectively.',
        content: '',
        author: 'WibraniumTech Team',
        category: 'Web Design',
        tags: ['Design', 'Trends', 'UX/UI'],
        publishedDate: '2026-01-15',
        readTime: 8,
        image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=400&fit=crop',
        featured: true,
    },
    {
        id: 2,
        title: 'How to Choose the Right CRM for Your Business',
        slug: 'how-to-choose-right-crm',
        excerpt: 'A comprehensive guide to selecting the perfect CRM system that aligns with your business needs and goals.',
        content: '',
        author: 'WibraniumTech Team',
        category: 'Business',
        tags: ['CRM', 'Business', 'Software'],
        publishedDate: '2026-01-10',
        readTime: 6,
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
        featured: false,
    },
    {
        id: 3,
        title: 'SEO Best Practices for E-Commerce Websites',
        slug: 'seo-best-practices-ecommerce',
        excerpt: 'Boost your e-commerce site visibility with these proven SEO strategies and techniques.',
        content: '',
        author: 'WibraniumTech Team',
        category: 'SEO',
        tags: ['SEO', 'E-Commerce', 'Marketing'],
        publishedDate: '2026-01-05',
        readTime: 10,
        image: 'https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?w=800&h=400&fit=crop',
        featured: true,
    },
    {
        id: 4,
        title: 'Mobile App Development: Native vs Cross-Platform',
        slug: 'native-vs-cross-platform-mobile-apps',
        excerpt: 'Compare the pros and cons of native and cross-platform mobile app development to make an informed decision.',
        content: '',
        author: 'WibraniumTech Team',
        category: 'Mobile Development',
        tags: ['Mobile', 'Development', 'Apps'],
        publishedDate: '2025-12-28',
        readTime: 7,
        image: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=800&h=400&fit=crop',
        featured: false,
    },
    {
        id: 5,
        title: 'The Power of Video Marketing in 2026',
        slug: 'power-of-video-marketing-2026',
        excerpt: 'Learn how video content can transform your digital marketing strategy and drive engagement.',
        content: '',
        author: 'WibraniumTech Team',
        category: 'Marketing',
        tags: ['Video', 'Marketing', 'Content'],
        publishedDate: '2025-12-20',
        readTime: 5,
        image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=400&fit=crop',
        featured: false,
    },
    {
        id: 6,
        title: 'Building Scalable Web Applications with Modern Tech',
        slug: 'scalable-web-applications-modern-tech',
        excerpt: 'Explore the latest technologies and architectural patterns for building scalable web applications.',
        content: '',
        author: 'WibraniumTech Team',
        category: 'Development',
        tags: ['Web Development', 'Architecture', 'Scalability'],
        publishedDate: '2025-12-15',
        readTime: 12,
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
        featured: false,
    },
];

const categories = ['All', 'Web Design', 'Development', 'SEO', 'Mobile Development', 'Marketing', 'Business'];

export default function Blog() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [filteredPosts, setFilteredPosts] = useState(blogPosts);

    useEffect(() => {
        let filtered = blogPosts;

        // Filter by category
        if (selectedCategory !== 'All') {
            filtered = filtered.filter((post) => post.category === selectedCategory);
        }

        // Filter by search query
        if (searchQuery.trim()) {
            filtered = filtered.filter(
                (post) =>
                    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        setFilteredPosts(filtered);
    }, [searchQuery, selectedCategory]);

    const featuredPosts = blogPosts.filter((post) => post.featured);

    return (
        <Layout>
            {/* Hero Section */}
            <section className="section-padding bg-hero-pattern text-white">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-block px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-6"
                        >
                            Our Blog
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="heading-1 mb-6"
                        >
                            Insights & <span className="gradient-text">Resources</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-gray-300"
                        >
                            Stay updated with the latest trends, tips, and best practices in web development,
                            mobile apps, and digital marketing.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
                <section className="py-16 bg-secondary/30">
                    <div className="container-custom">
                        <h2 className="text-2xl font-bold mb-8">Featured Articles</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {featuredPosts.map((post, index) => (
                                <Link
                                    key={post.id}
                                    to={`/blog/${post.slug}`}
                                    className="group"
                                >
                                    <motion.article
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="bg-card rounded-2xl overflow-hidden border border-border hover-lift"
                                    >
                                        <div className="relative h-64">
                                            <OptimizedImage
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full"
                                                objectFit="cover"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-4 w-4" />
                                                    {new Date(post.publishedDate).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                    })}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-4 w-4" />
                                                    {post.readTime} min read
                                                </span>
                                            </div>
                                            <Badge variant="secondary" className="mb-3">
                                                {post.category}
                                            </Badge>
                                            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                                                {post.title}
                                            </h3>
                                            <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <User className="h-4 w-4 text-muted-foreground" />
                                                    <span>{post.author}</span>
                                                </div>
                                                <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </motion.article>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Blog Posts Section */}
            <section className="section-padding">
                <div className="container-custom">
                    {/* Search and Filter */}
                    <div className="mb-12">
                        <div className="max-w-xl mx-auto mb-8">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="Search articles..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-12 h-12"
                                />
                            </div>
                        </div>

                        {/* Categories */}
                        <div className="flex flex-wrap justify-center gap-3">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-secondary text-foreground hover:bg-secondary/80'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Blog Grid */}
                    {filteredPosts.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPosts.map((post, index) => (
                                <Link
                                    key={post.id}
                                    to={`/blog/${post.slug}`}
                                    className="group"
                                >
                                    <motion.article
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        viewport={{ once: true }}
                                        className="bg-card rounded-2xl overflow-hidden border border-border hover-lift"
                                    >
                                        <div className="relative h-48">
                                            <OptimizedImage
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full"
                                                objectFit="cover"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-3.5 w-3.5" />
                                                    {new Date(post.publishedDate).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                    })}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-3.5 w-3.5" />
                                                    {post.readTime} min
                                                </span>
                                            </div>
                                            <Badge variant="secondary" className="mb-3 text-xs">
                                                {post.category}
                                            </Badge>
                                            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                                {post.excerpt}
                                            </p>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground">{post.author}</span>
                                                <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </motion.article>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-muted-foreground text-lg">
                                No articles found matching your search.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    );
}
