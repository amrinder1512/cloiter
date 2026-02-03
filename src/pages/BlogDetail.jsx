import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogById, clearCurrentItem } from '../features/blogSlice';
import HeroAnimation from '../components/HeroAnimation';
import { addBaseUrl } from '../utils/api';

const BlogDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { currentItem: blog, loading, error } = useSelector((state) => state.blog);

    useEffect(() => {
        dispatch(fetchBlogById(id));
        return () => dispatch(clearCurrentItem());
    }, [id, dispatch]);

    if (loading) {
        return (
            <div className="bg-white min-h-screen pt-32 animate-pulse">
                <div className="bg-[#434242] h-[300px] mb-20"></div>
                <div className="max-w-4xl mx-auto px-5">
                    <div className="h-10 bg-gray-200 rounded w-3/4 mb-10"></div>
                    <div className="h-[400px] bg-gray-100 rounded-3xl mb-10"></div>
                    <div className="space-y-4">
                        <div className="h-4 bg-gray-100 rounded w-full"></div>
                        <div className="h-4 bg-gray-100 rounded w-full"></div>
                        <div className="h-4 bg-gray-100 rounded w-2/3"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error && !blog) {
        return (
            <div className="bg-white min-h-screen flex flex-col items-center justify-center px-5">
                <p className="text-red-600 text-xl font-bold mb-6">Error: {error}</p>
                <Link to="/blog" className="text-[#434242] underline font-bold">Back to Blog</Link>
            </div>
        );
    }

    if (!blog) return null;

    return (
        <div className="bg-white min-h-screen">
            {/* 1. Hero Section */}
            <section className="bg-[#434242] pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-5 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="w-full md:w-2/3">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-[1.2]">
                                <span className="relative inline-block pb-2 border-b-4 border-blue-400">
                                    {blog.title}
                                </span>
                            </h1>
                        </div>
                        <div className="w-full md:w-1/3 flex justify-center md:justify-end mt-10 md:mt-0">
                            <div className="w-full max-w-[300px] opacity-60">
                                <HeroAnimation />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }}>
                </div>
            </section>

            {/* 2. Blog Body */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-5">
                    {/* Featured Image */}
                    <div className="w-full aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl mb-16 border-8 border-white">
                        <img
                             src={blog.image ? addBaseUrl(blog.image) : "/images/blog-placeholder.jpg"}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Content Detail */}
                    <div className="prose prose-lg lg:prose-xl prose-gray max-w-none">
                        <div className="text-gray-600 leading-relaxed space-y-8 text-lg lg:text-xl">
                            {/* Rendering dynamic content from API */}
                            {blog.description && (
                                <div dangerouslySetInnerHTML={{ __html: blog.description }} />
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. CTA Section - Ready to work with us? */}

        </div>
    );
};

export default BlogDetail;
