import React from 'react';
import { motion } from 'framer-motion';
import Image from '../../../components/AppImage';

const ClientLogos = () => {
  const clients = [
    {
      name: 'TechCorp',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=100&fit=crop&crop=center',
      industry: 'Technology'
    },
    {
      name: 'HealthPlus',
      logo: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=100&fit=crop&crop=center',
      industry: 'Healthcare'
    },
    {
      name: 'FinanceFlow',
      logo: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=200&h=100&fit=crop&crop=center',
      industry: 'Finance'
    },
    {
      name: 'EcoMarket',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=100&fit=crop&crop=center',
      industry: 'E-commerce'
    },
    {
      name: 'EduTech',
      logo: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=200&h=100&fit=crop&crop=center',
      industry: 'Education'
    },
    {
      name: 'StartupX',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=100&fit=crop&crop=center',
      industry: 'SaaS'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-gray-900 mb-4"
          >
            Trusted by Industry Leaders
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600"
          >
            We've had the privilege of working with amazing companies across various industries
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="aspect-[2/1] flex items-center justify-center">
                  <Image
                    src={client.logo}
                    alt={`${client.name} logo`}
                    className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                
                {/* Tooltip */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="font-medium">{client.name}</div>
                  <div className="text-xs text-gray-300">{client.industry}</div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-6">
            Ready to join our list of successful clients?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cta-button px-8 py-3 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Your Project
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientLogos;