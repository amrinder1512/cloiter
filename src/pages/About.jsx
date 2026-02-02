import React from 'react';
import HeroAnimation from '../components/HeroAnimation';

const About = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-[#434242] pt-24 md:pt-28 pb-16 md:pb-20">
                <div className="max-w-7xl mx-auto px-5">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                        {/* Left - Text */}
                        <div className="w-full lg:w-1/2">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                                About Us
                            </h1>
                            <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
                                Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                        </div>

                        {/* Right - Graphic */}
                        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                            <div className="relative w-64 h-64 md:w-80 md:h-80">
                               <div className="flex-1 w-full relative min-h-[500px] md:min-h-[600px]">
                        <HeroAnimation   />
                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-5">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Left - Content */}
                        <div>
                            <div className="inline-block mb-6">
                                <span className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold">
                                    Our Story
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                <span className="text-gray-900">Lorem ipsum dolor sit amet,</span>
                                <br />
                                <span className="text-blue-600">consectetur adipiscing elit.</span>
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus accumsan
                                    purus sit amet libero venenatis, quis consectetur nibh rhoncus. Fusce vel
                                    sapien elit. In malesuada semper mi, nec tincidunt dolor fermentum ac.
                                    Pellentesque id eros quis massa convallis feugiat eu quis urna.
                                </p>
                                <p>
                                    Donec sollicitudin molestie malesuada. Curabitur non nulla sit amet nisl
                                    tempus convallis quis ac lectus. Vivamus magna justo, lacinia eget
                                    consectetur sed, convallis at tellus. Proin eget tortor risus. Curabitur
                                    aliquet quam id dui posuere blandit. Cras ultricies ligula sed magna dictum porta.
                                </p>
                                <p>
                                    Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac
                                    diam sit amet quam vehicula elementum sed sit amet dui. Praesent sapien
                                    massa, convallis a pellentesque nec, egestas non nisi. Pellentesque in
                                    ipsum id orci porta dapibus. Curabitur arcu erat, accumsan id imperdiet et,
                                    porttitor at sem.
                                </p>
                            </div>
                        </div>

                        {/* Right - Image with Decoration */}
                        <div className="relative flex justify-center lg:justify-end">
                            <div className="relative">
                                {/* Circular decoration */}
                                <div className="absolute -right-8 -top-8 w-72 h-72 md:w-96 md:h-96 rounded-full border-[3px] border-red-400 opacity-50"></div>
                                <div className="absolute -right-12 -top-12 w-72 h-72 md:w-96 md:h-96 rounded-full border-[3px] border-red-300 opacity-30"></div>

                                {/* Team Photo */}
                                <div className="relative z-10 w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl">
                                    <img
                                        src="/images/team-photo.png"
                                        alt="Our Team"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Vision Section */}
            <section className="py-16 md:py-24 bg-[#3a3a3a]">
                <div className="max-w-7xl mx-auto px-5">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Left - Content */}
                        <div>
                            <div className="inline-block mb-6">
                                <span className="bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-semibold">
                                    Our Vision
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                Lorem ipsum dolor sit amet
                            </h2>
                            <div className="space-y-4 text-gray-300 leading-relaxed">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus accumsan
                                    purus sit amet libero venenatis, quis consectetur nibh rhoncus. Fusce vel
                                    sapien elit. In malesuada semper mi, nec tincidunt dolor fermentum ac.
                                </p>
                                <p>
                                    Donec sollicitudin molestie malesuada. Curabitur non nulla sit amet nisl
                                    tempus convallis quis ac lectus. Vivamus magna justo, lacinia eget
                                    consectetur sed, convallis at tellus. Proin eget tortor risus. Curabitur
                                    aliquet quam id dui posuere blandit. Cras ultricies ligula sed magna dictum porta.
                                </p>
                            </div>
                        </div>

                        {/* Right - Vision Icon */}
                        <div className="flex justify-center lg:justify-end">
                            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
                                <img
                                    src="/images/about2.png"
                                    alt="Our Vision"
                                    className="w-full h-full object-contain drop-shadow-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Mission Section */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-5">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Left - Mission Icon */}
                        <div className="flex justify-center lg:justify-start order-2 lg:order-1">
                            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
                                <img
                                    src="/images/about3.png"
                                    alt="Our Mission"
                                    className="w-full h-full object-contain drop-shadow-xl"
                                />
                            </div>
                        </div>

                        {/* Right - Content */}
                        <div className="order-1 lg:order-2">
                            <div className="inline-block mb-6">
                                <span className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold">
                                    Our Mission
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Lorem ipsum dolor sit amet
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus accumsan
                                    purus sit amet libero venenatis, quis consectetur nibh rhoncus. Fusce vel
                                    sapien elit. In malesuada semper mi, nec tincidunt dolor fermentum ac.
                                    Pellentesque id eros quis massa convallis feugiat eu quis urna.
                                </p>
                                <p>
                                    Donec sollicitudin molestie malesuada. Curabitur non nulla sit amet nisl
                                    tempus convallis quis ac lectus. Vivamus magna justo, lacinia eget
                                    consectetur sed, convallis at tellus. Proin eget tortor risus. Curabitur
                                    aliquet quam id dui posuere blandit. Cras ultricies ligula sed magna dictum porta.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
