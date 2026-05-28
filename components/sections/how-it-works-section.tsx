'use client';

import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { Clock, Users } from 'lucide-react';
import Heroseven from '@/public/heroseven.png';
import Heroeight from '@/public/heroeight.png';
import Heronine from '@/public/heronine.png';
import Heroten from '@/public/heroten.png';
const tours = [
  {
    title: 'Half Day Tour',
    duration: '4 hours',
    group: 'Private',
    price: '$220.00',
    badge: 'Most Popular',
    description: "Explore Jamaica's finest spots — beaches, waterfalls, local culture. Flexible pickup.",
    image: Heronine.src,
  },
  {
    title: 'Full Day Tour',
    duration: '8 hours',
    group: 'Group',
    price: '$400.00',
    badge: 'Best Value',
    description: "The complete Jamaica experience. Dunn's River, Blue Mountains, YS Falls & more.",
    image: Heroeight.src,
  },
  {
    title: 'Half Day Fishing',
    duration: '4 hours',
    group: 'Private',
    price: '$250.00',
    badge: 'Charter',
    description: 'Private fishing charter. Equipment included. Fresh Jamaican waters await.',
    image: Heroseven.src,
  },
  {
    title: 'Full Day Fishing',
    duration: '8 hours',
    group: 'Private',
    price: '$450.00',
    badge: 'Premium',
    description: 'Full deep sea fishing experience. Equipment, bait, and refreshments included.',
    image: Heroten.src,
  },
];

function TourCard({ tour, index }: { tour: typeof tours[0]; index: number }) {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { amount: 0.2, once: false });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.6,
          delay: index * 0.1,
          ease: [0.22, 1, 0.36, 1],
        },
      });
    } else {
      controls.start({ opacity: 0, y: 40, scale: 0.97 });
    }
  }, [inView, controls, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={controls}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col cursor-pointer"
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Date-style badge — top left pill */}
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-[11px] font-semibold px-3 py-1 rounded-full shadow-sm">
            {tour.badge}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-[15px] font-semibold text-gray-900 mb-1 leading-snug">
          {tour.title}
        </h3>

        {/* Meta row — duration + group */}
        <div className="flex items-center gap-3 mb-3">
          <span className="flex items-center gap-1 text-[12px] text-gray-400">
            <Clock size={12} className="text-gray-400" />
            {tour.duration}
          </span>
          <span className="flex items-center gap-1 text-[12px] text-gray-400">
            <Users size={12} className="text-gray-400" />
            {tour.group}
          </span>
        </div>

        {/* Description */}
        <p className="text-[12px] text-gray-400 leading-relaxed mb-4 flex-1">
          {tour.description}
        </p>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <div>
            <span className="text-[10px] text-gray-400 uppercase tracking-wide block leading-none mb-0.5">From</span>
            <span className="text-[17px] font-bold text-gray-900">{tour.price}</span>
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white text-[12px] font-semibold px-5 py-2 rounded-full transition-colors duration-200">
            Select
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function ToursSection() {
  const headerRef = useRef(null);
  const headerControls = useAnimation();
  const headerInView = useInView(headerRef, { amount: 0.5, once: false });

  useEffect(() => {
    if (headerInView) {
      headerControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
      });
    } else {
      headerControls.start({ opacity: 0, y: 20 });
    }
  }, [headerInView, headerControls]);

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* Header row */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerControls}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <p className="text-xs text-green-600 font-semibold uppercase tracking-widest mb-2">
              Popular Destinations
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Choose your tour
            </h2>
          </div>

          {/* "All tours" button — top right */}
          <button className="hidden sm:flex items-center gap-2 border border-gray-200 hover:border-green-500 hover:text-green-600 text-gray-600 text-[13px] font-medium px-5 py-2 rounded-full transition-all duration-200 whitespace-nowrap">
            All tours
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {tours.map((tour, index) => (
            <TourCard key={index} tour={tour} index={index} />
          ))}
        </div>

        {/* Mobile "All tours" button */}
        <div className="flex sm:hidden justify-center mt-8">
          <button className="flex items-center gap-2 border border-gray-200 text-gray-600 text-[13px] font-medium px-6 py-2.5 rounded-full">
            All tours
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}