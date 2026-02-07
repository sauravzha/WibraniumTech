import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/SectionHeading";
import { Target, Eye, Lightbulb, Heart, Award, Users } from "lucide-react";
import logo from "@/assets/logo.png";
import { Smartphone3D } from "@/components/Smartphone3D";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We embrace new technologies and creative approaches to solve complex problems.",
  },
  {
    icon: Heart,
    title: "Trust",
    description: "Building lasting relationships through transparency and reliability.",
  },
  {
    icon: Award,
    title: "Performance",
    description: "Delivering high-quality solutions that exceed expectations.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Working closely with clients to understand and achieve their goals.",
  },
];

const timeline = [
  {
    year: "2022",
    title: "Foundation",
    description: "WibraniumTech was founded with a vision to empower businesses through technology.",
  },
  {
    year: "2023",
    title: "Expansion",
    description: "Expanded our services to include mobile app development and CRM solutions.",
  },
  {
    year: "2024",
    title: "Growth",
    description: "Crossed 25+ successful projects and established partnerships with key clients.",
  },
  {
    year: "2025",
    title: "Innovation",
    description: "Launched AI-powered solutions and advanced analytics services.",
  },
  {
    year: "2026",
    title: "Today",
    description: "Continuing to grow and deliver exceptional digital solutions globally.",
  },
];

export default function About() {
  return (
    <Layout>
      {/* Hero Section with 3D Phone */}
      <section className="section-padding bg-hero-pattern text-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="max-w-xl">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-6"
              >
                About Us
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="heading-1 mb-6"
              >
                Building the Future of{" "}
                <span className="gradient-text">Digital Innovation</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-300"
              >
                We're a passionate team of developers, designers, and strategists
                committed to transforming businesses through technology.
              </motion.p>
            </div>

            {/* 3D Smartphone */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="hidden lg:block"
            >
              <Smartphone3D />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 bg-card rounded-2xl border border-border hover-lift"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Eye className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be the leading technology partner for businesses worldwide,
                enabling digital transformation and sustainable growth through
                innovative solutions that make a real difference. Our vision is to shape the future of digital innovation by becoming a globally trusted technology partner. We aspire to empower businesses through intelligent systems, automation, and data-driven solutions. By embracing emerging technologies, we aim to build scalable and sustainable digital ecosystems. Our focus is on creating meaningful impact that goes beyond software. We envision technology as a catalyst for long-term business transformation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 bg-card rounded-2xl border border-border hover-lift"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Target className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To deliver exceptional digital solutions that empower businesses
                to achieve their goals. We combine technical excellence with
                strategic thinking to create impactful results. Our mission is to deliver world-class digital solutions that solve complex business challenges with clarity and precision. We combine deep technical expertise with strategic thinking to build reliable and future-ready systems. Through innovation, quality, and performance, we help organizations achieve operational excellence. We are committed to long-term partnerships built on trust and transparency. Our goal is to turn vision into measurable digital success.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Logo Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container-custom">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative w-32 h-32 mb-6"
            >
              {/* Spinning circular rings */}
              {/* Outer ring - solid cyan */}
              <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-cyan-400 border-r-cyan-400/50 logo-spin-slow"
                style={{ filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.6))' }}></div>

              {/* Middle ring - primary blue */}
              <div className="absolute inset-[3px] rounded-full border-[3px] border-transparent border-t-primary border-r-primary/60 logo-spin-continuous"
                style={{ filter: 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.6))' }}></div>

              {/* Inner ring - fast spin */}
              <div className="absolute inset-[6px] rounded-full border-2 border-transparent border-t-primary/80 logo-spin-fast"></div>

              {/* Pulsing glow effect */}
              <div className="absolute inset-[-2px] rounded-full opacity-50 blur-md bg-gradient-to-r from-cyan-400/50 to-purple-500/50 animate-pulse"></div>

              {/* Static logo in center */}
              <img
                src={logo}
                alt="WibraniumTech"
                className="relative w-full h-full object-contain p-2 z-10"
              />
            </motion.div>
            <h2 className="text-3xl font-bold mb-2">
              Wibranium<span className="text-primary">Tech</span>
            </h2>
            <p className="text-muted-foreground">
              Building Smart Digital Solutions for Growing Businesses
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeading
            badge="Our Journey"
            title="The Story Behind WibraniumTech"
            description="From a small team with big dreams to a trusted technology partner."
          />

          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative pl-8 pb-12 last:pb-0 border-l-2 border-primary/20"
              >
                <div className="absolute left-0 top-0 w-4 h-4 -translate-x-1/2 rounded-full bg-primary" />
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-2">
                  {item.year}
                </span>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-secondary/30">
        <div className="container-custom">
          <SectionHeading
            title="Our Core Values"
            subtitle="Principles that guide everything we do"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card p-6 rounded-xl border border-border hover-lift text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </Layout>
  );
}
