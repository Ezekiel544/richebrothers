'use client';

import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import Link from 'next/link';
import Herofive from '@/public/herofive.png';
import Herosix from '@/public/herosix.png';
const benefits = [
  {
    title: 'Personal Approach',
    description: 'We adapt the program to your interests and fitness level.',
  },
  {
    title: 'Cultural Immersion',
    description: 'Get acquainted with local traditions, cuisine and city history.',
  },
  {
    title: 'Modern Service',
    description: '24/7 support and comfortable transport throughout your journey.',
  },
];

export default function AboutSection() {
  const sectionRef = useRef(null);
  const imageControls = useAnimation();
  const textControls = useAnimation();
  const inView = useInView(sectionRef, { amount: 0.25, once: false });

  useEffect(() => {
    if (inView) {
      imageControls.start({
        opacity: 1,
        x: 0,
        transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
      });
      textControls.start({
        opacity: 1,
        x: 0,
        transition: { duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] },
      });
    } else {
      imageControls.start({ opacity: 0, x: -60 });
      textControls.start({ opacity: 0, x: 60 });
    }
  }, [inView, imageControls, textControls]);

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT: Stacked image block ── */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={imageControls}
            className="relative flex items-center justify-center order-2 lg:order-1"
          >
            {/*
              Outer decorative frame — the "second image peeking behind"
              This is a slightly larger rounded rectangle offset bottom-right,
              filled with a soft green tint + a faint second image as its bg
            */}
            <div
              className="absolute rounded-[28px] overflow-hidden"
              style={{
                width: '88%',
                aspectRatio: '1 / 1',
                bottom: '-22px',
                right: '-18px',
                border: '2.5px solid #d1ead4',
                background: '#edf7ee',
                zIndex: 0,
              }}
            >
              {/* Faint background image visible at edges */}
              <img
                src= {Herosix.src}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover opacity-40"
              />
            </div>

            {/* Main foreground image */}
            <div
              className="relative rounded-[24px] overflow-hidden shadow-xl"
              style={{
                width: '88%',
                aspectRatio: '1 / 1',
                zIndex: 1,
              }}
            >
              <img
                src= {Herofive.src}
                alt="Jamaica mountain landscape"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* ── RIGHT: Text content ── */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={textControls}
            className="flex flex-col order-1 lg:order-2"
          >
            {/* Eyebrow label */}
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-600 mb-4">
              Experience
            </p>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-5">
              A journey you will<br className="hidden sm:block" /> remember
            </h2>

            {/* Body */}
            <p className="text-[14px] sm:text-[15px] text-gray-500 leading-relaxed mb-8 max-w-md">
              We create not just tours — real adventures. Every route is crafted
              so you can experience the beauty of different corners of our island
              in full comfort and safety.
            </p>

            {/* Benefits list */}
            <div className="flex flex-col gap-5 mb-8">
              {benefits.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{
                    duration: 0.5,
                    delay: inView ? 0.35 + index * 0.12 : 0,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-start gap-3"
                >
                  {/* Green checkmark */}
                  <div className="flex-shrink-0 mt-[2px]">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="10" cy="10" r="9" fill="#dcf3df" />
                      <path
                        d="M6.5 10.3l2.3 2.3 4.7-4.7"
                        stroke="#22c55e"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="text-[14px] font-semibold text-gray-800 leading-snug">
                      {item.title}
                    </p>
                    <p className="text-[13px] text-gray-500 mt-0.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: inView ? 0.7 : 0 }}
              className="self-start px-7 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white text-[14px] font-semibold transition-colors duration-200 shadow-sm"
            >
              {/* Book Your Adventure */}
               <Link href="/booking"  > Book Your Adventure </Link>
              
            </motion.button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}