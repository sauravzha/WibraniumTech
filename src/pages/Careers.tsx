import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Briefcase,
    MapPin,
    Clock,
    DollarSign,
    Send,
    TrendingUp,
    Users,
    Zap
} from 'lucide-react';
import { toast } from 'sonner';

const jobOpenings = [
    {
        id: 1,
        title: 'Senior Full Stack Developer',
        department: 'Engineering',
        location: 'Remote / Hybrid',
        type: 'Full-time',
        salary: '$80,000 - $120,000',
        description: "We're looking for an experienced Full Stack Developer to join our growing team. You'll work on cutting-edge web applications using modern technologies.",
        requirements: [
            '5+ years of experience with React, Node.js, and TypeScript',
            'Strong understanding of database design and optimization',
            'Experience with cloud platforms (AWS, Azure, or GCP)',
            'Excellent problem-solving and communication skills',
        ],
        responsibilities: [
            'Design and develop scalable web applications',
            'Collaborate with cross-functional teams',
            'Mentor junior developers',
            'Contribute to technical architecture decisions',
        ],
    },
    {
        id: 2,
        title: 'UI/UX Designer',
        department: 'Design',
        location: 'Remote',
        type: 'Full-time',
        salary: '$60,000 - $90,000',
        description: 'Join our design team to create beautiful, user-friendly interfaces that delight our clients and their users.',
        requirements: [
            '3+ years of UI/UX design experience',
            'Proficiency in Figma, Adobe XD, or Sketch',
            'Strong portfolio demonstrating design thinking',
            'Understanding of HTML/CSS',
        ],
        responsibilities: [
            'Create wireframes, prototypes, and high-fidelity designs',
            'Conduct user research and usability testing',
            'Collaborate with developers on implementation',
            'Maintain and evolve design systems',
        ],
    },
    {
        id: 3,
        title: 'Digital Marketing Specialist',
        department: 'Marketing',
        location: 'Hybrid',
        type: 'Full-time',
        salary: '$50,000 - $75,000',
        description: 'Drive growth through strategic digital marketing campaigns, SEO optimization, and content creation.',
        requirements: [
            '3+ years in digital marketing',
            'Proven track record with SEO and PPC campaigns',
            'Experience with Google Analytics, Google Ads',
            'Excellent writing and content creation skills',
        ],
        responsibilities: [
            'Develop and execute marketing strategies',
            'Manage SEO and PPC campaigns',
            'Create engaging content for various platforms',
            'Analyze and report on campaign performance',
        ],
    },
    {
        id: 4,
        title: 'Mobile App Developer',
        department: 'Engineering',
        location: 'Remote / On-site',
        type: 'Full-time',
        salary: '$70,000 - $110,000',
        description: 'Build innovative mobile applications for iOS and Android using React Native or native technologies.',
        requirements: [
            '4+ years of mobile app development',
            'Experience with React Native or native iOS/Android',
            'Published apps in App Store and/or Play Store',
            'Knowledge of mobile UI/UX best practices',
        ],
        responsibilities: [
            'Develop and maintain mobile applications',
            'Optimize app performance and user experience',
            'Integrate with backend APIs and third-party services',
            'Stay updated with mobile development trends',
        ],
    },
];

const benefits = [
    {
        icon: Briefcase,
        title: 'Flexible Work',
        description: 'Remote and hybrid options available',
    },
    {
        icon: TrendingUp,
        title: 'Career Growth',
        description: 'Continuous learning and development opportunities',
    },
    {
        icon: Users,
        title: 'Great Team',
        description: 'Collaborative and supportive work environment',
    },
    {
        icon: Zap,
        title: 'Modern Tech',
        description: 'Work with cutting-edge technologies',
    },
];

export default function Careers() {
    const [selectedJob, setSelectedJob] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        resume: '',
        coverLetter: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success('Application submitted! We\'ll be in touch soon.');
        setFormData({ name: '', email: '', phone: '', resume: '', coverLetter: '' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

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
                            Careers
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="heading-1 mb-6"
                        >
                            Join Our <span className="gradient-text">Team</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-gray-300"
                        >
                            Build your career with a dynamic team that's shaping the future of digital solutions.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-16 bg-secondary/30">
                <div className="container-custom">
                    <h2 className="text-2xl font-bold text-center mb-12">Why Work With Us</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={benefit.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-card p-6 rounded-xl border border-border text-center"
                            >
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <benefit.icon className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                                <p className="text-sm text-muted-foreground">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Job Openings */}
            <section className="section-padding">
                <div className="container-custom">
                    <h2 className="text-2xl font-bold mb-8">Open Positions</h2>
                    <div className="grid lg:grid-cols-2 gap-6">
                        {jobOpenings.map((job, index) => (
                            <motion.div
                                key={job.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-card border border-border rounded-xl p-6 hover-lift"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                                        <Badge variant="secondary">{job.department}</Badge>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-3 mb-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4" />
                                        {job.location}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        {job.type}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <DollarSign className="h-4 w-4" />
                                        {job.salary}
                                    </span>
                                </div>

                                <p className="text-muted-foreground mb-4">{job.description}</p>

                                <Button
                                    onClick={() => setSelectedJob(job.id)}
                                    variant="outline"
                                    className="w-full"
                                >
                                    View Details & Apply
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Application Form Modal */}
            {selectedJob && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold">Apply for Position</h3>
                            <button
                                onClick={() => setSelectedJob(null)}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Full Name <span className="text-destructive">*</span>
                                </label>
                                <Input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Email <span className="text-destructive">*</span>
                                </label>
                                <Input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Phone Number</label>
                                <Input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Resume/CV Link <span className="text-destructive">*</span>
                                </label>
                                <Input
                                    type="url"
                                    name="resume"
                                    placeholder="Link to your resume (Google Drive, Dropbox, etc.)"
                                    value={formData.resume}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Cover Letter</label>
                                <Textarea
                                    name="coverLetter"
                                    rows={6}
                                    placeholder="Tell us why you're a great fit..."
                                    value={formData.coverLetter}
                                    onChange={handleChange}
                                />
                            </div>

                            <Button type="submit" className="w-full btn-primary">
                                <Send className="h-5 w-5 mr-2" />
                                Submit Application
                            </Button>
                        </form>
                    </motion.div>
                </div>
            )}
        </Layout>
    );
}
