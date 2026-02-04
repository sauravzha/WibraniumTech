import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/SectionHeading";
import { IsometricTiles3D } from "@/components/IsometricTiles3D";
import {
  Globe,
  Smartphone,
  Users,
  GraduationCap,
  UserCog,
  Heart,
  Cpu,
  ChevronRight,
  Check,
  Code,
  Database,
  LineChart,
  Shield,
  Zap,
  Cloud,
  Activity,
  Settings
} from "lucide-react";

// Animated Counter Component
interface StatProps {
  value: number;
  suffix: string;
  label: string;
  icon: React.ElementType;
}

const CounterCard = ({ stat, index }: { stat: StatProps; index: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const start = 0;
      const end = stat.value;
      const duration = 2000;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        if (elapsedTime < duration) {
          const progress = elapsedTime / duration;
          // easeOutExpo for smooth ending
          const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          setCount(Math.floor(start + (end - start) * ease));
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, stat.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="text-center group"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 mb-4 border border-white/20 shadow-lg backdrop-blur-sm group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300"
      >
        <stat.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
      </motion.div>
      <div className="text-4xl md:text-5xl font-bold gradient-text mb-2 tabular-nums">
        {count}{stat.suffix}
      </div>
      <div className="text-gray-400 font-medium">{stat.label}</div>
    </motion.div>
  );
};

// Main project categories with detailed info
const mainProjects = [
  {
    id: "web",
    icon: Globe,
    emoji: "🌐",
    title: "Web Development",
    subtitle: "Modern & Scalable Websites",
    gradient: "from-blue-600 via-cyan-500 to-teal-400",
    bgGlow: "rgba(6, 182, 212, 0.15)",
    iconColor: "#06b6d4",
    techIcons: [Code, Database, Shield],
    features: [
      "Modern, responsive, and scalable websites for businesses and enterprises",
      "Clean UI/UX, strong security, and SEO-friendly architecture",
      "From corporate websites to custom web applications",
      "Tailored to match business goals and brand identity"
    ],
  },
  {
    id: "app",
    icon: Smartphone,
    emoji: "📱",
    title: "App Development",
    subtitle: "Android & Cross-Platform Apps",
    gradient: "from-purple-600 via-violet-500 to-pink-400",
    bgGlow: "rgba(168, 85, 247, 0.15)",
    iconColor: "#a855f7",
    techIcons: [Smartphone, Cloud, Zap],
    features: [
      "High-quality Android and cross-platform mobile applications",
      "Smooth user experience and long-term scalability",
      "Integrated with secure backend systems, APIs, and cloud services",
      "Ideal for business operations, institutions, and customer engagement"
    ],
  },
  {
    id: "crm",
    icon: Users,
    emoji: "🧩",
    title: "CRM – Customer Relationship Management",
    subtitle: "Smart Lead & Customer Management",
    gradient: "from-green-600 via-emerald-500 to-teal-400",
    bgGlow: "rgba(16, 185, 129, 0.15)",
    iconColor: "#10b981",
    techIcons: [Users, LineChart, Database],
    features: [
      "Powerful and customized CRM platform for managing leads and customers",
      "Centralizes sales data, tracks pipelines, and provides real-time dashboards",
      "Improves visibility, accountability, and team productivity",
      "Helps businesses make smarter, data-driven decisions"
    ],
  },
  {
    id: "sms",
    icon: GraduationCap,
    emoji: "🏫",
    title: "SMS – School Management System",
    subtitle: "Complete School Operations Solution",
    gradient: "from-orange-500 via-amber-500 to-yellow-400",
    bgGlow: "rgba(245, 158, 11, 0.15)",
    iconColor: "#f59e0b",
    techIcons: [GraduationCap, Database, Settings],
    features: [
      "Complete digital solution for managing school operations efficiently",
      "Covers student records, attendance, exams, fees, and communication",
      "Reduces manual work and improves transparency",
      "Designed for schools, colleges, and educational institutions"
    ],
  },
  {
    id: "hrm",
    icon: UserCog,
    emoji: "👥",
    title: "HRM – Human Resources Management",
    subtitle: "Automated HR & Payroll System",
    gradient: "from-red-500 via-rose-500 to-pink-400",
    bgGlow: "rgba(244, 63, 94, 0.15)",
    iconColor: "#f43f5e",
    techIcons: [UserCog, LineChart, Shield],
    features: [
      "Automated HRM system to manage the entire employee lifecycle",
      "Handles attendance, payroll, leave management, and performance tracking",
      "Reduces administrative effort and improves HR efficiency",
      "Suitable for small, medium, and large organizations"
    ],
  },
];

// Special/Startup Products
const startupProducts = [
  {
    id: "gyod",
    icon: Heart,
    emoji: "💻",
    title: "GYOD",
    fullTitle: "Smart Patient Health Monitoring Device",
    badge: "Medical Startup Product",
    gradient: "from-pink-500 via-rose-500 to-red-500",
    bgGlow: "rgba(236, 72, 153, 0.2)",
    iconColor: "#ec4899",
    techIcons: [Heart, Activity, Cloud],
    features: [
      "IoT-based medical device for continuous patient health monitoring",
      "Measures vital parameters such as BP, heart rate, ECG, and pulse",
      "Sends real-time health data securely to the cloud",
      "Enables remote monitoring, early risk detection, and better clinical decisions"
    ],
  },
  {
    id: "mac",
    icon: Cpu,
    emoji: "🤖",
    title: "MAC",
    fullTitle: "Machine Automation Computer",
    badge: "Industrial Intelligence Platform",
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    bgGlow: "rgba(6, 182, 212, 0.2)",
    iconColor: "#06b6d4",
    techIcons: [Cpu, Settings, LineChart],
    features: [
      "Industrial production monitoring and automation intelligence platform",
      "Connects shop-floor machines, PLCs, and sensors into a unified system",
      "Provides real-time KPIs, historical data, and production insights",
      "Helps factories move from manual reporting to data-driven operations"
    ],
  },
];

export default function Portfolio() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding bg-hero-pattern text-white relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-6 backdrop-blur-md border border-white/5"
            >
              Our Projects
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="heading-1 mb-6"
            >
              Solutions That{" "}
              <span className="gradient-text">Drive Success</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-300"
            >
              From web applications to industrial automation – explore our innovative
              solutions designed to transform businesses and industries.
            </motion.p>

            {/* 3D Isometric Tiles */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mt-12 relative z-0 h-[300px]"
            >
              <IsometricTiles3D />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Projects Section */}
      <section className="section-padding relative">
        {/* Background grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="container-custom relative z-10">
          <SectionHeading
            title="Core Solutions"
            subtitle="Enterprise-grade products built for real-world business challenges"
          />

          <div className="space-y-8 mt-12">
            {mainProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="group"
              >
                <div
                  className="relative overflow-hidden rounded-3xl border border-white/10"
                  style={{ background: `linear-gradient(135deg, ${project.bgGlow}, transparent 60%)` }}
                >
                  {/* Gradient border effect */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

                  <div className="relative p-8 md:p-10">
                    <div className="grid lg:grid-cols-2 gap-10 items-center">

                      {/* Visual Side - Icon Display */}
                      <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                        <div className="relative">
                          {/* Main icon container */}
                          <motion.div
                            className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
                            style={{ background: `linear-gradient(135deg, ${project.bgGlow}, rgba(15, 23, 42, 0.8))` }}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                          >
                            {/* Floating tech icons */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <motion.div
                                animate={{
                                  y: [-5, 5, -5],
                                  rotateY: [0, 5, 0, -5, 0]
                                }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="relative"
                              >
                                {/* Central large icon */}
                                <div
                                  className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${project.gradient} flex items-center justify-center shadow-2xl`}
                                  style={{ boxShadow: `0 20px 60px ${project.bgGlow}` }}
                                >
                                  <project.icon className="w-16 h-16 text-white" />
                                </div>

                                {/* Orbiting smaller icons */}
                                {project.techIcons.map((TechIcon, i) => (
                                  <motion.div
                                    key={i}
                                    className="absolute w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20"
                                    style={{
                                      top: i === 0 ? '-20px' : i === 1 ? '50%' : 'auto',
                                      bottom: i === 2 ? '-20px' : 'auto',
                                      left: i === 0 ? '50%' : i === 1 ? '-30px' : 'auto',
                                      right: i === 2 ? '-30px' : i === 1 ? 'auto' : 'auto',
                                      transform: i === 0 ? 'translateX(-50%)' : i === 1 ? 'translateY(-50%)' : 'none',
                                    }}
                                    animate={{
                                      y: [0, -8, 0],
                                      scale: [1, 1.1, 1],
                                    }}
                                    transition={{
                                      duration: 3,
                                      delay: i * 0.5,
                                      repeat: Infinity,
                                      ease: "easeInOut"
                                    }}
                                  >
                                    <TechIcon className="w-5 h-5" style={{ color: project.iconColor }} />
                                  </motion.div>
                                ))}
                              </motion.div>
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute top-4 right-4 w-20 h-20 border border-white/10 rounded-full" />
                            <div className="absolute bottom-4 left-4 w-16 h-16 border border-white/10 rounded-full" />

                            {/* Glowing dots */}
                            <motion.div
                              className="absolute top-8 left-8 w-2 h-2 rounded-full"
                              style={{ background: project.iconColor }}
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                            <motion.div
                              className="absolute bottom-8 right-8 w-3 h-3 rounded-full"
                              style={{ background: project.iconColor }}
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
                            />
                          </motion.div>
                        </div>
                      </div>

                      {/* Content Side */}
                      <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                        <div className="flex items-center gap-4 mb-6">
                          <span className="text-5xl">{project.emoji}</span>
                          <div>
                            <h3 className="text-2xl md:text-3xl font-bold">{project.title}</h3>
                            <p className="text-muted-foreground text-lg">{project.subtitle}</p>
                          </div>
                        </div>

                        <ul className="space-y-4 mt-8">
                          {project.features.map((feature, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + i * 0.1 }}
                              viewport={{ once: true }}
                              className="flex items-start gap-4"
                            >
                              <div
                                className={`w-6 h-6 rounded-full bg-gradient-to-r ${project.gradient} flex items-center justify-center flex-shrink-0 mt-0.5`}
                                style={{ boxShadow: `0 0 15px ${project.bgGlow}` }}
                              >
                                <Check className="w-3.5 h-3.5 text-white" />
                              </div>
                              <span className="text-gray-300 text-lg">{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Startup Products Section */}
      <section className="section-padding bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <SectionHeading
            title="Innovation & R&D"
            subtitle="Cutting-edge products developed through our research and startup initiatives"
          />

          <div className="grid md:grid-cols-2 gap-10 mt-12">
            {startupProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="group"
              >
                <div
                  className="relative h-full overflow-hidden rounded-3xl border border-white/10"
                  style={{ background: `linear-gradient(180deg, ${product.bgGlow}, transparent 60%)` }}
                >
                  {/* Gradient hover effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                  <div className="relative p-8">
                    {/* Badge */}
                    <div className="mb-6">
                      <span className={`inline-flex px-4 py-2 rounded-full bg-gradient-to-r ${product.gradient} text-white text-xs font-bold uppercase tracking-wider`}>
                        {product.badge}
                      </span>
                    </div>

                    {/* Icon Display */}
                    <div className="relative mb-8">
                      <motion.div
                        className="w-full aspect-video rounded-2xl overflow-hidden flex items-center justify-center"
                        style={{ background: `linear-gradient(135deg, ${product.bgGlow}, rgba(15, 23, 42, 0.9))` }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <motion.div
                          animate={{
                            y: [-3, 3, -3],
                            scale: [1, 1.02, 1]
                          }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                          className="relative"
                        >
                          <div
                            className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${product.gradient} flex items-center justify-center`}
                            style={{ boxShadow: `0 15px 40px ${product.bgGlow}` }}
                          >
                            <product.icon className="w-12 h-12 text-white" />
                          </div>

                          {/* Tech icons around */}
                          {product.techIcons.map((TechIcon, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20"
                              style={{
                                top: i === 0 ? '-15px' : 'auto',
                                bottom: i === 2 ? '-15px' : 'auto',
                                left: i === 1 ? '-25px' : i === 0 ? '60%' : 'auto',
                                right: i === 2 ? '-25px' : 'auto',
                              }}
                              animate={{ y: [0, -5, 0] }}
                              transition={{ duration: 2.5, delay: i * 0.3, repeat: Infinity }}
                            >
                              <TechIcon className="w-4 h-4" style={{ color: product.iconColor }} />
                            </motion.div>
                          ))}
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Title */}
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-4xl">{product.emoji}</span>
                        <h3 className="text-2xl font-bold">{product.title}</h3>
                      </div>
                      <p className="text-muted-foreground text-lg">{product.fullTitle}</p>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3">
                      {product.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <ChevronRight className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: product.iconColor }} />
                          <span className="text-gray-400">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section with Animated Counter */}
      <section className="py-20 bg-hero-pattern text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2" />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 50, suffix: "+", label: "Projects Completed", icon: Check },
              { value: 30, suffix: "+", label: "Happy Clients", icon: Users },
              { value: 5, suffix: "+", label: "Years Experience", icon: Zap },
              { value: 7, suffix: "", label: "Core Products", icon: Cpu },
            ].map((stat, index) => (
              <CounterCard key={stat.label} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/20 via-blue-500/20 to-purple-500/20 border border-white/10 p-12 text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-500/5" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Build Your Next Project?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Let's discuss how our solutions can help transform your business operations
                and drive growth.
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-primary to-blue-600 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-primary/30 transition-shadow"
              >
                Get Started
                <ChevronRight className="w-6 h-6" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
