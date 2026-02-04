import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionHeadingProps {
  badge?: string;
  title: string | ReactNode;
  description?: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionHeading({ 
  badge, 
  title, 
  description, 
  centered = true,
  light = false 
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`max-w-3xl ${centered ? "mx-auto text-center" : ""} mb-16`}
    >
      {badge && (
        <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4 ${
          light 
            ? "bg-white/10 text-white" 
            : "bg-primary/10 text-primary"
        }`}>
          {badge}
        </span>
      )}
      <h2 className={`heading-2 mb-4 ${light ? "text-white" : ""}`}>
        {title}
      </h2>
      {description && (
        <p className={`text-lg ${light ? "text-gray-300" : "text-muted-foreground"}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
