import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFooter } from '../features/footerSlice';
import { footerData } from '../data/footer';
import { addBaseUrl } from '../utils/api';

const Footer = () => {
    const dispatch = useDispatch();
    const { data: footer, loading, error } = useSelector((state) => state.footer);

    useEffect(() => {
        if (!footer && !loading) {
            dispatch(fetchFooter());
        }
    }, [dispatch, footer, loading]);

    // Use API data if available, otherwise fallback to static data
    const currentFooterData = footer || footerData;

    if (loading) {
        return (
            <footer className="mt-auto">
                <div className="bg-[#434242] text-white pt-10 md:pt-20 pb-5">
                    <div className="max-w-7xl mx-auto px-5 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600 mx-auto mb-4"></div>
                        <p className="text-gray-500">Loading footer...</p>
                    </div>
                </div>
            </footer>
        );
    }

    if (error) {
        // Still show footer with static data if API fails
        console.warn('Footer API error:', error);
    }
    return (
        <footer className="mt-auto">
            {/* Main Footer */}
            <div className="bg-[#434242] text-white pt-10 md:pt-20 pb-5">
                <div className="max-w-7xl mx-auto px-5 mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-24 text-center md:text-left">
                        <div>
                            <img src={currentFooterData.logo.src ? addBaseUrl(currentFooterData.logo.src) : "/images/logo-placeholder.jpg"} 
                            alt={currentFooterData.logo.alt} className="w-32 md:w-40 lg:w-56 h-auto mx-auto md:mx-0" />
                            <p className="text-gray-300 leading-relaxed mt-4 md:mt-0 md:ml-4 text-sm md:text-base">{currentFooterData.description}</p>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-400">Quick Links</h4>
                            <ul className="space-y-3">
                                {currentFooterData.quickLinks.map((link, index) => (
                                    <li key={index}><a href={link.href} className="text-gray-300 hover:text-white transition">{link.name}</a></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-400">Contact</h4>
                            <div className="space-y-3 text-gray-300">
                                <p>{currentFooterData.contact.address}</p>
                                <p>{currentFooterData.contact.city}</p>
                                <p>{currentFooterData.contact.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-5 border-t border-white/10 pt-5 text-center text-sm text-gray-500">
                    <p>{currentFooterData.copyright}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
