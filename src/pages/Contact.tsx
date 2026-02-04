import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useRecaptcha } from "@/lib/captcha";
import { events } from "@/lib/analytics";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    value: "info@wibraniumtech.com",
    href: "mailto:info@wibraniumtech.com",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+91 89206 17274",
    href: "tel:+918920617274",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    value: "New Delhi, India",
    href: "#",
  },
  {
    icon: Clock,
    title: "Office Hours",
    value: "Mon-Fri: 9:00 AM - 6:00 PM",
    href: "#",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { execute: executeRecaptcha, isLoaded: recaptchaLoaded } = useRecaptcha();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in all required fields");
      events.contactFormError("Missing required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      events.contactFormError("Invalid email format");
      return;
    }

    // Validate lengths
    if (formData.name.length > 100) {
      toast.error("Name must be less than 100 characters");
      return;
    }
    if (formData.email.length > 255) {
      toast.error("Email must be less than 255 characters");
      return;
    }
    if (formData.message.length > 1000) {
      toast.error("Message must be less than 1000 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      // Execute reCAPTCHA
      let recaptchaToken = '';
      if (recaptchaLoaded) {
        try {
          recaptchaToken = await executeRecaptcha('contact_form');
        } catch (error) {
          console.warn('reCAPTCHA failed, continuing without token:', error);
        }
      }

      const { error } = await supabase
        .from("contact_leads")
        .insert({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || null,
          message: formData.message.trim(),
        });

      if (error) {
        console.error("Error submitting form:", error);
        toast.error("Failed to submit. Please try again.");
        events.contactFormError(error.message);
      } else {
        toast.success("Message sent successfully! We'll get back to you soon.");
        events.contactFormSubmit();
        setFormData({ name: "", email: "", phone: "", message: "" });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred. Please try again.");
      events.contactFormError("Unexpected error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
              Get In Touch
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="heading-1 mb-6"
            >
              Let's Build Something{" "}
              <span className="gradient-text">Amazing Together</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-300"
            >
              Have a project in mind? We'd love to hear about it.
              Send us a message and we'll respond as soon as possible.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-lg h-full"
            >
              <h2 id="send-message" className="heading-3 mb-8 scroll-mt-24">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    maxLength={100}
                    className="h-12 bg-background/50"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    maxLength={255}
                    className="h-12 bg-background/50"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    maxLength={20}
                    className="h-12 bg-background/50"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    rows={6}
                    required
                    maxLength={1000}
                    className="bg-background/50 resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="btn-primary w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Right Column: Contact Info & Map Stack */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Info Cards Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map((info) => (
                  <a
                    key={info.title}
                    href={info.href}
                    className="flex flex-col gap-3 p-5 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm mb-1">{info.title}</div>
                      <div className="text-muted-foreground text-sm">{info.value}</div>
                    </div>
                  </a>
                ))}
              </div>

              {/* WhatsApp Button */}
              <a
                href="https://wa.me/918920617274?text=Hello!%20I'm%20interested%20in%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full p-4 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
              </a>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden border border-border/50 shadow-lg h-[300px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923192776!2d77.06889969035633!3d28.52728034389636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1709289291184!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="heading-2 text-center mb-12"
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "How long does it take to start a project?",
                a: "We typically start within 1-2 weeks after the initial consultation and agreement. This allows us to assemble the right team for your specific needs."
              },
              {
                q: "Do you provide post-launch support?",
                a: "Yes! We offer comprehensive maintenance and support packages to ensure your digital solution remains secure, up-to-date, and optimized for performance."
              },
              {
                q: "What industries do you serve?",
                a: "We work with a diverse range of industries including FinTech, Healthcare, E-commerce, Real Estate, and Manufacturing, delivering tailored solutions for each sector."
              },
              {
                q: "Can you work with existing teams?",
                a: "Absolutely. We often collaborate with in-house teams to augment capabilities or take ownership of specific project components."
              }
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-xl overflow-hidden"
              >
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="font-semibold text-lg">{faq.q}</span>
                    <ChevronDown className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform duration-300" />
                  </summary>
                  <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
