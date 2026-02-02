import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        companyOrganization: '',
        yourIdea: '',
        country: '',
        howCanWeHelp: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add your form submission logic here
    };

    return (
        <div className="bg-[#434242] min-h-screen pt-24 md:pt-28">
            {/* Hero Section - Get in Touch */}
            <section className="relative py-16 md:py-24 overflow-hidden">
                <div className="max-w-8xl mx-auto px-2">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        {/* Left - Illustration with Blending */}
                        <div className="w-full lg:w-1/2 flex justify-center">
                            <div className="relative w-full max-w-7xl">
                                <img
                                    src="/images/contact.jpg"
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
                                    Contact Us
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                                Get in touch
                            </h1>
                            <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation.
                            </p>
                            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                                SEND A MESSAGE
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="relative py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-5">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                        {/* Left - Form */}
                        <div>
                            <div className="mb-8">
                                <span className="bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-semibold inline-block mb-6">
                                    Contact Us
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                    Contact Us
                                </h2>
                                <p className="text-gray-300 text-base leading-relaxed">
                                    We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible. Whether you have a question, feedback, or just want to say hello, we're here to help.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
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
                                        name="companyOrganization"
                                        value={formData.companyOrganization}
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
                                        name="howCanWeHelp"
                                        value={formData.howCanWeHelp}
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
                                    className="bg-red-600 hover:bg-red-700 text-white px-10 py-3 rounded-full font-bold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl uppercase"
                                >
                                    Submit
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

                                {/* Location Pins */}
                                {/* Europe Pin */}
                                <div className="absolute top-[28%] left-[48%] transform -translate-x-1/2 -translate-y-1/2 group">
                                    <div className="relative">
                                        <div className="bg-white rounded-lg px-4 py-2 shadow-xl mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                            <p className="text-gray-800 font-semibold text-sm">Europe</p>
                                        </div>
                                        <div className="w-4 h-4 bg-red-600 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                                    </div>
                                </div>

                                {/* North America Pin */}
                                <div className="absolute top-[32%] left-[22%] transform -translate-x-1/2 -translate-y-1/2 group">
                                    <div className="relative">
                                        <div className="bg-white rounded-lg px-4 py-2 shadow-xl mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                            <p className="text-gray-800 font-semibold text-sm">North America</p>
                                        </div>
                                        <div className="w-4 h-4 bg-red-600 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                                    </div>
                                </div>

                                {/* Asia Pin */}
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

            {/* Info Cards Section */}
            <section className="py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Card 01 */}
                        <div className="bg-[#3a3a3a] border border-gray-600 rounded-lg p-6 hover:border-red-500 transition-all duration-300 group">
                            <div className="flex items-start gap-4">
                                <span className="text-4xl font-bold text-white/20 group-hover:text-red-500/30 transition-colors">
                                    01
                                </span>
                                <div className="flex-1">
                                    <h3 className="text-white font-bold text-lg mb-2">
                                        Lorem ipsum dolor sit amet
                                    </h3>
                                </div>
                            </div>
                        </div>

                        {/* Card 02 */}
                        <div className="bg-[#3a3a3a] border border-gray-600 rounded-lg p-6 hover:border-red-500 transition-all duration-300 group">
                            <div className="flex items-start gap-4">
                                <span className="text-4xl font-bold text-white/20 group-hover:text-red-500/30 transition-colors">
                                    02
                                </span>
                                <div className="flex-1">
                                    <h3 className="text-white font-bold text-lg mb-2">
                                        Lorem ipsum dolor sit amet
                                    </h3>
                                </div>
                            </div>
                        </div>

                        {/* Card 03 */}
                        <div className="bg-[#3a3a3a] border border-gray-600 rounded-lg p-6 hover:border-red-500 transition-all duration-300 group">
                            <div className="flex items-start gap-4">
                                <span className="text-4xl font-bold text-white/20 group-hover:text-red-500/30 transition-colors">
                                    03
                                </span>
                                <div className="flex-1">
                                    <h3 className="text-white font-bold text-lg mb-2">
                                        Lorem ipsum dolor sit amet
                                    </h3>
                                </div>
                            </div>
                        </div>

                        {/* Card 04 */}
                        <div className="bg-[#3a3a3a] border border-gray-600 rounded-lg p-6 hover:border-red-500 transition-all duration-300 group">
                            <div className="flex items-start gap-4">
                                <span className="text-4xl font-bold text-white/20 group-hover:text-red-500/30 transition-colors">
                                    04
                                </span>
                                <div className="flex-1">
                                    <h3 className="text-white font-bold text-lg mb-2">
                                        Lorem ipsum dolor sit amet
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Info Section */}
            <section className="py-16 md:py-20 border-t border-gray-600">
                <div className="max-w-7xl mx-auto px-5">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
                        Contact Info
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Phone */}
                        <div className="flex items-start gap-4 group">
                            <div className="w-3 h-3 bg-red-600 rounded-full mt-2 group-hover:scale-125 transition-transform"></div>
                            <div>
                                <p className="text-white text-lg font-semibold hover:text-red-500 transition-colors cursor-pointer">
                                    +123 456 7890
                                </p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-start gap-4 group">
                            <div className="w-3 h-3 bg-red-600 rounded-full mt-2 group-hover:scale-125 transition-transform"></div>
                            <div>
                                <p className="text-white text-lg font-semibold hover:text-red-500 transition-colors cursor-pointer">
                                    cloiter@gmail.com
                                </p>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="flex items-start gap-4 group">
                            <div className="w-3 h-3 bg-red-600 rounded-full mt-2 group-hover:scale-125 transition-transform"></div>
                            <div>
                                <p className="text-white text-lg font-semibold">
                                    2972 Westheimer Rd.<br />
                                    Santa Ana, Illinois 85486
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
