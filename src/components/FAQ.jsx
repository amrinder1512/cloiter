import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFAQs } from '../features/faqSlice';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
    const dispatch = useDispatch();
    const { items: faqs, loading, error } = useSelector((state) => state.faqs);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        // Only fetch if we don't have items and aren't already loading
        if ((!faqs || faqs.length === 0) && !loading) {
            dispatch(fetchFAQs());
        }
    }, [dispatch, faqs, loading]);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    if (loading) {
        return (
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-5 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mx-auto mb-4"></div>
                    <p className="text-gray-500 font-medium">Loading FAQs...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-5 text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-2">Error loading FAQs</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={() => dispatch(fetchFAQs())}
                        className="bg-gray-800 text-white px-8 py-3 rounded-full hover:bg-gray-900 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-5">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-block bg-gray-100 rounded-full px-6 py-2 mb-6 border border-gray-200">
                        <span className="text-gray-700 font-bold text-sm">FAQs</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-[#1a1a1a]">
                        Frequently Asked <span className="text-red-600">Questions</span>
                    </h2>
                </motion.div>

                {/* Main Dark Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="bg-[#434242] rounded-[40px] p-8 md:p-16 shadow-2xl relative"
                >
                    <div className="flex flex-col lg:flex-row gap-16 items-center lg:items-start">

                        {/* FAQ List */}
                        <div className="flex-[1.5] w-full space-y-2 order-2 lg:order-1">
                            {faqs && faqs.length > 0 ? (
                                faqs.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1, duration: 0.5 }}
                                        className="border-b border-gray-600/50 last:border-0"
                                    >
                                        <button
                                            onClick={() => toggleFAQ(index)}
                                            className="w-full py-6 flex justify-between items-start text-left focus:outline-none group"
                                        >
                                            <h3 className={`text-lg md:text-xl font-bold transition-colors pr-4 ${activeIndex === index ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                                                {item.question}
                                            </h3>
                                            <motion.span
                                                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                                                  transition={{ duration: 0.15, ease: "easeInOut" }}
                                                className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-300 ${activeIndex === index ? 'border-red-500 bg-red-500 text-white' : 'border-gray-500 text-gray-500 group-hover:border-white group-hover:text-white'}`}
                                            >
                                                {activeIndex === index ? (
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg>
                                                ) : (
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                                                )}
                                            </motion.span>
                                        </button>

                                        <AnimatePresence>
                                            {activeIndex === index && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="text-gray-400 text-base leading-relaxed max-w-2xl pb-8">
                                                        {item.answer}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))
                            ) : (
                                <p className="text-gray-400">No FAQs available at the moment.</p>
                            )}
                        </div>

                        {/* Image Section */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="flex-1 w-full order-1 lg:order-2"
                        >
                            <div className="relative w-full aspect-square max-w-[400px] mx-auto lg:ml-auto">
                                <motion.div
                                    whileHover={{ scale: 1.05, rotate: -2 }}
                                    className="relative z-10 w-full h-full"
                                >
                                    <svg viewBox="0 0 200 200" className="w-full h-full filter drop-shadow-2xl" xmlns="http://www.w3.org/2000/svg">
                                        <defs>
                                            <clipPath id="roundedHex">
                                                <path d="M50 5 L150 5 Q160 5 165 13 L195 87 Q200 95 195 103 L165 187 Q160 195 150 195 L50 195 Q40 195 35 187 L5 103 Q0 95 5 87 L35 13 Q40 5 50 5 Z" />
                                            </clipPath>
                                        </defs>
                                        <image
                                            href="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                            width="100%"
                                            height="100%"
                                            preserveAspectRatio="xMidYMid slice"
                                            clipPath="url(#roundedHex)"
                                        />
                                    </svg>
                                </motion.div>

                                <div className="absolute top-0 -right-4 w-24 h-24 bg-red-600/20 rounded-full blur-2xl animate-pulse"></div>
                                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl"></div>
                            </div>
                        </motion.div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FAQ;