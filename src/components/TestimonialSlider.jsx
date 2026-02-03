import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTestimonials } from '../features/homepageSlice';
import { motion, AnimatePresence } from 'framer-motion';

const TestimonialSlider = () => {
    const dispatch = useDispatch();
    const { testimonials } = useSelector((state) => state.homepage);

    // Default fallback data
    const defaultData = {
        badge: "Our Testimonials",
        title: "What Our Clients Are",
        highlightedTitle: "Saying",
        testimonials: [
            {
                text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            },
            {
                text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
            },
            {
                text: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.",
            }
        ]
    };

    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0); // 1 for next, -1 for prev

    useEffect(() => {
        if (!testimonials.data && !testimonials.loading) {
            dispatch(fetchTestimonials());
        }
    }, [dispatch, testimonials.data, testimonials.loading]);

    // Use API data if available, otherwise use fallback
    const data = testimonials.data || defaultData;
    const { badge, title, highlightedTitle, testimonials: testimonialsData } = data;
    const displayTestimonials = testimonialsData || defaultData.testimonials;

    const next = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev === displayTestimonials.length - 1 ? 0 : prev + 1));
    }, [displayTestimonials.length]);

    const prev = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev === 0 ? displayTestimonials.length - 1 : prev - 1));
    }, [displayTestimonials.length]);

    // Auto-advance logic
    useEffect(() => {
        const timer = setInterval(() => {
            next();
        }, 5000); // Change every 5 seconds

        return () => clearInterval(timer);
    }, [next]);

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
            scale: 0.9
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 100 : -100,
            opacity: 0,
            scale: 0.9
        })
    };

    // Show loading state
    if (testimonials.loading) {
        return (
            <section className="py-6 bg-[#434242]">
                <div className="max-w-5xl mx-auto px-5 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mx-auto mb-4"></div>
                    <p className="text-gray-300 font-medium">Loading testimonials...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-6 bg-[#434242] relative overflow-hidden">
            {/* Background Pattern */}
           

            <div className="max-w-5xl mx-auto px-2 text-center relative z-10">
                {/* Pill Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-block bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-6 py-2 mb-6 shadow-xl"
                >
                    <span className="text-gray-300 font-medium text-sm tracking-widest uppercase">{badge}</span>
                </motion.div>

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl font-bold text-white mb-2 leading-tight"
                >
                    {title} <span className="text-red-600">{highlightedTitle}</span>
                </motion.h2>

                {/* Slider Container */}
                <div className="relative px-4 md:px-0 py-2 min-h-[400px] flex flex-col items-center justify-center">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.5 }
                            }}
                            className="absolute w-full flex flex-col items-center"
                        >
                            {/* Quotes Icon */}
                            <div className="flex justify-center mb-2">
                                <div className="bg-red-600/10 p-5 rounded-2xl border border-red-600/20">
                                    <svg className="w-12 h-12 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                                    </svg>
                                </div>
                            </div>

                            <p className="text-xl md:text-3xl text-gray-100 leading-relaxed font-normal max-w-4xl italic">
                                "{displayTestimonials[currentIndex].text}"
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    {/* Nav Buttons */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-0 md:-mx-16 lg:-mx-24">
                        <button
                            onClick={prev}
                            className="pointer-events-auto group bg-white/5 hover:bg-red-600 transition-all duration-300 p-4 rounded-full border border-white/10 hover:border-red-600 shadow-lg backdrop-blur-sm"
                            aria-label="Previous"
                        >
                            <svg className="w-8 h-8 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={next}
                            className="pointer-events-auto group bg-white/5 hover:bg-red-600 transition-all duration-300 p-4 rounded-full border border-white/10 hover:border-red-600 shadow-lg backdrop-blur-sm"
                            aria-label="Next"
                        >
                            <svg className="w-8 h-8 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-4 mt-12">
                    {displayTestimonials.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                setDirection(idx > currentIndex ? 1 : -1);
                                setCurrentIndex(idx);
                            }}
                            className={`h-1.5 transition-all duration-300 rounded-full ${idx === currentIndex ? 'w-12 bg-red-600' : 'w-4 bg-gray-600 hover:bg-gray-400'}`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialSlider;

