import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Service from './pages/Service';
import ServiceDetail from './pages/ServiceDetail';
import Careers from './pages/Careers';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import CTA from './components/CTA';
import ScrollToTop from './components/ScrollToTop';

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <ScrollToTop />
                <div className="app-container">
                    <Header />
                    <main>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/services" element={<Service />} />
                            <Route path="/services/:id" element={<ServiceDetail />} />
                            <Route path="/careers" element={<Careers />} />
                            <Route path="/blog" element={<Blog />} />
                            <Route path="/blog/:id" element={<BlogDetail />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                            <Route path="/terms-and-conditions" element={<Terms />} />
                        </Routes>
                    </main>
                    <CTA />
                    <Footer />
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
