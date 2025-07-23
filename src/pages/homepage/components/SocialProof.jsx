import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";
import { clientApi } from "../../../utils/clientApi";

const SocialProof = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalClients: 0,
    recentClients: 0,
  });

  // Fetch clients and stats on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch clients with a reasonable limit for homepage display
        const clientsResponse = await clientApi.getClients({
          limit: 50,
          sortBy: "createdAt",
          sortOrder: "desc",
        });

        // Fetch client statistics
        const statsResponse = await clientApi.getStatistics();

        setClients(clientsResponse.clients || []);
        setStats(statsResponse || { totalClients: 0, recentClients: 0 });
        setError(null);
      } catch (err) {
        console.error("Error fetching client data:", err);
        setError(err.message);
        setClients([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const duplicatedClients = [...clients, ...clients]; // For continuous scroll

  // Show loading state
  if (loading) {
    return (
      <section className="py-20 lg:py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-text-secondary">
              Loading our trusted clients...
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="py-20 lg:py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Icon
              name="AlertCircle"
              size={48}
              className="text-red-500 mx-auto mb-4"
            />
            <p className="text-red-600 mb-4">Failed to load client data</p>
            <p className="text-text-secondary text-sm">{error}</p>
          </div>
        </div>
      </section>
    );
  }

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
            Trusted by{" "}
            <span className="brand-gradient-text">Industry Leaders</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            {stats.totalClients > 0
              ? `Join ${stats.totalClients}+ satisfied clients who have transformed their businesses with our solutions.`
              : "Join our satisfied clients who have transformed their businesses with our solutions."}
          </p>
        </motion.div>

        {/* Continuous Scrolling Client Logos */}
        {clients.length > 0 && (
          <div className="relative mb-20">
            <div className="flex space-x-8 animate-scroll">
              {duplicatedClients.map((client, index) => (
                <motion.div
                  key={`${client._id}-${index}`}
                  className="flex-shrink-0 relative group"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-60 h-44 bg-white rounded-xl shadow-md border border-slate-200 flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>

                  {/* Client name tooltip on hover */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opxcity-100 transition-opacity duration-300 whitespace-nowrap">
                    {client.name}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Show message when no clients */}
        {clients.length === 0 && !loading && (
          <div className="text-center mb-20">
            <Icon
              name="Users"
              size={48}
              className="text-gray-400 mx-auto mb-4"
            />
            <p className="text-text-secondary">
              No client logos available at the moment.
            </p>
          </div>
        )}

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            {
              number: stats.totalClients > 0 ? `${stats.totalClients}+` : "0",
              label: "Trusted Clients",
              icon: "Users",
            },
            {
              number: stats.recentClients > 0 ? `${stats.recentClients}+` : "0",
              label: "New This Month",
              icon: "TrendingUp",
            },
            {
              number: "24/7",
              label: "Support",
              icon: "Clock",
            },
            {
              number: "5+",
              label: "Years Experience",
              icon: "Award",
            },
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
