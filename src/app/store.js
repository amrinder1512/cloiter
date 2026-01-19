import { configureStore } from '@reduxjs/toolkit';
import servicesReducer from '../features/servicesSlice';
import faqReducer from '../features/faqSlice';
import footerReducer from '../features/footerSlice';

export const store = configureStore({
  reducer: {
    services: servicesReducer,
    faqs: faqReducer,
    footer: footerReducer,
  },
});