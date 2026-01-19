import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWebFeature } from '../features/homepageSlice';

const WebFeature = () => {
    const dispatch = useDispatch();
    const { webFeature } = useSelector((state) => state.homepage);

    // Default fallback data
    const defaultData = {
        badge: "Lorem ipsum dolor sit amet",
        title: "Lorem ipsum dolor sit amet,",
        highlightedText: "consectetuer adipiscing elit.",
        features: [
            {
                title: "Lorem Ipsum has been the industry's",
                description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            },
            {
                title: "Lorem Ipsum has been the industry's",
                description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            },
            {
                title: "Lorem Ipsum has been the industry's",
                description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            }
        ],
        imageSrc: "/images/services.png",
        imageAlt: "Web Development"
    };

    useEffect(() => {
        if (!webFeature.data && !webFeature.loading) {
            dispatch(fetchWebFeature());
        }
    }, [dispatch, webFeature.data, webFeature.loading]);

    // Use API data if available, otherwise use fallback
    const data = webFeature.data || defaultData;
    const { badge, title, highlightedText, features, imageSrc, imageAlt } = data;

    // Show loading state
    if (webFeature.loading) {
        return (
            <section className="py-20 bg-[#a0a0a0]">
                <div className="max-w-7xl mx-auto px-5 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
                    <p className="text-white font-medium">Loading web features...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-[#a0a0a0]">
            <div className="max-w-7xl mx-auto px-5">
                <div className="text-center mb-16">
                    <div className="inline-block bg-[#333] rounded px-4 py-2 mb-4 shadow-lg">
                        <span className="text-white font-medium text-sm">{badge}</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white max-w-3xl mx-auto leading-tight">
                        {title} <span className="text-red-600">{highlightedText}</span>
                    </h2>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* Left Text Content */}
                    <div className="flex-1 space-y-10">
                        {features && features.map((item, index) => (
                            <div key={index}>
                                <h3 className="text-white text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-gray-100 text-sm leading-relaxed max-w-md">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Right Image/Illustration Content */}
                    <div className="flex-1 flex justify-center">
                        <div className="relative w-full max-w-md group">
                            <img
                                src={imageSrc}
                                alt={imageAlt}
                                className="rounded-xl w-full h-full object-contain brightness-90 contrast-95 mix-blend-luminosity opacity-80 transition-all duration-500 group-hover:opacity-90"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WebFeature;
