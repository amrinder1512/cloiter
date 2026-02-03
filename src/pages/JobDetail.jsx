import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs, submitJobApplication, uploadResume } from '../features/careersSlice';
import HeroAnimation from '../components/HeroAnimation';

const JobDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { jobs, loading, error, applicationLoading, applicationSuccess, applicationError, uploadLoading } = useSelector((state) => state.careers);

    // Find job by ID. We handle both string/number IDs.
    const job = jobs.find(j => String(j.id) === String(id));

    // Ref for scrolling to form
    const formRef = useRef(null);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        coverLetter: '',
        portfolio: '',
        linkedin: '',
    });
    const [resumeFile, setResumeFile] = useState(null);

    useEffect(() => {
        if (jobs.length === 0 && !loading) {
            dispatch(fetchJobs());
        }
    }, [dispatch, jobs.length, loading]);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Handle form success
    useEffect(() => {
        if (applicationSuccess) {
            alert('Application submitted successfully!');
            // Reset form
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                coverLetter: '',
                portfolio: '',
                linkedin: '',
            });
            setResumeFile(null);
        }
    }, [applicationSuccess, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setResumeFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!resumeFile) {
            alert("Please upload your resume.");
            return;
        }

        try {
            // 1. Upload Resume
            const resumeResponse = await dispatch(uploadResume(resumeFile)).unwrap();

            // Extract fileUrl from response (based on user feedback: response.fileUrl)
            const resumeUrl = resumeResponse.fileUrl || resumeResponse.url || resumeResponse.path || resumeResponse;

            if (!resumeUrl || typeof resumeUrl !== 'string') {
                console.error("Resume upload failed to return a valid URL string", resumeResponse);
                alert("Failed to upload resume. Please try again.");
                return;
            }

            // 2. Submit Application with Resume URL
            const applicationData = {
                jobId: job?.id,
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                resume: resumeUrl,
                coverLetter: formData.coverLetter,
                portfolio: formData.portfolio,
                linkedin: formData.linkedin,
            };

            dispatch(submitJobApplication(applicationData));

        } catch (err) {
            console.error("Submission error:", err);
            // Error handling is managed by Redux state (applicationError / uploadError) mostly, 
            // but we can show an alert if upload failed specifically here
        }
    };

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    if (loading || (jobs.length === 0 && !error)) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mb-4"></div>
                </div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Job not found</h2>
                <button
                    onClick={() => navigate('/careers')}
                    className="bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition"
                >
                    Back to Careers
                </button>
            </div>
        );
    }

    return (
        <div className="font-sans text-gray-800 bg-gray-50 min-h-screen pb-20">
            {/* Hero Section */}
            <section className="bg-[#434242] py-20 md:py-32 text-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-5 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div className="md:w-2/3">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">{job.title}</h1>
                            <div className="flex items-center gap-4 text-sm md:text-base text-gray-300 uppercase tracking-widest font-semibold">
                                <span className="bg-red-600 px-3 py-1 text-white rounded-full text-xs">Full Time</span>

                                {job.department && (
                                    <>
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                                        <span>{job.department}</span>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="mt-8 md:mt-0 md:w-1/3 flex justify-end">
                            <HeroAnimation />
                        </div>
                    </div>
                </div>
                <div className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }}>
                </div>
            </section>

            {/* Job Description Content */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-5">

                    <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                        <h3 className="text-2xl font-bold text-[#434242] mb-6">About the Role</h3>
                        {/* Check if description is HTML or Text */}
                        {job.description.includes('<') ? (
                            <div dangerouslySetInnerHTML={{ __html: job.description }} />
                        ) : (
                            <p className="whitespace-pre-line">{job.description}</p>
                        )}
                    </div>

                    {/* <div className="mt-12 flex flex-col items-center text-center">
                        <button
                            onClick={scrollToForm}
                            className="bg-red-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-[#434242] transform transition-all hover:-translate-y-1 hover:shadow-2xl active:scale-95"
                        >
                            Apply Now
                        </button>
                    </div> */}

                </div>
            </section>

            {/* Application Form Section */}
            <section ref={formRef} className="py-20 bg-gray-100">
                <div className="max-w-3xl mx-auto px-5">
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                        <div className="mb-10 text-center">
                            <h2 className="text-3xl font-bold text-[#434242] mb-2">Apply for this Job</h2>
                            <p className="text-gray-500">Please fill out the form below to submit your application.</p>
                        </div>

                        {applicationError && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-8 border border-red-100 flex items-start gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p>{applicationError}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">First Name <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        required
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 transition-all outline-none"
                                        placeholder="John"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">Last Name <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        required
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 transition-all outline-none"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">Email Address <span className="text-red-500">*</span></label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 transition-all outline-none"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">Phone Number <span className="text-red-500">*</span></label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 transition-all outline-none"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">Resume/CV <span className="text-red-500">*</span></label>
                                <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 hover:border-red-400 transition-colors group cursor-pointer bg-gray-50/50">
                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        required
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <div className="space-y-2">
                                        <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto group-hover:bg-red-100 transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                            </svg>
                                        </div>
                                        <div className="text-gray-600">
                                            {resumeFile ? (
                                                <span className="font-semibold text-red-600">{resumeFile.name}</span>
                                            ) : (
                                                <>
                                                    <span className="text-red-600 font-medium">Click to upload</span> or drag and drop
                                                    <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX (Max 10MB)</p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">LinkedIn Profile</label>
                                <input
                                    type="url"
                                    name="linkedin"
                                    value={formData.linkedin}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 transition-all outline-none"
                                    placeholder="https://linkedin.com/in/username"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">Portfolio URL <span className="font-normal text-gray-400">(Optional)</span></label>
                                <input
                                    type="url"
                                    name="portfolio"
                                    value={formData.portfolio}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 transition-all outline-none"
                                    placeholder="https://yourwebsite.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">Cover Letter <span className="font-normal text-gray-400">(Optional)</span></label>
                                <textarea
                                    name="coverLetter"
                                    value={formData.coverLetter}
                                    onChange={handleInputChange}
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 transition-all outline-none resize-none"
                                    placeholder="Tell us why you're a great fit..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={applicationLoading || uploadLoading}
                                className="w-full bg-red-600 hover:bg-[#434242] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transform transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed text-lg"
                            >
                                {applicationLoading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>{uploadLoading ? "Uploading Resume..." : "Submitting..."}</span>
                                    </div>
                                ) : (
                                    "Submit Application"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default JobDetail;
