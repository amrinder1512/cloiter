import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchServices } from '../features/servicesSlice';
import {
    fetchHeroSection,
    fetchTrustedBy,
    fetchProcess
} from '../features/homepageSlice';
import HeroAnimation from '../components/HeroAnimation';
import WebFeature from '../components/WebFeature';
import FAQ from '../components/FAQ';
import TestimonialSlider from '../components/TestimonialSlider';
import ServicesComponent from '../components/ServiceComponent';
import StatsFeature from '../components/StatsFeature';
import ThreePillarsSection from '../components/ThreePillar';
import HeroAnimationHome from '../components/HeroAnimationHome';
import Loader from '../components/Loader';
import { motion } from 'framer-motion';
import { addBaseUrl } from '../utils/api';

const Home = () => {
    const dispatch = useDispatch();
    const { items: services, loading, error } = useSelector((state) => state.services);

    // Get homepage sections from Redux store
    const { hero, trustedBy, process } = useSelector((state) => state.homepage);

    // Data for home sections with Redux fallbacks
    const heroData = hero.data || {};
    const trustedByData = trustedBy.data || {};
    const processData = process.data || {};

    useEffect(() => {
        // Fetch services if not already loaded
        if (services.length === 0) {
            dispatch(fetchServices());
        }

        // Fetch homepage sections if not already loaded
        if (!hero.data && !hero.loading) {
            dispatch(fetchHeroSection());
        }
        if (!trustedBy.data && !trustedBy.loading) {
            dispatch(fetchTrustedBy());
        }
        if (!process.data && !process.loading) {
            dispatch(fetchProcess());
        }
    }, [dispatch, services.length, hero.data, hero.loading, trustedBy.data, trustedBy.loading, process.data, process.loading]);

    // Use a subset of services for the homepage preview
    const featuredServices = services.slice(0, 3);

    if (loading) {
        return <Loader />;
    }

    if (error && (!services || services.length === 0)) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-500 flex-col gap-4">
                <p>Error: {error}</p>
                <button
                    onClick={() => dispatch(fetchServices())}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="font-sans antialiased text-gray-800">
            {/* Hero Section */}
            <section className="relative pb-12 overflow-hidden min-h-[600px] lg:min-h-[800px] flex items-center">
                {/* 1. Full Background Video Area */}
                <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
                    <HeroAnimationHome />
                    {/* Dark overlay for text readability */}
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>

                {/* 2. Technical Background Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none z-10"
                    style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }}>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-20 w-full">
                    <div className="flex flex-col md:flex-row items-center">
                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="flex-1 text-center md:text-left py-20"
                        >
                            <h1 className="text-white mb-6 leading-[1.1]">
                                <motion.span
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2, duration: 0.8 }}
                                    className="block text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
                                >
                                    {heroData.title}
                                </motion.span>
                                <motion.span
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4, duration: 0.8 }}
                                    className="block text-4xl md:text-5xl lg:text-6xl font-light tracking-wide mt-1"
                                >
                                    {heroData.title2}
                                </motion.span>
                            </h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                                className="text-gray-300 text-sm md:text-base leading-relaxed mb-10 max-w-md mx-auto md:mx-0"
                            >
                                {heroData.description}
                            </motion.p>

                            <Link to="/contact">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8, duration: 0.5 }}
                                    className="bg-[#E20613] hover:bg-red-700 text-white px-10 py-4 rounded-full text-sm font-bold uppercase tracking-widest transition-all shadow-xl"
                                >
                                    {heroData.buttonText}
                                </motion.button>
                            </Link>
                        </motion.div>

                        {/* Right Content - Empty spacer to keep layout balanced */}
                        <div className="flex-1 hidden md:block"></div>
                    </div>
                </div>
            </section>

            {/* 2. Trusted By Section (Moved outside to maintain visibility) */}
            <section className="bg-white py-12 border-b border-gray-100 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-center"
                    >
                        <div className="mb-10 text-center">
                            <motion.span
                                whileHover={{ scale: 1.05 }}
                                className="bg-gray-100 border border-gray-200 px-6 py-2 rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-gray-600 block cursor-default"
                            >
                                {trustedByData.badge}
                            </motion.span>
                        </div>

                        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 text-center pt-4">
                            {(trustedByData.testimonials || []).map((testimonial, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    className="flex flex-col items-center"
                                >
                                    <p className="text-gray-500 text-xs md:text-sm max-w-[200px] leading-relaxed italic">
                                        "{testimonial}"
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Process/What You Get Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-5">
                    <div className="text-center mb-16">
                        <div className="inline-block bg-gray-200 rounded-full px-6 py-2 mb-6">
                            <span className="text-gray-700 font-bold text-sm">{processData.badge}</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-brand-dark"> {processData.title}
                            <span className="text-red-600">{processData.title2}</span> </h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {(processData.cards || []).map((card, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2, duration: 0.5 }}
                                className="rounded-2xl overflow-hidden bg-[#333] shadow-xl group"
                            >
                                <div className="h-64 overflow-hidden">
                                    <img src={card.image ? addBaseUrl(card.image) : "/images/card-placeholder.jpg"}
                                        alt={card.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                </div>
                                <div className="p-8 relative">
                                    <h3 className="text-white text-2xl font-bold mb-3">{card.title}</h3>
                                    <p className="text-gray-400 mb-12 text-sm leading-relaxed">{card.description}</p>
                                    {/* <motion.button
                                        whileHover={{ scale: 1.1, backgroundColor: "#B91C1C" }}
                                        className="absolute bottom-6 right-6 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white transition"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                    </motion.button> */}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            <WebFeature />
            < ServicesComponent />
            <TestimonialSlider />
            <FAQ />
            <StatsFeature />
            <ThreePillarsSection />


        </div>

    );
};

export default Home;
