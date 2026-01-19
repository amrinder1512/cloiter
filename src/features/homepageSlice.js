import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

// --- 1. Hero Section ---
export const fetchHeroSection = createAsyncThunk(
    'homepage/fetchHeroSection',
    async () => {
        try {
            const response = await api.get('/homepage/hero');
            console.log("Fetched hero section:", response.data);
            return response.data.data || response.data;
        } catch (error) {
            console.error('Fetch hero error:', error);
            throw error;
        }
    }
);

// --- 2. Trusted By Section ---
export const fetchTrustedBy = createAsyncThunk(
    'homepage/fetchTrustedBy',
    async () => {
        try {
            const response = await api.get('/homepage/trusted-by');
            console.log("Fetched trusted-by section:", response.data);
            return response.data.data || response.data;
        } catch (error) {
            console.error('Fetch trusted-by error:', error);
            throw error;
        }
    }
);

// --- 3. Process Section (How it Works) ---
export const fetchProcess = createAsyncThunk(
    'homepage/fetchProcess',
    async () => {
        try {
            const response = await api.get('/homepage/process');
            console.log("Fetched process section:", response.data);
            return response.data.data || response.data;
        } catch (error) {
            console.error('Fetch process error:', error);
            throw error;
        }
    }
);

// --- 4. Web Feature (Feature with Image & List) ---
export const fetchWebFeature = createAsyncThunk(
    'homepage/fetchWebFeature',
    async () => {
        try {
            const response = await api.get('/homepage/web-feature');
            console.log("Fetched web-feature section:", response.data);
            return response.data.data || response.data;
        } catch (error) {
            console.error('Fetch web-feature error:', error);
            throw error;
        }
    }
);

// --- 5. Three Pillars (Expanding Cards) ---
export const fetchThreePillars = createAsyncThunk(
    'homepage/fetchThreePillars',
    async () => {
        try {
            const response = await api.get('/homepage/pillars');
            console.log("Fetched pillars section:", response.data);
            return response.data.data || response.data;
        } catch (error) {
            console.error('Fetch pillars error:', error);
            throw error;
        }
    }
);

// --- 6. Stats & Blog Feature (40% Section) ---
export const fetchStatsFeature = createAsyncThunk(
    'homepage/fetchStatsFeature',
    async () => {
        try {
            const response = await api.get('/homepage/stats-feature');
            console.log("Fetched stats-feature section:", response.data);
            return response.data.data || response.data;
        } catch (error) {
            console.error('Fetch stats-feature error:', error);
            throw error;
        }
    }
);

// --- 7. Services Header ---
export const fetchServicesHeader = createAsyncThunk(
    'homepage/fetchServicesHeader',
    async () => {
        try {
            const response = await api.get('/homepage/services-header');
            console.log("Fetched services-header section:", response.data);
            return response.data.data || response.data;
        } catch (error) {
            console.error('Fetch services-header error:', error);
            throw error;
        }
    }
);

// --- 8. Testimonials CTA Section ---
export const fetchTestimonials = createAsyncThunk(
    'homepage/fetchTestimonials',
    async () => {
        try {
            const response = await api.get('/homepage/testimonials');
            console.log("Fetched testimonials section:", response.data);
            return response.data.data || response.data;
        } catch (error) {
            console.error('Fetch testimonials error:', error);
            throw error;
        }
    }
);

// --- Fetch All Homepage Data at Once ---
export const fetchAllHomepageData = createAsyncThunk(
    'homepage/fetchAllHomepageData',
    async (_, { dispatch }) => {
        try {
            // Dispatch all fetch actions in parallel
            const results = await Promise.allSettled([
                dispatch(fetchHeroSection()),
                dispatch(fetchTrustedBy()),
                dispatch(fetchProcess()),
                dispatch(fetchWebFeature()),
                dispatch(fetchThreePillars()),
                dispatch(fetchStatsFeature()),
                dispatch(fetchServicesHeader()),
                dispatch(fetchTestimonials()),
            ]);

            console.log("All homepage data fetched:", results);
            return results;
        } catch (error) {
            console.error('Fetch all homepage data error:', error);
            throw error;
        }
    }
);

