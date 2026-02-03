import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContactPage, submitContactForm, resetSubmitStatus } from '../features/contactSlice';
import { addBaseUrl } from '../utils/api';
import Loader from '../components/Loader';

const Contact = () => {
    const dispatch = useDispatch();
    const { pageContent, loading, submitting, submitSuccess, error } = useSelector((state) => state.contact);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        company: '',
        inquiryType: '',
        yourIdea: '',
        country: '',
        message: ''
    });

    useEffect(() => {
        dispatch(fetchContactPage());
    }, [dispatch]);

    useEffect(() => {
        if (submitSuccess) {
            // alert('Thank you for contacting us! We will get back to you soon.');
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                company: '',
                inquiryType: '',
                yourIdea: '',
                country: '',
                message: ''
            });
            // dispatch(resetSubmitStatus()); // Moved to Popup Close
        }
    }, [submitSuccess, dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(submitContactForm(formData));
    };

    const closePopup = () => {
        dispatch(resetSubmitStatus());
    };

    if (loading) {
        return <Loader />;
    }

    const content = pageContent || {};
    const hero = content.heroSection || {};
    const formSec = content.formSection || {};
    const points = content.points || [];
    const contactInfos = content.bottomSection || {}; // It's an object, not array

    return (
        <div className="bg-[#434242] min-h-screen pt-24 md:pt-28 relative">
            {/* Hero Section - Get in Touch */}
            <section className="relative py-16 md:py-24 overflow-hidden">
                <div className="max-w-8xl mx-auto px-2">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        {/* Left - Illustration with Blending */}
                        <div className="w-full lg:w-1/2 flex justify-center">
                            <div className="relative w-full max-w-7xl">
                                <img
                                    src={hero.image ? addBaseUrl(hero.image) : "/images/contact.jpg"}
                                    alt="Get in touch illustration"
                                    className="w-full h-auto drop-shadow-3xl"
                                    style={{
                                        mixBlendMode: 'multiply',
                                        opacity: 1.9,
                                        filter: 'contrast(0.9) brightness(1.1)',
                                        maskImage: 'radial-gradient(circle, black 100%, transparent 95%)',
                                        WebkitMaskImage: 'radial-gradient(circle, black 100%, transparent 95%)'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Right - Content */}
                        <div className="w-full lg:w-1/2 text-center lg:text-left">
                            <div className="inline-block mb-4">
                                <span className="bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-semibold">
                                    {hero.badge || "Contact Us"}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                                {hero.title || "Get in touch"}
                            </h1>
                            <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                                {hero.description || "We'd love to hear from you."}
                            </p>
                            <button
                                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                {hero.buttonText || "SEND A MESSAGE"}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section id="contact-form" className="relative py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-5">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                        {/* Left - Form */}
                        <div>
                            <div className="mb-8">
                                <span className="bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-semibold inline-block mb-6">
                                    {formSec.badge || "Get In Touch"}
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                    {formSec.title || "Contact Us"}
                                </h2>
                                <p className="text-gray-300 text-base leading-relaxed">
                                    {formSec.description || "Fill out the form below and we'll get back to you soon."}
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {error && <div className="text-red-500 mb-4">{error}</div>}

                                {/* Inquiry Type */}
                                <div>
                                    <label className="block text-white text-sm font-semibold mb-2">
                                        INQUIRY TYPE*
                                    </label>
                                    <select
                                        name="inquiryType"
                                        value={formData.inquiryType}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-[#3a3a3a] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="">Select an inquiry type...</option>
                                        <option value="General Inquiry">General Inquiry</option>
                                        <option value="Project Proposal">Project Proposal</option>
                                        <option value="Partnership">Partnership</option>
                                        <option value="Careers">Careers</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                {/* First Name */}
                                <div>
                                    <label className="block text-white text-sm font-semibold mb-2">
                                        FIRST NAME*
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="Enter name..."
                                        required
                                        className="w-full bg-[#3a3a3a] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                                    />
                                </div>

                                {/* Last Name */}
                                <div>
                                    <label className="block text-white text-sm font-semibold mb-2">
                                        LAST NAME*
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Enter name..."
                                        required
                                        className="w-full bg-[#3a3a3a] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                                    />
                                </div>

                                {/* Email Address */}
                                <div>
                                    <label className="block text-white text-sm font-semibold mb-2">
                                        EMAIL ADDRESS*
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter email..."
                                        required
                                        className="w-full bg-[#3a3a3a] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                                    />
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <label className="block text-white text-sm font-semibold mb-2">
                                        PHONE NUMBER
                                    </label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        placeholder="Enter phone number..."
                                        className="w-full bg-[#3a3a3a] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                                    />
                                </div>

                                {/* Company/Organization */}
                                <div>
                                    <label className="block text-white text-sm font-semibold mb-2">
                                        COMPANY/ORGANIZATION*
                                    </label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        placeholder="Enter company..."
                                        required
                                        className="w-full bg-[#3a3a3a] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                                    />
                                </div>

                                {/* Your Idea/Problem */}
                                <div>
                                    <label className="block text-white text-sm font-semibold mb-2">
                                        YOUR IDEA/PROBLEM
                                    </label>
                                    <textarea
                                        name="yourIdea"
                                        value={formData.yourIdea}
                                        onChange={handleChange}
                                        placeholder="Tell us about your idea..."
                                        rows="4"
                                        className="w-full bg-[#3a3a3a] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all resize-none"
                                    />
                                </div>

                                {/* Country/Region */}
                                <div>
                                    <label className="block text-white text-sm font-semibold mb-2">
                                        COUNTRY/REGION*
                                    </label>
                                    <select
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-[#3a3a3a] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="">Select a country...</option>
                                        <option value="USA">United States</option>
                                        <option value="UK">United Kingdom</option>
                                        <option value="Canada">Canada</option>
                                        <option value="Australia">Australia</option>
                                        <option value="India">India</option>
                                        <option value="Germany">Germany</option>
                                        <option value="France">France</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                {/* How can we help you */}
                                <div>
                                    <label className="block text-white text-sm font-semibold mb-2">
                                        HOW CAN WE HELP YOU?*
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Describe how we can help..."
                                        rows="4"
                                        required
                                        className="w-full bg-[#3a3a3a] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all resize-none"
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className={`bg-red-600 hover:bg-red-700 text-white px-10 py-3 rounded-full font-bold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl uppercase ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {submitting ? 'Submitting...' : 'Submit'}
                                </button>
                            </form>
                        </div>

                        {/* Right - World Map with Location Pins */}
                        <div className="relative flex items-center justify-center">
                            <div className="relative w-full max-w-2xl">
                                {/* World Map Background */}
                                <img
                                    src="/images/world-map.png"
                                    alt="World Map"
                                    className="w-full h-auto opacity-40"
                                />

                                {/* Location Pins - Kept static/decorative for now as API doesn't seem to provide coordinates */}
                                <div className="absolute top-[28%] left-[48%] transform -translate-x-1/2 -translate-y-1/2 group">
                                    <div className="relative">
                                        <div className="bg-white rounded-lg px-4 py-2 shadow-xl mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                            <p className="text-gray-800 font-semibold text-sm">Europe</p>
                                        </div>
                                        <div className="w-4 h-4 bg-red-600 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                                    </div>
                                </div>
                                <div className="absolute top-[32%] left-[22%] transform -translate-x-1/2 -translate-y-1/2 group">
                                    <div className="relative">
                                        <div className="bg-white rounded-lg px-4 py-2 shadow-xl mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                            <p className="text-gray-800 font-semibold text-sm">North America</p>
                                        </div>
                                        <div className="w-4 h-4 bg-red-600 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                                    </div>
                                </div>
                                <div className="absolute top-[35%] left-[70%] transform -translate-x-1/2 -translate-y-1/2 group">
                                    <div className="relative">
                                        <div className="bg-white rounded-lg px-4 py-2 shadow-xl mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                            <p className="text-gray-800 font-semibold text-sm">Asia</p>
                                        </div>
                                        <div className="w-4 h-4 bg-red-600 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Info Cards Section - Points from API */}
            {points.length > 0 && (
                <section className="py-16 md:py-20">
                    <div className="max-w-7xl mx-auto px-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {points.map((point, index) => (
                                <div key={point._id || index} className="bg-[#3a3a3a] border border-gray-600 rounded-lg p-6 hover:border-red-500 transition-all duration-300 group">
                                    <div className="flex items-start gap-4">
                                        <span className="text-4xl font-bold text-white/20 group-hover:text-red-500/30 transition-colors">
                                            {(index + 1).toString().padStart(2, '0')}
                                        </span>
                                        <div className="flex-1">
                                            <h3 className="text-white font-bold text-lg mb-2">
                                                {point.type}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Contact Info Section - Bottom Section from API */}
            {Object.keys(contactInfos).length > 0 && (
                <section className="py-16 md:py-20 border-t border-gray-600">
                    <div className="max-w-7xl mx-auto px-5">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
                            Contact Info
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Render specific keys we want from bottomSection */}
                            {contactInfos.number && (
                                <div className="flex items-start gap-4 group">
                                    <div className="w-3 h-3 bg-red-600 rounded-full mt-2 group-hover:scale-125 transition-transform flex-shrink-0"></div>
                                    <div>
                                        <h4 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-1">Phone</h4>
                                        <p className="text-white text-lg font-semibold hover:text-red-500 transition-colors cursor-pointer break-all">
                                            {contactInfos.number}
                                        </p>
                                    </div>
                                </div>
                            )}
                            {contactInfos.email && (
                                <div className="flex items-start gap-4 group">
                                    <div className="w-3 h-3 bg-red-600 rounded-full mt-2 group-hover:scale-125 transition-transform flex-shrink-0"></div>
                                    <div>
                                        <h4 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-1">Email</h4>
                                        <p className="text-white text-lg font-semibold hover:text-red-500 transition-colors cursor-pointer break-all">
                                            {contactInfos.email}
                                        </p>
                                    </div>
                                </div>
                            )}
                            {contactInfos.address && (
                                <div className="flex items-start gap-4 group">
                                    <div className="w-3 h-3 bg-red-600 rounded-full mt-2 group-hover:scale-125 transition-transform flex-shrink-0"></div>
                                    <div>
                                        <h4 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-1">Address</h4>
                                        <p className="text-white text-lg font-semibold hover:text-red-500 transition-colors cursor-pointer break-words">
                                            {contactInfos.address}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Success Modal */}
            <AnimatePresence>
                {submitSuccess && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                            onClick={closePopup}
                        ></motion.div>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-[#333333] border border-white/10 w-full max-w-md rounded-2xl shadow-2xl relative z-10 p-8 text-center"
                        >
                            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-3">Message Sent!</h3>
                            <p className="text-gray-300 mb-8">
                                Thank you for contacting us. We have received your message and will get back to you shortly.
                            </p>

                            <button
                                onClick={closePopup}
                                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold text-sm w-full transition-all duration-300 shadow-lg"
                            >
                                CLOSE
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Contact;
