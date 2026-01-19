import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent background scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

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
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <img src="/images/logo.png" alt="Logo" className="w-32 md:w-40" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className='flex gap-10'> 
          <nav className="hidden lg:flex justify-center items-center">
            <ul className="flex gap-10 xl:gap-20 text-sm font-medium">
              <li><Link to="/" className={isActive('/')}>Home</Link></li>
              <li><Link to="#about" className="text-white hover:text-red-500">About Us</Link></li>
              <li><Link to="/services" className={isActive('/services')}>Services</Link></li>
              <li><Link to="#careers" className="text-white hover:text-red-500">Careers</Link></li>
              <li><Link to="#blog" className="text-white hover:text-red-500">Blog</Link></li>
            </ul>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <button className="px-6 py-2.5 rounded-full text-sm font-bold bg-red-700 text-white hover:bg-red-800">
              Contact Us
            </button>
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
        className={`fixed inset-0 z-[998] bg-[#434242] flex items-center justify-center
        transition-transform duration-300 lg:hidden
        ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <ul className="flex flex-col gap-6 text-center">
          <li><Link to="/" onClick={() => setIsMenuOpen(false)} className="text-2xl text-white hover:text-red-500">Home</Link></li>
          <li><Link to="#about" onClick={() => setIsMenuOpen(false)} className="text-2xl text-white hover:text-red-500">About Us</Link></li>
          <li><Link to="/services" onClick={() => setIsMenuOpen(false)} className="text-2xl text-white hover:text-red-500">Services</Link></li>
          <li><Link to="#careers" onClick={() => setIsMenuOpen(false)} className="text-2xl text-white hover:text-red-500">Careers</Link></li>
          <li><Link to="#blog" onClick={() => setIsMenuOpen(false)} className="text-2xl text-white hover:text-red-500">Blog</Link></li>
          <li>
            <button className="mt-4 px-8 py-3 rounded-full text-lg font-bold bg-red-700 text-white hover:bg-red-800">
              Contact Us
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
