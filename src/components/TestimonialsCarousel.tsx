import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
    {
        id: 1,
        name: 'Sarah Johnson',
        role: 'CEO',
        company: 'TechStartup Inc.',
        rating: 5,
        text: 'WibraniumTech transformed our digital presence completely. Their web development team created a stunning, high-performance website that has increased our conversions by 200%. Highly recommended!',
        image: 'https://i.pravatar.cc/150?img=1',
    },
    {
        id: 2,
        name: 'Michael Chen',
        role: 'Marketing Director',
        company: 'Global Retail Co.',
        rating: 5,
        text: 'The SEO results have been phenomenal. Within 6 months, we went from page 3 to ranking in the top 3 for our main keywords. The team is professional, responsive, and truly understands digital marketing.',
        image: 'https://i.pravatar.cc/150?img=12',
    },
    {
        id: 3,
        name: 'Emily Rodriguez',
        role: 'Founder',
        company: 'HealthTech Solutions',
        rating: 5,
        text: 'Our mobile app developed by WibraniumTech has received outstanding feedback from users. The attention to detail, user experience, and technical execution exceeded our expectations.',
        image: 'https://i.pravatar.cc/150?img=5',
    },
    {
        id: 4,
        name: 'David Kumar',
        role: 'Operations Manager',
        company: 'Enterprise Systems Ltd.',
        rating: 5,
        text: 'The custom CRM solution has streamlined our operations significantly. WibraniumTech took the time to understand our unique needs and delivered a system that perfectly fits our workflow.',
        image: 'https://i.pravatar.cc/150?img=14',
    },
    {
        id: 5,
        name: 'Lisa Anderson',
        role: 'Creative Director',
        company: 'Digital Media Agency',
        rating: 5,
        text: 'Their video editing services are top-notch. Fast turnaround, creative execution, and always open to revisions. They\'ve become our go-to partner for all video content.',
        image: 'https://i.pravatar.cc/150?img=9',
    },
];

export function TestimonialsCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const currentTestimonial = testimonials[currentIndex];

    return (
        <section className="py-20 bg-secondary/30">
            <div className="container-custom">
                <div className="text-center mb-12">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4"
                    >
                        Testimonials
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="heading-2 mb-4"
                    >
                        What Our Clients <span className="gradient-text">Say</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-muted-foreground max-w-2xl mx-auto"
                    >
                        Don't just take our word for it - hear from businesses we've helped succeed
                    </motion.p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-card rounded-2xl p-8 md:p-12 border border-border relative"
                    >
                        {/* Quote Icon */}
                        <div className="absolute top-8 right-8 opacity-10">
                            <Quote className="h-24 w-24" />
                        </div>

                        {/* Stars */}
                        <div className="flex gap-1 mb-6">
                            {[...Array(currentTestimonial.rating)].map((_, i) => (
                                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>

                        {/* Testimonial Text */}
                        <p className="text-lg md:text-xl mb-8 leading-relaxed relative z-10">
                            "{currentTestimonial.text}"
                        </p>

                        {/* Author */}
                        <div className="flex items-center gap-4">
                            <img
                                src={currentTestimonial.image}
                                alt={currentTestimonial.name}
                                className="w-16 h-16 rounded-full object-cover"
                            />
                            <div>
                                <h4 className="font-semibold text-lg">{currentTestimonial.name}</h4>
                                <p className="text-muted-foreground">
                                    {currentTestimonial.role}, {currentTestimonial.company}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Navigation */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={prevTestimonial}
                            className="rounded-full"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </Button>

                        {/* Dots */}
                        <div className="flex gap-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    title={`Go to testimonial ${index + 1}`}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                    className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-primary w-8' : 'bg-muted-foreground/30'
                                        }`}
                                />
                            ))}
                        </div>

                        <Button
                            variant="outline"
                            size="icon"
                            onClick={nextTestimonial}
                            className="rounded-full"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Counter */}
                    <p className="text-center mt-4 text-sm text-muted-foreground">
                        {currentIndex + 1} / {testimonials.length}
                    </p>
                </div>
            </div>
        </section>
    );
}
