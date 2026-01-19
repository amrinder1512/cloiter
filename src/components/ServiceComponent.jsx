import React, { useState } from 'react';

const ServicesComponent = () => {
  // 1. Data Array - Add or remove items here easily
  const services = [
    {
      id: 1,
      tag: "Service 1",
      title: "Cloud Analytics Pro",
      description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.",
      icon: "☁️", // Replace with your SVG icon
    },
    {
      id: 2,
      tag: "Service 2",
      title: "Lorem Ipsum has been the industry's",
      description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      icon: "📈", 
    },
    {
      id: 3,
      tag: "Service 3",
      title: "Data Management Systems",
      description: "Standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.",
      icon: "🔒",
    },
  ];

  // 2. State to track which card is expanded (default to the middle one)
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <div className="bg-white min-h-screen py-16 px-4 font-sans">
      {/* Header Section */}
      <div className="text-center mb-12">
        <span className="bg-gray-200 text-gray-700 px-4 py-1 rounded-md text-sm">
          Lorem ipsum dolor sit amet
        </span>
        <h2 className="text-4xl font-bold mt-6 text-[#2D1B41]">
          Lorem ipsum dolor sit amet, consectetuer <br />
          <span className="text-red-600">adipiscing elit.</span>
        </h2>
      </div>

      {/* Dynamic Cards Container */}
      <div className="flex flex-row justify-center items-stretch gap-4 max-w-6xl mx-auto h-[500px]">
        {services.map((service, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={service.id}
              onClick={() => setActiveIndex(index)}
              className={`relative cursor-pointer transition-all duration-500 ease-in-out rounded-3xl overflow-hidden flex flex-col items-center justify-center p-8
                ${isActive ? 'flex-[2] bg-[#2A2A2A] border-none' : 'flex-1 bg-[#444444] border-2 border-transparent'}
                ${!isActive && 'hover:border-blue-400'} // Highlight effect like in your image
              `}
              style={{
                // Background pattern simulation
                backgroundImage: isActive ? 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.05) 0%, transparent 50%)' : 'none',
              }}
            >
              {/* Content for Active Card */}
              {isActive ? (
                <div className="w-full h-full flex flex-col items-start justify-center animate-fadeIn">
                  <div className="mb-6">
                     {/* Replace with your Cloud/Search SVG */}
                    <div className="w-20 h-20 border-2 border-white rounded-full flex items-center justify-center text-4xl">
                      {service.icon}
                    </div>
                  </div>
                  <span className="text-red-500 border border-red-900/30 bg-red-900/10 px-4 py-1 rounded-md text-sm mb-4">
                    {service.tag}
                  </span>
                  <h3 className="text-white text-2xl font-semibold mb-4 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-8 max-w-md">
                    {service.description}
                  </p>
                  <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-colors uppercase text-sm tracking-wider">
                    Know More
                  </button>
                </div>
              ) : (
                /* Content for Inactive Card */
                <div className="flex flex-col items-center gap-4">
                  <div className="text-4xl opacity-50 grayscale">{service.icon}</div>
                  <p className="text-white font-medium">Lorem ipsum</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServicesComponent;