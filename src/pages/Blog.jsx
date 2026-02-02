import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBlogs } from '../features/blogSlice';
import HeroAnimation from '../components/HeroAnimation';

const Blog = () => {
    const dispatch = useDispatch();
    const { items: blogs, loading, error } = useSelector((state) => state.blog);

    useEffect(() => {
        dispatch(fetchBlogs());
    }, [dispatch]);

    return (
        <div className="bg-white min-h-screen">
            {/* 1. Hero Section */}
            <section className="bg-[#434242] pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-5 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="w-full md:w-1/2">
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4">
                                Our Blogs
                            </h1>
                        </div>
                        <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-10 md:mt-0">
                            <div className="w-full max-w-[400px]">
                                <HeroAnimation />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }}>
                </div>
            </section>

            {/* 2. Blog Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-5">
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {[1, 2, 3, 4].map(n => (
                                <div key={n} className="animate-pulse rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                                    <div className="w-full aspect-[16/10] bg-gray-200"></div>
                                    <div className="p-8">
                                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                                        <div className="h-4 bg-gray-100 rounded w-full mb-2"></div>
                                        <div className="h-4 bg-gray-100 rounded w-2/3"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : error && (!blogs || blogs.length === 0) ? (
                        <div className="text-center py-20">
                            <p className="text-red-600 text-lg mb-4 font-semibold">Error loading blogs: {error}</p>
                            <button onClick={() => dispatch(fetchBlogs())} className="text-[#434242] underline font-bold">Try again</button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
                            {blogs.map((blog) => (
                                <Link
                                    to={`/blog/${blog.id}`}
                                    key={blog.id}
                                    className="group rounded-3xl border border-gray-150 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 bg-white"
                                >
                                    {/* Image Container */}
                                    <div className="w-full aspect-[16/10] overflow-hidden relative">
                                        <img
                                            src={blog.image || '/images/blog-placeholder.jpg'}
                                            alt={blog.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 lg:p-10">
                                        <h3 className="text-2xl lg:text-3xl font-bold text-[#434242] mb-4 group-hover:text-red-600 transition-colors line-clamp-2">
                                            {blog.title}
                                        </h3>
                                        <p className="text-gray-500 text-base lg:text-lg leading-relaxed line-clamp-3">
                                            {blog.excerpt || blog.description?.substring(0, 150) + "..."}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Blog;
