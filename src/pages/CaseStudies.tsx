import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight, Target, TrendingUp, Users, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { OptimizedImage } from '@/components/OptimizedImage';

const caseStudies = [
    {
        id: 1,
        title: 'E-Commerce Platform Transformation',
        slug: 'ecommerce-platform-transformation',
        client: 'Fashion Retailer',
        industry: 'Retail',
        excerpt: 'How we helped a fashion retailer increase online sales by 250% through a complete platform redesign.',
        challenge: 'Outdated e-commerce platform with poor mobile experience and slow checkout process',
        solution: 'Complete redesign with modern tech stack, optimized checkout, and personalized recommendations',
        results: [
            { metric: 'Online Sales', value: '+250%' },
            { metric: 'Mobile Conversion', value: '+180%' },
            { metric: 'Page Load Time', value: '-65%' },
            { metric: 'Cart Abandonment', value: '-40%' },
        ],
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        featured: true,
    },
    {
        id: 2,
        title: 'Healthcare Mobile App Development',
        slug: 'healthcare-mobile-app',
        client: 'MediCare Plus',
        industry: 'Healthcare',
        excerpt: 'Developed a HIPAA-compliant mobile app connecting patients with healthcare providers.',
        challenge: 'Need for secure, user-friendly telehealth solution during pandemic',
        solution: 'Native mobile app with video consultations, appointment scheduling, and prescription management',
        results: [
            { metric: 'Active Users', value: '50K+' },
            { metric: 'Consultations', value: '200K+' },
            { metric: 'User Rating', value: '4.8/5' },
            { metric: 'Response Time', value: '<2min' },
        ],
        technologies: ['React Native', 'Firebase', 'WebRTC', 'Node.js'],
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
        featured: true,
    },
    {
        id: 3,
        title: 'Restaurant Chain Digital Presence',
        slug: 'restaurant-chain-digital',
        client: 'Global Eateries',
        industry: 'Food & Beverage',
        excerpt: 'Built an omnichannel digital ecosystem for a restaurant chain with 100+ locations.',
        challenge: 'Fragmented digital presence across multiple locations with no unified ordering system',
        solution: 'Integrated website, mobile app, and custom CRM with centralized ordering and loyalty program',
        results: [
            { metric: 'Online Orders', value: '+320%' },
            { metric: 'Loyalty Members', value: '75K+' },
            { metric: 'Revenue Growth', value: '+45%' },
            { metric: 'Customer Retention', value: '+60%' },
        ],
        technologies: ['Next.js', 'React Native', 'PostgreSQL', 'Redis'],
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
        featured: false,
    },
    {
        id: 4,
        title: 'SaaS Platform SEO Optimization',
        slug: 'saas-seo-optimization',
        client: 'TechFlow SaaS',
        industry: 'Technology',
        excerpt: 'Implemented comprehensive SEO strategy that tripled organic traffic in 6 months.',
        challenge: 'Low organic visibility and high customer acquisition costs',
        solution: 'Technical SEO overhaul, content strategy, and link building campaign',
        results: [
            { metric: 'Organic Traffic', value: '+310%' },
            { metric: 'Keyword Rankings', value: '+500' },
            { metric: 'Domain Authority', value: '+25pts' },
            { metric: 'CAC Reduction', value: '-55%' },
        ],
        technologies: ['SEO Tools', 'Content CMS', 'Analytics'],
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        featured: false,
    },
];

const industries = ['All', 'Retail', 'Healthcare', 'Food & Beverage', 'Technology'];

export default function CaseStudies() {
    const [selectedIndustry, setSelectedIndustry] = useState('All');

    const filteredStudies =
        selectedIndustry === 'All'
            ? caseStudies
            : caseStudies.filter((study) => study.industry === selectedIndustry);

    const featuredStudies = caseStudies.filter((study) => study.featured);

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
                            Case Studies
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="heading-1 mb-6"
                        >
                            Success <span className="gradient-text">Stories</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-gray-300"
                        >
                            Discover how we've helped businesses across industries achieve remarkable results
                            through innovative digital solutions.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Featured Case Studies */}
            {featuredStudies.length > 0 && (
                <section className="py-16 bg-secondary/30">
                    <div className="container-custom">
                        <h2 className="text-2xl font-bold mb-8">Featured Projects</h2>
                        <div className="grid lg:grid-cols-2 gap-8">
                            {featuredStudies.map((study, index) => (
                                <Link
                                    key={study.id}
                                    to={`/case-studies/${study.slug}`}
                                    className="group"
                                >
                                    <motion.article
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="bg-card rounded-2xl overflow-hidden border border-border hover-lift h-full"
                                    >
                                        <div className="relative h-64">
                                            <OptimizedImage
                                                src={study.image}
                                                alt={study.title}
                                                className="w-full h-full"
                                                objectFit="cover"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <Badge className="bg-primary">Featured</Badge>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center gap-3 mb-4">
                                                <Badge variant="secondary">{study.industry}</Badge>
                                                <span className="text-sm text-muted-foreground">{study.client}</span>
                                            </div>
                                            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                                                {study.title}
                                            </h3>
                                            <p className="text-muted-foreground mb-6">{study.excerpt}</p>
                                            <div className="grid grid-cols-2 gap-4">
                                                {study.results.slice(0, 2).map((result) => (
                                                    <div key={result.metric} className="text-center p-3 bg-secondary/50 rounded-lg">
                                                        <div className="text-2xl font-bold text-primary mb-1">{result.value}</div>
                                                        <div className="text-xs text-muted-foreground">{result.metric}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.article>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* All Case Studies */}
            <section className="section-padding">
                <div className="container-custom">
                    {/* Industry Filter */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {industries.map((industry) => (
                            <button
                                key={industry}
                                onClick={() => setSelectedIndustry(industry)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedIndustry === industry
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-secondary hover:bg-secondary/80'
                                    }`}
                            >
                                {industry}
                            </button>
                        ))}
                    </div>

                    {/* Case Studies Grid */}
                    {filteredStudies.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-8">
                            {filteredStudies.map((study, index) => (
                                <Link
                                    key={study.id}
                                    to={`/case-studies/${study.slug}`}
                                    className="group"
                                >
                                    <motion.article
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        viewport={{ once: true }}
                                        className="bg-card rounded-2xl overflow-hidden border border-border hover-lift h-full flex flex-col"
                                    >
                                        <div className="relative h-56">
                                            <OptimizedImage
                                                src={study.image}
                                                alt={study.title}
                                                className="w-full h-full"
                                                objectFit="cover"
                                            />
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col">
                                            <div className="flex items-center gap-3 mb-3">
                                                <Badge variant="secondary">{study.industry}</Badge>
                                                <span className="text-sm text-muted-foreground">{study.client}</span>
                                            </div>
                                            <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                                                {study.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mb-4 flex-1">{study.excerpt}</p>
                                            <div className="grid grid-cols-4 gap-2">
                                                {study.results.map((result) => (
                                                    <div key={result.metric} className="text-center p-2 bg-secondary/30 rounded">
                                                        <div className="text-sm font-bold text-primary">{result.value}</div>
                                                        <div className="text-xs text-muted-foreground">{result.metric}</div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="mt-4 flex items-center justify-between text-sm">
                                                <span className="text-primary font-medium">View Case Study</span>
                                                <ChevronRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </motion.article>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-muted-foreground text-lg">
                                No case studies found for this industry.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-secondary/30">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-4">Ready to Be Our Next Success Story?</h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            Let's discuss how we can help you achieve similar results for your business.
                        </p>
                        <Button asChild size="lg" className="btn-primary">
                            <Link to="/contact">Start Your Project</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
