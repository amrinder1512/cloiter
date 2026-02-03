import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStatsFeature } from '../features/homepageSlice';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';

const Counter = ({ value }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  // Extract number
  const numericValue = parseInt(value, 10) || 0;

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, numericValue, {
        duration: 2,
        ease: "easeOut"
      });
      return controls.stop;
    }
  }, [numericValue, count, isInView]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

const StatsFeature = () => {
  const dispatch = useDispatch();
  const { statsFeature } = useSelector((state) => state.homepage);

  // Default fallback data
  const defaultData = {
    badge: "Lorem ipsum dolor sit",
    title: "Lorem ipsum dolor sit",
    highlightedText: "adipiscing elit.",
    statValue: "40%",
    statDescription: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    blogTitle: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
    blogDescription: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    blogButtonText: "READ BLOG"
  };

  useEffect(() => {
    if (!statsFeature.data && !statsFeature.loading) {
      dispatch(fetchStatsFeature());
    }
  }, [dispatch, statsFeature.data, statsFeature.loading]);

  // Use API data if available, otherwise use fallback
  const data = statsFeature.data || defaultData;
  const { badge, title, highlightedText, statValue, statDescription, blogTitle, blogDescription, blogButtonText } = data;

  // Extract suffix to keep it static (like %)
  const suffix = statValue.replace(/[0-9]/g, '');

  // Show loading state
  if (statsFeature.loading) {
    return (
      <div className="max-w-6xl mx-auto text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mx-auto mb-4"></div>
        <p className="text-gray-500 font-medium">Loading stats...</p>
      </div>
    );
  }

  return (
    <section className="bg-[#E5E5E5] py-20 px-6 relative overflow-hidden">
      {/* Background Decorative Lines (Simplified SVG) */}
      <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
        <svg width="400" height="400" viewBox="0 0 400 400">
          <path d="M0,400 Q200,0 400,400" fill="none" stroke="black" strokeWidth="0.5" />
          <path d="M0,380 Q200,-20 400,380" fill="none" stroke="black" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="bg-[#222] text-white text-[10px] px-3 py-1 rounded-md uppercase tracking-widest">
            {badge}
          </span>
          <h2 className="text-3xl font-bold mt-4 mb-12 text-[#1a1a1a]">
            {title} <span className="text-red-600">{highlightedText}</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="bg-transparent border border-red-500 rounded-2xl p-8 flex items-center gap-6"
          >
            <h3 className="text-7xl font-black text-red-600">
              <Counter value={statValue} />{suffix}
            </h3>
            <p className="text-left text-xs text-gray-700 leading-relaxed">
              {statDescription}
            </p>
          </motion.div>

          {/* Blog/Info Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            className="bg-[#3D3D3D] rounded-2xl p-10 text-left flex flex-col justify-between"
          >
            <div>
              <h4 className="text-white font-semibold mb-4 leading-snug">
                {blogTitle}
              </h4>
              <p className="text-gray-400 text-xs leading-relaxed mb-8">
                {blogDescription}
              </p>
            </div>
            <Link to="/blog">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#B91C1C" }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-600 text-white text-[10px] font-bold py-3 px-6 rounded-full w-max transition-all"
              >
                {blogButtonText || "READ BLOG"}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default StatsFeature;
