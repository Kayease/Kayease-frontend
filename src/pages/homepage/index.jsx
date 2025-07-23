import React, { useEffect } from "react";
import { motion } from "framer-motion";
import HeroSection from "./components/HeroSection";
import ServicesPreview from "./components/ServicesPreview";
import PortfolioCarousel from "./components/PortfolioCarousel";
import SocialProof from "./components/SocialProof";
import WhyKayease from "./components/WhyKayease";
import CTASection from "./components/CTASection";

const Homepage = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);

    // Set page title
    document.title =
      "Kayease - Unlocking Digital Potential | Premium Digital Agency";

    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Transform your digital vision into reality with Kayease. We deliver smart, scalable solutions from code to conversions. Expert web development, mobile apps, and digital strategy services."
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <main className="relative">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <HeroSection />
        </motion.div>

        {/* Services Preview Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <ServicesPreview />
        </motion.div>

        {/* Portfolio Carousel Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <PortfolioCarousel />
        </motion.div>

        {/* Social Proof Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <SocialProof />
        </motion.div>

        {/* Why Kayease Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <WhyKayease />
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <CTASection />
        </motion.div>
      </main>
    </div>
  );
};

export default Homepage;
