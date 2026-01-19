import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFAQs } from '../features/faqSlice';

const FAQ = () => {
    const dispatch = useDispatch();
    const { items: faqs, loading, error } = useSelector((state) => state.faqs);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (faqs.length === 0 && !loading) {
            dispatch(fetchFAQs());
        }
    }, [dispatch, faqs.length, loading]);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    if (loading) {
        return (
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-5 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading FAQs...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-5 text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Error loading FAQs</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button onClick={() => dispatch(fetchFAQs())} className="bg-gray-800 text-white px-6 py-2 rounded-full">
                        Try Again
                    </button>
                </div>
            </section>
        );
    }

    const questions = faqs.length > 0 ? faqs : [
        {
            question: "Lorem ipsum has been the industry's?",
            answer: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
        {
            question: "Aenean commodo ligula eget dolor?",
            answer: "Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim."
        },
        {
            question: "Cum sociis natoque penatibus et magnis dis?",
            answer: "In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium."
        },
        {
            question: "Donec quam felis, ultricies nec, pellentesque eu?",
            answer: "Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus."
        },
        {
            question: "Aenean commodo ligula eget dolor.?",
            answer: "Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus."
        },
    ];

    // const toggleFAQ = (index) => {
    //     setActiveIndex(activeIndex === index ? null : index);
    // };

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-5">
                <div className="text-center mb-16">
                    <div className="inline-block bg-gray-200 rounded-full px-6 py-2 mb-6">
                        <span className="text-gray-700 font-bold text-sm">FAQs</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-brand-dark">
                        Frequently Asked <span className="text-red-600">Questions</span>
                    </h2>
                </div>

                <div className="bg-[#434242] rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        {/* FAQ List */}
                        <div className="flex-1 w-full space-y-2">
                            {questions.map((item, index) => (
                                <div key={index} className="border-b border-gray-600 last:border-0">
                                    <button
                                        onClick={() => toggleFAQ(index)}
                                        className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
                                    >
                                        <h3 className={`text-lg md:text-xl font-bold transition-colors ${activeIndex === index ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                                            {item.question}
                                        </h3>
                                        <span className={`ml-4 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border transition-all ${activeIndex === index ? 'border-white text-white' : 'border-gray-500 text-gray-500 group-hover:border-white group-hover:text-white'}`}>
                                            {activeIndex === index ? (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg>
                                            ) : (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                                            )}
                                        </span>
                                    </button>
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${activeIndex === index ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}
                                    >
                                        <p className="text-gray-400 text-sm leading-relaxed pr-8">
                                            {item.answer}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Image Section */}
                        <div className="flex-1 w-full flex justify-center lg:justify-end relative">
                            {/* Decorative blob/shape if possible, else standard image */}
                            <div className="relative w-full max-w-md h-[400px] flex justify-center items-center">
                                {/* Rounded Hexagon Image using SVG ClipPath */}
                                <svg viewBox="0 0 200 200" className="w-full h-full filter drop-shadow-2xl relative z-10" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <clipPath id="roundedHex">
                                            {/* Path defining a rounded hexagon shape */}
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

                                {/* Decorative elements */}
                                <div className="absolute top-10 -right-10 w-20 h-20 border-4 border-red-500/30 rounded-full animate-pulse blur-xl"></div>
                                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
