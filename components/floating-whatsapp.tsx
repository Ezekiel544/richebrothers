'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
      className="h-7 w-7"
    >
      <path d="M16.04 3C8.86 3 3.02 8.78 3.02 15.9c0 2.27.6 4.49 1.75 6.44L3 29l6.85-1.78a13.18 13.18 0 0 0 6.19 1.55C23.22 28.77 29 23 29 15.9S23.22 3 16.04 3Zm0 23.57c-1.93 0-3.82-.52-5.47-1.5l-.39-.23-4.06 1.05 1.08-3.92-.26-.4a10.92 10.92 0 0 1-1.72-5.67c0-5.89 4.85-10.69 10.82-10.69 5.96 0 10.8 4.8 10.8 10.69 0 5.9-4.84 10.67-10.8 10.67Zm5.93-7.98c-.32-.16-1.92-.94-2.22-1.05-.3-.11-.52-.16-.74.16-.22.32-.85 1.05-1.04 1.27-.19.21-.38.24-.7.08-.32-.16-1.37-.5-2.6-1.59-.96-.85-1.61-1.9-1.8-2.22-.19-.32-.02-.5.14-.66.15-.15.32-.38.49-.56.16-.19.22-.32.32-.54.11-.21.05-.4-.03-.56-.08-.16-.74-1.77-1.02-2.43-.27-.64-.54-.55-.74-.56h-.63c-.22 0-.56.08-.85.4-.3.32-1.12 1.08-1.12 2.65s1.15 3.08 1.31 3.29c.16.21 2.26 3.42 5.48 4.79.77.33 1.36.53 1.83.68.77.24 1.47.21 2.03.13.62-.09 1.92-.78 2.19-1.53.27-.75.27-1.4.19-1.53-.08-.13-.3-.21-.62-.37Z" />
    </svg>
  );
}

export default function FloatingWhatsApp() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.8;
      setShowButton(window.scrollY > heroHeight);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!showButton) return null;

  return (
    <motion.a
      href="https://wa.me/1876000000?text=Hello%20Richie%20Brothers%20Tours%21%20I%20would%20like%20to%20book%20a%20tour."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: [0, 0, -12, 12, -12, 12, -8, 8, 0],
        rotate: [0, 0, -14, 14, -14, 14, -8, 8, 0],
      }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{
        opacity: { duration: 0.35 },
        scale: { duration: 0.35 },
        x: {
          delay: 2,
          duration: 0.85,
          repeat: Infinity,
          repeatDelay: 3.5,
          ease: 'easeInOut',
        },
        rotate: {
          delay: 2,
          duration: 0.85,
          repeat: Infinity,
          repeatDelay: 3.5,
          ease: 'easeInOut',
        },
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all duration-300 hover:bg-green-600 group"
    >
      <WhatsAppIcon />

      <motion.span
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute h-14 w-14 rounded-full border-2 border-green-500 opacity-0 group-hover:opacity-100"
      />
    </motion.a>
  );
}