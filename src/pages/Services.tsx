import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Smartphone,
  Search,
  Video,
  Database,
  ArrowRight,
  Check,
  Code,
  Palette,
  Rocket,
  BarChart3,
  Users,
  MessageSquare,
  Monitor,
  GraduationCap,
  Layers,
  Factory,
  QrCode,
  Printer,
  Mail,
  Paintbrush,
  Server,
  Wrench,
  Zap,
  Lightbulb
} from "lucide-react";

const services = [
  {
    id: "web",
    icon: Globe,
    title: "Website Development",
    description: "We design fast, secure, and professional websites that build trust and grow your business.",
    features: [
      "Static Website",
      "Dynamic Website",
      "Business Website",
      "E-commerce Website",
      "School / Institute Website",
      "Custom Website (as per client requirement)",
    ],
    benefits: ["Mobile-friendly & SEO-ready", "Professional design", "Easy to manage", "Affordable pricing"],
  },
  {
    id: "software",
    icon: Code,
    title: "Custom Software Development",
    description: "We develop custom desktop and utility software tailored exactly to your business workflow.",
    features: [
      "Windows-based Desktop Software",
      "Python-based Custom Software",
      "Data Entry & Validation Systems",
      "Reporting & Log Management Tools",
      "Hardware-Integrated Software",
    ],
    benefits: ["Reduced manual work", "Higher accuracy", "Faster operations", "Scalable for future growth"],
  },
  {
    id: "school",
    icon: GraduationCap,
    title: "School Management Software",
    description: "Affordable and easy-to-use School Management Software specially designed for low-budget private schools.",
    features: [
      "Student Admission & Records",
      "Fee Management",
      "Attendance Tracking",
      "Exam & Result Management",
      "Basic Reports & Analytics",
    ],
    benefits: ["Simple interface", "Low training required", "Customizable as per school needs", "Cost-effective solution"],
  },
  {
    id: "app",
    icon: Smartphone,
    title: "Mobile App Development",
    description: "We build performance-focused Android apps for businesses and institutions.",
    features: [
      "Android App Development",
      "Business Applications",
      "School / ERP Apps",
      "Custom Mobile Applications",
    ],
    benefits: ["Intuitive UX", "High performance", "Secure", "Regular updates"],
  },
  {
    id: "webapp",
    icon: Monitor,
    title: "Web Applications & Dashboards",
    description: "Secure and scalable web applications for real-time access and control.",
    features: [
      "Admin Panels",
      "Client Dashboards",
      "Login & Role-Based Systems",
      "Cloud-based Web Applications",
    ],
    benefits: ["Real-time data", "Secure access", "Scalable architecture", "User-friendly interface"],
  },
  {
    id: "plc",
    icon: Factory,
    title: "Industrial Automation & PLC Support",
    description: "We provide PLC and machine-level software support for manufacturing units.",
    features: [
      "PLC to PC Communication",
      "Serial / COM Port Data Handling",
      "Machine Error Code Mapping",
      "Status Monitoring Dashboards",
      "Production Utility Software",
    ],
    benefits: ["Small & Medium Manufacturing Units", "Assembly & Packaging Lines", "Semi-Automatic Machines"],
  },
  {
    id: "barcode",
    icon: QrCode,
    title: "Barcode & QR Code Solutions",
    description: "Complete barcode and QR code systems for tracking and traceability.",
    features: [
      "Barcode & QR Code Generation",
      "Custom Label Size & Layout Design",
      "Font Size & Position Customization",
      "Integration with Thermal / TSC Printers",
    ],
    benefits: ["Product Labeling", "Inventory Tracking", "Warehouse Management"],
  },
  {
    id: "printing",
    icon: Printer,
    title: "Label Printing Automation",
    description: "We automate label printing to eliminate manual errors and save production time.",
    features: [
      "Excel / Database-Driven Printing",
      "Auto-Print on Scan or Input",
      "Multiple Label Formats",
      "High-Speed Accurate Printing",
    ],
    benefits: ["Zero manual mistakes", "Faster production", "Consistent print quality"],
  },
  {
    id: "marketing",
    icon: BarChart3,
    title: "Digital Marketing Services",
    description: "We help businesses grow online and generate more leads.",
    features: [
      "Google Ads",
      "Facebook / Instagram Ads",
      "SEO (Search Engine Optimization)",
      "Local Business Promotion",
      "WhatsApp Marketing",
    ],
    benefits: ["Increased visibility", "More leads", "Better ROI", "Targeted campaigns"],
  },
  {
    id: "design",
    icon: Paintbrush,
    title: "Graphic Designing",
    description: "Professional designs to strengthen your brand identity.",
    features: [
      "Logo Design",
      "Banner & Poster Design",
      "Visiting Card Design",
      "Social Media Creatives",
    ],
    benefits: ["Professional quality", "Brand consistency", "Fast turnaround", "Affordable pricing"],
  },
  {
    id: "hosting",
    icon: Server,
    title: "Domain & Hosting Services",
    description: "Reliable hosting and domain solutions under one roof.",
    features: [
      "Domain Registration",
      "Web Hosting",
      "Server Setup",
      "Email Hosting",
    ],
    benefits: ["99.9% uptime", "24/7 support", "Scalable plans", "Secure infrastructure"],
  },
  {
    id: "maintenance",
    icon: Wrench,
    title: "Maintenance & Technical Support",
    description: "Long-term support to keep your systems running smoothly.",
    features: [
      "Website Maintenance",
      "Software AMC",
      "Bug Fixing",
      "Data Backup",
      "Technical Support",
    ],
    benefits: ["Continuous monitoring", "Quick resolution", "Preventive maintenance", "Data security"],
  },
  {
    id: "integration",
    icon: Zap,
    title: "Automation & Integration",
    description: "Smart integrations to connect systems and reduce human effort.",
    features: [
      "API Integration",
      "Payment Gateway Integration",
      "SMS / WhatsApp Integration",
      "Barcode / QR Code Automation",
    ],
    benefits: ["Seamless connectivity", "Reduced manual work", "Improved efficiency", "Scalable solutions"],
  },
  {
    id: "consultancy",
    icon: Lightbulb,
    title: "IT Consultancy",
    description: "Practical IT guidance for businesses that need working solutions, not complex systems.",
    features: [
      "Business IT Planning",
      "Software Architecture & Planning",
      "System Upgrade Consultation",
      "Deployment & Staff Training",
    ],
    benefits: ["Expert guidance", "Cost-effective solutions", "Strategic planning", "Knowledge transfer"],
  },
];

