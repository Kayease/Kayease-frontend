import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import ProjectCard from "./components/ProjectCard";
import FilterTabs from "./components/FilterTabs";
import ProjectModal from "./components/ProjectModal";
import StatsSection from "./components/StatsSection";
import ClientLogos from "./components/ClientLogos";

import Button from "../../components/ui/Button";

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState([]);

  const filters = [
    { id: "all", name: "All Projects", icon: "Grid3X3", count: 24 },
    { id: "saas", name: "SaaS", icon: "Cloud", count: 8 },
    { id: "ecommerce", name: "E-commerce", icon: "ShoppingCart", count: 6 },
    { id: "healthcare", name: "Healthcare", icon: "Heart", count: 4 },
    { id: "fintech", name: "Fintech", icon: "CreditCard", count: 6 },
  ];

  const projects = [
    {
      id: 1,
      title: "HealthCare Pro Dashboard",
      client: "MedTech Solutions",
      category: "healthcare",
      year: "2024",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop&crop=center",
      description:
        "Comprehensive healthcare management platform with patient tracking, appointment scheduling, and medical records management.",
      fullDescription: `HealthCare Pro Dashboard is a comprehensive healthcare management platform designed to streamline medical practice operations. The system integrates patient management, appointment scheduling, medical records, billing, and reporting into a unified, user-friendly interface.\n\nThe platform was built with scalability in mind, supporting multi-location practices and various medical specialties. Advanced security measures ensure HIPAA compliance while maintaining optimal performance.`,
      challenge:
        "The client needed a HIPAA-compliant platform that could handle complex medical workflows while maintaining ease of use for healthcare professionals with varying technical expertise.",
      tags: ["Web App", "Dashboard", "Healthcare"],
      technologies: [
        { name: "React", icon: "Code" },
        { name: "Node.js", icon: "Server" },
        { name: "PostgreSQL", icon: "Database" },
        { name: "AWS", icon: "Cloud" },
      ],
      gallery: [
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop&crop=center",
      ],
   
      liveUrl: "https://healthcare-pro-demo.com",
    },
    {
      id: 2,
      title: "FinanceFlow Mobile App",
      client: "Digital Bank Corp",
      category: "fintech",
      year: "2024",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop&crop=center",
      description:
        "Modern mobile banking application with advanced security features, real-time transactions, and AI-powered financial insights.",
      fullDescription: `FinanceFlow is a next-generation mobile banking application that combines cutting-edge security with intuitive user experience. The app features biometric authentication, real-time transaction processing, AI-powered spending insights, and comprehensive financial management tools.\n\nBuilt with React Native for cross-platform compatibility, the app integrates with multiple banking APIs and payment processors while maintaining bank-grade security standards.`,
      challenge:
        "Creating a secure, user-friendly mobile banking experience that could compete with established financial institutions while ensuring regulatory compliance.",
      tags: ["Mobile App", "Fintech", "Banking"],
      technologies: [
        { name: "React Native", icon: "Smartphone" },
        { name: "Node.js", icon: "Server" },
        { name: "MongoDB", icon: "Database" },
        { name: "Stripe", icon: "CreditCard" },
      ],
      metrics: [
        { value: "4.8★", label: "App Rating" },
        { value: "150K+", label: "Downloads" },
        { value: "0.1s", label: "Response Time" },
      ],
      detailedMetrics: [
        {
          value: "4.8★",
          label: "App Store Rating",
          description: "User satisfaction score",
        },
        {
          value: "150K+",
          label: "Active Downloads",
          description: "Monthly active users",
        },
        {
          value: "0.1s",
          label: "API Response Time",
          description: "Lightning-fast transactions",
        },
        {
          value: "99.99%",
          label: "Security Score",
          description: "Zero security incidents",
        },
      ],
      achievements: [
        "Bank-grade security implementation",
        "Real-time transaction processing",
        "AI-powered financial insights",
        "Cross-platform compatibility achieved",
      ],
      process: [
        {
          title: "Market Research",
          description: "Analyzed competitor apps and user behavior patterns",
          duration: "2 weeks",
        },
        {
          title: "UX/UI Design",
          description: "Created intuitive mobile-first design system",
          duration: "4 weeks",
        },
        {
          title: "Development",
          description: "Built native-quality cross-platform application",
          duration: "16 weeks",
        },
        {
          title: "Security Testing",
          description: "Comprehensive security audits and penetration testing",
          duration: "4 weeks",
        },
      ],
      gallery: [
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center",
      ],
      testimonial: {
        content:
          "The FinanceFlow app exceeded our expectations. It's secure, fast, and our customers love the intuitive interface.",
        author: "Michael Chen",
        position: "CTO",
        company: "Digital Bank Corp",
      },
      liveUrl: "https://financeflow-demo.com",
      timeline: "6.5 months",
    },
    {
      id: 3,
      title: "EcoMarket E-commerce Platform",
      client: "Green Commerce Ltd",
      category: "ecommerce",
      year: "2024",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center",
      description:
        "Sustainable e-commerce platform with advanced product filtering, eco-friendly shipping options, and carbon footprint tracking.",
      fullDescription: `EcoMarket is a revolutionary e-commerce platform focused on sustainable products and eco-friendly shopping experiences. The platform features advanced product categorization, sustainability ratings, carbon footprint tracking, and green shipping options.\n\nThe system includes vendor management, inventory tracking, customer reviews, and integrated payment processing, all optimized for environmental consciousness and user experience.`,
      challenge:
        "Building a scalable e-commerce platform that could handle high traffic while promoting sustainable shopping practices and maintaining fast performance.",
      tags: ["E-commerce", "Sustainability", "Web Platform"],
      technologies: [
        { name: "Next.js", icon: "Code" },
        { name: "Stripe", icon: "CreditCard" },
        { name: "PostgreSQL", icon: "Database" },
        { name: "Vercel", icon: "Cloud" },
      ],
      metrics: [
        { value: "340%", label: "Sales Growth" },
        { value: "6.8%", label: "Conversion Rate" },
        { value: "1.1s", label: "Page Speed" },
      ],
      detailedMetrics: [
        {
          value: "340%",
          label: "Sales Increase",
          description: "Year-over-year growth",
        },
        {
          value: "6.8%",
          label: "Conversion Rate",
          description: "Visitor to customer ratio",
        },
        {
          value: "1.1s",
          label: "Page Load Speed",
          description: "Average loading time",
        },
        {
          value: "92%",
          label: "Customer Retention",
          description: "Repeat purchase rate",
        },
      ],
      achievements: [
        "Sustainable product certification system",
        "Carbon footprint calculator integration",
        "Multi-vendor marketplace functionality",
        "Mobile-first responsive design",
      ],
      process: [
        {
          title: "Platform Architecture",
          description: "Designed scalable e-commerce architecture",
          duration: "3 weeks",
        },
        {
          title: "UI/UX Development",
          description: "Created engaging shopping experience",
          duration: "5 weeks",
        },
        {
          title: "Backend Development",
          description: "Built robust API and database systems",
          duration: "14 weeks",
        },
        {
          title: "Testing & Launch",
          description: "Performance optimization and deployment",
          duration: "4 weeks",
        },
      ],
      gallery: [
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center",
      ],
      testimonial: {
        content:
          "Kayease delivered an exceptional e-commerce platform that perfectly aligns with our sustainability mission. Sales have tripled since launch.",
        author: "Emma Rodriguez",
        position: "Founder & CEO",
        company: "Green Commerce Ltd",
      },
      liveUrl: "https://ecomarket-demo.com",
      timeline: "6.5 months",
    },
    {
      id: 4,
      title: "CloudSync SaaS Platform",
      client: "TechFlow Systems",
      category: "saas",
      year: "2024",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center",
      description:
        "Enterprise-grade SaaS platform for team collaboration with real-time sync, advanced analytics, and multi-tenant architecture.",
      fullDescription: `CloudSync is a comprehensive SaaS platform designed for enterprise team collaboration. The system features real-time document synchronization, advanced project management tools, team communication features, and detailed analytics dashboards.\n\nBuilt with a multi-tenant architecture, the platform supports unlimited users, custom branding, API integrations, and enterprise-grade security features.`,
      challenge:
        "Developing a scalable SaaS platform that could handle thousands of concurrent users while maintaining real-time synchronization and data consistency.",
      tags: ["SaaS", "Collaboration", "Enterprise"],
      technologies: [
        { name: "React", icon: "Code" },
        { name: "Node.js", icon: "Server" },
        { name: "Redis", icon: "Database" },
        { name: "Docker", icon: "Container" },
      ],
      metrics: [
        { value: "10K+", label: "Active Users" },
        { value: "99.9%", label: "Uptime" },
        { value: "50ms", label: "Sync Speed" },
      ],
      detailedMetrics: [
        {
          value: "10K+",
          label: "Monthly Active Users",
          description: "Growing user base",
        },
        {
          value: "99.9%",
          label: "System Uptime",
          description: "Reliable availability",
        },
        {
          value: "50ms",
          label: "Real-time Sync",
          description: "Lightning-fast updates",
        },
        {
          value: "95%",
          label: "User Satisfaction",
          description: "Customer happiness score",
        },
      ],
      achievements: [
        "Multi-tenant architecture implementation",
        "Real-time collaboration features",
        "Enterprise security compliance",
        "Scalable microservices design",
      ],
      process: [
        {
          title: "System Design",
          description: "Architected scalable multi-tenant platform",
          duration: "4 weeks",
        },
        {
          title: "Core Development",
          description: "Built collaboration and sync features",
          duration: "16 weeks",
        },
        {
          title: "Security Implementation",
          description: "Added enterprise-grade security",
          duration: "3 weeks",
        },
        {
          title: "Performance Optimization",
          description: "Optimized for scale and speed",
          duration: "3 weeks",
        },
      ],
      gallery: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center",
      ],
      testimonial: {
        content:
          "CloudSync has revolutionized how our teams collaborate. The real-time features and reliability are outstanding.",
        author: "David Park",
        position: "VP of Engineering",
        company: "TechFlow Systems",
      },
      liveUrl: "https://cloudsync-demo.com",
      timeline: "6.5 months",
    },
    {
      id: 5,
      title: "RetailPro Inventory System",
      client: "Retail Innovations",
      category: "ecommerce",
      year: "2023",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center",
      description:
        "Advanced inventory management system with predictive analytics, automated reordering, and multi-location support.",
      fullDescription: `RetailPro is an advanced inventory management system designed for multi-location retail operations. The platform features predictive analytics, automated reordering, real-time stock tracking, and comprehensive reporting capabilities.\n\nThe system integrates with popular POS systems, e-commerce platforms, and accounting software to provide a unified view of inventory across all channels.`,
      challenge:
        "Creating an inventory system that could predict demand patterns and automate reordering while managing complex multi-location inventory flows.",
      tags: ["Inventory", "Analytics", "Retail"],
      technologies: [
        { name: "Vue.js", icon: "Code" },
        { name: "Python", icon: "Server" },
        { name: "MySQL", icon: "Database" },
        { name: "TensorFlow", icon: "Brain" },
      ],
      metrics: [
        { value: "60%", label: "Cost Reduction" },
        { value: "95%", label: "Accuracy" },
        { value: "30%", label: "Time Saved" },
      ],
      detailedMetrics: [
        {
          value: "60%",
          label: "Inventory Costs",
          description: "Reduced carrying costs",
        },
        {
          value: "95%",
          label: "Forecast Accuracy",
          description: "Demand prediction precision",
        },
        {
          value: "30%",
          label: "Time Savings",
          description: "Automated processes",
        },
        {
          value: "99%",
          label: "Stock Availability",
          description: "Reduced stockouts",
        },
      ],
      achievements: [
        "AI-powered demand forecasting",
        "Multi-location inventory sync",
        "Automated reorder point calculation",
        "Real-time analytics dashboard",
      ],
      process: [
        {
          title: "Requirements Analysis",
          description: "Analyzed complex inventory workflows",
          duration: "3 weeks",
        },
        {
          title: "AI Model Development",
          description: "Built predictive analytics engine",
          duration: "8 weeks",
        },
        {
          title: "System Integration",
          description: "Connected with existing retail systems",
          duration: "10 weeks",
        },
        {
          title: "Training & Deployment",
          description: "User training and system rollout",
          duration: "3 weeks",
        },
      ],
      gallery: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center",
      ],
      testimonial: {
        content:
          "RetailPro has transformed our inventory management. The predictive features have saved us thousands in carrying costs.",
        author: "Lisa Thompson",
        position: "Operations Director",
        company: "Retail Innovations",
      },
      liveUrl: "https://retailpro-demo.com",
      timeline: "6 months",
    },
    {
      id: 6,
      title: "CryptoTrade Platform",
      client: "Digital Assets Inc",
      category: "fintech",
      year: "2023",
      image:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop&crop=center",
      description:
        "Secure cryptocurrency trading platform with advanced charting, portfolio management, and institutional-grade security.",
      fullDescription: `CryptoTrade is a professional cryptocurrency trading platform designed for both retail and institutional traders. The platform features advanced charting tools, real-time market data, portfolio management, and institutional-grade security measures.\n\nBuilt with high-frequency trading in mind, the system can handle thousands of transactions per second while maintaining security and compliance with financial regulations.`,
      challenge:
        "Building a high-performance trading platform that could handle massive transaction volumes while ensuring security and regulatory compliance.",
      tags: ["Cryptocurrency", "Trading", "Security"],
      technologies: [
        { name: "React", icon: "Code" },
        { name: "WebSocket", icon: "Zap" },
        { name: "Redis", icon: "Database" },
        { name: "Kubernetes", icon: "Container" },
      ],
      metrics: [
        { value: "10K", label: "TPS" },
        { value: "99.99%", label: "Security" },
        { value: "5ms", label: "Latency" },
      ],
      detailedMetrics: [
        {
          value: "10K",
          label: "Transactions/Second",
          description: "High-frequency trading",
        },
        {
          value: "99.99%",
          label: "Security Score",
          description: "Zero breaches",
        },
        {
          value: "5ms",
          label: "Order Latency",
          description: "Ultra-fast execution",
        },
        {
          value: "$50M+",
          label: "Daily Volume",
          description: "Trading volume handled",
        },
      ],
      achievements: [
        "High-frequency trading capability",
        "Multi-layer security architecture",
        "Real-time market data integration",
        "Regulatory compliance framework",
      ],
      process: [
        {
          title: "Security Architecture",
          description: "Designed multi-layer security system",
          duration: "4 weeks",
        },
        {
          title: "Trading Engine",
          description: "Built high-performance matching engine",
          duration: "12 weeks",
        },
        {
          title: "UI Development",
          description: "Created professional trading interface",
          duration: "8 weeks",
        },
        {
          title: "Compliance Testing",
          description: "Regulatory compliance verification",
          duration: "4 weeks",
        },
      ],
      gallery: [
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center",
      ],
      testimonial: {
        content:
          "The CryptoTrade platform is incredibly fast and secure. It's exactly what we needed for our institutional clients.",
        author: "Robert Kim",
        position: "Head of Trading",
        company: "Digital Assets Inc",
      },
      liveUrl: "https://cryptotrade-demo.com",
      timeline: "7 months",
    },
  ];

  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => project.category === activeFilter)
      );
    }
  }, [activeFilter]);

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
      <Helmet>
        <title>Portfolio - Kayease Digital Agency</title>
        <meta
          name="description"
          content="Explore Kayease's portfolio of successful digital projects across SaaS, E-commerce, Healthcare, and Fintech industries. View case studies and client success stories."
        />
        <meta
          name="keywords"
          content="portfolio, case studies, web development, mobile apps, digital agency, Kayease"
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-primary/10 via-secondary/5 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
              >
                Our <span className="brand-gradient-text">Portfolio</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
              >
                Discover how we've helped businesses transform their digital
                presence with innovative solutions that drive real results
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Button
                  variant="default"
                  className="cta-button"
                  iconName="UserPlus"
                  iconPosition="left"
                  onClick={() => (window.location.href = "/contact")}
                >
                  Create Your Success Story
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FilterTabs
              filters={filters}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />

            {/* Projects Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProjectCard
                    project={project}
                    onViewDetails={handleViewDetails}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <StatsSection />

        {/* Client Logos */}
        <ClientLogos />

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-secondary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-white mb-6"
            >
              Ready to Start Your Success Story?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/90 mb-8"
            >
              Let's discuss how we can help transform your digital presence and
              achieve your business goals
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                variant="secondary"
                className="bg-white text-primary hover:bg-gray-50"
                iconName="MessageSquare"
                iconPosition="left"
              >
                Start a Conversation
              </Button>

              <Button
                variant="ghost"
                className="text-white border-white hover:bg-white/10"
                iconName="Calendar"
                iconPosition="left"
              >
                Schedule Consultation
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Project Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </>
  );
};

export default Portfolio;
