import { motion } from "framer-motion";
import { useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Globe,
  Smartphone,
  Code,
  Database,
  ArrowRight,
  CheckCircle2,
  Zap,
  Shield,
  Users,
  Palette,
  LineChart,
  Target,
  Lightbulb,
  Handshake,
  Eye,
  GraduationCap,
  Factory,
  ShoppingBag,
  Store,
  Rocket,
  ClipboardCheck,
  Settings,
  TestTube,
  FileCheck,
  UserPlus,
  QrCode,
  BarChart3,
  Paintbrush,
  School
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ServiceCard } from "@/components/ServiceCard";
import { SectionHeading } from "@/components/SectionHeading";
import { ScrollAnimation, StaggerContainer } from "@/components/ScrollAnimation";
import { AnimatedCounter } from "@/components/AnimatedComponents";
import { Parallax3D } from "@/components/3DElements";
import { Lazy3DWrapper } from "@/components/Lazy3DWrapper";

// Lazy load heavy 3D components for performance
const TechParticles3D = lazy(() => import("@/components/3DElements").then(m => ({ default: m.TechParticles3D })));
const GeometricGrid3D = lazy(() => import("@/components/3DElements").then(m => ({ default: m.GeometricGrid3D })));
const GlowingOrbs3D = lazy(() => import("@/components/3DElements").then(m => ({ default: m.GlowingOrbs3D })));
const CircuitLines3D = lazy(() => import("@/components/3DElements").then(m => ({ default: m.CircuitLines3D })));
const GrowthGraph3D = lazy(() => import("@/components/GrowthGraph3D").then(m => ({ default: m.GrowthGraph3D })));
const Laptop3D = lazy(() => import("@/components/Laptop3D").then(m => ({ default: m.Laptop3D })));
import { Smartphone3D } from "@/components/Smartphone3D";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.png";

const coreServices = [
  {
    icon: Globe,
    title: "Website Development",
    description: "Business, school, e-commerce, and custom websites built for speed, security, and usability.",
    details: "We build high-performance websites tailored to your brand. From corporate showcases to complex e-commerce platforms, our sites are SEO-optimized, mobile-responsive, and built on modern frameworks like React and Next.js.",
    link: "/services#web",
  },
  {
    icon: Code,
    title: "Custom Software Development",
    description: "Windows desktop software, ERP systems, billing tools, and utility applications.",
    details: "Streamline your business operations with custom software. We develop robust desktop applications, ERPs, and billing systems designed specifically for your workflow requirements.",
    link: "/services#software",
  },
  {
    icon: GraduationCap,
    title: "School Management Software",
    description: "Affordable, easy-to-use software designed especially for private schools.",
    details: "A comprehensive solution for educational institutions. Features include student admission, fee management, attendance tracking, exam result generation, and a dedicated parent portal.",
    link: "/services#school",
  },
  {
    icon: Factory,
    title: "Industrial Automation & PLC",
    description: "Machine communication, data monitoring, and PLC-based software solutions.",
    details: "Bridge the gap between hardware and software. We provide SCADA-like systems, real-time machine monitoring, and protocol implementation for industrial automation.",
    link: "/services#plc",
  },
  {
    icon: QrCode,
    title: "Barcode & QR Solutions",
    description: "Label design, printing automation, scanners, and thermal printer integration.",
    details: "Automate your inventory and tracking with precision. We integrate TSC/Zebra printers, design custom labels, and build scanning applications for seamless operations.",
    link: "/services#barcode",
  },
  {
    icon: BarChart3,
    title: "Digital Marketing",
    description: "SEO, PPC advertising, social media marketing, and graphic design.",
    details: "Grow your digital presence with data-driven strategies. Our services include Search Engine Optimization (SEO), Pay-Per-Click (PPC) campaigns, and engaging social media content.",
    link: "/services#marketing",
  },
];

