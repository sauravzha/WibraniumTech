import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import logo from "@/assets/logo.png";

const footerLinks = {
  services: [
    { name: "Website Development", path: "/services#web" },
    { name: "Custom Software", path: "/services#software" },
    { name: "School Management", path: "/services#school" },
    { name: "Industrial Automation", path: "/services#plc" },
    { name: "Barcode Solutions", path: "/services#barcode" },
  ],
  company: [
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "GYOD", path: "/gyod" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Contact", path: "/contact" },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="bg-wibranium-slate text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <ScrollAnimation direction="up" delay={0}>
            <div className="space-y-6">
              <Link to="/" className="flex items-center gap-3 group">
                <img src={logo} alt="WibraniumTech" className="h-12 w-auto transition-transform duration-300 group-hover:scale-110" />
                <span className="font-bold text-xl transition-colors duration-300 group-hover:text-primary">
                  Wibranium<span className="text-primary">Tech</span>
                </span>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed text-balance">
                We deliver enterprise-grade digital solutions built for scale, security, and performance, helping organizations transform complex challenges into intelligent, reliable digital systems.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, backgroundColor: "hsl(207, 90%, 54%)" }}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-colors"
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </ScrollAnimation>

          {/* Services */}
          <ScrollAnimation direction="up" delay={0.1}>
            <div>
              <h3 className="font-semibold text-lg mb-6">Services</h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-primary transition-all duration-300 text-sm hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollAnimation>

          {/* Company */}
          <ScrollAnimation direction="up" delay={0.2}>
            <div>
              <h3 className="font-semibold text-lg mb-6">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-primary transition-all duration-300 text-sm hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollAnimation>

          {/* Contact */}
          <ScrollAnimation direction="up" delay={0.3}>
            <div>
              <h3 className="font-semibold text-lg mb-6">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 group">
                  <Mail className="h-5 w-5 text-primary mt-0.5 transition-transform duration-300 group-hover:scale-110" />
                  <a href="mailto:info@wibraniumtech.com" className="text-gray-400 hover:text-primary transition-colors text-sm">
                    info@wibraniumtech.com
                  </a>
                </li>
                <li className="flex items-start gap-3 group">
                  <Phone className="h-5 w-5 text-primary mt-0.5 transition-transform duration-300 group-hover:scale-110" />
                  <a href="tel:+918920617274" className="text-gray-400 hover:text-primary transition-colors text-sm">
                    +91 89206 17274
                  </a>
                </li>
                <li className="flex items-start gap-3 group">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-gray-400 text-sm">
                    New Delhi, India
                  </span>
                </li>
              </ul>
            </div>
          </ScrollAnimation>
        </div>

        {/* Bottom Bar */}
        <ScrollAnimation direction="up" delay={0.4}>
          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2022 – WibraniumTech. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-gray-400 hover:text-primary text-sm transition-all duration-300 hover:translate-y-[-2px]">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-primary text-sm transition-all duration-300 hover:translate-y-[-2px]">
                Terms of Service
              </Link>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </footer>
  );
}
