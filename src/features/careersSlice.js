import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

// Async thunk for fetching jobs
export const fetchJobs = createAsyncThunk(
    'careers/fetchJobs',
    async () => {
        try {
            const response = await api.get('/careers/ui');
            console.log("Fetched jobs data:", response.data);

            const data = response.data.data || response.data;

            if (!Array.isArray(data)) {
                // If it's not an array, look for jobs array inside
                return data.jobs || [];
            }

            return data.map((job, index) => ({
                id: job.id || index + 1,
                title: job.title || 'Job Title',
                description: job.description || 'Job description goes here...',
                department: job.department || 'General'
            }));
        } catch (error) {
            console.error('Fetch jobs error:', error);
            throw error;
        }
    }
);

const FALLBACK_JOBS = [
    { id: 1, title: 'UI/UX Designer', description: 'Join our creative team to build stunning interfaces.', department: 'Design' },
    { id: 2, title: 'Backend Developer', description: 'Scale our infrastructure with robust cloud solutions.', department: 'Technology' },
    { id: 3, title: 'Marketing Manager', description: 'Lead our growth strategies and digital campaigns.', department: 'Marketing' }
];

const careersSlice = createSlice({
    name: 'careers',
    initialState: {
        jobs: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.loading = false;
                state.jobs = action.payload;
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.jobs = FALLBACK_JOBS;
            });
    },
});

export default careersSlice.reducer;
