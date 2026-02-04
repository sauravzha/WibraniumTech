import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/SectionHeading";
import { ExternalLink } from "lucide-react";

const categories = ["All", "Websites", "Apps", "CRM", "SEO", "Video"];

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Websites",
    description: "A full-featured online store with payment integration and inventory management.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Fitness Tracking App",
    category: "Apps",
    description: "Cross-platform mobile app for fitness tracking with social features.",
    image: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Sales CRM Dashboard",
    category: "CRM",
    description: "Custom CRM solution with lead tracking, automation, and analytics.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    title: "Restaurant Website",
    category: "Websites",
    description: "Modern restaurant website with online ordering and reservation system.",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    title: "SEO Campaign - TechStartup",
    category: "SEO",
    description: "Comprehensive SEO strategy that increased organic traffic by 300%.",
    image: "https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?w=600&h=400&fit=crop",
  },
  {
    id: 6,
    title: "Corporate Brand Video",
    category: "Video",
    description: "Professional brand video showcasing company values and services.",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=400&fit=crop",
  },
  {
    id: 7,
    title: "Healthcare Mobile App",
    category: "Apps",
    description: "Patient management app with appointment booking and telemedicine features.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
  },
  {
    id: 8,
    title: "Real Estate Portal",
    category: "Websites",
    description: "Property listing website with advanced search and virtual tours.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
  },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

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
              Our Work
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="heading-1 mb-6"
            >
              Projects That{" "}
              <span className="gradient-text">Speak Results</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-300"
            >
              Explore our portfolio of successful projects across various industries.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl mb-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-wibranium-slate/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                      <ExternalLink className="h-5 w-5 text-primary-foreground" />
                    </div>
                  </div>
                </div>
                <span className="text-xs text-primary font-medium uppercase tracking-wider">
                  {project.category}
                </span>
                <h3 className="text-xl font-semibold mt-1 mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground">{project.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "50+", label: "Projects Completed" },
              { value: "30+", label: "Happy Clients" },
              { value: "5+", label: "Years Experience" },
              { value: "15+", label: "Team Members" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
