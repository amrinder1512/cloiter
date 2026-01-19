import React, { useState } from 'react';

const TestimonialSlider = () => {
    const testimonials = [
        {
            text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
            text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
        },
        {
            text: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.",
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const prev = () => {
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const next = () => {
        setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    return (
        <section className="py-6 bg-[#434242] relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute opacity-10 pointer-events-none top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 md:w-[500px] md:h-[500px]">
               <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
<path d="M19.5872 12.4095L9.6 33.4815V51.5903H30.0144V32.3839H22.2224L30.0144 12.4095H19.5872ZM26.9664 35.4319V48.5407H12.6496V34.1679L21.5184 15.4591H25.5536L17.7648 35.4303H26.9664V35.4319Z" fill="#E20000"/>
<path d="M43.9727 12.4095L33.9855 33.4815V51.5903H54.3999V32.3839H46.6063L54.3999 12.4095H43.9727ZM51.3519 35.4319V48.5407H37.0351V34.1679L45.9023 15.4591H49.9375L42.1487 35.4303H51.3519V35.4319Z" fill="#E20000"/>
</svg>
            </div>

            <div className="max-w-5xl mx-auto px-5 text-center relative z-10">
                {/* Pill Badge */}
                <div className="inline-block bg-[#333] border border-gray-600 rounded-full px-6 py-2 mb-8 shadow-lg">
                    <span className="text-gray-300 font-medium text-sm tracking-wide">Our Testimonials</span>
                </div>

                {/* Heading */}
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-16">
                    What Our Clients Are <span className="text-red-600">Saying</span>
                </h2>

                {/* Slider Container */}
                <div className="relative px-8 md:px-20 py-8">
                    {/* Quotes Icon */}
                    <div className="flex justify-center mb-6">
                        <svg className="w-12 h-12 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                        </svg>
                    </div>

                    <div className="min-h-[150px] flex items-center justify-center">
                        <p className="text-lg md:text-2xl text-gray-200 leading-relaxed font-light transition-all duration-300">
                            "{testimonials[currentIndex].text}"
                        </p>
                    </div>

                    {/* Nav Buttons */}
                    <button
                        onClick={prev}
                        className="absolute top-1/2 left-0 md:-left-12 transform -translate-y-1/2 text-gray-500 hover:text-white transition p-2 hover:scale-110"
                        aria-label="Previous"
                    >
                        <svg className="w-10 h-10 md:w-16 md:h-16" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
                        </svg>
                    </button>
                    <button
                        onClick={next}
                        className="absolute top-1/2 right-0 md:-right-12 transform -translate-y-1/2 text-gray-500 hover:text-white transition p-2 hover:scale-110"
                        aria-label="Next"
                    >
                        <svg className="w-10 h-10 md:w-16 md:h-16" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                        </svg>
                    </button>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mt-8">
                    {testimonials.map((_, idx) => (
                        <div key={idx} className={`w-2 h-2 rounded-full ${idx === currentIndex ? 'bg-red-600' : 'bg-gray-600'}`} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialSlider;
