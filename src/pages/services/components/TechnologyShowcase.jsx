import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const TechnologyShowcase = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');

  const techCategories = [
    {
      id: 'frontend',
      name: 'Frontend',
      icon: 'Monitor',
      description: 'Modern frameworks for exceptional user experiences',
      technologies: [
        {
          name: 'Next.js',
          description: 'React framework for production-grade applications with SSR, SSG, and optimal performance',
          reasons: ['Server-side rendering', 'Automatic code splitting', 'Built-in optimization', 'SEO-friendly'],
          logo: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=100&h=100&fit=crop&crop=center'
        },
        {
          name: 'React',
          description: 'Component-based library for building interactive user interfaces',
          reasons: ['Component reusability', 'Virtual DOM performance', 'Large ecosystem', 'Developer experience'],
          logo: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&h=100&fit=crop&crop=center'
        },
        {
          name: 'Tailwind CSS',
          description: 'Utility-first CSS framework for rapid UI development',
          reasons: ['Rapid development', 'Consistent design', 'Small bundle size', 'Customizable'],
          logo: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=100&h=100&fit=crop&crop=center'
        },
        {
          name: 'Framer Motion',
          description: 'Production-ready motion library for React applications',
          reasons: ['Smooth animations', 'Gesture support', 'Layout animations', 'Performance optimized'],
          logo: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=100&h=100&fit=crop&crop=center'
        }
      ]
    },
    {
      id: 'backend',
      name: 'Backend',
      icon: 'Server',
      description: 'Scalable server solutions and APIs',
      technologies: [
        {
          name: 'Node.js',
          description: 'JavaScript runtime for building scalable server-side applications',
          reasons: ['JavaScript everywhere', 'High performance', 'Rich ecosystem', 'Real-time capabilities'],
          logo: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=100&h=100&fit=crop&crop=center'
        },
        {
          name: 'Express.js',
          description: 'Fast, unopinionated web framework for Node.js',
          reasons: ['Minimal setup', 'Flexible routing', 'Middleware support', 'Large community'],
          logo: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=100&h=100&fit=crop&crop=center'
        },
        {
          name: 'PostgreSQL',
          description: 'Advanced open-source relational database system',
          reasons: ['ACID compliance', 'Advanced features', 'Scalability', 'JSON support'],
          logo: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=100&h=100&fit=crop&crop=center'
        },
        {
          name: 'Redis',
          description: 'In-memory data structure store for caching and sessions',
          reasons: ['High performance', 'Data persistence', 'Pub/Sub messaging', 'Clustering support'],
          logo: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=100&h=100&fit=crop&crop=center'
        }
      ]
    },
    {
      id: 'mobile',
      name: 'Mobile',
      icon: 'Smartphone',
      description: 'Cross-platform mobile development',
      technologies: [
        {
          name: 'React Native',
          description: 'Build native mobile apps using React and JavaScript',
          reasons: ['Code reusability', 'Native performance', 'Hot reloading', 'Large community'],
          logo: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=100&h=100&fit=crop&crop=center'
        },
        {
          name: 'Expo',
          description: 'Platform for universal React applications',
          reasons: ['Rapid development', 'OTA updates', 'Rich APIs', 'Easy deployment'],
          logo: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=100&h=100&fit=crop&crop=center'
        },
        {
          name: 'Firebase',
          description: 'Backend-as-a-Service platform for mobile and web apps',
          reasons: ['Real-time database', 'Authentication', 'Push notifications', 'Analytics'],
          logo: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=100&h=100&fit=crop&crop=center'
        },
        {
          name: 'Redux Toolkit',
          description: 'Efficient Redux development with modern patterns',
          reasons: ['State management', 'DevTools integration', 'Immutable updates', 'Middleware support'],
          logo: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&h=100&fit=crop&crop=center'
        }
      ]
    },
    {
      id: 'devops',
      name: 'DevOps',
      icon: 'Settings',
      description: 'Deployment and infrastructure management',
      technologies: [
        {
          name: 'Vercel',
          description: 'Frontend cloud platform for static sites and serverless functions',
          reasons: ['Zero configuration', 'Global CDN', 'Automatic scaling', 'Git integration'],
          logo: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=100&h=100&fit=crop&crop=center'
        },
        {
          name: 'AWS',
          description: 'Comprehensive cloud computing platform',
          reasons: ['Scalable infrastructure', 'Global presence', 'Managed services', 'Security'],
          logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=100&h=100&fit=crop&crop=center'
        },
        {
          name: 'Docker',
          description: 'Containerization platform for consistent deployments',
          reasons: ['Environment consistency', 'Easy scaling', 'Resource efficiency', 'Microservices'],
          logo: 'https://images.unsplash.com/photo-1605745341112-85968b19335a?w=100&h=100&fit=crop&crop=center'
        },
        {
          name: 'GitHub Actions',
          description: 'CI/CD platform for automated workflows',
          reasons: ['Automated testing', 'Continuous deployment', 'Git integration', 'Custom workflows'],
          logo: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=100&h=100&fit=crop&crop=center'
        }
      ]
    }
  ];

  const activeData = techCategories.find(cat => cat.id === activeCategory);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            Our Technology <span className="brand-gradient-text">Stack</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto"
          >
            We carefully select cutting-edge technologies that deliver exceptional 
            performance, scalability, and maintainability.
          </motion.p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {techCategories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-3 px-6 py-3 rounded-full border-2 transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-blue-500 border-blue-500 text-white shadow-lg'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              <Icon name={category.icon} size={20} />
              <span className="font-medium">{category.name}</span>
            </motion.button>
          ))}
        </div>

        {/* Technology Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">{activeData.name} Technologies</h3>
            <p className="text-slate-600">{activeData.description}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeData.technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:bg-white border border-slate-200 hover:border-blue-200"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Icon name="Code" size={24} color="white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{tech.name}</h4>
                  </div>
                </div>

                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                  {tech.description}
                </p>

                <div>
                  <h5 className="font-semibold text-slate-900 mb-2 text-sm">Why we choose it:</h5>
                  <ul className="space-y-1">
                    {tech.reasons.map((reason, reasonIndex) => (
                      <li key={reasonIndex} className="flex items-center text-xs text-slate-600">
                        <Icon name="Check" size={12} className="text-green-500 mr-2 flex-shrink-0" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technology Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Why Our Tech Stack Matters
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: 'Zap',
                title: 'Performance First',
                description: 'Optimized for speed and efficiency with modern build tools and best practices'
              },
              {
                icon: 'Shield',
                title: 'Enterprise Security',
                description: 'Built-in security features and regular updates to protect your applications'
              },
              {
                icon: 'TrendingUp',
                title: 'Future-Proof',
                description: 'Technologies with strong community support and long-term viability'
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon name={benefit.icon} size={24} color="white" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">{benefit.title}</h4>
                <p className="text-slate-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologyShowcase;