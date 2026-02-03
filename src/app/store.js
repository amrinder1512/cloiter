import { configureStore } from '@reduxjs/toolkit';
import servicesReducer from '../features/servicesSlice';
import faqReducer from '../features/faqSlice';
import footerReducer from '../features/footerSlice';
import homepageReducer from '../features/homepageSlice';
import careersReducer from '../features/careersSlice';
import blogReducer from '../features/blogSlice';
import contactReducer from '../features/contactSlice';
import aboutReducer from '../features/aboutSlice';
import policyReducer from '../features/policySlice';

export const store = configureStore({
  reducer: {
    services: servicesReducer,
    faqs: faqReducer,
    footer: footerReducer,
    homepage: homepageReducer,
    careers: careersReducer,
    blog: blogReducer,
    contact: contactReducer,
    about: aboutReducer,
    policy: policyReducer,
  },
});