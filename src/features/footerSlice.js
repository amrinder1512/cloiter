import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

// Async thunk for fetching footer data
export const fetchFooter = createAsyncThunk(
  'footer/fetchFooter',
  async () => {
    try {
      const response = await api.get('/footer');
      const data = response.data;
      console.log("Fetched footer data:", data);
      if (!data.data) {
        throw new Error('API did not return expected data structure');
      }
      // Assuming the API returns data in the correct format, or map if needed
      const footer = data.data;
      return {
        logo: footer.logo || {
          src: "/images/logo.png",
          alt: "Cloiter Logo",
          width: 224,
          height: 64
        },
        description: footer.description || "We offers a comprehensive suite of digital marketing services...",
        quickLinks: footer.quickLinks || [
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: "About", href: "#about" },
          { name: "Contact", href: "#contact" },
          { name: "Privacy Policy", href: "#privacy" },
          { name: "Terms of Service", href: "#terms" },
        ],
        contact: footer.contact || {
          address: "123 Business Road",
          city: "Tech City, TC 90210",
          email: "info@cloiter.com"
        },
        copyright: footer.copyright || `© ${new Date().getFullYear()} Cloiter. All rights reserved.`
      };
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }
);

const FALLBACK_FOOTER = {
  logo: {
    src: "/images/logo.png",
    alt: "Cloiter Logo",
    width: 224,
    height: 64
  },
  description: "We offer a comprehensive suite of digital marketing services. Elevate your brand with our innovative strategies.",
  quickLinks: [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" }
  ],
  contact: {
    address: "2972 Westheimer Rd.",
    city: "Santa Ana, Illinois 85486",
    email: "cloiter@gmail.com",
    phone: "+123 456 7890"
  },
  copyright: `© ${new Date().getFullYear()} Cloiter. All rights reserved.`
};

const footerSlice = createSlice({
  name: 'footer',
  initialState: {
    data: FALLBACK_FOOTER,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFooter.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFooter.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchFooter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default footerSlice.reducer;