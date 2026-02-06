import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, User, Stethoscope, ChevronRight, Users, Trophy, Smile, Globe, Shield, HelpCircle, Clock, Activity, Lock, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Layout } from "@/components/layout/Layout";
import { motion, Variants } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedCounter, TiltCard, MedicalSphere } from "@/components/AnimatedComponents";
import { Calendar } from "@/components/ui/calendar";

export const GYODSection = () => {
    const [date, setDate] = React.useState<Date>();

    const services = [
        { icon: <Clock className="w-8 h-8 text-cyan-400" />, title: "24/7 Health Monitoring Support", desc: "Continuous assistance to ensure uninterrupted patient care." },
        { icon: <Activity className="w-8 h-8 text-cyan-400" />, title: "Real-Time Data Access", desc: "Instantly view patient vitals like BP, ECG, temperature, and more." },
        { icon: <User className="w-8 h-8 text-cyan-400" />, title: "User-Friendly Interface", desc: "Easy-to-use application for both patients and healthcare providers." },
        { icon: <Stethoscope className="w-8 h-8 text-cyan-400" />, title: "Customized Alerts & Notifications", desc: "Get instant alerts for abnormal readings for timely intervention." },
        { icon: <Lock className="w-8 h-8 text-cyan-400" />, title: "Secure & Reliable Data Handling", desc: "HIPAA-compliant data protection for complete privacy and safety." },
        { icon: <Eye className="w-8 h-8 text-cyan-400" />, title: "Expert Technical Assistance", desc: "Dedicated support team to help with setup, usage, and troubleshooting." },
    ];

    const stats = [
        { icon: <Users className="w-8 h-8 text-cyan-400" />, value: 100, label: "Expert Doctors" },
        { icon: <Activity className="w-8 h-8 text-cyan-400" />, value: 1020, label: "Health Programs" },
        { icon: <Smile className="w-8 h-8 text-cyan-400" />, value: 912, label: "Happy Clients" },
        { icon: <Trophy className="w-8 h-8 text-cyan-400" />, value: 80, label: "Success Meets" },
    ];

    const blogs = [
        {
            title: "Investigations",
            desc: "Our system continuously monitors vital signs—including blood pressure, ECG, temperature, oxygen saturation, and heart rate—while securely logging data for thorough analysis and early detection.",
            author: "Admin", date: "Dec 25, 2025", comments: 3, image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Researches",
            desc: "\"Our product development is backed by ongoing research and clinical studies to ensure accuracy, reliability, and innovation in patient health monitoring\".",
            author: "Admin", date: "Dec 25, 2025", comments: 3, image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Your Health",
            desc: "\"Your health is our priority — empowering you with real-time insights for better, proactive care\".",
            author: "Admin", date: "Dec 25, 2025", comments: 3, image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
    ];

    const testimonials = [
        {
            quote: "\"This monitoring system has completely changed how I track my health. The real-time BP, ECG, and temperature data on the app is incredibly accurate and easy to understand\".",
            name: "Anuj Chauhan", role: "Patient", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            quote: "\"I feel much more secure knowing my vital signs are constantly monitored and accessible from my phone. It's like having a doctor with me 24/7!\".",
            name: "Sachin Jha", role: "Patient", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            quote: "\"Thanks to this system, I was able to catch early signs of irregular heartbeat. It's truly a lifesaver\".",
            name: "Ankit Lakhchaura", role: "Almora", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            quote: "\"The ease of sharing reports with my specialist instantly has saved me so many unnecessary hospital visits. Highly recommended!\".",
            name: "Priya Sharma", role: "Delhi", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            quote: "\"As a caregiver, having real-time access to my father's vitals gives me immense peace of mind, even when I'm at work\".",
            name: "Rahul Verma", role: "Mumbai", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            quote: "\"The interface is so intuitive. My elderly parents monitor their health daily without any confusion. A fantastic tool!\".",
            name: "Sneha Patel", role: "Ahmedabad", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" as const }
        }
    };

    return (
        <Layout>
            <div className="w-full bg-[#0f172a] text-white font-sans overflow-hidden">
                {/* Hero Section */}
                {/* Hero Section */}
                <div className="relative h-[80vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
                    {/* Background Elements */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a]"></div>
                    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>

                    {/* 3D Sphere Background Effect */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-60 pointer-events-none overflow-hidden">
                        <div className="scale-[2.5] opacity-40 blur-sm">
                            <MedicalSphere />
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="mb-8 inline-block relative"
                        >
                            <div className="absolute -inset-10 bg-cyan-500/20 blur-3xl rounded-full opacity-50"></div>
                            <h1 className="relative text-7xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-2xl tracking-tighter">
                                GYOD
                            </h1>
                        </motion.div>
                        <p className="text-2xl md:text-4xl text-gray-200 mb-10 font-light tracking-wide max-w-3xl mx-auto leading-relaxed">
                            <span className="text-cyan-400 font-medium">Get Your Own Device.</span> The future of proactive healthcare monitoring is here.
                        </p>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-full px-12 py-8 text-xl shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] transition-all duration-300 border border-white/10">
                                Explore Solutions
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Features Cards - Overlapping Hero with TiltCard */}
                <div className="container mx-auto px-4 -mt-32 relative z-20">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {[
                            { icon: <Users className="w-12 h-12 text-cyan-400" />, title: "Qualified Team", desc: "\"Our team comprises experienced healthcare professionals, engineers, and technologists dedicated to delivering reliable and innovative patient monitoring solutions\"." },
                            { icon: <Shield className="w-12 h-12 text-cyan-400" />, title: "Quality Service", desc: "\"We are committed to providing accurate, reliable, and timely health monitoring services to ensure the best care experience for patients and healthcare providers alike\"." },
                            { icon: <Globe className="w-12 h-12 text-cyan-400" />, title: "Global Work", desc: "\"Our solutions are designed for a global audience, supporting healthcare providers and patients around the world with accessible, real-time health monitoring technology\"." },
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="h-full perspective-1000"
                            >
                                <TiltCard className="h-full">
                                    <div className="glass-card border-none text-white h-full hover:bg-white/5 transition-all duration-300 card-glow-hover group rounded-3xl overflow-hidden shadow-2xl">
                                        <div className="p-10 flex flex-col items-start gap-6 h-full bg-gradient-to-br from-white/5 to-transparent">
                                            <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 group-hover:scale-110 transition-transform duration-300 shadow-lg border border-white/5 relative z-10">
                                                {feature.icon}
                                            </div>
                                            <div className="flex-1 relative z-10">
                                                <h3 className="text-sm font-bold text-cyan-400 mb-2 uppercase tracking-wider">{feature.title === "Global Work" ? "World" : feature.title === "Quality Service" ? "Help" : "Protect"}</h3>
                                                <h2 className="text-3xl font-bold mb-4">{feature.title}</h2>
                                                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                                            </div>
                                            {/* Decorative shine */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                        </div>
                                    </div>
                                </TiltCard>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* About Section */}
                <div className="container mx-auto px-4 py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <SectionHeading
                            badge="About Us"
                            title={<span className="leading-tight">Changing the way you<br />receive healthcare.</span>}
                            centered={false}
                            className="mb-8"
                        />
                        <Button className="bg-transparent border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white rounded-full px-8 py-6 text-lg transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:shadow-[0_0_40px_rgba(6,182,212,0.4)]">
                            Read More
                        </Button>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6 text-lg text-gray-400 leading-relaxed glass p-8 rounded-2xl border-l-4 border-cyan-500"
                    >
                        <p>
                            We are transforming patient care through smart, real-time health monitoring. Our innovative system tracks critical health parameters including <strong className="text-white">Blood pressure (BP), ECG, temperature, Pulse oximeter</strong>, and seamlessly displays the data in our user-friendly application.
                        </p>
                        <p>
                            Designed for both patients and healthcare providers, our solution enables continuous monitoring, early detection, and timely intervention anytime, anywhere. By bridging the gap between patients and caregivers, we're making healthcare more proactive, connected, and personalized.
                        </p>
                    </motion.div>
                </div>

                {/* Why Choose GYOD */}
                <div className="py-32 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] to-[#1e293b] skew-y-3 transform origin-top-left -z-10 h-full w-full scale-110"></div>
                    <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative order-2 lg:order-1"
                        >
                            <div className="absolute -inset-4 bg-cyan-500/20 rounded-3xl blur-2xl"></div>
                            <img src="https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Lab Research" className="rounded-2xl shadow-2xl relative z-10 border border-white/10 w-full" />
                            <div className="absolute -bottom-10 -right-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full p-6 animate-bounce shadow-glow-primary z-20">
                                <ChevronRight className="w-10 h-10 text-white" />
                            </div>
                        </motion.div>

                        <div className="order-1 lg:order-2">
                            <SectionHeading
                                badge="Extraordinary Services"
                                title="Why You Should Choose GYOD."
                                centered={false}
                            />

                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="space-y-8"
                            >
                                {[
                                    { icon: <CalendarIcon className="w-6 h-6 text-cyan-400" />, title: "Years Of Experience", desc: "\"With years of experience in healthcare technology, our team brings deep expertise and a proven track record in delivering reliable patient monitoring solutions\"." },
                                    { icon: <HelpCircle className="w-6 h-6 text-cyan-400" />, title: "Free Consultation", desc: "\"Get expert guidance with a free consultation our team is here to help you find the right health monitoring solution for your needs\"." },
                                    { icon: <Shield className="w-6 h-6 text-cyan-400" />, title: "100% Guaranteed", desc: "\"We stand by the quality of our products and services with a 100% satisfaction guarantee, ensuring reliability, accuracy, and peace of mind\"." },
                                ].map((item, i) => (
                                    <motion.div key={i} variants={itemVariants} className="flex gap-6 group">
                                        <div className="bg-white/5 p-4 h-fit rounded-xl border border-white/10 group-hover:bg-cyan-500/10 transition-colors duration-300">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">{item.title}</h3>
                                            <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Our Services */}
                <div className="container mx-auto px-4 py-32">
                    <SectionHeading
                        badge="Extraordinary Services"
                        title="Our Services."
                        description="Comprehensive features designed for your health and peace of mind."
                    />

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {services.map((service, index) => (
                            <motion.div key={index} variants={itemVariants}>
                                <div className="flex flex-col gap-6 bg-white/5 backdrop-blur-sm p-8 hover:bg-white/10 transition-all duration-300 rounded-2xl border border-white/5 hover:border-cyan-500/30 hover:shadow-glow-primary h-full group ml-0 hover:-translate-y-2">
                                    <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-4 h-fit rounded-xl shadow-lg w-fit border border-white/10 group-hover:scale-110 transition-transform duration-300">
                                        {service.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">{service.title}</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Stats Section with Background Image */}
                <div className="relative py-32 w-full bg-[url('https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-fixed bg-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-slate-900/90 backdrop-blur-sm"></div>
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.6 }}
                                    className="flex flex-col items-center group"
                                >
                                    <div className="mb-6 p-4 bg-white/10 rounded-full backdrop-blur-md border border-white/20 group-hover:scale-110 transition-transform duration-300">
                                        {stat.icon}
                                    </div>
                                    <h3 className="text-5xl md:text-6xl font-bold text-white mb-2 tracking-tight">
                                        <AnimatedCounter end={stat.value} />
                                    </h3>
                                    <div className="h-1 w-12 bg-cyan-500 rounded-full mb-4 group-hover:w-20 transition-all duration-300"></div>
                                    <p className="text-gray-300 font-medium uppercase tracking-wider text-sm">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Blog Posts */}
                <div className="container mx-auto px-4 py-32">
                    <SectionHeading
                        badge="Latest News"
                        title="Blog Posts"
                        description="Stay updated with the latest in health technology and care."
                    />

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-10"
                    >
                        {blogs.map((blog, index) => (
                            <motion.div key={index} variants={itemVariants} className="bg-[#1e293b]/50 border border-white/5 rounded-2xl overflow-hidden group hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 hover:-translate-y-2">
                                <div className="overflow-hidden h-64 relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                </div>
                                <div className="p-8">
                                    <h4 className="text-cyan-400 font-bold mb-3 uppercase text-sm tracking-wider">{blog.title}</h4>
                                    <p className="text-xl font-bold text-white mb-4 leading-snug group-hover:text-cyan-400 transition-colors line-clamp-2">{blog.desc}</p>
                                    <Button variant="link" className="p-0 h-auto text-cyan-400 hover:text-cyan-300 mb-6 flex items-center gap-2 group-hover:gap-3 transition-all">
                                        Read More <ChevronRight className="w-4 h-4" />
                                    </Button>
                                    <div className="flex items-center gap-6 text-gray-400 text-xs font-medium border-t border-white/5 pt-6">
                                        <span className="flex items-center gap-2"><User className="w-4 h-4 text-cyan-500" /> By {blog.author}</span>
                                        <span className="flex items-center gap-2"><CalendarIcon className="w-4 h-4 text-cyan-500" /> {blog.date}</span>
                                        <span className="flex items-center gap-2"><Activity className="w-4 h-4 text-cyan-500" /> {blog.comments}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Make a Demo - Banner + Form */}
                <div className="relative w-full bg-[url('https://images.unsplash.com/photo-1631217868264-e5b9099a5804?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center bg-fixed">
                    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-[2px]"></div>
                    <div className="container mx-auto px-4 py-32 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h4 className="text-cyan-400 font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                                <span className="w-8 h-[2px] bg-cyan-400"></span> Free Demo
                            </h4>
                            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">Make a <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Demo</span></h2>
                            <p className="text-gray-300 mb-8 max-w-xl text-lg leading-relaxed">
                                We believe in providing the best possible care to all our existing patients and welcome new patients to sample our technology.
                            </p>
                            <p className="text-gray-300 mb-10 max-w-xl text-lg leading-relaxed">
                                Our system continuously monitors and displays real-time blood pressure, ECG, and temperature data through an easy-to-use app for proactive health management.
                            </p>
                            <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-full px-10 py-7 text-lg shadow-glow-primary transition-all duration-300">
                                Contact Us
                            </Button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="glass-card p-10 rounded-3xl shadow-2xl border border-white/10 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>

                            <h3 className="text-2xl font-bold mb-8 text-center text-white">Book Your Appointment</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <Input placeholder="Full Name" className="bg-white/5 border-white/10 text-white h-14 focus:border-cyan-500 focus:ring-cyan-500/20 rounded-xl placeholder:text-gray-500" />
                                <Input placeholder="Enter Email" className="bg-white/5 border-white/10 text-white h-14 focus:border-cyan-500 focus:ring-cyan-500/20 rounded-xl placeholder:text-gray-500" />
                                <Input placeholder="Enter Number" className="bg-white/5 border-white/10 text-white h-14 focus:border-cyan-500 focus:ring-cyan-500/20 rounded-xl placeholder:text-gray-500" type="tel" />
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal bg-white/5 border-white/10 text-gray-400 h-14 rounded-xl hover:bg-white/10 hover:text-white", !date && "text-muted-foreground")}>
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date ? format(date, "PPP") : <span>Select Date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 bg-[#0f172a] border-white/10 text-white">
                                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus className="p-3" />
                                    </PopoverContent>
                                </Popover>
                                <Select>
                                    <SelectTrigger className="bg-white/5 border-white/10 text-gray-400 h-14 rounded-xl hover:bg-white/10 hover:text-white">
                                        <SelectValue placeholder="Specialization*" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#0f172a] border-white/10 text-white">
                                        <SelectItem value="cardiology">Cardiology</SelectItem>
                                        <SelectItem value="orthopedics">Orthopedics</SelectItem>
                                        <SelectItem value="neurology">Neurology</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select>
                                    <SelectTrigger className="bg-white/5 border-white/10 text-gray-400 h-14 rounded-xl hover:bg-white/10 hover:text-white">
                                        <SelectValue placeholder="Select Doctor" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#0f172a] border-white/10 text-white">
                                        <SelectItem value="dr-smith">Dr. Smith</SelectItem>
                                        <SelectItem value="dr-jones">Dr. Jones</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl h-14 text-lg font-bold shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:scale-[1.02]">
                                Book Now
                            </Button>
                        </motion.div>
                    </div>
                </div>

                {/* Testimonials */}
                <div className="container mx-auto px-4 py-32">
                    <SectionHeading
                        badge="Happy Clients"
                        title="What Our Clients Say"
                        centered
                    />

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {testimonials.map((client, index) => (
                            <motion.div key={index} variants={itemVariants} className="flex flex-col h-full bg-white/5 border border-white/5 p-8 rounded-3xl hover:bg-white/10 transition-colors">
                                <div className="text-cyan-500 text-6xl font-serif mb-6 opacity-50">"</div>
                                <p className="text-gray-300 mb-8 flex-grow text-lg leading-relaxed italic">{client.quote}</p>
                                <div className="mt-auto flex items-center gap-4">
                                    <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-cyan-500/30">
                                        <img src={client.image} alt={client.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg">{client.name}</h4>
                                        <p className="text-cyan-400 text-sm">{client.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Spacer */}
                <div className="h-20"></div>
            </div>
        </Layout>
    );
};
