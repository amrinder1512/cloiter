import React from 'react';

const WebFeature = ({
    badge = "Lorem ipsum dolor sit amet",
    title = "Lorem ipsum dolor sit amet,",
    highlightedText = "consectetuer adipiscing elit.",
    features = [
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
    imageSrc = "/images/services.png",
    imageAlt = "Web Development"
}) => {
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
                        {features.map((item, index) => (
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
                            {/* Optional: Subtle shadow to give depth while blended */}
                            {/* <div className="absolute inset-0 rounded-xl shadow-inner pointer-events-none "></div> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WebFeature;