const values = [
  {
    icon: Target,
    title: "Results-Driven Approach",
    description: "We deliver measurable IT and digital solutions that improve productivity, visibility, and ROI.",
  },
  {
    icon: Lightbulb,
    title: "Innovation with Purpose",
    description: "Every solution is designed with real operational needs, long-term scalability, and simplicity in mind.",
  },
  {
    icon: Handshake,
    title: "Collaborative Partnership",
    description: "We work as your technology partner—aligning systems with your workflow and business goals.",
  },
  {
    icon: Eye,
    title: "Complete Transparency",
    description: "Clear communication, honest timelines, and measurable outcomes at every stage.",
  },
];

const benefits = [
  {
    icon: Zap,
    title: "Ground-level Solutions",
    description: "Practical solutions that work in real operations",
  },
  {
    icon: Shield,
    title: "No Complexity",
    description: "Simple, easy-to-use systems without confusion",
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description: "Long-term support and maintenance",
  },
  {
    icon: CheckCircle2,
    title: "Proven Experience",
    description: "Expertise with schools & industrial systems",
  },
];

const industries = [
  { icon: GraduationCap, name: "Schools & Educational Institutes" },
  { icon: Factory, name: "Manufacturing Units" },
  { icon: Settings, name: "Factories & Workshops" },
  { icon: ShoppingBag, name: "Retail & Inventory Businesses" },
  { icon: Store, name: "Startups & Local Businesses" },
];

const workingProcess = [
  {
    number: "1",
    title: "Requirement Understanding",
    description: "We study your workflow, challenges, and goals.",
    icon: ClipboardCheck,
  },
  {
    number: "2",
    title: "Solution Planning",
    description: "A customized roadmap aligned with your operations.",
    icon: Lightbulb,
  },
  {
    number: "3",
    title: "Development & Testing",
    description: "Clean, secure, and performance-focused development.",
    icon: TestTube,
  },
  {
    number: "4",
    title: "Deployment",
    description: "Smooth implementation with minimal disruption.",
    icon: Rocket,
  },
  {
    number: "5",
    title: "Training & Support",
    description: "User training, documentation, and ongoing support.",
    icon: UserPlus,
  },
];

const technologies = {
  programming: ["Python", "C / C++", ".NET (C#)", "JavaScript"],
  desktop: ["Windows Desktop Applications", "EXE-based Utility Software", "Automation & Background Services"],
  industrial: ["PLC Systems", "Serial Communication (RS232 / RS485)", "Modbus RTU / TCP", "Sensors & Industrial I/O"],
  web: ["HTML5", "CSS3", "Bootstrap", "Cloud Hosting", "REST APIs"],
  database: ["MySQL", "SQLite", "PostgreSQL", "Data Backup & Security"],
  barcode: ["Barcode Systems", "QR Code Solutions", "Thermal Printers", "Label Design & Printing Automation"],
  networking: ["LAN / TCP-IP Communication", "Device & Machine Integration", "Third-Party API Integration"],
};

