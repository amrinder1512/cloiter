import React, { useEffect } from 'react';
import HeroAnimation from '../components/HeroAnimation';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAboutPage } from '../features/aboutSlice';
import { addBaseUrl } from '../utils/api';

const removeNbsp = (html) => {
    if (!html) return "";
    return html.replace(/&nbsp;/g, ' ');
};

const About = () => {
    const dispatch = useDispatch();
    const { data, loading } = useSelector((state) => state.about);

    useEffect(() => {
        dispatch(fetchAboutPage());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const content = data || {};
    console.log('About Page Content:', content);
    const hero = content.heroSection || {};
    const story = content.storySection || {};
    const vision = content.visionSection || {};
    const mission = content.missionSection || {};

    return (
        <div className="bg-white min-h-screen overflow-hidden">
            {/* Hero Section */}
            <section className="bg-[#434242] pt-24 md:pt-28 pb-16 md:pb-20">
                <div className="max-w-7xl mx-auto px-5">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                        {/* Left - Text */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="w-full lg:w-1/2"
                        >
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                                {hero.title || "About Us"}
                            </h1>
                            <div
                                className="text-gray-300 text-lg leading-relaxed max-w-xl"
                                dangerouslySetInnerHTML={{ __html: removeNbsp(hero.description || "Welcome to our story.") }}
                            />
                        </motion.div>

                        {/* Right - Graphic */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="w-full lg:w-1/2 flex justify-center lg:justify-end"
                        >
                            <div className="relative w-64 h-64 md:w-80 md:h-80">
                                <div className="flex-1 w-full relative min-h-[500px] md:min-h-[600px]">
                                    <HeroAnimation />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-5">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Left - Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-block mb-6">
                                <span className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold">
                                    {story.badge || "Our Story"}
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                                {story.title}
                            </h2>
                            <div
                                className="space-y-4 text-gray-600 leading-relaxed max-w-xl md:max-w-2xl"
                                dangerouslySetInnerHTML={{ __html: removeNbsp(story.description) }}
                            />
                        </motion.div>

                        {/* Right - Image with Decoration */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="relative flex justify-center lg:justify-end"
                        >
                            <div className="relative">
                                {/* Circular decoration */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="absolute -right-8 -top-8 w-72 h-72 md:w-96 md:h-96 rounded-full border-[3px] border-red-400 opacity-50"
                                ></motion.div>
                                <motion.div
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                    className="absolute -right-12 -top-12 w-72 h-72 md:w-96 md:h-96 rounded-full border-[3px] border-red-300 opacity-30"
                                ></motion.div>

                                {/* Team Photo */}
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="relative z-10 w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl"
                                >
                                    <img
                                        src={story.image ? addBaseUrl(story.image) : "/images/team-photo.png"}
                                        alt="Our Team"
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Our Vision Section */}
            <section className="py-16 md:py-24 bg-[#3a3a3a]">
                <div className="max-w-7xl mx-auto px-5">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Left - Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-block mb-6">
                                <span className="bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-semibold">
                                    {vision.badge || "Our Vision"}
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                {vision.title}
                            </h2>
                            <div
                                className="space-y-4 text-gray-300 leading-relaxed max-w-xl md:max-w-2xl"
                                dangerouslySetInnerHTML={{ __html: removeNbsp(vision.description) }}
                            />
                        </motion.div>

                        {/* Right - Vision Icon */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex justify-center lg:justify-end"
                        >
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center"
                            >
                                <img
                                    src={vision.image ? addBaseUrl(vision.image) : "/images/about2.png"}
                                    alt="Our Vision"
                                    className="w-full h-full object-contain drop-shadow-2xl"
                                />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Our Mission Section */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-5">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Left - Mission Icon */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex justify-center lg:justify-start order-2 lg:order-1"
                        >
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: -5 }}
                                className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center"
                            >
                                <img
                                    src={mission.image ? addBaseUrl(mission.image) : "/images/about3.png"}
                                    alt="Our Mission"
                                    className="w-full h-full object-contain drop-shadow-xl"
                                />
                            </motion.div>
                        </motion.div>

                        {/* Right - Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="order-1 lg:order-2"
                        >
                            <div className="inline-block mb-6">
                                <span className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold">
                                    {mission.badge || "Our Mission"}
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                {mission.title}
                            </h2>
                            <div
                                className="text-gray-600 leading-relaxed mb-4 max-w-xl md:max-w-2xl"
                                dangerouslySetInnerHTML={{ __html: removeNbsp(mission.description) }}
                            />
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
