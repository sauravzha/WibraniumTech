import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
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
    value: "+91 (XXX) XXX-XXXX",
    href: "tel:+91XXXXXXXXXX",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    value: "New Delhi, India",
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
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-3 mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
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
                    />
                  </div>
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
                    placeholder="+1 (234) 567-890"
                    maxLength={20}
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
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="btn-primary w-full sm:w-auto"
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

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-3 mb-6">Contact Information</h2>
              <p className="text-muted-foreground mb-8">
                Reach out to us through any of the following channels.
                We're here to help with your digital transformation journey.
              </p>

              <div className="space-y-6 mb-8">
                {contactInfo.map((info) => (
                  <a
                    key={info.title}
                    href={info.href}
                    className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{info.title}</div>
                      <div className="text-muted-foreground">{info.value}</div>
                    </div>
                  </a>
                ))}
              </div>

              {/* WhatsApp Button */}
              <a
                href="https://wa.me/1234567890?text=Hello!%20I'm%20interested%20in%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full p-4 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
              </a>

              {/* Map */}
              <div className="mt-8 rounded-xl overflow-hidden border border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923192776!2d77.06889969035633!3d28.52728034389636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1709289291184!5m2!1sen!2sin"
                  width="100%"
                  height="300"
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
    </Layout>
  );
}
