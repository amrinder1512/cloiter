import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

// Fetch Privacy Policy
export const fetchPrivacyPolicy = createAsyncThunk(
    'policy/fetchPrivacyPolicy',
    async () => {
        try {
            const response = await api.get('/privacy-policy');
            return response.data.data || response.data;
        } catch (error) {
            console.error('Fetch privacy policy error:', error);
            throw error;
        }
    }
);

// Fetch Terms and Conditions
export const fetchTermsConditions = createAsyncThunk(
    'policy/fetchTermsConditions',
    async () => {
        try {
            const response = await api.get('/terms-and-conditions');
            return response.data.data || response.data;
        } catch (error) {
            console.error('Fetch terms and conditions error:', error);
            throw error;
        }
    }
);

const policySlice = createSlice({
    name: 'policy',
    initialState: {
        privacyPolicy: null,
        termsConditions: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Privacy Policy
            .addCase(fetchPrivacyPolicy.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPrivacyPolicy.fulfilled, (state, action) => {
                state.loading = false;
                state.privacyPolicy = action.payload;
            })
            .addCase(fetchPrivacyPolicy.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Terms and Conditions
            .addCase(fetchTermsConditions.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTermsConditions.fulfilled, (state, action) => {
                state.loading = false;
                state.termsConditions = action.payload;
            })
            .addCase(fetchTermsConditions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default policySlice.reducer;
