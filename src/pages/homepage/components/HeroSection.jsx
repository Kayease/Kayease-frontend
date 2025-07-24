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
      <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 text-center w-full min-h-[600px] flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 sm:space-y-8"
        >
          {/* Main Headline with Typewriter Effect */}
          <div className="space-y-3 sm:space-y-4">
            <h1
              className="
                text-xl
                xs:text-2xl
                sm:text-3xl
                md:text-4xl
                lg:text-5xl
                xl:text-6xl
                font-extrabold
                mb-2 sm:mb-4
                text-center
                leading-tight
                break-words
                truncate
                w-full
                max-w-full
              "
              style={{ color: '#111', wordBreak: 'break-word' }}
            >
              {displayText}
            </h1>
            <h2
              className="
                text-sm
                xs:text-base
                sm:text-lg
                md:text-xl
                lg:text-2xl
                font-semibold
                mb-2 sm:mb-4
                text-center
                leading-relaxed
                px-1 sm:px-4
                break-words
                truncate
                w-full
                max-w-full
              "
              style={{ color: '#333', wordBreak: 'break-word' }}
            >
              Smart, Scalable Solutions From Code to Conversions
            </h2>
          </div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 0.8 }}
            className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 max-w-xs xs:max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto leading-relaxed px-1 sm:px-4 break-words"
            style={{ wordBreak: 'break-word' }}
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
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 pt-4 sm:pt-8 px-1 sm:px-4 w-full"
          >
            <Link to="/contact" className="w-full sm:w-auto">
              <Button
                variant="default"
                size="lg"
                className="cta-button text-white font-semibold px-4 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:min-w-[180px]"
                iconName="ArrowRight"
                iconPosition="right"
                iconSize={18}
              >
                Start Your Project
              </Button>
            </Link>

            <Link to="/portfolio" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-semibold px-4 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:min-w-[180px]"
                iconName="Play"
                iconPosition="left"
                iconSize={18}
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
            className="
              grid
              grid-cols-1
              xs:grid-cols-2
              md:grid-cols-4
              gap-4 sm:gap-6 lg:gap-8
              pt-6 sm:pt-12 lg:pt-16
              max-w-xs xs:max-w-sm sm:max-w-2xl lg:max-w-4xl
              mx-auto px-1 sm:px-4
              w-full
            "
          >
            {[
              { number: "150+", label: "Projects Delivered" },
              { number: "98%", label: "Client Satisfaction" },
              { number: "5+", label: "Years Experience" },
              { number: "24/7", label: "Support Available" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-bold text-black mb-1 sm:mb-2 truncate">
                  {stat.number}
                </div>
                <div className="text-gray-900 text-xs sm:text-sm lg:text-base leading-tight truncate">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
