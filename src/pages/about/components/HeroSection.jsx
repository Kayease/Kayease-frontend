import React from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-white">
      {/* Background Video Container */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Kayease team collaboration"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-black-400/10"></div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-secondary/10 rounded-full blur-2xl animate-pulse animation-delay-400"></div>
      <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-accent/10 rounded-full blur-lg animate-pulse animation-delay-200"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 mb-8 shadow-lg border border-slate-200/50">
            <Icon name="Zap" size={20} className="text-primary" />
            <span className="text-sm font-medium text-slate-700">
              Unlocking Digital Potential 
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            We Are <span className="brand-gradient-text">Kayease</span>
          </h1>

          {/* Mission Statement */}
          <p className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            Your trusted digital transformation partner, turning complex
            challenges into streamlined solutions that scale with your ambition.
          </p>

          {/* Sub-mission */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-10 shadow-xl border border-slate-200/50 max-w-2xl mx-auto">
            <p className="text-lg text-slate-700 leading-relaxed">
              We don't just build websites or apps—we architect digital
              ecosystems that unlock unlimited potential. Every line of code,
              every design decision, every strategic choice is crafted to make
              the complex feel simple and the impossible feel achievable.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button
              variant="default"
              className="cta-button text-white font-medium px-8 py-4 text-lg"
              iconName="ArrowRight"
              iconPosition="right"
              iconSize={20}
              onClick={() => (window.location.href = "/contact")}
            >
              Start Your Journey
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-3xl mx-auto">
            {[
              { number: "150+", label: "Projects Delivered" },
              { number: "50+", label: "Happy Clients" },
              { number: "5+", label: "Years Experience" },
              { number: "24/7", label: "Support Available" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold brand-gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-slate-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center space-y-2 animate-bounce">
          <span className="text-sm text-slate-500 font-medium">
            Discover Our Story
          </span>
          <Icon name="ChevronDown" size={24} className="text-slate-400" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
