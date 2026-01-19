import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Service from './pages/Service';
import ServiceDetail from './pages/ServiceDetail';
import CTA from './components/CTA';

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <div className="app-container">
                    <Header />
                    <main>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/services" element={<Service />} />
                            <Route path="/services/:id" element={<ServiceDetail />} />
                        </Routes>
                    </main>
                <CTA/>
                <Footer />
            </div>
        </BrowserRouter>
        </Provider>
    );
}

export default App;
