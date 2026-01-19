import React from 'react';

const StatsFeature = () => {
  return (
    <section className="bg-[#E5E5E5] py-20 px-6 relative overflow-hidden">
      {/* Background Decorative Lines (Simplified SVG) */}
      <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
        <svg width="400" height="400" viewBox="0 0 400 400">
          <path d="M0,400 Q200,0 400,400" fill="none" stroke="black" strokeWidth="0.5" />
          <path d="M0,380 Q200,-20 400,380" fill="none" stroke="black" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto text-center">
        <span className="bg-[#222] text-white text-[10px] px-3 py-1 rounded-md uppercase tracking-widest">
          Lorem ipsum dolor sit
        </span>
        <h2 className="text-3xl font-bold mt-4 mb-12 text-[#1a1a1a]">
          Lorem ipsum dolor sit <span className="text-red-600">adipiscing elit.</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Stats Card */}
          <div className="bg-transparent border border-red-500 rounded-2xl p-8 flex items-center gap-6">
            <h3 className="text-7xl font-black text-red-600">40%</h3>
            <p className="text-left text-xs text-gray-700 leading-relaxed">
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
              when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
          </div>

          {/* Blog/Info Card */}
          <div className="bg-[#3D3D3D] rounded-2xl p-10 text-left flex flex-col justify-between">
            <div>
              <h4 className="text-white font-semibold mb-4 leading-snug">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
              </h4>
              <p className="text-gray-400 text-xs leading-relaxed mb-8">
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold py-3 px-6 rounded-full w-max transition-all">
              READ BLOG
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default StatsFeature;