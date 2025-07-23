import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PortfolioCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const projects = [
    {
      id: 1,
      title: 'TechFlow SaaS Platform',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
      description: 'A comprehensive project management platform built with Next.js and Node.js',
      metrics: {
        conversion: '+245%',
        users: '50K+',
        performance: '98%'
      },
      technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'AWS'],
      client: 'TechFlow Inc.',
      year: '2024'
    },
    {
      id: 2,
      title: 'EcoMarket Mobile App',
      category: 'Mobile Development',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
      description: 'Sustainable marketplace app connecting eco-conscious consumers with green products',
      metrics: {
        downloads: '100K+',
        rating: '4.8★',
        retention: '85%'
      },
      technologies: ['React Native', 'Firebase', 'Stripe', 'Redux'],
      client: 'EcoMarket',
      year: '2024'
    },
    {
      id: 3,
      title: 'FinanceHub Dashboard',
      category: 'Web Application',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      description: 'Real-time financial analytics dashboard for investment management',
      metrics: {
        accuracy: '99.9%',
        speed: '2.1s',
        uptime: '99.99%'
      },
      technologies: ['React', 'D3.js', 'Python', 'MongoDB'],
      client: 'FinanceHub',
      year: '2024'
    },
    {
      id: 4,
      title: 'HealthCare Connect',
      category: 'Healthcare Platform',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
      description: 'Telemedicine platform connecting patients with healthcare providers',
      metrics: {
        consultations: '25K+',
        satisfaction: '96%',
        response: '< 30s'
      },
      technologies: ['Vue.js', 'WebRTC', 'Socket.io', 'Docker'],
      client: 'HealthCare Connect',
      year: '2024'
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === projects.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, projects.length]);

  const nextSlide = () => {
    setCurrentIndex(currentIndex === projects.length - 1 ? 0 : currentIndex + 1);
  };

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? projects.length - 1 : currentIndex - 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-20 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            Recent <span className="brand-gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Discover how we've helped businesses transform their digital presence 
            and achieve measurable results.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
                  {/* Project Image */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={projects[currentIndex].image}
                      alt={projects[currentIndex].title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                        {projects[currentIndex].category}
                      </span>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="mb-6">
                      <h3 className="text-3xl font-bold text-text-primary mb-4">
                        {projects[currentIndex].title}
                      </h3>
                      <p className="text-text-secondary text-lg leading-relaxed mb-6">
                        {projects[currentIndex].description}
                      </p>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      {Object.entries(projects[currentIndex].metrics).map(([key, value], index) => (
                        <div key={index} className="text-center">
                          <div className="text-2xl font-bold text-primary mb-1">
                            {value}
                          </div>
                          <div className="text-sm text-text-secondary capitalize">
                            {key}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Technologies */}
                    <div className="mb-8">
                      <h4 className="text-sm font-semibold text-text-secondary mb-3 uppercase tracking-wide">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {projects[currentIndex].technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Client Info */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-text-secondary">Client</div>
                        <div className="font-semibold text-text-primary">
                          {projects[currentIndex].client}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-text-secondary">Year</div>
                        <div className="font-semibold text-text-primary">
                          {projects[currentIndex].year}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all duration-300 z-10"
          >
            <Icon name="ChevronLeft" size={24} className="text-text-primary" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all duration-300 z-10"
          >
            <Icon name="ChevronRight" size={24} className="text-text-primary" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 mt-8">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-primary w-8' :'bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

        {/* View All Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link to="/portfolio">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span>View All Projects</span>
              <Icon name="ExternalLink" size={20} />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioCarousel;