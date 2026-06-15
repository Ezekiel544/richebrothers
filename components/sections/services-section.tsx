'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { MapPinned, CircleCheck, ShieldCheck, Route } from 'lucide-react';
import Link from 'next/link';

const whyChooseUs = [
  {
    icon: MapPinned,
    title: 'Local Guides',
    description: 'Expert guides who know Jamaica inside and out, sharing every corner and legend of the area.',
  },
  {
    icon: CircleCheck,
    title: 'Simple Booking',
    description: 'Fast and easy tour booking online with no hidden fees.',
    accent: true,
  },
  {
    icon: ShieldCheck,
    title: 'Comfort & Safety',
    description: 'Modern transport and verified accommodation for every trip.',
  },
  {
    icon: Route,
    title: 'Unique Routes',
    description: 'Exclusive locations not found in any standard travel guide.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function AnimatedCard({
  service,
  index,
}: {
  service: typeof whyChooseUs[0];
  index: number;
}) {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { amount: 0.3, once: false });
  const Icon = service.icon;

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      className="rounded-2xl bg-[#F7FAF5] p-6 sm:p-7 flex flex-col gap-4 hover:shadow-md transition-shadow duration-300 cursor-default"
    >
      {/* Icon */}
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-black/5">
        <Icon
          className="h-5 w-5 text-green-600"
          strokeWidth={2}
        />
      </div>

      <h3 className="text-[15px] font-semibold text-gray-900 leading-snug">
        {service.title}
      </h3>

      <p className="text-[13px] text-gray-500 leading-relaxed">
        {service.description}
      </p>
    </motion.div>
  );
}

export default function ServicesSection() {
  const headerRef = useRef(null);
  const headerControls = useAnimation();
  const headerInView = useInView(headerRef, { amount: 0.5, once: false });

  useEffect(() => {
    if (headerInView) {
      headerControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
      });
    } else {
      headerControls.start({ opacity: 0, y: 20 });
    }
  }, [headerInView, headerControls]);

  return (
    <section id="why-us" className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerControls}
          className="mb-12"
        >
          <p className="text-xs text-green-600 font-semibold uppercase tracking-widest mb-2">
            Why Choose Us
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Why travelers choose us
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {whyChooseUs.map((service, index) => (
            <AnimatedCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}