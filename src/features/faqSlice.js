import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

// Async thunk for fetching FAQs
export const fetchFAQs = createAsyncThunk(
  'faqs/fetchFAQs',
  async () => {
    try {
      const response = await api.get('/faqs');
      const data = response.data;
      console.log("Fetched FAQs data:", data);
      if (!data.data || !Array.isArray(data.data)) {
        throw new Error('API did not return expected data structure');
      }
      // Assuming the API returns data in the correct format, or map if needed
      return data.data.map((item, index) => ({
        id: item.id || index + 1,
        question: item.question || item.title || 'FAQ Question',
        answer: item.answer || item.description || 'FAQ Answer'
      }));
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }
);

const faqSlice = createSlice({
  name: 'faqs',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFAQs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFAQs.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchFAQs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default faqSlice.reducer;