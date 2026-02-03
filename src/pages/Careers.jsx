import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs, fetchCareerPage } from '../features/careersSlice';
import HeroAnimation from '../components/HeroAnimation';

const Careers = () => {
    const dispatch = useDispatch();
    const { jobs, pageData, loading, error } = useSelector((state) => state.careers);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDepartments, setSelectedDepartments] = useState([]);

    useEffect(() => {
        dispatch(fetchJobs());
        dispatch(fetchCareerPage());
    }, [dispatch]);

    // Extract unique departments from jobs
    const departments = Array.from(new Set(jobs.map(job => job.department))).filter(Boolean);

    const handleCheckboxChange = (dept) => {
        if (selectedDepartments.includes(dept)) {
            setSelectedDepartments(selectedDepartments.filter(d => d !== dept));
        } else {
            setSelectedDepartments([...selectedDepartments, dept]);
        }
    };

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDept = selectedDepartments.length === 0 || selectedDepartments.includes(job.department);
        return matchesSearch && matchesDept;
    });

    return (
        <div className="bg-white min-h-screen">
            {/* 1. Hero Section */}
            <section className="bg-[#434242] pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-5 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="w-full md:w-1/2">
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4">
                                {pageData?.title || "Careers"}
                            </h1>
                        </div>
                        <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-10 md:mt-0">
                            <div className="w-full max-w-[400px]">
                                <HeroAnimation />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }}>
                </div>
            </section>

            {/* 2. Main Content Section */}
            <section className="py-20 relative">
                <div className="max-w-7xl mx-auto px-5">
                    <div className="flex flex-col lg:flex-row gap-12 relative">

                        {/* Left Sidebar - Filters */}
                        <div className="w-full lg:w-[350px] shrink-0">
                            <div className="bg-[#434242] rounded-2xl p-8 shadow-2xl sticky top-28">
                                <h2 className="text-2xl font-bold text-white mb-4">
                                    {pageData?.openPositionsTitle || "Open Positions"}
                                </h2>
                                <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                                    {pageData?.openPositionsDescription || "Browse our open positions and find the perfect role for you. We're always looking for talented individuals to join our team."}
                                </p>

                                {/* Search Bar */}
                                <div className="relative mb-10">
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-gray-500/30 border-none rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 outline-none transition-all"
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Departments */}
                                {departments.length > 0 && (
                                    <div>
                                        <h3 className="text-white font-bold text-xl mb-6">Department</h3>
                                        <div className="space-y-4">
                                            {departments.map((dept, index) => (
                                                <label key={index} className="flex items-center group cursor-pointer text-sm">
                                                    <div className="relative flex items-center justify-center shrink-0">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedDepartments.includes(dept)}
                                                            onChange={() => handleCheckboxChange(dept)}
                                                            className="peer appearance-none w-5 h-5 border border-gray-500 rounded bg-transparent checked:bg-red-600 checked:border-red-600 transition-all cursor-pointer"
                                                        />
                                                        <svg className="absolute w-3 h-3 text-white pointer-events-none hidden peer-checked:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                    </div>
                                                    <span className="ml-3 text-gray-300 group-hover:text-white transition-colors capitalize">
                                                        {dept}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Content - Job Listings */}
                        <div className="flex-1 min-h-[400px]">
                            {/* Floating 'V' Badge */}


                            {loading ? (
                                <div className="space-y-12">
                                    {[1, 2, 3].map(n => (
                                        <div key={n} className="animate-pulse border-b border-gray-100 pb-12">
                                            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                                            <div className="h-4 bg-gray-100 rounded w-2/3 mb-2"></div>
                                            <div className="h-4 bg-gray-100 rounded w-1/2 mb-8"></div>
                                            <div className="h-10 bg-gray-200 rounded-full w-32"></div>
                                        </div>
                                    ))}
                                </div>
                            ) : error && (!jobs || jobs.length === 0) ? (
                                <div className="text-center py-20">
                                    <p className="text-red-600 text-lg mb-4 font-semibold text-center">Error: {error}</p>
                                    <button
                                        onClick={() => dispatch(fetchJobs())}
                                        className="text-[#434242] underline font-bold"
                                    >
                                        Try again
                                    </button>
                                </div>
                            ) : filteredJobs.length > 0 ? (
                                <div className="space-y-12">
                                    {filteredJobs.map((job) => (
                                        <div key={job.id} className="group">
                                            <div className="pb-12 border-b border-gray-200 last:border-0 transition-all">
                                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                                    <h3 className="text-3xl font-bold text-[#434242] group-hover:text-red-600 transition-colors">
                                                        {job.title}
                                                    </h3>
                                                    {job.department && (
                                                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                                            {job.department}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-2xl">
                                                    {job.description}
                                                </p>
                                                <Link to={`/careers/${job.id}`} className="bg-red-600 hover:bg-[#434242] text-white px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest shadow-lg hover:shadow-2xl transform transition-all hover:-translate-y-1 active:scale-95 inline-block">
                                                    Apply Now
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20 text-gray-500">
                                    <p className="text-xl font-medium">No open positions found.</p>
                                    <p className="text-gray-400 mt-2">Adjust your filters or check back later.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Careers;
