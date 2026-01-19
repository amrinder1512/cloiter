import React from 'react';

const CTA = () => {
    return (
        <section className="bg-gradient-to-r from-[#dd0000] to-[#ff4444] py-12 md:py-16 relative overflow-hidden text-white">
            <div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row justify-between items-center relative z-10 gap-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center md:text-left">Ready to work with us ?</h2>
                <button className="bg-white text-[#cc0000] border-none py-3 px-6 md:px-8 rounded-full text-base md:text-lg font-bold cursor-pointer flex items-center gap-2 transition-transform hover:scale-105 shadow-lg group">
                    Get Started <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
            </div>
            {/* Decorative swirl */}
            <div className="absolute -right-12 -bottom-12 w-40 h-40 md:w-52 md:h-52 border-[15px] md:border-[20px] border-white/10 rounded-full"></div>
        </section>
    );
};

export default CTA;