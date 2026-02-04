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
    year: "2019",
    title: "Foundation",
    description: "WibraniumTech was founded with a vision to empower businesses through technology.",
  },
  {
    year: "2020",
    title: "Expansion",
    description: "Expanded our services to include mobile app development and CRM solutions.",
  },
  {
    year: "2021",
    title: "Growth",
    description: "Crossed 25+ successful projects and established partnerships with key clients.",
  },
  {
    year: "2023",
    title: "Innovation",
    description: "Launched AI-powered solutions and advanced analytics services.",
  },
  {
    year: "2024",
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
                innovative solutions that make a real difference.
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
                strategic thinking to create impactful results.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Logo Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container-custom">
          <div className="flex flex-col items-center text-center">
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              src={logo}
              alt="WibraniumTech"
              className="h-32 w-auto mb-6"
            />
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

      {/* Leadership Team */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeading
            title="Our Leadership"
            subtitle="Meet the visionaries behind WibraniumTech"
          />
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl overflow-hidden border border-border hover-lift"
            >
              <div className="bg-gradient-to-br from-primary/20 to-secondary h-48 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-primary/10 backdrop-blur-sm flex items-center justify-center border-4 border-white/20">
                  <Users className="h-16 w-16 text-primary" />
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold mb-1">Nirbhik Pratap Singh</h3>
                <p className="text-primary font-medium mb-3">Director</p>
                <p className="text-muted-foreground">
                  Leading WibraniumTech with a vision to transform businesses through innovative digital solutions and cutting-edge technology.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl overflow-hidden border border-border hover-lift"
            >
              <div className="bg-gradient-to-br from-secondary to-primary/20 h-48 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-primary/10 backdrop-blur-sm flex items-center justify-center border-4 border-white/20">
                  <Users className="h-16 w-16 text-primary" />
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold mb-1">Puneet Chandila</h3>
                <p className="text-primary font-medium mb-3">Co-Founder</p>
                <p className="text-muted-foreground">
                  Driving growth and innovation at WibraniumTech, ensuring excellence in every project and fostering client success.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section Placeholder */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeading
            badge="Our Team"
            title="Meet the Experts Behind WibraniumTech"
            description="Our talented team brings together diverse skills and experiences to deliver exceptional results."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { name: "Founder", role: "CEO & Lead Developer" },
              { name: "Co-Founder", role: "CTO & Solutions Architect" },
              { name: "Team Lead", role: "Project Manager" },
            ].map((member, index) => (
              <motion.div
                key={member.role}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-card rounded-2xl border border-border"
              >
                <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
