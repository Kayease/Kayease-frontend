import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../components/AppIcon';
import ContactForm from './components/ContactForm';
import ContactInfo from './components/ContactInfo';
import LocationMap from './components/LocationMap';
import LiveChat from './components/LiveChat';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const trustSignals = [
    {
      icon: 'Clock',
      title: '24-Hour Response',
      description: 'Guaranteed response within 24 hours'
    },
    {
      icon: 'Shield',
      title: 'Secure & Confidential',
      description: 'Your information is protected with SSL encryption'
    },
    {
      icon: 'Users',
      title: '500+ Happy Clients',
      description: 'Trusted by businesses worldwide'
    },
    {
      icon: 'Award',
      title: 'Industry Certified',
      description: 'Certified professionals with proven expertise'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <motion.section 
        className="pt-24 pb-16 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div variants={itemVariants} className="mb-6">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Icon name="MessageCircle" size={16} />
                <span>Let's Start Something Amazing</span>
              </div>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6"
            >
              Get In Touch With{' '}
              <span className="brand-gradient-text">Kayease</span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Ready to transform your digital presence? Let's discuss your project and explore how we can help you achieve your goals with cutting-edge solutions.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              {trustSignals.map((signal, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon name={signal.icon} size={24} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-text-primary text-sm mb-1">
                    {signal.title}
                  </h3>
                  <p className="text-xs text-text-secondary">
                    {signal.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <motion.section 
        className="py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <ContactForm />
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants}>
              <ContactInfo />
            </motion.div>
          </div>
        </div>
      </motion.section>

     

      {/* Location & FAQ */}
      <motion.section 
        className="py-16 w-full min-h-[400px] flex justify-center items-center bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="w-full max-w-5xl">
          <LocationMap />
        </motion.div>
      </motion.section>

    </div>
  );
};

export default Contact;