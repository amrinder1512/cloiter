import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

// Async thunk for fetching all blogs
export const fetchBlogs = createAsyncThunk(
    'blog/fetchBlogs',
    async () => {
        try {
            const response = await api.get('/article');
            console.log("Fetched blogs data:", response.data);
            const data = response.data.data || response.data;
            if (Array.isArray(data)) {
                return data.map(blog => ({
                    ...blog,
                    id: blog.id || blog._id
                }));
            }
            return data;
        } catch (error) {
            console.error('Fetch blogs error:', error);
            throw error;
        }
    }
);

// Async thunk for fetching a single blog
export const fetchBlogById = createAsyncThunk(
    'blog/fetchBlogById',
    async (id) => {
        try {
            const response = await api.get(`/article/${id}`);
            console.log("Fetched blog detail:", response.data);
            const data = response.data.data || response.data;
            return {
                ...data,
                id: data.id || data._id
            };
        } catch (error) {
            console.error('Fetch blog detail error:', error);
            throw error;
        }
    }
);

const FALLBACK_BLOGS = [
    {
        id: 1,
        title: 'The Future of AI in Business',
        excerpt: 'How artificial intelligence is reshaping modern enterprises.',
        description: '<p>Artificial Intelligence is no longer a futuristic concept but a present-day reality driving massive efficiency in businesses. From automated customer service to predictive analytics, AI helps companies make better decisions faster.</p><p>In the coming years, we expect to see even deeper integration of machine learning models into everyday business processes, specifically in supply chain optimization and personalized marketing strategies.</p>',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800'
    },
    {
        id: 2,
        title: 'Cybersecurity Trends 2026',
        excerpt: 'Key threats and solutions for the upcoming year.',
        description: '<p>As digital footprints expand, so do the risks. 2026 is seeing a shift towards "Zero Trust" architectures as the standard for enterprise security. With the rise of quantum computing threats, new encryption standards are being developed.</p><p>Protecting data is now a board-level priority, requiring a combination of advanced software solutions and continuous employee training to mitigate social engineering attacks.</p>',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800'
    },
    {
        id: 3,
        title: 'Web Development Best Practices',
        excerpt: 'A guide to building modern, accessible websites.',
        description: '<p>Modern web development is about more than just code; it\'s about creating inclusive digital experiences. Performance optimization remains critical, with Core Web Vitals driving search rankings and user satisfaction.</p><p>Developers are also focusing more on accessibility (A11y), ensuring that web applications are usable by everyone, regardless of their physical abilities or device type.</p>',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800'
    }
];

const blogSlice = createSlice({
    name: 'blog',
    initialState: {
        items: [],
        currentItem: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearCurrentItem: (state) => {
            state.currentItem = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // All Blogs
            .addCase(fetchBlogs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                // state.items = []; // Keep empty so error shows
            })
            // Single Blog
            .addCase(fetchBlogById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBlogById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentItem = action.payload;
            })
            .addCase(fetchBlogById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                // state.currentItem = null; // Keep null so error shows
            });
    },
});

export const { clearCurrentItem } = blogSlice.actions;
export default blogSlice.reducer;
