import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrivacyPolicy } from '../features/policySlice';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
    const dispatch = useDispatch();
    const { privacyPolicy, loading, error } = useSelector((state) => state.policy);

    useEffect(() => {
        dispatch(fetchPrivacyPolicy());
    }, [dispatch]);

    return (
        <div className="bg-white min-h-screen pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-5">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                        </div>
                    ) : error ? (
                        <div className="text-red-500 py-10">Error: {error}</div>
                    ) : (
                        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
                            {privacyPolicy ? (
                                <div dangerouslySetInnerHTML={{ __html: privacyPolicy.content || privacyPolicy }} />
                            ) : (
                                <p>Last updated: February 3, 2026</p>
                            )}

                            {!privacyPolicy && (
                                <>
                                    <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">1. Information We Collect</h2>
                                    <p>We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support.</p>

                                    <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">2. How We Use Your Information</h2>
                                    <p>We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect our company and our users.</p>

                                    <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">3. Information Sharing</h2>
                                    <p>We do not share your personal information with companies, organizations, or individuals outside of Cloiter except in the following cases: with your consent, for external processing, or for legal reasons.</p>
                                </>
                            )}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
