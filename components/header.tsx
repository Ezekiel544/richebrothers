'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Logoimg from '@/public/logo.png';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.92;

      if (window.scrollY > heroHeight - 100) {
        setScrolledPastHero(true);
      } else {
        setScrolledPastHero(false);
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { label: 'Services', href: '#services' },
    { label: 'Tours', href: '#tours' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolledPastHero
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200'
          : 'bg-transparent shadow-none border-none backdrop-blur-0'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
            <img src={Logoimg.src} alt="Rasta Bus Logo"  className="h-12 w-auto rounded-full" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8"> 
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`font-medium transition-colors duration-300 ${
                scrolledPastHero
                  ? 'text-black hover:text-primary'
                  : 'text-white hover:text-gray-300'
              }`}
            >
              {item.label}
            </a>
          ))}

          {/* Book Now Button */}
          <button
            className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 border ${
              scrolledPastHero
                ? 'bg-[#3d9e4a] text-white border-[#3d9e4a] hover:bg-neutral-800'
                : 'bg-[#3d9e4a] text-white border-[#3d9e4a] backdrop-blur-md hover:bg-white/20'
            }`}
          >
            Book Now
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X
              className={`w-6 h-6 transition-colors duration-300 ${
                scrolledPastHero
                  ? 'text-black'
                  : 'text-white'
              }`}
            />
          ) : (
            <Menu
              className={`w-6 h-6 transition-colors duration-300 ${
                scrolledPastHero
                  ? 'text-black'
                  : 'text-white'
              }`}
            />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className={`lg:hidden transition-all duration-300 ${
            scrolledPastHero
              ? 'bg-white border-b border-gray-200'
              : 'bg-black/50 backdrop-blur-xl'
          }`}
        >
          <div className="container mx-auto px-4 py-3 flex flex-col gap-5">
            
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`py-2 text-base font-medium transition-colors duration-300 ${
                  scrolledPastHero
                    ? 'text-black hover:text-primary'
                    : 'text-white hover:text-gray-300'
                }`}
              >
                {item.label}
              </a>
            ))}

            {/* Mobile CTA */}
            <button
              className={`w-full py-3 rounded-full font-semibold transition-all duration-300 border ${
                scrolledPastHero
                  ? 'bg-[#3d9e4a] text-white border-[#3d9e4a] hover:bg-neutral-800'
                  : 'bg-[#3d9e4a] text-white border-[#3d9e4a] backdrop-blur-md hover:bg-white/20'
              }`}
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}