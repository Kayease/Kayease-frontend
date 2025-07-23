import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const SocialProof = () => {
  const [hoveredClient, setHoveredClient] = useState(null);

  const clients = [
    {
      id: 1,
      name: 'TechFlow Inc.',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=100&fit=crop',
      testimonial: `Kayease transformed our digital presence completely. Their technical expertise and strategic approach resulted in a 245% increase in conversions.`,
      author: 'Sarah Johnson',
      position: 'CEO, TechFlow Inc.',
      rating: 5
    },
    {
      id: 2,
      name: 'EcoMarket',
      logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=200&h=100&fit=crop',
      testimonial: `The mobile app they developed exceeded our expectations. 100K+ downloads in the first month with a 4.8-star rating.`,
      author: 'Michael Chen',
      position: 'Founder, EcoMarket',
      rating: 5
    },
    {
      id: 3,
      name: 'FinanceHub',
      logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=100&fit=crop',
      testimonial: `Their financial dashboard solution is incredibly robust. 99.9% accuracy and lightning-fast performance.`,
      author: 'David Rodriguez',
      position: 'CTO, FinanceHub',
      rating: 5
    },
    {
      id: 4,
      name: 'HealthCare Connect',
      logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=200&h=100&fit=crop',
      testimonial: `The telemedicine platform they built handles 25K+ consultations with 96% patient satisfaction.`,
      author: 'Dr. Emily Watson',
      position: 'Medical Director',
      rating: 5
    },
    {
      id: 5,
      name: 'RetailPro',
      logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=100&fit=crop',
      testimonial: `Our e-commerce platform saw 180% growth in sales after Kayease's optimization and redesign.`,author: 'James Wilson',position: 'VP Marketing, RetailPro',
      rating: 5
    },
    {
      id: 6,
      name: 'StartupLab',logo: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=200&h=100&fit=crop',testimonial: `From MVP to scale, Kayease has been our trusted development partner. Exceptional quality and support.`,author: 'Lisa Thompson',position: 'Co-founder, StartupLab',
      rating: 5
    }
  ];

  const duplicatedClients = [...clients, ...clients]; // For continuous scroll

  return (
    <section className="py-20 lg:py-32 bg-white overflow-hidden">
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
            Trusted by <span className="brand-gradient-text">Industry Leaders</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Join hundreds of satisfied clients who have transformed their businesses with our solutions.
          </p>
        </motion.div>

        {/* Continuous Scrolling Client Logos */}
        <div className="relative mb-20">
          <div className="flex space-x-8 animate-scroll">
            {duplicatedClients.map((client, index) => (
              <motion.div
                key={`${client.id}-${index}`}
                className="flex-shrink-0 relative group cursor-pointer"
                onMouseEnter={() => setHoveredClient(client.id)}
                onMouseLeave={() => setHoveredClient(null)}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-48 h-24 bg-white rounded-xl shadow-md border border-slate-200 flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>

                {/* Testimonial Overlay */}
                {hoveredClient === client.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 p-6 z-10"
                  >
                    <div className="flex items-center mb-3">
                      {[...Array(client.rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                      "{client.testimonial}"
                    </p>
                    <div className="flex items-center">
                      <div>
                        <div className="font-semibold text-text-primary text-sm">
                          {client.author}
                        </div>
                        <div className="text-text-secondary text-xs">
                          {client.position}
                        </div>
                      </div>
                    </div>
                    {/* Arrow pointing up */}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-slate-200 rotate-45"></div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {[
            { number: '150+', label: 'Happy Clients', icon: 'Users' },
            { number: '98%', label: 'Success Rate', icon: 'TrendingUp' },
            { number: '24/7', label: 'Support', icon: 'Clock' },
            { number: '5+', label: 'Years Experience', icon: 'Award' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Icon name={stat.icon} size={28} color="white" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-text-secondary font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {clients.slice(0, 2).map((client, index) => (
            <div
              key={client.id}
              className="bg-slate-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                {[...Array(client.rating)].map((_, i) => (
                  <Icon key={i} name="Star" size={20} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-text-secondary text-lg leading-relaxed mb-6">
                "{client.testimonial}"
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">
                    {client.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-text-primary">
                    {client.author}
                  </div>
                  <div className="text-text-secondary text-sm">
                    {client.position}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default SocialProof;