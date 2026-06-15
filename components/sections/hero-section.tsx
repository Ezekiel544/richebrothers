'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users } from 'lucide-react';
import Heroone from '@/public/heroone.png';
import Herotwo from '@/public/herotwo.png';
import Herothree from '@/public/herothree.png';
import Herofour from '@/public/herofour.png';
import Link from 'next/link';
const HERO_IMAGES = [
  { src: Heroone.src, position: 'center center' },
  { src: Herotwo.src, position: 'center center' },
  { src: Herothree.src, position: '55% center' },
  { src: Herofour.src, position: '45% center' },
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <section className="relative w-full hero-section">
      {/* Hero area */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: '100vh', minHeight: '580px' }}
      >
        {/* Background image slides */}
        {HERO_IMAGES.map((img, i) => (
          <motion.div
            key={img.src}
            className="hero-bg-slide absolute inset-0"
            style={
              {
                backgroundImage: `url(${img.src})`,
                '--mobile-position': img.position,
              } as React.CSSProperties
            }
            initial={false}
            animate={{
              x: i === currentIndex ? '0%' : i === prevIndex ? '-100%' : '100%',
              zIndex: i === currentIndex ? 1 : i === prevIndex ? 0 : -1,
            }}
            transition={{ duration: 0.9, ease: [0.77, 0, 0.18, 1] }}
          />
        ))}

        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.65), rgba(0,0,0,0.45))',
            zIndex: 2,
          }}
        />

        {/* Content */}
        <div
          className="relative flex h-full flex-col items-center justify-center px-6 text-center sm:px-10 lg:px-16 hero-content"
          style={{ zIndex: 3 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            style={{
              fontFamily: "'Golos Text', 'Segoe UI', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(2.35rem, 6vw, 4.5rem)',
              color: '#fff',
              lineHeight: 1.08,
              maxWidth: '760px',
              marginBottom: '18px',
              textAlign: 'center',
            }}
          >
            Discover Your Dream
            <br />
            Destination
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.22 }}
            style={{
              fontFamily: "'Golos Text', 'Segoe UI', sans-serif",
              color: 'rgba(255,255,255,0.88)',
              fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)',
              lineHeight: 1.65,
              maxWidth: '560px',
              marginBottom: '34px',
              textAlign: 'center',
            }}
          >
            Premium airport transfers, private tours, and island transport,
            trusted by UK travellers and returning Jamaicans.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="hero-cta-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.34 }}
          >
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                backgroundColor: '#3d9e4a',
                color: '#fff',
                border: 'none',
                borderRadius: '999px',
                padding: '12px 20px',
                fontFamily: "'Golos Text', 'Segoe UI', sans-serif",
                fontWeight: 600,
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#328040';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#3d9e4a';
              }}
            >
              {/* Book Your Transfer */}
               <Link  href="/booking">Book Your Transfer</Link>
            </button>

            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: '#fff',
                border: '1.5px solid rgba(255,255,255,0.8)',
                borderRadius: '999px',
                padding: '12px 20px',
                fontFamily: "'Golos Text', 'Segoe UI', sans-serif",
                fontWeight: 600,
                fontSize: '0.95rem',
                cursor: 'pointer',
                backdropFilter: 'blur(6px)',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
              }}
            >
              
              <Link  href="/pricing">View All Services</Link>
            </button>
          </motion.div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');

        .hero-section {
          padding-bottom: 44px;
          font-family: 'DM Sans', sans-serif;
        }

        .hero-bg-slide {
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
        }

        .hero-content {
          padding-top: 56px;
          padding-bottom: 56px;
        }

        .hero-cta-buttons {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          flex-wrap: nowrap;
          width: 100%;
        }

        .hero-cta-buttons button {
          min-width: 0;
          white-space: nowrap;
        }

        .hero-search-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          padding: 0 24px;
          transform: translateY(50%);
          z-index: 10;
        }

        .hero-search-inner {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.14);
          padding: 10px;
          display: flex;
          align-items: stretch;
          gap: 0;
          width: 100%;
          max-width: 860px;
        }

        .search-field {
          flex: 1 1 0;
          min-width: 0;
          display: flex;
          flex-direction: column;
          padding: 8px 14px;
          border-right: 1px solid #eee;
        }

        .search-field:last-of-type {
          border-right: none;
        }

        .search-field label {
          font-size: 0.68rem;
          color: #aaa;
          font-family: 'Golos Text', sans-serif;
          margin-bottom: 3px;
          display: flex;
          align-items: center;
          gap: 5px;
          white-space: nowrap;
        }

        .search-field input {
          border: none;
          outline: none;
          background: transparent;
          font-family: 'Golos Text', sans-serif;
          font-size: 0.875rem;
          color: #222;
          width: 100%;
        }

        .search-field input::placeholder {
          color: #bbb;
        }

        @media (max-width: 600px) {
          .hero-section {
            padding-bottom: 120px;
          }

          .hero-bg-slide {
            background-size: auto 100%;
            background-position: var(--mobile-position);
          }

          .hero-content {
            padding-top: 72px;
            padding-bottom: 180px;
          }

          .hero-search-bar {
            padding: 0 16px;
          }

          .hero-search-inner {
            flex-direction: column;
            padding: 6px 10px;
            border-radius: 16px;
          }

          .search-field {
            border-right: none;
            border-bottom: 1px solid #eee;
            padding: 9px 8px;
          }

          .search-field:last-of-type {
            border-bottom: none;
          }
        }

        @media (max-width: 360px) {
          .hero-cta-buttons {
            flex-wrap: wrap;
          }

          .hero-cta-buttons button {
            width: 100%;
          }
        }
      `}</style>

      {/* Search bar */}
      <motion.div
        className="hero-search-bar"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="hero-search-inner">
          <div className="search-field">
            <label>
              <MapPin size={12} color="#3d9e4a" />
              Jamaica
            </label>
            <input type="text" placeholder="Where do you want to go?" />
          </div>

          <div className="search-field">
            <label>
              <Calendar size={12} color="#3d9e4a" />
              Available every day
            </label>
            <input type="text" placeholder="Select dates" />
          </div>

          <div className="search-field">
            <label>
              <Users size={12} color="#3d9e4a" />
              Serves everybody
            </label>
            <input type="text" placeholder="How many people?" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}