export default function Index() {
  const [selectedService, setSelectedService] = useState<typeof coreServices[0] | null>(null);
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden perspective-container">
        {/* Background */}
        <div className="absolute inset-0">
          <Parallax3D speed={0.3}>
            <img
              src={heroBg}
              alt=""
              className="w-full h-full object-cover"
            />
          </Parallax3D>
          <div className="absolute inset-0 bg-gradient-to-r from-wibranium-slate/95 via-wibranium-slate/80 to-wibranium-slate/60" />
          <div className="absolute inset-0 gradient-mesh" />
          <Suspense fallback={null}>
            <Lazy3DWrapper>
              <TechParticles3D />
            </Lazy3DWrapper>
          </Suspense>
          <Suspense fallback={null}>
            <Lazy3DWrapper>
              <GeometricGrid3D />
            </Lazy3DWrapper>
          </Suspense>
        </div>

        <div className="container-custom relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="max-w-3xl mx-auto lg:mx-0 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-6 backdrop-blur-md border border-white/5">
                  🚀 Technology That Works on the Ground
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="heading-1 text-white mb-6"
              >
                Transform Your Business with{" "}
                <span className="text-gradient-animated">WibraniumTech</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-300 mb-8 leading-relaxed text-3d"
              >
                Professional IT solutions delivering custom software, automation systems, websites, and digital platforms for schools, factories, and small-to-medium businesses.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Button asChild size="lg" className="btn-primary text-base h-12 px-8">
                  <Link to="/contact#send-message">
                    Get a Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 text-base border-white/30 text-white hover:bg-white/10 bg-transparent"
                >
                  <Link to="/services">Explore Services</Link>
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/10 justify-center lg:justify-start"
              >
                {[
                  { value: 80, label: "Projects Delivered", suffix: "+" },
                  { value: 60, label: "Happy Clients", suffix: "+" },
                  { value: 5, label: "Years Experience", suffix: "+" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-4xl font-bold text-gradient-animated mb-2">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2.5} />
                    </div>
                    <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: 3D Growth Graph */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="hidden lg:block relative"
            >
              {/* Background Glow for Graph */}
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
              <Suspense fallback={<div className="h-[400px]" />}>
                <Lazy3DWrapper>
                  <GrowthGraph3D />
                </Lazy3DWrapper>
              </Suspense>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-12 md:py-16 bg-secondary/30 relative overflow-hidden" id="who-we-are">
        <Suspense fallback={null}>
          <Lazy3DWrapper>
            <TechParticles3D />
          </Lazy3DWrapper>
        </Suspense>
        <div className="container-custom relative z-10">
          <SectionHeading
            badge="Who We Are"
            title={<>Technology That <span className="gradient-text">Works on the Ground</span></>}
            description=""
            className="mb-8 md:mb-10"
          />

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text Content - Lifted slightly */}
            <div className="-mt-8">
              <ScrollAnimation direction="up" delay={0.1}>
                <p className="text-lg text-muted-foreground mb-4 leading-normal">
                  WibraniumTech is a professional IT solutions company delivering custom software, automation systems, websites, and digital platforms for schools, factories, and small-to-medium businesses.
                </p>
              </ScrollAnimation>
              <ScrollAnimation direction="up" delay={0.2}>
                <p className="text-lg text-muted-foreground mb-4 leading-normal">
                  We specialize in practical, easy-to-use, and affordable solutions that replace manual processes, improve efficiency, and scale with your operations—without unnecessary complexity.
                </p>
              </ScrollAnimation>
              <ScrollAnimation direction="scale" delay={0.3}>
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  {[
                    { icon: ShoppingBag, name: "Retail & Inventory Businesses" },
                    { icon: Store, name: "Startups & Local Businesses" },
                    { icon: Factory, name: "Manufacturing & Industrial Units" },
                    { icon: School, name: "Schools & Educational Institutes" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:border-primary/50 transition-colors">
                      <div className="p-2 rounded-full bg-primary/10 text-primary">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-medium text-gray-300">{item.name}</span>
                    </div>
                  ))}
                </div>
              </ScrollAnimation>
            </div>

            {/* Right: 3D Laptop - Pushed down slightly */}
            <div className="relative h-[500px] flex items-center justify-center hidden lg:flex translate-y-28">
              {/* 3D Model matches text height better now */}
              <div className="absolute inset-0 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
              <Suspense fallback={<div className="h-[300px] w-full" />}>
                <Lazy3DWrapper>
                  <Laptop3D />
                </Lazy3DWrapper>
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="section-padding relative overflow-hidden">
        <Suspense fallback={null}>
          <Lazy3DWrapper>
            <GlowingOrbs3D />
          </Lazy3DWrapper>
        </Suspense>
        <div className="container-custom relative z-10">
          <SectionHeading
            badge="Our Values"
            title={<>How We Drive Your <span className="gradient-text">Business Forward</span></>}
            description=""
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card p-6 rounded-2xl border border-border hover-lift shadow-premium"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="section-padding bg-secondary/30 relative overflow-hidden">
        <Suspense fallback={null}>
          <Lazy3DWrapper>
            <GeometricGrid3D />
          </Lazy3DWrapper>
        </Suspense>
        <div className="container-custom relative z-10">
          <ScrollAnimation direction="up" delay={0}>
            <SectionHeading
              badge="Our Core Services"
              title={<>Smart Solutions for <span className="gradient-text">Business Growth</span></>}
              description="From concept to deployment, we offer end-to-end solutions tailored to your business needs."
            />
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {coreServices.map((service, index) => (
              <ServiceCard
                key={service.title}
                {...service}
                index={index}
                onClick={() => setSelectedService(service)}
              />
            ))}
          </div>

          <ScrollAnimation direction="scale" delay={0.3}>
            <div className="text-center">
              <Button asChild variant="outline" size="lg" className="ripple-effect hover:scale-105 transition-transform">
                <Link to="/services">
                  👉 Explore All Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </ScrollAnimation>
        </div>
      </section >

      {/* Industries We Serve */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeading
            badge="Industries We Serve"
            title={<>Built for <span className="gradient-text">Real Operations</span></>}
            description=""
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card p-6 rounded-xl border border-border text-center hover-lift"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <industry.icon className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm font-medium">{industry.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose WibraniumTech */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <SectionHeading
            badge="Why Choose WibraniumTech"
            title={<>Technology Without <span className="gradient-text">Confusion</span></>}
            description=""
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-card p-6 rounded-2xl border border-border hover-lift shadow-premium ${index % 2 === 0 ? 'float' : 'float-slow'}`}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <benefit.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Working Process */}
      <section className="section-padding relative overflow-hidden">
        <Suspense fallback={null}>
          <Lazy3DWrapper>
            <CircuitLines3D />
          </Lazy3DWrapper>
        </Suspense>
        <div className="container-custom relative z-10">
          <SectionHeading
            badge="Our Working Process"
            title={<>Clear, Structured & <span className="gradient-text">Reliable</span></>}
            description=""
          />
          <div className="grid md:grid-cols-5 gap-6">
            {workingProcess.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-card p-6 rounded-xl border-2 border-primary/20 hover-lift h-full">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mb-4">
                    {step.number}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                {index < workingProcess.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-6 w-6 text-primary" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies We Work With */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <SectionHeading
            badge="Technologies We Work With"
            title={<>Modern Tech <span className="gradient-text">Stack</span></>}
            description=""
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "🐍 Programming & Software Development", items: technologies.programming },
              { title: "🖥️ Desktop & System Applications", items: technologies.desktop },
              { title: "🏭 Industrial Automation & PLC", items: technologies.industrial },
              { title: "🌍 Web & Cloud Technologies", items: technologies.web },
              { title: "🗄️ Database & Data Management", items: technologies.database },
              { title: "🏷️ Barcode, QR & Printing", items: technologies.barcode },
            ].map((category, catIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: catIndex * 0.1 }}
                viewport={{ once: true }}
                className="bg-card p-6 rounded-xl border border-border"
              >
                <h3 className="font-semibold mb-4 text-base">{category.title}</h3>
                <ul className="space-y-2">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-hero-pattern text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="heading-2 mb-6">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's discuss your project and create a solution that drives your business forward.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="btn-primary h-12 px-8">
                <Link to="/portfolio">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 px-8 border-white/30 text-white hover:bg-white/10 bg-transparent"
              >
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Service Details Modal */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="sm:max-w-[600px] glass-card border-white/10 text-white p-0 overflow-hidden bg-black/80 backdrop-blur-xl">
          <div className="relative p-6">
            <DialogHeader>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-primary/20">
                  {selectedService && <selectedService.icon className="w-8 h-8 text-primary" />}
                </div>
                <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                  {selectedService?.title}
                </DialogTitle>
              </div>
              <DialogDescription className="text-gray-300 text-lg leading-relaxed">
                {selectedService?.details}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 space-y-4">
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Why Choose Us?
                </h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                    <span>Customized solution for your needs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                    <span>Expert support and maintenance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                    <span>Cost-effective implementation</span>
                  </li>
                </ul>
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  className="btn-primary w-full sm:w-auto group"
                  onClick={() => window.location.href = selectedService?.link || '/contact'}
                >
                  View Full Details
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
