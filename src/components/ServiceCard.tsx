import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card3DTilt } from "./3DElements";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
  index?: number;
  onClick?: () => void;
}

export function ServiceCard({ icon: Icon, title, description, link, index = 0, onClick }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true }}
      className="group relative h-full perspective-card"
    >
      <Card3DTilt className="h-full">
        {/* Render as div if onClick is present (for modal), otherwise as Link */}
        {onClick ? (
          <div
            onClick={onClick}
            className="block h-full relative overflow-hidden rounded-3xl cursor-pointer"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <CardContent Icon={Icon} title={title} description={description} />
          </div>
        ) : (
          <Link
            to={link}
            className="block h-full relative overflow-hidden rounded-3xl"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <CardContent Icon={Icon} title={title} description={description} />
          </Link>
        )}
      </Card3DTilt>
    </motion.div>
  );
}

// Extraction of inner content to avoid duplication
function CardContent({ Icon, title, description }: { Icon: any, title: string, description: string }) {
  return (
    <>
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-card via-card to-card/50 group-hover:from-primary/5 group-hover:via-card group-hover:to-primary/10 transition-all duration-500"></div>

      {/* Animated Border Gradient */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.5), rgba(124, 58, 237, 0.5), rgba(6, 182, 212, 0.5))',
          backgroundSize: '200% 200%',
          animation: 'gradient-shift 3s ease infinite',
          padding: '2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}></div>

      {/* Content Container */}
      <div className="relative p-8 h-full flex flex-col border border-border rounded-3xl backdrop-blur-sm" style={{ transformStyle: 'preserve-3d' }}>
        {/* Icon Container with Glow */}
        <div className="relative mb-6 transform-gpu transition-transform duration-300" style={{ transform: 'translateZ(40px)' }}>
          <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl group-hover:blur-2xl group-hover:bg-primary/40 transition-all duration-500"></div>
          <div
            className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:from-primary group-hover:to-primary/80 transition-all duration-500 border border-primary/20"
          >
            <Icon className="h-8 w-8 text-primary group-hover:text-white transition-colors duration-500" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300 transform-gpu" style={{ transform: 'translateZ(30px)' }}>
          {title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed mb-6 flex-grow transform-gpu" style={{ transform: 'translateZ(20px)' }}>
          {description}
        </p>

        {/* Learn More Link */}
        <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0" style={{ transform: 'translateZ(20px)' }}>
          <span className="text-sm font-semibold">Learn More</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ transform: 'translateZ(10px)' }}>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full float-smooth"
              style={{
                top: `${20 + i * 30}%`,
                left: `${10 + i * 25}%`,
                animationDelay: `${i * 0.5}s`,
                boxShadow: '0 0 10px rgba(6, 182, 212, 0.8)',
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Corner Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ transform: 'translateZ(0px)' }}></div>
    </>
  );
}
