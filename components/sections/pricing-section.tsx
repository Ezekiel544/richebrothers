'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import { MapPin, Clock, Users, ArrowRight, Search, X } from 'lucide-react';

// ── Price Data ────────────────────────────────────────────────────────────────

const negrilTours = [
  { destination: 'YS Falls', price: 250, duration: 'Full Day', highlight: true },
  { destination: 'Appleton Estate', price: 250, duration: 'Full Day', highlight: false },
  { destination: 'Black River Safari', price: 230, duration: 'Full Day', highlight: false },
  { destination: 'Pelicans Bar', price: 230, duration: 'Half Day', highlight: false },
  { destination: 'Benta Falls', price: 200, duration: 'Full Day', highlight: false },
  { destination: 'Rafting on the Great River', price: 200, duration: 'Half Day', highlight: false },
  { destination: 'Dolphin Cove Lucea', price: 160, duration: 'Half Day', highlight: false },
  { destination: 'Chukka Outpost', price: 160, duration: 'Half Day', highlight: false },
  { destination: 'Montego Bay Day Trip', price: 220, duration: 'Full Day', highlight: false },
  { destination: 'Luminous Lagoon', price: 220, duration: 'Evening', highlight: true },
  { destination: 'Martha Brae Rafting', price: 220, duration: 'Half Day', highlight: false },
  { destination: 'Bob Marley Mausoleum', price: 250, duration: 'Full Day', highlight: false },
  { destination: "Dunn's River Falls", price: 250, duration: 'Full Day', highlight: false },
  { destination: 'Blue Hole, Ocho Rios', price: 260, duration: 'Full Day', highlight: true },
  { destination: 'Bob Marley Museum', price: 450, duration: 'Full Day', highlight: false },
  { destination: 'Blue Mountains', price: 500, duration: 'Full Day', highlight: false },
  { destination: 'Portland', price: 600, duration: 'Full Day', highlight: false },
];

const montegoBayTours = [
   { destination: 'YS Falls', price: 250, duration: 'Full Day', highlight: true },
  { destination: 'Negril Day Trip', price: 220, duration: 'Full Day', highlight: false },
  { destination: 'Appleton Estate', price: 250, duration: 'Full Day', highlight: false },
  { destination: 'Black River Safari', price: 230, duration: 'Full Day', highlight: false },
  { destination: 'Pelicans Bar', price: 230, duration: 'Half Day', highlight: false },
  { destination: 'Great River Rafting', price: 100, duration: 'Half Day', highlight: true },
  { destination: 'Martha Brae Rafting', price: 160, duration: 'Half Day', highlight: false },
  { destination: "Dunn's River Falls", price: 220, duration: 'Full Day', highlight: false },
  { destination: 'Blue Hole, Ocho Rios', price: 220, duration: 'Full Day', highlight: false },
  { destination: 'Bob Marley Mausoleum', price: 220, duration: 'Full Day', highlight: false },
  { destination: 'Bob Marley Museum', price: 380, duration: 'Full Day', highlight: false },
];

const airportTransfers = [
    { destination: 'Ocho Rios', price: 132, extraPer: 10, baseGroup: '1–4 people', highlight: true },
    { destination: 'Kingston', price: 360, extraPer: 20, baseGroup: '1–4 people', highlight: true },
  { destination: 'Montego Bay (Local)', price: 40, extraPer: 5, baseGroup: '1–4 people', highlight: false },
  { destination: 'Falmouth', price: 72, extraPer: 10, baseGroup: '1–4 people', highlight: false },
  { destination: 'Negril', price: 80, extraPer: 10, baseGroup: '1–4 people', highlight: false },
  { destination: 'Lucea', price: 72, extraPer: 10, baseGroup: '1–4 people', highlight: false },
  { destination: 'Portland', price: 300, extraPer: 20, baseGroup: '1–4 people', highlight: false },
];

type Tab = 'negril' | 'montego' | 'transfer';

const tabs: { id: Tab; label: string; sub: string }[] = [
  { id: 'negril', label: 'Negril Tours', sub: 'Departing from Negril' },
  { id: 'montego', label: 'Montego Bay Tours', sub: 'Departing from Montego Bay' },
  { id: 'transfer', label: 'Airport Transfers', sub: 'From Montego Bay Airport' },
];

// ── Tour Card ─────────────────────────────────────────────────────────────────

