import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";


const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Contact", path: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "glass-dark shadow-premium backdrop-blur-xl border-b border-white/10"
        : "bg-transparent"
        }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-110">
              {/* Multiple spinning rings with different speeds and effects */}
              {/* Outer ring - gradient, slow spin */}
              <div className="absolute inset-0 rounded-full border-4 border-transparent logo-spin-slow"
                style={{
                  borderImage: 'linear-gradient(135deg, hsl(190, 100%, 50%), hsl(260, 100%, 65%), transparent, transparent) 1',
                  filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.6))'
                }}></div>

              {/* Middle ring - solid color, medium spin */}
              <div className="absolute inset-[3px] rounded-full border-[3px] border-transparent border-t-primary border-r-primary/60 logo-spin-continuous"
                style={{ filter: 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.6))' }}></div>

              {/* Inner ring - bright accent, fast spin */}
              <div className="absolute inset-[6px] rounded-full border-2 border-transparent border-t-primary/80 logo-spin-fast"
                style={{ filter: 'blur(0.5px)' }}></div>

              {/* Pulsing glow effect */}
              <div className="absolute inset-[-2px] rounded-full opacity-50 blur-md bg-gradient-to-r from-cyan-400/50 to-purple-500/50 animate-pulse"></div>

              {/* Static logo in center */}
              <img
                src={logo}
                alt="WibraniumTech"
                className="relative w-full h-full object-contain p-1 z-10"
              />
            </div>
            <span className="font-bold text-xl hidden sm:block transition-colors duration-300 group-hover:text-primary">
              Wibranium<span className="text-primary">Tech</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-all duration-300 hover:text-primary relative group ${location.pathname === link.path
                  ? "text-primary"
                  : "text-muted-foreground"
                  }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Button asChild variant="default" className="btn-primary ripple-effect relative overflow-hidden group">
              <Link to="/contact">
                <span className="relative z-10">Get a Quote</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border"
          >
            <div className="container-custom py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block py-2 text-base font-medium transition-colors ${location.pathname === link.path
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
              <Button asChild className="w-full btn-primary ripple-effect">
                <Link to="/contact">Get a Quote</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
