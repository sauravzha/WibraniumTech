import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SectionHeading } from '@/components/SectionHeading';
import { Input } from '@/components/ui/input';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Search } from 'lucide-react';

const faqs = [
    {
        category: 'General',
        questions: [
            {
                id: 'general-1',
                question: 'What services does WibraniumTech offer?',
                answer: 'We offer comprehensive digital solutions including website development, mobile app development, SEO services, video editing, and custom CRM software. Our team specializes in creating tailored solutions that help businesses grow and succeed in the digital landscape.',
            },
            {
                id: 'general-2',
                question: 'How long does it take to complete a project?',
                answer: 'Project timelines vary based on scope and complexity. A typical website takes 4-8 weeks, while mobile apps can take 8-16 weeks. We provide detailed timelines during the consultation phase and keep you updated throughout the development process.',
            },
            {
                id: 'general-3',
                question: 'Do you provide ongoing support after project completion?',
                answer: 'Yes! We offer comprehensive maintenance and support packages to ensure your digital solutions continue to perform optimally. This includes updates, bug fixes, security patches, and technical support.',
            },
        ],
    },
    {
        category: 'Web Development',
        questions: [
            {
                id: 'web-1',
                question: 'What technologies do you use for web development?',
                answer: 'We use modern technologies including React, Next.js, TypeScript, Node.js, and various backend frameworks. Our tech stack is chosen based on your specific project requirements to ensure optimal performance and scalability.',
            },
            {
                id: 'web-2',
                question: 'Will my website be mobile-friendly?',
                answer: 'Absolutely! All our websites are built with a mobile-first approach, ensuring they look and perform excellently on all devices including smartphones, tablets, and desktops.',
            },
            {
                id: 'web-3',
                question: 'Can you redesign my existing website?',
                answer: 'Yes, we specialize in website redesigns. We can modernize your existing site, improve its performance, enhance user experience, and ensure it aligns with current web standards and best practices.',
            },
        ],
    },
    {
        category: 'Mobile Apps',
        questions: [
            {
                id: 'app-1',
                question: 'Do you develop apps for both iOS and Android?',
                answer: 'Yes, we develop both native apps (separate for iOS and Android) and cross-platform apps using React Native or Flutter, depending on your requirements and budget.',
            },
            {
                id: 'app-2',
                question: 'How much does mobile app development cost?',
                answer: 'App development costs vary significantly based on features, complexity, and platform requirements. Simple apps start around $10,000, while complex enterprise apps can exceed $100,000. We provide detailed quotes after understanding your specific needs.',
            },
            {
                id: 'app-3',
                question: 'Will you help with app store submission?',
                answer: 'Yes, we guide you through the entire app store submission process for both Apple App Store and Google Play Store, ensuring your app meets all guidelines and requirements.',
            },
        ],
    },
    {
        category: 'SEO Services',
        questions: [
            {
                id: 'seo-1',
                question: 'How long does it take to see SEO results?',
                answer: 'SEO is a long-term strategy. You can typically expect to see meaningful results within 3-6 months, with continuous improvement over time. Quick wins like technical fixes may show results sooner.',
            },
            {
                id: 'seo-2',
                question: 'Do you guarantee first-page rankings?',
                answer: 'While we cannot guarantee specific rankings (as search algorithms are constantly evolving), we use proven strategies and best practices to significantly improve your search visibility and organic traffic.',
            },
            {
                id: 'seo-3',
                question: 'What\'s included in your SEO services?',
                answer: 'Our SEO services include keyword research, on-page optimization, technical SEO, content strategy, link building, local SEO, and regular performance reporting. We create customized strategies based on your goals.',
            },
        ],
    },
    {
        category: 'Pricing & Payment',
        questions: [
            {
                id: 'pricing-1',
                question: 'How do you charge for your services?',
                answer: 'We offer flexible pricing models including fixed-price projects, hourly rates, and monthly retainers. The best option depends on your project scope and requirements. We provide transparent quotes with no hidden fees.',
            },
            {
                id: 'pricing-2',
                question: 'Do you require upfront payment?',
                answer: 'Typically, we require a 30-50% deposit to begin work, with the remaining balance paid upon project milestones or completion. For ongoing services, we offer monthly billing options.',
            },
            {
                id: 'pricing-3',
                question: 'Do you offer payment plans?',
                answer: 'Yes, for larger projects, we can arrange flexible payment plans tied to project milestones. Contact us to discuss options that work for your budget.',
            },
        ],
    },
];

export default function FAQ() {
    const [searchQuery, setSearchQuery] = useState('');
    const [openItems, setOpenItems] = useState<string[]>([]);

    const filteredFaqs = faqs.map((category) => ({
        ...category,
        questions: category.questions.filter(
            (q) =>
                q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                q.answer.toLowerCase().includes(searchQuery.toLowerCase())
        ),
    })).filter((category) => category.questions.length > 0);

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
                            FAQ
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="heading-1 mb-6"
                        >
                            Frequently Asked <span className="gradient-text">Questions</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-gray-300"
                        >
                            Find answers to common questions about our services, processes, and pricing.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* FAQ Content */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        {/* Search */}
                        <div className="mb-12">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="Search questions..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-12 h-12"
                                />
                            </div>
                        </div>

                        {/* FAQ Categories */}
                        {filteredFaqs.length > 0 ? (
                            <div className="space-y-12">
                                {filteredFaqs.map((category, categoryIndex) => (
                                    <motion.div
                                        key={category.category}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: categoryIndex * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <h2 className="text-2xl font-bold mb-6">{category.category}</h2>
                                        <Accordion type="multiple" value={openItems} onValueChange={setOpenItems}>
                                            {category.questions.map((faq) => (
                                                <AccordionItem key={faq.id} value={faq.id} className="border-b border-border">
                                                    <AccordionTrigger className="text-left hover:text-primary transition-colors py-6">
                                                        <span className="font-semibold">{faq.question}</span>
                                                    </AccordionTrigger>
                                                    <AccordionContent className="text-muted-foreground pb-6">
                                                        {faq.answer}
                                                    </AccordionContent>
                                                </AccordionItem>
                                            ))}
                                        </Accordion>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <p className="text-muted-foreground text-lg">
                                    No questions found matching your search.
                                </p>
                            </div>
                        )}

                        {/* Still Have Questions CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mt-16 p-8 bg-secondary/50 rounded-2xl text-center"
                        >
                            <h3 className="text-2xl font-bold mb-3">Still have questions?</h3>
                            <p className="text-muted-foreground mb-6">
                                Can't find the answer you're looking for? Our team is here to help!
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <a
                                    href="/contact"
                                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
                                >
                                    Contact Us
                                </a>
                                <a
                                    href="tel:+1234567890"
                                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
                                >
                                    Call Us
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
