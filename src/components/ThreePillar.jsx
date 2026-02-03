import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchThreePillars } from '../features/homepageSlice';
import { motion } from 'framer-motion';

const ThreePillarsSection = () => {
  const dispatch = useDispatch();
  const { pillars } = useSelector((state) => state.homepage);

  // Default fallback data
  const defaultData = {
    badge: "Lorem ipsum dolor sit amet",
    title: "Lorem ipsum dolor sit amet, consectetuer",
    highlightedText: "adipiscing elit.",
    pillars: [
      { title: "People", desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s." },
      { title: "Process", desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s." },
      { title: "Technology", desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s." }
    ]
  };

  useEffect(() => {
    if (!pillars.data && !pillars.loading) {
      dispatch(fetchThreePillars());
    }
  }, [dispatch, pillars.data, pillars.loading]);

  // Use API data if available, otherwise use fallback
  const data = pillars.data || defaultData;
  const { badge, title, highlightedText, pillars: pillarsData } = data;
  const displayPillars = pillarsData || defaultData.pillars;

  // Show loading state
  if (pillars.loading) {
    return (
      <section className="bg-white py-12 md:py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">Loading pillars...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-12 md:py-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="bg-gray-200 text-gray-600 text-[10px] px-4 py-1 rounded-md uppercase tracking-wider inline-block">
            {badge || "Lorem ipsum dolor sit amet"}
          </span>

          <h2 className="text-2xl md:text-3xl font-bold mt-4 mb-10 md:mb-16 text-[#2D1B41] leading-tight">
            {title || "Lorem ipsum dolor sit amet, consectetuer"} <br className="hidden md:block" />
            <span className="text-red-600">{highlightedText || "adipiscing elit."}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {displayPillars.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="border border-gray-200 rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col bg-white"
            >
              {/* Icon Section (Dark) */}
              <div className="bg-[#444444] py-10 md:py-12 flex justify-center group overflow-hidden">
                <motion.svg
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="w-16 h-16 md:w-20 md:h-20 text-white opacity-90 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </motion.svg>
              </div>

              {/* Text Section (White) */}
              <div className="p-6 md:p-8 text-left flex-grow">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.desc} when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThreePillarsSection;
