import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

// Fetch contact page content
export const fetchContactPage = createAsyncThunk(
    'contact/fetchPageContent',
    async () => {
        try {
            const response = await api.get('/contact-page');
            return response.data.data || response.data;
        } catch (error) {
            console.error('Fetch contact page error:', error);
            throw error;
        }
    }
);

// Submit contact form
export const submitContactForm = createAsyncThunk(
    'contact/submitForm',
    async (formData) => {
        try {
            const response = await api.post('/contact-us', formData);
            return response.data;
        } catch (error) {
            console.error('Submit contact form error:', error);
            throw error;
        }
    }
);

const contactSlice = createSlice({
    name: 'contact',
    initialState: {
        pageContent: null,
        loading: false,
        submitting: false,
        submitSuccess: false,
        error: null,
    },
    reducers: {
        resetSubmitStatus: (state) => {
            state.submitSuccess = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Page Content
            .addCase(fetchContactPage.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchContactPage.fulfilled, (state, action) => {
                state.loading = false;
                state.pageContent = action.payload;
            })
            .addCase(fetchContactPage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Form Submission
            .addCase(submitContactForm.pending, (state) => {
                state.submitting = true;
            })
            .addCase(submitContactForm.fulfilled, (state) => {
                state.submitting = false;
                state.submitSuccess = true;
            })
            .addCase(submitContactForm.rejected, (state, action) => {
                state.submitting = false;
                state.error = action.error.message;
            });
    },
});

export const { resetSubmitStatus } = contactSlice.actions;
export default contactSlice.reducer;