export default function Services() {
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
              Our Services
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="heading-1 mb-6"
            >
              Complete IT, Software, Automation & {" "}
              <span className="gradient-text">Digital Solutions</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-300"
            >
              WibraniumTech provides end-to-end IT, Software, Automation, and Digital Services designed specially for schools, factories, and small-to-medium businesses.
              Our focus is on simple, reliable, and cost-effective solutions that work smoothly at the ground level.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Detail Sections */}
      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`section-padding ${index % 2 === 1 ? "bg-secondary/30" : ""}`}
        >
          <div className="container-custom">
            <div className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? "lg:grid-flow-dense" : ""}`}>
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={index % 2 === 1 ? "lg:col-start-2" : ""}
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <h2 className="heading-3 mb-4">{service.title}</h2>
                <p className="text-muted-foreground text-lg mb-6">{service.description}</p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Services Included / What We Offer:</h4>
                  <div className="grid gap-2">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button asChild className="btn-primary">
                  <Link to="/contact">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={index % 2 === 1 ? "lg:col-start-1" : ""}
              >
                {/* Benefits Card */}
                <div className="bg-card rounded-2xl border border-border p-8">
                  <h4 className="font-semibold mb-4">Key Benefits / Applications:</h4>
                  <div className="grid gap-3">
                    {service.benefits.map((benefit) => (
                      <div
                        key={benefit}
                        className="flex items-center gap-3 p-3 bg-secondary rounded-lg"
                      >
                        <Check className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-sm font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="section-padding bg-hero-pattern text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="heading-2 mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Get in touch with us to discuss your requirements and receive a customized quote.
            </p>
            <Button asChild size="lg" className="btn-primary h-12 px-8">
              <Link to="/contact">
                Contact Us Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
