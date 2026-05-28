'use client';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    author: 'John Smith',
    date: '2025-01-15',
    text: 'Unforgettable experience. The tour was perfectly organized and the guide was incredibly knowledgeable. I would definitely come back!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&q=80&fit=crop',
    location: 'New York, USA',
  },
  {
    author: 'Emma Johnson',
    date: '2025-01-10',
    text: 'Amazing service and beautiful destinations. Everything was well-planned and the staff was very friendly. Highly recommended!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&q=80&fit=crop',
    location: 'London, UK',
  },
  {
    author: 'Michael Brown',
    date: '2025-01-05',
    text: "One of the best trips I've ever had. The attention to detail and customer care was exceptional. Worth every penny!",
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&q=80&fit=crop',
    location: 'Toronto, Canada',
  },
  {
    author: 'Sofia Martínez',
    date: '2024-12-28',
    text: 'Absolutely magical. Every moment felt curated just for us. The local experiences they arranged were things no guidebook could find.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&q=80&fit=crop',
    location: 'Barcelona, Spain',
  },
  {
    author: 'Liam O\'Connor',
    date: '2024-12-20',
    text: 'Seamless from start to finish. The accommodations were stunning, the itinerary was creative, and the team was always one step ahead.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&q=80&fit=crop',
    location: 'Dublin, Ireland',
  },
  {
    author: 'Yuki Tanaka',
    date: '2024-12-14',
    text: 'I was blown away by how personalized everything felt. They truly listened to what we wanted and delivered beyond expectations.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&q=80&fit=crop',
    location: 'Tokyo, Japan',
  },
  {
    author: 'Amara Osei',
    date: '2024-12-08',
    text: 'Exceptional quality and warm hospitality throughout. A travel experience that I will be telling stories about for years to come.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&q=80&fit=crop',
    location: 'Accra, Ghana',
  },
  {
    author: 'Carlos Reyes',
    date: '2024-11-30',
    text: 'Top-notch professionalism matched with genuine warmth. The hidden gems they took us to were absolutely priceless discoveries.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&q=80&fit=crop',
    location: 'Mexico City, Mexico',
  },
  {
    author: 'Priya Nair',
    date: '2024-11-22',
    text: 'Our family trip was handled with such care and creativity. The kids loved every single day, and so did we. Perfect memories made.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&q=80&fit=crop',
    location: 'Mumbai, India',
  },
  {
    author: 'Nora Lindqvist',
    date: '2024-11-15',
    text: 'Rare to find travel services that combine efficiency with soul. They nailed both. The sunset dinner they arranged was life-changing.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&q=80&fit=crop',
    location: 'Stockholm, Sweden',
  },
];

// Split into two rows
const row1 = reviews.slice(0, 5);
const row2 = reviews.slice(5);

