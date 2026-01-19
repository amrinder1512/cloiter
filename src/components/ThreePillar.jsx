const ThreePillarsSection = () => {
  const data = [
    { title: "People", desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s." },
    { title: "Process", desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s." },
    { title: "Technology", desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s." }
  ];

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <span className="bg-gray-200 text-gray-600 text-[10px] px-4 py-1 rounded-md uppercase tracking-wider">
          Lorem ipsum dolor sit amet
        </span>
        <h2 className="text-3xl font-bold mt-4 mb-16 text-[#2D1B41]">
          Lorem ipsum dolor sit amet, consectetuer <br />
          <span className="text-red-600">adipiscing elit.</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {data.map((item, idx) => (
            <div key={idx} className="border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {/* Icon Section (Dark) */}
              <div className="bg-[#444444] py-12 flex justify-center">
                <svg className="w-20 h-20 text-white opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              {/* Text Section (White) */}
              <div className="p-8 text-left bg-white">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.desc} when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ThreePillarsSection;