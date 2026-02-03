import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchServices } from '../features/servicesSlice';
import { fetchServicesHeader } from '../features/homepageSlice';
import CTA from '../components/CTA';
import HeroAnimation from '../components/HeroAnimation';
import WebFeature from '../components/WebFeature';
import { addBaseUrl } from '../utils/api';

const Service = () => {
    const dispatch = useDispatch();
    const { items: services, loading, error } = useSelector((state) => state.services);
    const { servicesHeader } = useSelector((state) => state.homepage);

    console.log(" services:", services);

    useEffect(() => {
        if (services.length === 0) {
            dispatch(fetchServices());
        }
        if (!servicesHeader.data && !servicesHeader.loading) {
            dispatch(fetchServicesHeader());
        }
    }, [dispatch, services.length, servicesHeader.data, servicesHeader.loading]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>;
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-500 flex-col gap-4">
                <p>Error: {error}</p>
                <button
                    onClick={() => dispatch(fetchServices())}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Retry
                </button>
            </div>
        );
    }

    const headerTitle = servicesHeader?.data?.title || "Our Services";

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
            {/* Hero Section */}
            <section className="bg-[#434242] py-20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row justify-between items-center relative z-10 gap-4 lg:gap-48">
                    <div className="text-white mb-0 md:mb-0 lg:mb-8">
                        <h1 className="text-4xl md:text-6xl font-bold">{headerTitle}</h1>
                    </div>
                    <div className="flex-1 w-full">
                        {/* Abstract Circle */}
                        <section className="flex justify-center items-center h-[300px] md:h-auto sm:h-auto bg-[#434242]">
                            <HeroAnimation />
                        </section>
                    </div>
                </div>
            </section>

            {/* Services Grid Section */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-5 md:px-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
                        {services.map((service, index) => (
                            <Link to={`/services/${service.id}`} key={service.id} className="group block h-full">
                                <div className="h-full rounded-2xl overflow-hidden shadow-xl bg-white border border-gray-100 transition-transform duration-300 group-hover:-translate-y-2 flex flex-col">
                                    <div className="bg-[#434242] py-12 flex justify-start items-center">
                                        <img src={service.icon ? addBaseUrl(service.icon) : "/images/Vector.png"}
                                         alt={service.title} className="w-[80px] h-[50px] md:w-[110px] md:h-[70px] ml-2 md:ml-5" />
                                    </div>
                                    <div className="p-8 flex-1 flex flex-col gap-3">
                                        <h4 className="text-2xl font-bold text-gray-900">{service.title}</h4>
                                        {/* <p className="text-[18px] text-black font-bold tracking-widest ">
                                            Services {(index + 1).toString().padStart(2, '0')}
                                        </p> */}
                                        <p className="text-gray-600 line-clamp-3">
                                            {service.excerpt}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Middle Text Section */}
            <WebFeature />


        </div>
    );
};

export default Service;
