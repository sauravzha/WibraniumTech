import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export function NewsletterSection() {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.trim()) {
            toast.error('Please enter your email');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        setIsSubmitting(true);

        try {
            // Store newsletter subscription in database
            const { error } = await supabase.from('newsletter_subscribers').insert({
                email: email.trim(),
            });

            if (error) {
                if (error.code === '23505') {
                    // Duplicate email
                    toast.error('This email is already subscribed!');
                } else {
                    console.error('Subscription error:', error);
                    toast.error('Failed to subscribe. Please try again.');
                }
            } else {
                setIsSubscribed(true);
                toast.success('Successfully subscribed to our newsletter!');
                setEmail('');

                // Reset after 3 seconds
                setTimeout(() => {
                    setIsSubscribed(false);
                }, 3000);
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An unexpected error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary to-background">
            <div className="container-custom">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-card border border-border rounded-2xl p-8 md:p-12"
                    >
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Mail className="h-8 w-8 text-primary" />
                        </div>

                        <h2 className="heading-3 mb-4">
                            Stay Updated with Our <span className="gradient-text">Newsletter</span>
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            Get the latest insights, tips, and exclusive offers delivered straight to your inbox.
                            Join our community of forward-thinking businesses!
                        </p>

                        {!isSubscribed ? (
                            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                                <div className="flex gap-2">
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="flex-1 h-12"
                                        disabled={isSubmitting}
                                    />
                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="btn-primary px-6"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            'Subscribing...'
                                        ) : (
                                            <>
                                                <Send className="h-4 w-4 mr-2" />
                                                Subscribe
                                            </>
                                        )}
                                    </Button>
                                </div>
                                <p className="text-xs text-muted-foreground mt-4">
                                    We respect your privacy. Unsubscribe at any time.
                                </p>
                            </form>
                        ) : (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="flex flex-col items-center gap-4"
                            >
                                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                                    <CheckCircle className="h-8 w-8 text-green-500" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">You're All Set!</h3>
                                    <p className="text-muted-foreground">
                                        Check your inbox for a confirmation email.
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border">
                            <div>
                                <div className="text-2xl font-bold text-primary mb-1">5K+</div>
                                <div className="text-sm text-muted-foreground">Subscribers</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-primary mb-1">Weekly</div>
                                <div className="text-sm text-muted-foreground">Updates</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-primary mb-1">100%</div>
                                <div className="text-sm text-muted-foreground">Free</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
