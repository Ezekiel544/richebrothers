'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const tourVideos = [
  {
    year: '2024',
    title: 'Beach Day Tour',
    description:
      'Guests enjoying a private beach stop with music, laughter, and clear Jamaican waters.',
    video: '/tour-one.mp4',
  },
  {
    year: '2024',
    title: 'Airport Transfer',
    description:
      'Smooth pickup and comfortable island transport from the airport to the resort.',
    video: '/tour-two.mp4',
  },
  {
    year: '2023',
    title: 'Fishing Charter',
    description:
      'A private fishing trip with fresh sea breeze, great company, and unforgettable catches.',
    video: '/tour-three.mp4',
  },
  {
    year: '2023',
    title: 'Full Day Island Tour',
    description:
      'A full day exploring local food, beaches, culture, and hidden Jamaican spots.',
    video: '/tour-four.mp4',
  },
];

function AutoPlayVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      {
        threshold: 0.45,
        rootMargin: '80px 0px',
      }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="group relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-slate-100 shadow-sm ring-1 ring-slate-200">
      <video
        ref={videoRef}
        src={src}
        className="h-full w-full object-cover"
        muted
        loop
        playsInline
        preload="metadata"
      />

      <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/5" />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-100 transition group-hover:opacity-0">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-green-600 shadow-lg backdrop-blur">
          <Play className="h-6 w-6 fill-current" />
        </div>
      </div>
    </div>
  );
}

export default function TourMemoriesSection() {
  return (
    <section id="tour-memories" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
        <div className="mb-16 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-green-600">
            Past Tours
          </p>
          <h2 className="font-serif text-3xl font-bold text-slate-950 sm:text-4xl">
            Real moments from our trips
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">
            A look back at airport pickups, private tours, fishing charters,
            and beautiful memories made across Jamaica.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 h-full w-px bg-slate-200 lg:left-1/2 lg:-translate-x-1/2" />

          <div className="space-y-16 lg:space-y-20">
            {tourVideos.map((item, index) => {
              const videoLeft = index % 2 === 0;

              return (
                <motion.div
                  key={`${item.year}-${item.title}`}
                  initial={{ opacity: 0, y: 34 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative grid gap-7 pl-12 lg:grid-cols-2 lg:items-center lg:gap-16 lg:pl-0"
                >
                  {/* Dot */}
                  <span className="absolute left-4 top-10 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-green-600 ring-8 ring-green-50 lg:left-1/2" />

                  {/* Left side */}
                  <div
                    className={
                      videoLeft
                        ? 'lg:pr-12'
                        : 'lg:pr-12 lg:text-right'
                    }
                  >
                    {videoLeft ? (
                      <AutoPlayVideo src={item.video} />
                    ) : (
                      <div>
                        <p className="font-serif text-4xl font-bold text-slate-950">
                          {item.year}
                        </p>
                        <h3 className="mt-3 text-lg font-bold text-slate-900">
                          {item.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-slate-500">
                          {item.description}
                        </p>
                        <button className="mt-5 inline-flex items-center rounded-full bg-green-50 px-4 py-2 text-xs font-bold text-green-700 transition hover:bg-green-100">
                          Watch memory
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Right side */}
                  <div className={videoLeft ? 'lg:pl-12' : 'lg:pl-12'}>
                    {videoLeft ? (
                      <div>
                        <p className="font-serif text-4xl font-bold text-slate-950">
                          {item.year}
                        </p>
                        <h3 className="mt-3 text-lg font-bold text-slate-900">
                          {item.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-slate-500">
                          {item.description}
                        </p>
                        <button className="mt-5 inline-flex items-center rounded-full bg-green-50 px-4 py-2 text-xs font-bold text-green-700 transition hover:bg-green-100">
                          Watch memory
                        </button>
                      </div>
                    ) : (
                      <AutoPlayVideo src={item.video} />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}