function ReviewCard({ review }: { review: typeof reviews[0] }) {
  const [paused, setPaused] = useState(false);

  return (
    <div
      className="review-card"
      style={{ animationPlayState: paused ? 'paused' : 'inherit' } as React.CSSProperties}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <Quote size={20} className="quote-icon" />
      <div className="stars">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} size={14} className="star" />
        ))}
      </div>
      <p className="review-text">{review.text}</p>
      <div className="author-row">
        <img src={review.avatar} alt={review.author} className="avatar" />
        <div>
          <p className="author-name">{review.author}</p>
          <p className="author-meta">
            {review.location} &middot;{' '}
            {new Date(review.date).toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({
  items,
  direction = 'left',
  pauseRow,
  onPause,
  onResume,
}: {
  items: typeof reviews;
  direction?: 'left' | 'right';
  pauseRow: boolean;
  onPause: () => void;
  onResume: () => void;
}) {
  // Duplicate for seamless loop
  const doubled = [...items, ...items];

  return (
    <div
      className="marquee-track"
      onMouseEnter={onPause}
      onMouseLeave={onResume}
      onTouchStart={onPause}
      onTouchEnd={onResume}
    >
      <div
        className={`marquee-inner ${direction === 'right' ? 'marquee-reverse' : ''}`}
        style={{ animationPlayState: pauseRow ? 'paused' : 'running' }}
      >
        {doubled.map((review, i) => (
          <ReviewCard key={i} review={review} />
        ))}
      </div>
    </div>
  );
}

export default function ReviewsSection() {
  const [pauseRow1, setPauseRow1] = useState(false);
  const [pauseRow2, setPauseRow2] = useState(false);

  return (
    <section id="reviews" className="reviews-section">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');

        .reviews-section {
          padding: 96px 0;
          background: #fafaf8;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
        }

        .reviews-header {
          text-align: center;
          margin-bottom: 56px;
          padding: 0 24px;
        }

        .reviews-eyebrow {
          display: inline-block;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }

        .reviews-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.4rem, 5vw, 3.6rem);
          font-weight: 700;
          color: #1a1a18;
          line-height: 1.1;
          margin: 0 0 12px;
        }

        .reviews-subtitle {
          font-size: 15px;
          color: #888880;
          font-weight: 300;
          margin: 0;
        }

        /* Fade edges */
        .marquee-wrapper {
          position: relative;
        }
        .marquee-wrapper::before,
        .marquee-wrapper::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 120px;
          z-index: 2;
          pointer-events: none;
        }
        .marquee-wrapper::before {
          left: 0;
          background: linear-gradient(to right, #fafaf8, transparent);
        }
        .marquee-wrapper::after {
          right: 0;
          background: linear-gradient(to left, #fafaf8, transparent);
        }

        .marquee-track {
          overflow: hidden;
          margin-bottom: 20px;
        }

        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }

        .marquee-inner {
          display: flex;
          gap: 20px;
          width: max-content;
          animation: marquee-left 40s linear infinite;
        }
        .marquee-reverse {
          animation: marquee-right 46s linear infinite;
        }

        /* Card */
        .review-card {
          background: #ffffff;
          border: 1px solid #eeede8;
          border-radius: 16px;
          padding: 28px 28px 24px;
          width: 320px;
          flex-shrink: 0;
          cursor: default;
          transition: box-shadow 0.3s ease, transform 0.3s ease;
          position: relative;
        }
        .review-card:hover {
          box-shadow: 0 12px 40px rgba(0,0,0,0.08);
          transform: translateY(-3px);
        }

        .quote-icon {
          color: #ddd8ce;
          margin-bottom: 12px;
        }

        .stars {
          display: flex;
          gap: 3px;
          margin-bottom: 14px;
        }
        .star {
          fill: #e8a84c;
          color: #e8a84c;
        }

        .review-text {
          font-size: 14px;
          line-height: 1.7;
          color: #555550;
          margin: 0 0 20px;
          font-weight: 300;
        }

        .author-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 18px;
          border-top: 1px solid #f0efe9;
        }

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
        }

        .author-name {
          font-size: 13px;
          font-weight: 500;
          color: #1a1a18;
          margin: 0 0 2px;
        }

        .author-meta {
          font-size: 11px;
          color: #aaa9a3;
          margin: 0;
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="reviews-header"
      >
        <span className="reviews-eyebrow text-green-600">Testimonials</span>
        <h2 className="reviews-title">Loved by Travelers</h2>
        <p className="reviews-subtitle">Real stories from guests around the world</p>
      </motion.div>

      <div className="marquee-wrapper">
        <MarqueeRow
          items={row1}
          direction="left"
          pauseRow={pauseRow1}
          onPause={() => setPauseRow1(true)}
          onResume={() => setPauseRow1(false)}
        />
        <MarqueeRow
          items={row2}
          direction="right"
          pauseRow={pauseRow2}
          onPause={() => setPauseRow2(true)}
          onResume={() => setPauseRow2(false)}
        />
      </div>
    </section>
  );
}