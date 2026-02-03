import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

// Async thunk for fetching career page content
export const fetchCareerPage = createAsyncThunk(
    'careers/fetchPageContent',
    async () => {
        try {
            const response = await api.get('/career');
            return response.data.data || response.data;
        } catch (error) {
            console.error('Fetch career page error:', error);
            throw error;
        }
    }
);

// Async thunk for fetching jobs
export const fetchJobs = createAsyncThunk(
    'careers/fetchJobs',
    async () => {
        try {
            const response = await api.get('/jobs');
            console.log("Fetched jobs data:", response.data);

            const data = response.data.data || response.data;

            if (!Array.isArray(data)) {
                // If it's not an array, look for jobs array inside
                return data.jobs || [];
            }

            return data.map((job, index) => ({
                id: job.id || job._id || index + 1,
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

export const submitJobApplication = createAsyncThunk(
    'careers/submitApplication',
    async (data, { rejectWithValue }) => {
        try {
            // data is now a plain object with resume URL, not FormData
            const response = await api.post('/job-application', data);
            return response.data;
        } catch (error) {
            console.error('Job application error:', error);
            // Return backend error message if available
            if (error.response && error.response.data && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue(error.message);
        }
    }
);

export const uploadResume = createAsyncThunk(
    'careers/uploadResume',
    async (file, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('pdf', file); // Field name 'pdf' as requested

            const response = await api.post('/image/upload-pdf', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // Assume response.data contains the URL/path. Adjust based on actual API response structure.
            // Common patterns: response.data.url, response.data.path, or just response.data if it returns string.
            // Let's return the whole data for flexibility, or try to extract a likely property.
            return response.data;
        } catch (error) {
            console.error('Upload resume error:', error);
            if (error.response && error.response.data && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue(error.message);
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
        pageData: null,
        jobs: [],
        loading: false,
        error: null,
        applicationLoading: false,
        applicationSuccess: false,
        applicationError: null,
        uploadLoading: false,
        uploadError: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCareerPage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCareerPage.fulfilled, (state, action) => {
                state.loading = false;
                state.pageData = action.payload;
            })
            .addCase(fetchCareerPage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
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
            })
            // Job Application
            .addCase(submitJobApplication.pending, (state) => {
                state.applicationLoading = true;
                state.applicationSuccess = false;
                state.applicationError = null;
            })
            .addCase(submitJobApplication.fulfilled, (state) => {
                state.applicationLoading = false;
                state.applicationSuccess = true;
                state.applicationError = null;
            })
            .addCase(submitJobApplication.rejected, (state, action) => {
                state.applicationLoading = false;
                state.applicationSuccess = false;
                state.applicationError = action.payload || action.error.message;
            })
            // Upload Resume
            .addCase(uploadResume.pending, (state) => {
                state.uploadLoading = true;
                state.uploadError = null;
            })
            .addCase(uploadResume.fulfilled, (state) => {
                state.uploadLoading = false;
                state.uploadError = null;
            })
            .addCase(uploadResume.rejected, (state, action) => {
                state.uploadLoading = false;
                state.uploadError = action.payload || action.error.message;
            });
    },
});

export default careersSlice.reducer;
