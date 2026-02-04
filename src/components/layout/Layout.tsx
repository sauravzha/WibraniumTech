import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { LiveChatWidget } from "@/components/LiveChatWidget";

interface LayoutProps {
  children: ReactNode;
}

import { motion } from "framer-motion";

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex-1 pt-20"
      >
        {children}
      </motion.main>
      <Footer />
      <WhatsAppButton />
      <LiveChatWidget />
    </div>
  );
}
