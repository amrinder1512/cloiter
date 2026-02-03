import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchServices } from '../features/servicesSlice';
import { fetchServicesHeader } from '../features/homepageSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { addBaseUrl } from '../utils/api';

const ServicesComponent = () => {
  const dispatch = useDispatch();
  const { items: services, loading, error } = useSelector((state) => state.services);
  const { servicesHeader } = useSelector((state) => state.homepage);
  const [activeIndex, setActiveIndex] = useState(0);

  // Default header data
  const defaultHeaderData = {
    badge: "Lorem ipsum dolor sit amet",
    heading: "Lorem ipsum dolor sit amet,",
    titleBreak: "consectetuer",
    heading2: "adipiscing elit."
  };

  useEffect(() => {
    if (services.length === 0 && !loading) {
      dispatch(fetchServices());
    }
    if (!servicesHeader.data && !servicesHeader.loading) {
      dispatch(fetchServicesHeader());
    }
  }, [dispatch, services.length, loading, servicesHeader.data, servicesHeader.loading]);

  // Show loading state
  if (loading) {
    return (
      <div className="bg-white min-h-screen py-12 md:py-20 px-4 font-sans">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">Loading services...</p>
        </div>
      </div>
    );
  }

  // Show error state with retry option
  if (error) {
    return (
      <div className="bg-white min-h-screen py-12 md:py-20 px-4 font-sans">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error loading services</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => dispatch(fetchServices())}
            className="bg-gray-800 text-white px-8 py-3 rounded-full hover:bg-gray-900 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Use only first 3 services for this component
  const displayServices = services.slice(0, 3);

  // Use API data for header if available, otherwise use fallback
  const headerData = servicesHeader.data || defaultHeaderData;
  const { badge, heading, titleBreak, heading2 } = headerData;

  return (
    <div className="bg-white min-h-screen py-12 md:py-20 px-4 font-sans overflow-hidden">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 md:mb-16"
      >
        <span className="bg-gray-200 text-gray-700 px-4 py-1 rounded-md text-[10px] uppercase tracking-wider">
          {badge}
        </span>
        <h2 className="text-3xl md:text-5xl font-bold mt-6 text-[#2D1B41] leading-tight">
          {heading} <br className="hidden md:block" />
          {titleBreak} <span className="text-red-600">{heading2}</span>
        </h2>
      </motion.div>

      {/* CONTAINER TRANSITION */}
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-4 max-w-6xl mx-auto min-h-[600px] md:h-[600px]">
        {displayServices.map((service, index) => {
          const isActive = index === activeIndex;

          return (
            <motion.div
              layout
              key={service.id}
              onClick={() => setActiveIndex(index)}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                layout: { duration: 0.5, type: "spring", stiffness: 200, damping: 25 },
                opacity: { duration: 0.5, delay: index * 0.1 }
              }}
              className={`relative cursor-pointer rounded-[40px] overflow-hidden flex flex-col p-8 md:p-12
                ${isActive
                  ? 'flex-[3] bg-[#2A2A2A] shadow-2xl'
                  : 'flex-1 bg-[#444444] hover:bg-[#3d3d3d] min-h-[100px] md:min-h-0'
                }
              `}
            >
              {/* Background Pattern */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 pointer-events-none"
                  >
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d="M0 50 Q 25 0 50 50 T 100 50" fill="none" stroke="white" strokeWidth="0.5" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className={`flex flex-col h-full ${isActive ? 'items-start justify-center' : 'items-center justify-center md:justify-end'}`}>

                {/* ICON */}
                <motion.div
                  layout
                  className={`transition-all duration-500 rounded-full border-2 border-dashed border-gray-500 flex items-center justify-center mb-6 overflow-hidden
                   ${isActive ? 'w-20 h-20 md:w-24 md:h-24' : 'w-12 h-12 md:w-16 md:h-16'}`}>
                  <motion.img
                    layout
                    src={service.icon ? addBaseUrl(service.icon) : "/images/Vector.png"}
                    
                    alt={service.title || 'Service icon'}
                    className={`transition-all duration-500 object-contain ${isActive ? 'w-12 h-12 md:w-16 md:h-16' : 'w-8 h-8 md:w-10 md:h-10 opacity-50'}`}
                  />
                </motion.div>

                {/* ACTIVE CONTENT */}
                <div className={`transition-all duration-500 ease-in-out overflow-hidden w-full ${isActive ? 'max-h-[500px] opacity-100' : 'max-h-0 md:max-h-full opacity-0 md:opacity-100'}`}>
                  {isActive ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span className="text-red-500 border border-red-900/30 bg-red-900/10 px-4 py-1 rounded-md text-[16px] font-bold uppercase mb-4 inline-block">
                        {service.title || `Service ${index + 1}`}
                      </span>
                      <p
                        className="text-gray-400 text-sm md:text-base mb-8 max-w-md leading-relaxed line-clamp-6"
                        dangerouslySetInnerHTML={{ __html: service.description }}
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-10 rounded-full transition-all uppercase text-xs tracking-[2px]"
                      >
                        Know More
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.p
                      layout
                      className="text-white font-bold whitespace-nowrap md:rotate-[-90deg] md:mb-12 md:mt-auto"
                    >
                      {(service.title || '').substring(0, 12)}...
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ServicesComponent;