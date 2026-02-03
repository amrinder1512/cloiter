import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import HeroAnimation from '../components/HeroAnimation';
import { fetchServices } from '../features/servicesSlice';

const ServiceDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { items: services, loading, error } = useSelector((state) => state.services);

    const service = services.find(s => String(s.id) === String(id));
    useEffect(() => {
        if (services.length === 0 && !loading) {
            dispatch(fetchServices());
        }
    }, [dispatch, services.length, loading]);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);
    if (loading || (services.length === 0 && !error)) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mb-4"></div>
                    <p className="text-gray-500 animate-pulse">Loading service details...</p>
                </div>
            </div>
        );
    }

    // 2. Show error if the API call actually failed
    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-10">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Error loading data</h2>
                <p className="text-gray-600 mb-6">{error}</p>
                <button onClick={() => window.location.reload()} className="bg-gray-800 text-white px-6 py-2 rounded-full">
                    Try Again
                </button>
            </div>
        );
    }
    if (!service) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Service not found</h2>
                <button
                    onClick={() => navigate('/services')}
                    className="bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition"
                >
                    Back to Services
                </button>
            </div>
        );
    }

    return (
        <div className="font-sans text-gray-800 bg-gray-50">
            {/* Hero Section */}
            <section className="bg-[#434242] py-24 text-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row justify-between items-center">
                    <div className="md:max-w-xl mb-10 md:mb-0">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">{service.title}</h1>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            {service.excerpt}
                        </p>
                    </div>
                    <div className="flex-1 flex justify-center w-full">
                        {/* Abstract Circle */}
                        <section className="flex justify-center items-center h-[300px] md:h-auto bg-[#434242]">
                            <HeroAnimation />
                        </section>
                    </div>
                </div>
            </section>

            {/* Section 1: Introduction Text */}
            <section className="py-1 bg-white">
                <div className="max-w-7xl mx-auto px-5">
                    <div className="text-lg text-gray-600 leading-loose space-y-6 max-w-4xl">
                        <p className="service-content-html max-w-4xl" dangerouslySetInnerHTML={{ __html: service.description }}></p>
                    </div>
                </div>
            </section>

            {/* Section 2: Dark List Section */}
            <section className="py-20 bg-[#434242] text-white">
                <div className="max-w-7xl mx-auto px-5">
                    <h2 className="text-3xl font-semibold mb-10 max-w-5xl">{service.pointHeading}</h2>
                    <div className="grid md:grid-cols-2 gap-10">
                        <ul className="space-y-5">
                            {(service.points || []).slice(0, 6).map((item, i) => (
                                <li key={i} className="relative pl-7 text-gray-300 text-lg leading-relaxed">
                                    <span className="absolute left-0 top-2.5 w-2 h-2 bg-[#ff3333] rounded-full"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <ul className="space-y-5">
                            {(service.points || []).slice(6).map((item, i) => (
                                <li key={i} className="relative pl-7 text-gray-300 text-lg leading-relaxed">
                                    <span className="absolute left-0 top-2.5 w-2 h-2 bg-[#ff3333] rounded-full"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Section 3: Bottom Text Section */}
            <section className="py-4 bg-white">
                <div className="max-w-7xl mx-auto px-5">

                    <div className="text-lg text-gray-600 leading-loose space-y-6 max-w-4xl">
                        <p className="service-content-html max-w-4xl" dangerouslySetInnerHTML={{ __html: service.descriptionBottom }}></p>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default ServiceDetail;
