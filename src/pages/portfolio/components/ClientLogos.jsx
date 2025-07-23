import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "../../../components/AppImage";
import { clientApi } from "../../../utils/clientApi"; // Make sure this path is correct

const ClientLogos = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        setClients(clientsResponse.clients || []);
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
            We've had the privilege of working with amazing companies across
            various industries
          </motion.p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {clients.map((client, index) => (
              <motion.div
                key={client._id || client.id || index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
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
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                    <div className="font-medium">{client.name}</div>
                    <div className="text-xs text-gray-300">
                      {client.industry}
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

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
