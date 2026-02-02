import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

// Async thunk for fetching services
export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async () => {
    try {
      const response = await api.get('/services/ui');
      const data = response.data;
      console.log("Fetched services data:", data);
      if (!data.data || !Array.isArray(data.data)) {
        throw new Error('API did not return expected data structure');
      }
      // Assuming the API returns data in the correct format, or map if needed
      return data.data.map((item, index) => ({
        id: item.id || index + 1,
        title: item.title || item.name || 'Service Title',
        excerpt: item.excerpt || item.summary || 'Service excerpt',
        description: item.description || item.body || 'Service description',
        descriptionBottom: item.descriptionBottom || item.body || 'Service description',
        pointHeading: item.pointHeading || 'Key Features',
        points: item.points || [],
        icon: item.icon || ['💻', '📈', '🎨', '🔍', '📝', '🤝'][index % 6]
      }));
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }
);

const FALLBACK_SERVICES = [
  { id: 1, title: 'Web Development', excerpt: 'Building professional websites.', icon: '💻' },
  { id: 2, title: 'Digital Marketing', excerpt: 'Growing your online presence.', icon: '📈' },
  { id: 3, title: 'Graphic Design', excerpt: 'Creating stunning visuals.', icon: '🎨' }
];

const servicesSlice = createSlice({
  name: 'services',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.items = FALLBACK_SERVICES;
      });
  },
});

export default servicesSlice.reducer;