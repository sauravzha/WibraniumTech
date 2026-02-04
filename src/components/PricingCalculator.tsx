import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

interface Service {
    id: string;
    name: string;
    basePrice: number;
    description: string;
}

const services: Service[] = [
    { id: 'web', name: 'Website Development', basePrice: 5000, description: 'Custom website design and development' },
    { id: 'app', name: 'Mobile App', basePrice: 10000, description: 'iOS and Android mobile applications' },
    { id: 'seo', name: 'SEO Optimization', basePrice: 2000, description: 'Search engine optimization services' },
    { id: 'video', name: 'Video Editing', basePrice: 500, description: 'Professional video production' },
    { id: 'crm', name: 'Custom CRM', basePrice: 8000, description: 'Tailored CRM solutions' },
];

const complexityMultipliers = {
    basic: { label: 'Basic', multiplier: 1, description: 'Simple, straightforward features' },
    standard: { label: 'Standard', multiplier: 1.5, description: 'Moderate complexity with custom features' },
    advanced: { label: 'Advanced', multiplier: 2.5, description: 'Complex with integrations and custom logic' },
};

export function PricingCalculator() {
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [complexity, setComplexity] = useState<keyof typeof complexityMultipliers>('standard');
    const [timelineWeeks, setTimelineWeeks] = useState([8]);

    const toggleService = (serviceId: string) => {
        setSelectedServices((prev) =>
            prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId]
        );
    };

    const calculatePrice = () => {
        const servicesTotal = services
            .filter((s) => selectedServices.includes(s.id))
            .reduce((sum, s) => sum + s.basePrice, 0);

        const multiplier = complexityMultipliers[complexity].multiplier;
        const timelineDiscount = timelineWeeks[0] >= 12 ? 0.9 : 1; // 10% discount for longer projects

        return Math.round(servicesTotal * multiplier * timelineDiscount);
    };

    const estimatedPrice = calculatePrice();

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
                        Pricing Calculator
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="heading-2 mb-4"
                    >
                        Estimate Your <span className="gradient-text">Project Cost</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-muted-foreground max-w-2xl mx-auto"
                    >
                        Customize your project to get an instant price estimate
                    </motion.p>
                </div>

                <div className="max-w-5xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Configuration */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Services Selection */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-card border border-border rounded-2xl p-6"
                            >
                                <h3 className="text-xl font-bold mb-4">Select Services</h3>
                                <div className="space-y-3">
                                    {services.map((service) => (
                                        <label
                                            key={service.id}
                                            className="flex items-start gap-3 p-4 bg-secondary/30 rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors"
                                        >
                                            <Checkbox
                                                checked={selectedServices.includes(service.id)}
                                                onCheckedChange={() => toggleService(service.id)}
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-medium">{service.name}</span>
                                                    <Badge variant="outline">${service.basePrice.toLocaleString()}</Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Complexity */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="bg-card border border-border rounded-2xl p-6"
                            >
                                <h3 className="text-xl font-bold mb-4">Project Complexity</h3>
                                <div className="grid grid-cols-3 gap-3">
                                    {Object.entries(complexityMultipliers).map(([key, { label, description }]) => (
                                        <button
                                            key={key}
                                            onClick={() => setComplexity(key as keyof typeof complexityMultipliers)}
                                            className={`p-4 rounded-lg border-2 transition-all text-left ${complexity === key
                                                    ? 'border-primary bg-primary/5'
                                                    : 'border-border hover:border-primary/50'
                                                }`}
                                        >
                                            <div className="font-semibold mb-1">{label}</div>
                                            <div className="text-xs text-muted-foreground">{description}</div>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Timeline */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="bg-card border border-border rounded-2xl p-6"
                            >
                                <h3 className="text-xl font-bold mb-4">Timeline</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Project Duration</span>
                                        <span className="font-semibold">{timelineWeeks[0]} weeks</span>
                                    </div>
                                    <Slider
                                        value={timelineWeeks}
                                        onValueChange={setTimelineWeeks}
                                        min={4}
                                        max={24}
                                        step={2}
                                        className="w-full"
                                    />
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>4 weeks</span>
                                        <span>24 weeks</span>
                                    </div>
                                    {timelineWeeks[0] >= 12 && (
                                        <Badge variant="outline" className="text-green-600 border-green-600">
                                            10% Discount Applied for Extended Timeline
                                        </Badge>
                                    )}
                                </div>
                            </motion.div>
                        </div>

                        {/* Price Summary */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="lg:col-span-1"
                        >
                            <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
                                <div className="flex items-center gap-2 mb-6">
                                    <Calculator className="h-5 w-5 text-primary" />
                                    <h3 className="text-xl font-bold">Estimated Cost</h3>
                                </div>

                                <div className="space-y-4 mb-6">
                                    {selectedServices.length > 0 ? (
                                        <>
                                            <div className="space-y-2">
                                                {services
                                                    .filter((s) => selectedServices.includes(s.id))
                                                    .map((service) => (
                                                        <div key={service.id} className="flex justify-between text-sm">
                                                            <span className="text-muted-foreground">{service.name}</span>
                                                            <span>${service.basePrice.toLocaleString()}</span>
                                                        </div>
                                                    ))}
                                            </div>
                                            <div className="border-t border-border pt-2">
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="text-muted-foreground">Complexity Multiplier</span>
                                                    <span>×{complexityMultipliers[complexity].multiplier}</span>
                                                </div>
                                                {timelineWeeks[0] >= 12 && (
                                                    <div className="flex justify-between text-sm text-green-600">
                                                        <span>Timeline Discount</span>
                                                        <span>-10%</span>
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    ) : (
                                        <p className="text-sm text-muted-foreground text-center py-4">
                                            Select at least one service to see estimate
                                        </p>
                                    )}
                                </div>

                                <div className="border-t border-border pt-4 mb-6">
                                    <div className="flex justify-between items-baseline mb-2">
                                        <span className="text-sm text-muted-foreground">Total Estimate</span>
                                        <div className="text-right">
                                            <div className="text-3xl font-bold text-primary">
                                                ${estimatedPrice.toLocaleString()}
                                            </div>
                                            <div className="text-xs text-muted-foreground">Starting from</div>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    asChild
                                    disabled={selectedServices.length === 0}
                                    className="w-full btn-primary"
                                >
                                    <a href="/contact">Get Detailed Quote</a>
                                </Button>

                                <p className="text-xs text-muted-foreground text-center mt-4">
                                    * This is an estimate. Final pricing may vary based on specific requirements.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