const homepageSlice = createSlice({
    name: 'homepage',
    initialState: {
        hero: {
            data: null,
            loading: false,
            error: null,
        },
        trustedBy: {
            data: null,
            loading: false,
            error: null,
        },
        process: {
            data: null,
            loading: false,
            error: null,
        },
        webFeature: {
            data: null,
            loading: false,
            error: null,
        },
        pillars: {
            data: null,
            loading: false,
            error: null,
        },
        statsFeature: {
            data: null,
            loading: false,
            error: null,
        },
        servicesHeader: {
            data: null,
            loading: false,
            error: null,
        },
        testimonials: {
            data: null,
            loading: false,
            error: null,
        },
    },
    reducers: {
        // Manual data setters if needed
        setHeroData: (state, action) => {
            state.hero.data = action.payload;
        },
        clearHomepageData: (state) => {
            Object.keys(state).forEach(key => {
                state[key].data = null;
                state[key].loading = false;
                state[key].error = null;
            });
        },
    },
    extraReducers: (builder) => {
        // --- 1. Hero Section ---
        builder
            .addCase(fetchHeroSection.pending, (state) => {
                state.hero.loading = true;
                state.hero.error = null;
            })
            .addCase(fetchHeroSection.fulfilled, (state, action) => {
                state.hero.loading = false;
                state.hero.data = action.payload;
            })
            .addCase(fetchHeroSection.rejected, (state, action) => {
                state.hero.loading = false;
                state.hero.error = action.error.message;
            });

        // --- 2. Trusted By Section ---
        builder
            .addCase(fetchTrustedBy.pending, (state) => {
                state.trustedBy.loading = true;
                state.trustedBy.error = null;
            })
            .addCase(fetchTrustedBy.fulfilled, (state, action) => {
                state.trustedBy.loading = false;
                state.trustedBy.data = action.payload;
            })
            .addCase(fetchTrustedBy.rejected, (state, action) => {
                state.trustedBy.loading = false;
                state.trustedBy.error = action.error.message;
            });

        // --- 3. Process Section ---
        builder
            .addCase(fetchProcess.pending, (state) => {
                state.process.loading = true;
                state.process.error = null;
            })
            .addCase(fetchProcess.fulfilled, (state, action) => {
                state.process.loading = false;
                state.process.data = action.payload;
            })
            .addCase(fetchProcess.rejected, (state, action) => {
                state.process.loading = false;
                state.process.error = action.error.message;
            });

        // --- 4. Web Feature ---
        builder
            .addCase(fetchWebFeature.pending, (state) => {
                state.webFeature.loading = true;
                state.webFeature.error = null;
            })
            .addCase(fetchWebFeature.fulfilled, (state, action) => {
                state.webFeature.loading = false;
                state.webFeature.data = action.payload;
            })
            .addCase(fetchWebFeature.rejected, (state, action) => {
                state.webFeature.loading = false;
                state.webFeature.error = action.error.message;
            });

        // --- 5. Three Pillars ---
        builder
            .addCase(fetchThreePillars.pending, (state) => {
                state.pillars.loading = true;
                state.pillars.error = null;
            })
            .addCase(fetchThreePillars.fulfilled, (state, action) => {
                state.pillars.loading = false;
                state.pillars.data = action.payload;
            })
            .addCase(fetchThreePillars.rejected, (state, action) => {
                state.pillars.loading = false;
                state.pillars.error = action.error.message;
            });

        // --- 6. Stats Feature ---
        builder
            .addCase(fetchStatsFeature.pending, (state) => {
                state.statsFeature.loading = true;
                state.statsFeature.error = null;
            })
            .addCase(fetchStatsFeature.fulfilled, (state, action) => {
                state.statsFeature.loading = false;
                state.statsFeature.data = action.payload;
            })
            .addCase(fetchStatsFeature.rejected, (state, action) => {
                state.statsFeature.loading = false;
                state.statsFeature.error = action.error.message;
            });

        // --- 7. Services Header ---
        builder
            .addCase(fetchServicesHeader.pending, (state) => {
                state.servicesHeader.loading = true;
                state.servicesHeader.error = null;
            })
            .addCase(fetchServicesHeader.fulfilled, (state, action) => {
                state.servicesHeader.loading = false;
                state.servicesHeader.data = action.payload;
            })
            .addCase(fetchServicesHeader.rejected, (state, action) => {
                state.servicesHeader.loading = false;
                state.servicesHeader.error = action.error.message;
            });

        // --- 8. Testimonials ---
        builder
            .addCase(fetchTestimonials.pending, (state) => {
                state.testimonials.loading = true;
                state.testimonials.error = null;
            })
            .addCase(fetchTestimonials.fulfilled, (state, action) => {
                state.testimonials.loading = false;
                state.testimonials.data = action.payload;
            })
            .addCase(fetchTestimonials.rejected, (state, action) => {
                state.testimonials.loading = false;
                state.testimonials.error = action.error.message;
            });
    },
});

export const { setHeroData, clearHomepageData } = homepageSlice.actions;
export default homepageSlice.reducer;
