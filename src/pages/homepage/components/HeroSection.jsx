import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [displayText, setDisplayText] = useState("");
  const fullText = "Unlocking Digital Potential";

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    let index = 0;
    const typewriterInterval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(typewriterInterval);
      }
    }, 100);

    return () => clearInterval(typewriterInterval);
  }, []);

  const geometricElements = [
    { id: 1, size: 60, delay: 0, x: 20, y: 30 },
    { id: 2, size: 40, delay: 0.2, x: 80, y: 20 },
    { id: 3, size: 80, delay: 0.4, x: 70, y: 70 },
    { id: 4, size: 50, delay: 0.6, x: 10, y: 80 },
    { id: 5, size: 35, delay: 0.8, x: 90, y: 60 },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Animated Background Gradient */}
      <div
        className="absolute inset-0 brand-gradient opacity-90"
        style={{
          background: `
    linear-gradient(to right, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 50%),
    radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, #5e90f0 0%, #00B2FF 50%, #0057FF 100%)
  `,
        }}
      />

      {/* Floating Geometric Elements */}
      {geometricElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
          style={{
            width: element.size,
            height: element.size,
            left: `${element.x}%`,
            top: `${element.y}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.2, rotate: 45 }}
        />
      ))}

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Main Headline with Typewriter Effect */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-center"
              style={{ color: '#111' }}
            >
              Unlocking Digital Potential
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center"
              style={{ color: '#333' }}
            >
              Smart, Scalable Solutions From Code to Conversions
            </h2>
          </div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 0.8 }}
            className="text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed"
          >
            We architect digital ecosystems that scale with your ambition.
            Transform complex challenges into streamlined solutions with
            Kayease.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-8"
          >
            <Link to="/contact">
              <Button
                variant="default"
                size="lg"
                className="cta-button text-white font-semibold px-8 py-4 text-lg min-w-[200px]"
                iconName="ArrowRight"
                iconPosition="right"
                iconSize={20}
              >
                Start Your Project
              </Button>
            </Link>

            <Link to="/portfolio">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-semibold px-8 py-4 text-lg min-w-[200px]"
                iconName="Play"
                iconPosition="left"
                iconSize={20}
              >
                View Our Work
              </Button>
            </Link>
          </motion.div>

          {/* Stats Counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4, duration: 0.8 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-16 max-w-4xl mx-auto"
          >
            {[
              { number: "150+", label: "Projects Delivered" },
              { number: "98%", label: "Client Satisfaction" },
              { number: "5+", label: "Years Experience" },
              { number: "24/7", label: "Support Available" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-black mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-900 text-sm lg:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-white/70 cursor-pointer"
        >
          <span className="text-sm mb-2">Scroll to explore</span>
          <Icon name="ChevronDown" size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
