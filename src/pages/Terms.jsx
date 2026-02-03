import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTermsConditions } from '../features/policySlice';
import { motion } from 'framer-motion';

const Terms = () => {
    const dispatch = useDispatch();
    const { termsConditions, loading, error } = useSelector((state) => state.policy);

    useEffect(() => {
        dispatch(fetchTermsConditions());
    }, [dispatch]);

    return (
        <div className="bg-white min-h-screen pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-5 pb-24 ">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms and Conditions</h1>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                        </div>
                    ) : error ? (
                        <div className="text-red-500 py-10">Error: {error}</div>
                    ) : (
                        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
                            <p className="text-sm text-gray-500 mb-6 italic">Last updated: {termsConditions?.updatedAt ? new Date(termsConditions.updatedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '02 Feb 2026'}</p>

                            {termsConditions ? (
                                <div dangerouslySetInnerHTML={{ __html: termsConditions.description || termsConditions }} />
                            ) : (
                                <>
                                    <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">1. Acceptance of Terms</h2>
                                    <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>

                                    <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">2. Use License</h2>
                                    <p>Permission is granted to temporarily download one copy of the materials (information or software) on Cloiter's website for personal, non-commercial transitory viewing only.</p>

                                    <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">3. Disclaimer</h2>
                                    <p>The materials on Cloiter's website are provided on an 'as is' basis. Cloiter makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
                                </>
                            )}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Terms;
