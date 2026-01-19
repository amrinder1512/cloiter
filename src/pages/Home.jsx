import React, { useEffect } from 'react';
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

const Home = () => {
    const dispatch = useDispatch();
    const { items: services, loading, error } = useSelector((state) => state.services);

    // Get homepage sections from Redux store
    const { hero, trustedBy, process } = useSelector((state) => state.homepage);

    // Fallback data for hero section
    const defaultHeroData = {
        title: "We Help you",
        title2: "to grow your Business",
        description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        buttonText: "Get Started"
    };

    // Fallback data for trusted by section
    const defaultTrustedByData = {
        badge: "Trusted by Clients across the globe",
        testimonials: [
            "Lorem ipsum dolor sit amet, adipiscing elit.",
            "Lorem ipsum dolor sit amet, adipiscing elit.",
            "Lorem ipsum dolor sit amet, adipiscing elit."
        ]
    };

    // Fallback data for process section
    const defaultProcessData = {
        badge: "What you get and How we do it",
        title: "Lorem ipsum dolor sit amet, consectetuer <span class=\"text-red-600\">adipiscing elit.</span>",
        cards: [
            {
                image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                alt: "Meeting",
                title: "Lorem ipsum",
                description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa."
            },
            {
                image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                alt: "Team",
                title: "Lorem ipsum",
                description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa."
            },
            {
                image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                alt: "Office",
                title: "Lorem ipsum",
                description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa."
            }
        ]
    };

    // Use API data if available, otherwise use fallback
    const heroData = hero.data || defaultHeroData;
    const trustedByData = trustedBy.data || defaultTrustedByData;
    const processData = process.data || defaultProcessData;

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
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (error) {
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
            <section className="relative pt-32 md:pt-24 lg:pt-32 pb-12 bg-[#434242] overflow-hidden">
                {/* 1. Technical Background Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }}>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between">

                    {/* Left Content */}
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-white mb-6 leading-[1.1]">
                            <span className="block text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                                {heroData.title}
                            </span>
                            <span className="block text-4xl md:text-5xl lg:text-6xl font-light tracking-wide mt-1">
                                {heroData.title2}
                            </span>
                        </h1>

                        <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-10 max-w-md mx-auto md:mx-0">
                            {heroData.description}
                        </p>

                        <button className="bg-[#E20613] hover:bg-red-700 text-white px-10 py-4 rounded-full text-sm font-bold uppercase tracking-widest transition-all transform hover:scale-105 shadow-xl">
                            {heroData.buttonText}
                        </button>
                    </div>

                    {/* Right Animation Area */}
                    <div className="flex-1 w-full flex justify-center items-center mt-12 md:mt-0 relative">
                        <div className="w-full max-w-[500px] aspect-square flex justify-center items-center">
                            <HeroAnimation />
                        </div>

                        {/* Floating 'V' badge from Image 2 */}

                    </div>
                </div>

                {/* 2. Trusted By Section (Fixed Spacing) */}
                <div className="max-w-7xl mx-auto mt-20 px-6">
                    <div className="flex flex-col items-center">
                        <div className="mb-10">
                            <span className="bg-[#2D2D2D] border border-gray-600 px-6 py-2 rounded-lg text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-gray-300">
                                {trustedByData.badge}
                            </span>
                        </div>

                        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 text-center border-t border-gray-600/30 pt-10">
                            {trustedByData.testimonials.map((testimonial, i) => (
                                <div key={i} className="flex flex-col items-center">
                                    <p className="text-gray-400 text-xs md:text-sm max-w-[200px] leading-relaxed">
                                        {testimonial}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Process/What You Get Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-5">
                    <div className="text-center mb-16">
                        <div className="inline-block bg-gray-200 rounded-full px-6 py-2 mb-6">
                            <span className="text-gray-700 font-bold text-sm">{processData.badge}</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-brand-dark"> {processData.title }
                         <span className="text-red-600">{ processData.title2 }</span> </h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {processData.cards.map((card, index) => (
                            <div key={index} className="rounded-2xl overflow-hidden bg-[#333] shadow-xl group">
                                <div className="h-64 overflow-hidden">
                                    <img src={card.image} alt={card.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                </div>
                                <div className="p-8 relative">
                                    <h3 className="text-white text-2xl font-bold mb-3">{card.title}</h3>
                                    <p className="text-gray-400 mb-12 text-sm leading-relaxed">{card.description}</p>
                                    <button className="absolute bottom-6 right-6 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                    </button>
                                </div>
                            </div>
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
