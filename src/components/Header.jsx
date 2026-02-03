import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchServices } from '../features/servicesSlice';

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { items: services } = useSelector((state) => state.services);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  const dropdownRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Prevent background scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  // Fetch services if not loaded
  useEffect(() => {
    if (services.length === 0) {
      dispatch(fetchServices());
    }
  }, [dispatch, services.length]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path) =>
    location.pathname === path
      ? 'text-red-600'
      : 'text-white hover:text-red-500';

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 w-full z-[999] bg-[#434242] border-b border-white/10 py-4 md:py-5">
        <div className="max-w-7xl mx-auto px-5 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" onClick={() => { setIsMenuOpen(false); scrollToTop(); }}>
              <img src="/images/logo.png" alt="Logo" className="w-32 md:w-40" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className='flex gap-10 items-center'>
            <nav className="hidden lg:flex justify-center items-center">
              <ul className="flex gap-10 xl:gap-20 text-sm font-medium">
                <li><Link to="/" className={isActive('/')} onClick={scrollToTop}>Home</Link></li>
                <li><Link to="/about" className={isActive('/about')} onClick={scrollToTop}>About Us</Link></li>

                {/* Services Dropdown Container */}
                <li
                  className="relative group"
                  ref={dropdownRef}
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <div className="flex items-center gap-1 cursor-pointer">
                    <Link to="/services" className={isActive('/services')} onClick={scrollToTop}>
                      Services
                    </Link>
                    <svg
                      className={`w-4 h-4 text-white transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {/* Dropdown Menu */}
                  <div className={`absolute top-full left-0 mt-2 w-64 bg-[#333333] border border-white/10 rounded-xl shadow-2xl transition-all duration-300 transform origin-top
                    ${isServicesOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
                    <div className="py-3 px-2">
                      {services.length > 0 ? (
                        services.map((service) => (
                          <Link
                            key={service.id}
                            to={`/services/${service.id}`}
                            className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors border-b border-white/5 last:border-0"
                            onClick={() => { setIsServicesOpen(false); scrollToTop(); }}
                          >
                            <div className="flex items-center gap-3">
                              {/* <span className="text-xl">{service.icon || '🚀'}</span> */}
                              <span className="font-semibold">{service.title}</span>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <p className="px-4 py-2 text-gray-400 text-xs italic">Loading services...</p>
                      )}
                      <Link
                        to="/services"
                        className="block px-4 py-3 text-red-500 font-bold hover:bg-red-500/10 rounded-lg transition-colors mt-2 text-center text-xs uppercase tracking-widest"
                        onClick={() => { setIsServicesOpen(false); scrollToTop(); }}
                      >
                        View All Services
                      </Link>
                    </div>
                  </div>
                </li>

                <li><Link to="/careers" className={isActive('/careers')} onClick={scrollToTop}>Careers</Link></li>
                <li><Link to="/blog" className={isActive('/blog')} onClick={scrollToTop}>Blog</Link></li>
              </ul>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <Link to="/contact" onClick={scrollToTop} className="px-6 py-2.5 rounded-full text-sm font-bold bg-red-700 text-white hover:bg-red-800 inline-block">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-white z-[999]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`fixed inset-0 z-[998] bg-[#434242] flex flex-col items-center justify-center p-10
        transition-transform duration-300 lg:hidden
        ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <ul className="flex flex-col gap-5 text-center w-full max-w-sm">
          <li><Link to="/" onClick={() => { setIsMenuOpen(false); scrollToTop(); }} className="text-2xl text-white hover:text-red-500">Home</Link></li>
          <li><Link to="/about" onClick={() => { setIsMenuOpen(false); scrollToTop(); }} className="text-2xl text-white hover:text-red-500">About Us</Link></li>

          {/* Mobile Services Accordion */}
          <li className="flex flex-col items-center">
            <button
              onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
              className="text-2xl text-white hover:text-red-500 flex items-center gap-2"
            >
              Services
              <svg className={`w-6 h-6 transform transition-transform ${isMobileServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isMobileServicesOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
              <ul className="flex flex-col gap-3">
                {services.map((service) => (
                  <li key={service.id}>
                    <Link
                      to={`/services/${service.id}`}
                      onClick={() => { setIsMenuOpen(false); scrollToTop(); }}
                      className="text-lg text-gray-400 hover:text-white"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/services"
                    onClick={() => { setIsMenuOpen(false); scrollToTop(); }}
                    className="text-lg text-red-500 font-bold"
                  >
                    All Services
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          <li><Link to="/careers" onClick={() => { setIsMenuOpen(false); scrollToTop(); }} className={`text-2xl ${isActive('/careers')}`}>Careers</Link></li>
          <li><Link to="/blog" onClick={() => { setIsMenuOpen(false); scrollToTop(); }} className={`text-2xl ${isActive('/blog')}`}>Blog</Link></li>
          <li className="mt-4">
            <Link to="/contact" onClick={() => { setIsMenuOpen(false); scrollToTop(); }} className="w-full px-8 py-4 rounded-full text-lg font-bold bg-red-700 text-white hover:bg-red-800 inline-block shadow-2xl">
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