function TourCard({
  destination, price, duration, highlight, index, tab,
}: {
  destination: string; price: number; duration: string;
  highlight: boolean; index: number; tab: Tab;
}) {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { amount: 0.15, once: false });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.45, delay: (index % 6) * 0.07, ease: [0.22, 1, 0.36, 1] } });
    } else {
      controls.start({ opacity: 0, y: 24 });
    }
  }, [inView, controls, index]);

  const deposit = Math.ceil(price * 0.2);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={controls}
      className={`relative flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 group hover:shadow-lg hover:-translate-y-0.5 ${
        highlight ? 'border-green-200 bg-gradient-to-b from-green-50 to-white' : 'border-gray-100 bg-white'
      }`}
    >
      {highlight && (
        <div className="absolute top-3 right-3">
          <span className="bg-green-600 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide">
            Popular
          </span>
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start gap-2 mb-3 pr-12">
          <MapPin size={14} className="text-green-600 flex-shrink-0 mt-0.5" />
          <h3 className="text-[14px] font-semibold text-gray-900 leading-snug">{destination}</h3>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <span className="flex items-center gap-1 text-[11px] text-gray-400">
            <Clock size={11} />{duration}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-gray-400">
            <Users size={11} />+$20 per extra person
          </span>
        </div>
        <div className="flex-1" />
        <div className="flex items-end justify-between pt-4 border-t border-gray-100 mt-2">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">From</p>
            <p className="text-[20px] font-bold text-gray-900 leading-none">
              ${price}<span className="text-[11px] font-normal text-gray-400 ml-1">USD</span>
            </p>
            <p className="text-[11px] text-green-600 mt-1">20% deposit = ${deposit}</p>
          </div>
          <a
            href={`/booking?tab=${tab}&destination=${encodeURIComponent(destination)}`}
            className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-[12px] font-semibold px-4 py-2 rounded-full transition-colors duration-200"
          >
            Book <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ── Transfer Card ─────────────────────────────────────────────────────────────

function TransferCard({
  destination, price, extraPer, baseGroup, highlight, index,
}: {
  destination: string; price: number; extraPer: number;
  baseGroup: string; highlight: boolean; index: number;
}) {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { amount: 0.15, once: false });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.45, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] } });
    } else {
      controls.start({ opacity: 0, y: 24 });
    }
  }, [inView, controls, index]);

  const deposit = Math.ceil(price * 0.2);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={controls}
      className={`relative flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${
        highlight ? 'border-green-200 bg-gradient-to-b from-green-50 to-white' : 'border-gray-100 bg-white'
      }`}
    >
      {highlight && (
        <div className="absolute top-3 right-3">
          <span className="bg-green-600 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide">
            Popular
          </span>
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start gap-2 mb-3 pr-12">
          <MapPin size={14} className="text-green-600 flex-shrink-0 mt-0.5" />
          <h3 className="text-[14px] font-semibold text-gray-900 leading-snug">
            MBJ Airport → {destination}
          </h3>
        </div>
        <div className="flex flex-col gap-1 mb-4">
          <span className="flex items-center gap-1.5 text-[11px] text-gray-400">
            <Users size={11} />Flat rate for {baseGroup}
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-gray-400">
            <ArrowRight size={11} />+${extraPer} per extra person after 4
          </span>
        </div>
        <div className="flex-1" />
        <div className="flex items-end justify-between pt-4 border-t border-gray-100 mt-2">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">From</p>
            <p className="text-[20px] font-bold text-gray-900 leading-none">
              ${price}<span className="text-[11px] font-normal text-gray-400 ml-1">USD</span>
            </p>
            <p className="text-[11px] text-green-600 mt-1">20% deposit = ${deposit}</p>
          </div>
          <a
            href={`/booking?tab=transfer&destination=${encodeURIComponent(destination)}`}
            className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-[12px] font-semibold px-4 py-2 rounded-full transition-colors duration-200"
          >
            Book <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────

export default function PricingSection() {
  const [activeTab, setActiveTab] = useState<Tab>('negril');
  const [searchQuery, setSearchQuery] = useState('');

  const headerRef = useRef(null);
  const headerControls = useAnimation();
  const headerInView = useInView(headerRef, { amount: 0.4, once: false });

  useEffect(() => {
    if (headerInView) {
      headerControls.start({ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } });
    } else {
      headerControls.start({ opacity: 0, y: 20 });
    }
  }, [headerInView, headerControls]);

  // Reset search when tab changes
  useEffect(() => {
    setSearchQuery('');
  }, [activeTab]);

  const activeSub = tabs.find((t) => t.id === activeTab)?.sub ?? '';

  // Filter logic
  const q = searchQuery.toLowerCase().trim();

  const filteredNegril = negrilTours.filter(t =>
    t.destination.toLowerCase().includes(q) || t.duration.toLowerCase().includes(q)
  );
  const filteredMontego = montegoBayTours.filter(t =>
    t.destination.toLowerCase().includes(q) || t.duration.toLowerCase().includes(q)
  );
  const filteredTransfers = airportTransfers.filter(t =>
    t.destination.toLowerCase().includes(q)
  );

  const activeCount =
    activeTab === 'negril' ? filteredNegril.length :
    activeTab === 'montego' ? filteredMontego.length :
    filteredTransfers.length;

  const totalCount =
    activeTab === 'negril' ? negrilTours.length :
    activeTab === 'montego' ? montegoBayTours.length :
    airportTransfers.length;

  return (
    <section id="pricing" className="py-20 sm:py-28 bg-[#F9FAF8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">

        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerControls}
          className="mb-10"
        >
          <p className="text-xs text-green-600 font-semibold uppercase tracking-widest mb-2">
            Destinations & Pricing
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                Where do you want to go?
              </h2>
              <p className="text-[14px] text-gray-400 mt-2">
                All prices in USD · 20% deposit secures your booking · Balance paid on the day
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Tabs + Search row ── */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">

          {/* Tab pills */}
          <div className="flex flex-wrap gap-2 flex-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-green-600 text-white shadow-sm'
                    : 'bg-white text-gray-500 border border-gray-200 hover:border-green-300 hover:text-green-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search input */}
          <div className="relative w-full sm:w-64">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search destination..."
              className="w-full pl-9 pr-9 py-2.5 rounded-full border border-gray-200 bg-white text-[13px] text-gray-700 placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Sub label + result count */}
        <div className="flex items-center justify-between mb-7 pl-1">
          <p className="text-[12px] text-gray-400">{activeSub}</p>
          {q && (
            <p className="text-[12px] text-gray-400">
              {activeCount === 0
                ? 'No results found'
                : `${activeCount} of ${totalCount} results`}
            </p>
          )}
        </div>

        {/* ── Negril Tours ── */}
        {activeTab === 'negril' && (
          filteredNegril.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredNegril.map((tour, i) => (
                <TourCard key={tour.destination} {...tour} index={i} tab="negril" />
              ))}
            </div>
          ) : (
            <EmptyState query={searchQuery} onClear={() => setSearchQuery('')} />
          )
        )}

        {/* ── Montego Bay Tours ── */}
        {activeTab === 'montego' && (
          filteredMontego.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMontego.map((tour, i) => (
                <TourCard key={tour.destination} {...tour} index={i} tab="montego" />
              ))}
            </div>
          ) : (
            <EmptyState query={searchQuery} onClear={() => setSearchQuery('')} />
          )
        )}

        {/* ── Airport Transfers ── */}
        {activeTab === 'transfer' && (
          filteredTransfers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTransfers.map((t, i) => (
                <TransferCard key={t.destination} {...t} index={i} />
              ))}
            </div>
          ) : (
            <EmptyState query={searchQuery} onClear={() => setSearchQuery('')} />
          )
        )}

        {/* Bottom note */}
        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-gray-100 rounded-2xl px-6 py-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <Users size={14} className="text-green-600" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-gray-800">Group pricing</p>
              <p className="text-[12px] text-gray-400">
                {activeTab === 'transfer'
                  ? 'Base price covers up to 4 people. Extra charge applies per person beyond that.'
                  : 'Base price is for 1 person. Each additional person adds $20 USD to the total.'}
              </p>
            </div>
          </div>
          <a
            href="/booking"
            className="flex-shrink-0 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-[13px] font-semibold px-6 py-2.5 rounded-full transition-colors duration-200"
          >
            Book Now <ArrowRight size={14} />
          </a>
        </div>

      </div>
    </section>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────

function EmptyState({ query, onClear }: { query: string; onClear: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <Search size={22} className="text-gray-400" />
      </div>
      <p className="text-[15px] font-semibold text-gray-700 mb-1">
        No results for &quot;{query}&quot;
      </p>
      <p className="text-[13px] text-gray-400 mb-5">
        Try a different destination name or clear the search.
      </p>
      <button
        onClick={onClear}
        className="flex items-center gap-2 border border-gray-200 hover:border-green-400 text-gray-600 hover:text-green-600 text-[13px] font-medium px-5 py-2 rounded-full transition-all duration-200"
      >
        <X size={13} /> Clear search
      </button>
    </div>
  );
}