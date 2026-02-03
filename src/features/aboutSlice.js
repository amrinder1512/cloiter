import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

// Fetch about page content
export const fetchAboutPage = createAsyncThunk(
    'about/fetchPageContent',
    async () => {
        try {
            const response = await api.get('/about-page');
            return response.data.data || response.data;
        } catch (error) {
            console.error('Fetch about page error:', error);
            throw error;
        }
    }
);

const aboutSlice = createSlice({
    name: 'about',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAboutPage.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAboutPage.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchAboutPage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default aboutSlice.reducer;
