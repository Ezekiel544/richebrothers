'use client';

import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { Clock, Users } from 'lucide-react';
import Heroseven from '@/public/heroseven.png';
import Heroeight from '@/public/heroeight.png';
import Heronine from '@/public/heronine.png';
import Heroten from '@/public/heroten.png';
import Link from 'next/link';

const tours = [
  {
    title: 'YS Falls',
    duration: 'full day',
    group: '+$20 per extra person',
    price: '$250.00',
    badge: 'Negril Tours',
    image: Heronine.src,
    tab: 'negril',
    destination: 'YS Falls',
  },
  {
    title: 'Great River Rafting',
    duration: 'full day',
    group: '+$20 per extra person',
    price: '$400.00',
    badge: 'Montego Bay Tours',
    image: Heroeight.src,
    tab: 'montego',
    destination: 'Great River Rafting',
  },
  {
    title: 'MBJ Airport → Montego Bay',
    duration: 'full day',
    group: '+$5 per person after 4',
    price: '$40',
    badge: 'Airport Transfer',
    image: Heroseven.src,
    tab: 'transfer',
    destination: 'Montego Bay (Local)',
  },
  {
    title: 'Portland',
    duration: 'full day',
    group: '+$20 per extra person',
    price: '$600.00',
    badge: 'Negril Tours',
    image: Heroten.src,
    tab: 'negril',
    destination: 'Portland',
  },
];

type Tour = {
  title: string;
  duration: string;
  group: string;
  price: string;
  badge: string;
  image: string;
  tab: string;
  destination: string;
};

function TourCard({ tour, index }: { tour: Tour; index: number }) {
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
      controls.start({
        opacity: 0,
        y: 40,
        scale: 0.97,
      });
    }
  }, [inView, controls, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={controls}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-[11px] font-semibold px-3 py-1 rounded-full shadow-sm">
            {tour.badge}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-[15px] font-semibold text-gray-900 mb-1 leading-snug">
          {tour.title}
        </h3>

        <div className="flex items-center gap-3 mb-3">
          <span className="flex items-center gap-1 text-[12px] text-gray-400">
            <Clock size={12} />
            {tour.duration}
          </span>

          <span className="flex items-center gap-1 text-[12px] text-gray-400">
            <Users size={12} />
            {tour.group}
          </span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <div>
            <span className="text-[10px] text-gray-400 uppercase tracking-wide block leading-none mb-0.5">
              From
            </span>
            <span className="text-[17px] font-bold text-gray-900">
              {tour.price}
            </span>
          </div>

          <Link
            href={`/booking?tab=${tour.tab}&destination=${encodeURIComponent(
              tour.destination
            )}`}
            className="bg-green-600 hover:bg-green-700 text-white text-[12px] font-semibold px-5 py-2 rounded-full transition-colors duration-200"
          >
            Select
          </Link>
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
        transition: {
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1],
        },
      });
    } else {
      headerControls.start({
        opacity: 0,
        y: 20,
      });
    }
  }, [headerInView, headerControls]);

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
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

          <Link
            href="/pricing"
            className="hidden sm:flex items-center gap-2 border border-gray-200 hover:border-green-500 hover:text-green-600 text-gray-600 text-[13px] font-medium px-5 py-2 rounded-full transition-all duration-200 whitespace-nowrap"
          >
            View All

            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M2.5 7h9M8 3.5L11.5 7 8 10.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {tours.map((tour, index) => (
            <TourCard
              key={tour.destination}
              tour={tour}
              index={index}
            />
          ))}
        </div>

        <div className="flex sm:hidden justify-center mt-8">
          <Link
            href="/pricing"
            className="flex items-center gap-2 border border-gray-200 text-gray-600 text-[13px] font-medium px-6 py-2.5 rounded-full"
          >
            All tours

            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M2.5 7h9M8 3.5L11.5 7 8 10.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}