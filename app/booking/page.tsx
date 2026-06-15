'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Users, Calendar, Clock, Phone, Mail,
  User, ArrowRight, ArrowLeft, Check, ChevronDown,
} from 'lucide-react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import  { isValidPhoneNumber } from 'react-phone-number-input';
import type { Value as E164Number } from 'react-phone-number-input';
import PricingHeader from '@/components/sections/pricing-header';
// ── Price Data ────────────────────────────────────────────────────────────────

const negrilDestinations = [
  { name: 'Appleton Estate', price: 250 },
  { name: 'YS Falls', price: 250 },
  { name: 'Black River Safari', price: 230 },
  { name: 'Pelicans Bar', price: 230 },
  { name: 'Benta Falls', price: 200 },
  { name: 'Rafting on the Great River', price: 200 },
  { name: 'Dolphin Cove Lucea', price: 160 },
  { name: 'Chukka Outpost', price: 160 },
  { name: 'Montego Bay Day Trip', price: 220 },
  { name: 'Luminous Lagoon', price: 220 },
  { name: 'Martha Brae Rafting', price: 220 },
  { name: 'Bob Marley Mausoleum', price: 250 },
  { name: "Dunn's River Falls", price: 250 },
  { name: 'Blue Hole, Ocho Rios', price: 260 },
  { name: 'Bob Marley Museum', price: 450 },
  { name: 'Blue Mountains', price: 500 },
  { name: 'Portland', price: 600 },
];

const montegoBayDestinations = [
  { name: 'Negril Day Trip', price: 220 },
  { name: 'YS Falls', price: 250 },
  { name: 'Appleton Estate', price: 250 },
  { name: 'Black River Safari', price: 230 },
  { name: 'Pelicans Bar', price: 230 },
  { name: 'Great River Rafting', price: 100 },
  { name: 'Martha Brae Rafting', price: 160 },
  { name: "Dunn's River Falls", price: 220 },
  { name: 'Blue Hole, Ocho Rios', price: 220 },
  { name: 'Bob Marley Mausoleum', price: 220 },
  { name: 'Bob Marley Museum', price: 380 },
];

const transferDestinations = [
  { name: 'Montego Bay (Local)', price: 40, extraPer: 5 },
  { name: 'Falmouth', price: 72, extraPer: 10 },
  { name: 'Negril', price: 80, extraPer: 10 },
  { name: 'Lucea', price: 72, extraPer: 10 },
  { name: 'Ocho Rios', price: 132, extraPer: 10 },
  { name: 'Kingston', price: 360, extraPer: 20 },
  { name: 'Portland', price: 300, extraPer: 20 },
];

// ── Types ─────────────────────────────────────────────────────────────────────

type BookingType = 'tour' | 'transfer';
type Departure = 'negril' | 'montego';

interface FormData {
  bookingType: BookingType;
  departure: Departure;
  destination: string;
  people: number;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

// ── Price Calculator ──────────────────────────────────────────────────────────

function calcPrice(form: FormData) {
  const { bookingType, departure, destination, people } = form;

  if (!destination) return { base: 0, extra: 0, total: 0, deposit: 0, balance: 0 };

  if (bookingType === 'tour') {
    const list = departure === 'negril' ? negrilDestinations : montegoBayDestinations;
    const found = list.find((d) => d.name === destination);
    if (!found) return { base: 0, extra: 0, total: 0, deposit: 0, balance: 0 };
    const extra = Math.max(0, people - 1) * 20;
    const total = found.price + extra;
    const deposit = Math.ceil(total * 0.2);
    return { base: found.price, extra, total, deposit, balance: total - deposit };
  } else {
    const found = transferDestinations.find((d) => d.name === destination);
    if (!found) return { base: 0, extra: 0, total: 0, deposit: 0, balance: 0 };
    const extraPeople = Math.max(0, people - 4);
    const extra = extraPeople * found.extraPer;
    const total = found.price + extra;
    const deposit = Math.ceil(total * 0.2);
    return { base: found.price, extra, total, deposit, balance: total - deposit };
  }
}

// ── Step indicator ────────────────────────────────────────────────────────────

function StepBar({ step }: { step: number }) {
  const steps = ['Your Details', 'Review', 'Payment'];
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {steps.map((label, i) => {
        const num = i + 1;
        const done = step > num;
        const active = step === num;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold transition-all duration-300 ${
                  done
                    ? 'bg-green-600 text-white'
                    : active
                    ? 'bg-green-600 text-white ring-4 ring-green-100'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {done ? <Check size={14} /> : num}
              </div>
              <span
                className={`text-[11px] mt-1.5 font-medium whitespace-nowrap ${
                  active ? 'text-green-600' : done ? 'text-gray-500' : 'text-gray-300'
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`w-16 sm:w-24 h-[2px] mx-2 mb-5 transition-all duration-500 ${
                  step > num ? 'bg-green-500' : 'bg-gray-100'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Price Summary Box ─────────────────────────────────────────────────────────

function PriceSummary({ form }: { form: FormData }) {
  const price = calcPrice(form);
  const hasPrice = price.total > 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
      <p className="text-[11px] text-green-600 font-semibold uppercase tracking-widest mb-4">
        Price Summary
      </p>

      {!hasPrice ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mb-3">
            <MapPin size={16} className="text-gray-300" />
          </div>
          <p className="text-[12px] text-gray-400">Select a destination to see pricing</p>
        </div>
      ) : (
        <>
          {/* Destination pill */}
          <div className="flex items-center gap-2 mb-5 p-3 bg-gray-50 rounded-xl">
            <MapPin size={13} className="text-green-600 flex-shrink-0" />
            <div>
              <p className="text-[12px] font-semibold text-gray-800 leading-tight">{form.destination}</p>
              <p className="text-[11px] text-gray-400 capitalize">
                {form.bookingType === 'transfer' ? 'Airport Transfer' : `${form.departure === 'negril' ? 'Negril' : 'Montego Bay'} Tour`}
              </p>
            </div>
          </div>

          {/* Breakdown */}
          <div className="space-y-2.5 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-[12px] text-gray-500">
                Base price {form.bookingType === 'transfer' ? '(1–4 people)' : '(1 person)'}
              </span>
              <span className="text-[13px] font-semibold text-gray-800">${price.base}</span>
            </div>

            {price.extra > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="flex justify-between items-center"
              >
                <span className="text-[12px] text-gray-500">
                  {form.bookingType === 'transfer'
                    ? `Extra people (${Math.max(0, form.people - 4)})`
                    : `Extra people (${Math.max(0, form.people - 1)})`}
                </span>
                <span className="text-[13px] font-semibold text-gray-800">+${price.extra}</span>
              </motion.div>
            )}

            <div className="h-px bg-gray-100 my-1" />

            <div className="flex justify-between items-center">
              <span className="text-[12px] font-semibold text-gray-700">Total</span>
              <span className="text-[16px] font-bold text-gray-900">${price.total} USD</span>
            </div>
          </div>

          {/* Deposit box */}
          <div className="bg-green-50 border border-green-100 rounded-xl p-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[12px] text-green-700 font-semibold">Deposit today (20%)</span>
              <span className="text-[17px] font-bold text-green-700">${price.deposit}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-green-600/70">Balance on the day</span>
              <span className="text-[12px] font-semibold text-green-600/70">${price.balance}</span>
            </div>
          </div>

          {/* People note */}
          {form.people > 0 && (
            <p className="text-[11px] text-gray-400 mt-3 text-center">
              {form.bookingType === 'transfer'
                ? form.people <= 4
                  ? `${form.people} people — covered by flat rate`
                  : `${form.people} people — flat rate + ${form.people - 4} extra`
                : `${form.people} ${form.people === 1 ? 'person' : 'people'}`}
            </p>
          )}
        </>
      )}
    </div>
  );
}

// ── Select field ──────────────────────────────────────────────────────────────

function SelectField({
  label, value, onChange, options, placeholder, icon: Icon,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
  icon?: React.ElementType;
}) {
  return (
    <div>
      <label className="block text-[12px] font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        )}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full ${Icon ? 'pl-9' : 'pl-4'} pr-8 py-3 rounded-xl border border-gray-200 bg-white text-[13px] text-gray-800 appearance-none focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all duration-200`}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}

// ── Phone field ───────────────────────────────────────────────────────────────

// function PhoneField({
//   value, onChange,
// }: {
//   value: string;
//   onChange: (v: string) => void;
// }) {
//   const [phone, setPhone] = useState(value);

//   const handleChange = (val: string | undefined) => {
//     const v = val || '';
//     setPhone(v);
//     onChange(v);
//   };

//   return (
//     <div>
//       <style>{`
//         .PhoneInputInput {
//           border: none !important;
//           outline: none !important;
//           box-shadow: none !important;
//           background: transparent !important;
//         }
//       `}</style>

//       <label className="block text-[12px] font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
//         Phone Number <span className="text-green-500">*</span>
//       </label>

//       <PhoneInput
//         international
//         defaultCountry="JM"
//         value={phone}
//         onChange={handleChange}
//         className="flex items-center w-full pl-5 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus-within:border-green-400 focus-within:ring-2 focus-within:ring-green-100 transition-all duration-200"
//         inputClassName="flex-1 text-[13px] text-gray-800 placeholder-gray-400 bg-transparent !border-none !outline-none !shadow-none focus:outline-none"
//       />
//     </div>
//   );
// }
function PhoneField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [touched, setTouched] = useState(false);
 
  // isValidPhoneNumber from react-phone-number-input uses libphonenumber-js
  // and enforces the exact digit count for each country automatically.
  const phoneVal = value as E164Number;
  const isValid = value ? isValidPhoneNumber(value) : false;
  const showError = touched && value.length > 0 && !isValid;
  const showSuccess = touched && isValid;
 
  return (
    <div>
      <style>{`
        .PhoneInputInput {
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
          background: transparent !important;
          font-size: 13px;
          color: #1f2937;
        }
        .PhoneInputInput::placeholder { color: #9ca3af; }
        .PhoneInputCountrySelect { background: transparent; border: none; outline: none; cursor: pointer; }
      `}</style>
 
      <label className="block text-[11px] font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
        Phone Number <span className="text-green-500">*</span>
      </label>
 
      <div className={`flex items-center w-full pl-3 pr-3 py-2.5 rounded-xl border bg-white transition-all duration-200 ${
        showError ? 'border-red-300 ring-2 ring-red-100' : showSuccess ? 'border-green-400 ring-2 ring-green-100' : 'border-gray-200 focus-within:border-green-400 focus-within:ring-2 focus-within:ring-green-100'
      }`}>
        <PhoneInput
          international
          defaultCountry="JM"
          value={phoneVal}
          onChange={(val) => { onChange(val || ''); }}
          onBlur={() => setTouched(true)}
          className="flex-1 flex items-center"
          inputClassName="flex-1 bg-transparent !border-none !outline-none !shadow-none"
        />
        {showSuccess && (
          <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 ml-1">
            <Check size={9} className="text-white" />
          </div>
        )}
        {showError && (
          <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 ml-1">
            <span className="text-white text-[9px] font-bold">!</span>
          </div>
        )}
      </div>
 
      {showError && (
        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] text-red-500 mt-1 pl-1">
          Enter a valid number for the selected country
        </motion.p>
      )}
    </div>
  );
}
 

// ── Email field with validation ───────────────────────────────────────────────

function EmailField({
  value, onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [touched, setTouched] = useState(false);
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const showError = touched && value.length > 0 && !isValid;
  const showSuccess = touched && isValid;

  return (
    <div>
      <label className="block text-[12px] font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
        Email Address <span className="text-green-500">*</span>
      </label>
      <div className="relative">
        <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          type="email"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="john@email.com"
          className={`w-full pl-9 pr-9 py-3 rounded-xl border text-[13px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 bg-white ${
            showError
              ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
              : showSuccess
              ? 'border-green-400 focus:border-green-400 focus:ring-green-100'
              : 'border-gray-200 focus:border-green-400 focus:ring-green-100'
          }`}
        />
        {showError && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">!</span>
          </div>
        )}
        {showSuccess && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
            <Check size={9} className="text-white" />
          </div>
        )}
      </div>
      {showError && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[11px] text-red-500 mt-1.5 pl-1"
        >
          Please enter a valid email address (e.g. john@email.com)
        </motion.p>
      )}
    </div>
  );
}

// ── Date field with min = today ───────────────────────────────────────────────

function DateField({
  value, onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <label className="block text-[12px] font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
        Date <span className="text-green-500">*</span>
      </label>
      <div className="relative">
        <Calendar size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          type="date"
          value={value}
          min={today}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-[13px] text-gray-800 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all duration-200"
        />
      </div>
      <p className="text-[11px] text-gray-400 mt-1 pl-1">Earliest available: today</p>
    </div>
  );
}

// ── Input field ───────────────────────────────────────────────────────────────

function InputField({
  label, type = 'text', value, onChange, placeholder, icon: Icon, required,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  icon?: React.ElementType;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[12px] font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
        {label} {required && <span className="text-green-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full ${Icon ? 'pl-9' : 'pl-4'} pr-4 py-3 rounded-xl border border-gray-200 bg-white text-[13px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all duration-200`}
        />
      </div>
    </div>
  );
}

// ── Step 1: Form ──────────────────────────────────────────────────────────────

function StepForm({
  form,
  setForm,
  onNext,
}: {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  onNext: () => void;
}) {
  const destinations =
    form.bookingType === 'transfer'
      ? transferDestinations.map((d) => d.name)
      : form.departure === 'negril'
      ? negrilDestinations.map((d) => d.name)
      : montegoBayDestinations.map((d) => d.name);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  // Phone is valid when it has at least 7 digits (covers all international formats)
  const isValidPhone = form.phone.replace(/\D/g, '').length >= 7;

  const canProceed =
    !!form.destination &&
    form.people > 0 &&
    !!form.date &&
    !!form.time &&
    !!form.name.trim() &&
    isValidEmail &&
    isValidPhone;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Form */}
      <div className="lg:col-span-2 space-y-6">

        {/* Booking type toggle */}
        <div>
          <p className="text-[12px] font-semibold text-gray-600 mb-2 uppercase tracking-wide">Booking Type</p>
          <div className="grid grid-cols-2 gap-3">
            {(['tour', 'transfer'] as BookingType[]).map((type) => (
              <button
                key={type}
                onClick={() => setForm((f) => ({ ...f, bookingType: type, destination: '' }))}
                className={`py-3 px-4 rounded-xl border text-[13px] font-semibold transition-all duration-200 ${
                  form.bookingType === type
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 bg-white text-gray-500 hover:border-green-300'
                }`}
              >
                {type === 'tour' ? '🗺️ Tour' : '✈️ Airport Transfer'}
              </button>
            ))}
          </div>
        </div>

        {/* Departure — only for tours */}
        {form.bookingType === 'tour' && (
          <div>
            <p className="text-[12px] font-semibold text-gray-600 mb-2 uppercase tracking-wide">Departing From</p>
            <div className="grid grid-cols-2 gap-3">
              {(['negril', 'montego'] as Departure[]).map((dep) => (
                <button
                  key={dep}
                  onClick={() => setForm((f) => ({ ...f, departure: dep, destination: '' }))}
                  className={`py-3 px-4 rounded-xl border text-[13px] font-semibold transition-all duration-200 ${
                    form.departure === dep
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 bg-white text-gray-500 hover:border-green-300'
                  }`}
                >
                  {dep === 'negril' ? 'Negril' : 'Montego Bay'}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Destination */}
        <SelectField
          label="Destination"
          value={form.destination}
          onChange={(v) => setForm((f) => ({ ...f, destination: v }))}
          options={destinations}
          placeholder="Select destination"
          icon={MapPin}
        />

        {/* People */}
        <div>
          <label className="block text-[12px] font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
            Number of People
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setForm((f) => ({ ...f, people: Math.max(1, f.people - 1) }))}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-green-400 hover:text-green-600 transition-all text-lg font-bold"
            >
              −
            </button>
            <div className="flex-1 py-3 bg-white border border-gray-200 rounded-xl text-center text-[15px] font-bold text-gray-900">
              {form.people} {form.people === 1 ? 'person' : 'people'}
            </div>
            <button
              onClick={() => setForm((f) => ({ ...f, people: Math.min(20, f.people + 1) }))}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-green-400 hover:text-green-600 transition-all text-lg font-bold"
            >
              +
            </button>
          </div>
          {form.bookingType === 'transfer' && form.people > 4 && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[11px] text-green-600 mt-2 pl-1"
            >
              Extra charge applies for people beyond 4
            </motion.p>
          )}
        </div>

        {/* Date + Time */}
        <div className="grid grid-cols-2 gap-4">
          <DateField
            value={form.date}
            onChange={(v) => setForm((f) => ({ ...f, date: v }))}
          />
          <InputField
            label="Pickup Time"
            type="time"
            value={form.time}
            onChange={(v) => setForm((f) => ({ ...f, time: v }))}
            placeholder=""
            icon={Clock}
            required
          />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-[11px] text-gray-400 font-medium uppercase tracking-widest">Your details</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        {/* Personal details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Full Name"
            value={form.name}
            onChange={(v) => setForm((f) => ({ ...f, name: v }))}
            placeholder="John Smith"
            icon={User}
            required
          />
          <PhoneField
            value={form.phone}
            onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
          />
        </div>

        <EmailField
          value={form.email}
          onChange={(v) => setForm((f) => ({ ...f, email: v }))}
        />

        {/* Notes */}
        <div>
          <label className="block text-[12px] font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
            Special Requests <span className="text-gray-400 font-normal normal-case">(optional)</span>
          </label>
          <textarea
            value={form.notes}
            onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
            placeholder="Hotel name, pickup address, any special requirements..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[13px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all duration-200 resize-none"
          />
        </div>

        {/* Mobile price summary */}
        <div className="lg:hidden">
          <PriceSummary form={form} />
        </div>

        {/* Next button */}
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`w-full py-4 rounded-2xl text-[14px] font-bold flex items-center justify-center gap-2 transition-all duration-200 ${
            canProceed
              ? 'bg-green-600 hover:bg-green-700 text-white shadow-sm hover:shadow-md'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Review My Booking <ArrowRight size={16} />
        </button>

        {!canProceed && (
          <p className="text-[12px] text-gray-400 text-center -mt-3">
            Fill in all required fields to continue
          </p>
        )}
      </div>

      {/* Desktop sticky price summary */}
      <div className="hidden lg:block">
        <PriceSummary form={form} />
      </div>
    </div>
  );
}

// ── Step 2: Review ────────────────────────────────────────────────────────────

function StepReview({
  form,
  onBack,
  onNext,
}: {
  form: FormData;
  onBack: () => void;
  onNext: () => void;
}) {
  const price = calcPrice(form);

  const rows = [
    { label: 'Booking type', value: form.bookingType === 'tour' ? 'Tour' : 'Airport Transfer' },
    { label: 'Departure', value: form.bookingType === 'tour' ? (form.departure === 'negril' ? 'Negril' : 'Montego Bay') : 'MBJ Airport' },
    { label: 'Destination', value: form.destination },
    { label: 'Number of people', value: `${form.people} ${form.people === 1 ? 'person' : 'people'}` },
    { label: 'Date', value: new Date(form.date).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) },
    { label: 'Pickup time', value: form.time },
    { label: 'Full name', value: form.name },
    { label: 'Email', value: form.email },
    { label: 'Phone', value: form.phone },
    ...(form.notes ? [{ label: 'Special requests', value: form.notes }] : []),
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-5">

        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <Check size={14} className="text-green-600" />
          </div>
          <div>
            <p className="text-[14px] font-bold text-gray-900">Booking Summary</p>
            <p className="text-[12px] text-gray-400">Please check everything before paying</p>
          </div>
        </div>

        {/* Details */}
        <div className="divide-y divide-gray-50">
          {rows.map((row) => (
            <div key={row.label} className="flex items-start justify-between px-6 py-3.5">
              <span className="text-[12px] text-gray-400 w-36 flex-shrink-0">{row.label}</span>
              <span className="text-[13px] font-semibold text-gray-800 text-right">{row.value}</span>
            </div>
          ))}
        </div>

        {/* Price breakdown */}
        <div
          className="mx-5 my-4 rounded-xl p-4"
          style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)' }}
        >
          <p className="text-[11px] text-green-700 font-semibold uppercase tracking-widest mb-3">
            Payment Breakdown
          </p>
          <div className="space-y-2">
            <div className="flex justify-between text-[13px]">
              <span className="text-green-800/70">Base price</span>
              <span className="font-semibold text-green-900">${price.base} USD</span>
            </div>
            {price.extra > 0 && (
              <div className="flex justify-between text-[13px]">
                <span className="text-green-800/70">Additional people</span>
                <span className="font-semibold text-green-900">+${price.extra} USD</span>
              </div>
            )}
            <div className="h-px bg-green-200 my-1" />
            <div className="flex justify-between">
              <span className="text-[13px] font-bold text-green-900">Total</span>
              <span className="text-[16px] font-bold text-green-900">${price.total} USD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[12px] text-green-700">Deposit today (20%)</span>
              <span className="text-[14px] font-bold text-green-700">${price.deposit} USD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[12px] text-green-700/70">Balance on the day</span>
              <span className="text-[12px] font-semibold text-green-700/70">${price.balance} USD</span>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3.5 rounded-2xl border border-gray-200 text-[13px] font-semibold text-gray-600 hover:border-green-400 hover:text-green-600 flex items-center justify-center gap-2 transition-all duration-200"
        >
          <ArrowLeft size={15} /> Edit Details
        </button>
        <button
          onClick={onNext}
          className="flex-1 py-3.5 rounded-2xl bg-green-600 hover:bg-green-700 text-white text-[13px] font-bold flex items-center justify-center gap-2 transition-all duration-200 shadow-sm"
        >
          Pay ${price.deposit} Deposit <ArrowRight size={15} />
        </button>
      </div>

      <p className="text-[11px] text-gray-400 text-center mt-4">
        🔒 Secure payment · Your driver is confirmed once deposit is paid
      </p>
    </div>
  );
}

// ── Step 3: Payment placeholder ───────────────────────────────────────────────

function StepPayment({ form, onBack }: { form: FormData; onBack: () => void }) {
  const price = calcPrice(form);

  return (
    <div className="max-w-md mx-auto text-center">
      <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-5">
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-green-600">
            <rect x="2" y="5" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="1.8" fill="none"/>
            <path d="M2 10h20" stroke="currentColor" strokeWidth="1.8"/>
            <circle cx="7" cy="15" r="1.5" fill="currentColor"/>
          </svg>
        </div>
        <p className="text-[11px] text-green-600 font-semibold uppercase tracking-widest mb-2">Secure Payment</p>
        <h3 className="text-[20px] font-bold text-gray-900 mb-1">Pay ${price.deposit} USD</h3>
        <p className="text-[13px] text-gray-400 mb-6">
          20% deposit to confirm your booking.<br />
          Balance of ${price.balance} paid on the day.
        </p>

        {/* Stripe placeholder */}
        <div className="bg-gray-50 border border-dashed border-gray-200 rounded-xl p-6 mb-5">
          <p className="text-[12px] text-gray-400 font-medium">Stripe payment form loads here</p>
          <p className="text-[11px] text-gray-300 mt-1">Connect your Stripe account to activate</p>
        </div>

        <button className="w-full py-3.5 rounded-2xl bg-green-600 hover:bg-green-700 text-white text-[14px] font-bold transition-colors duration-200 shadow-sm">
          Pay ${price.deposit} Now
        </button>
      </div>

      <button
        onClick={onBack}
        className="flex items-center justify-center gap-2 text-[13px] text-gray-400 hover:text-gray-600 transition-colors mx-auto"
      >
        <ArrowLeft size={14} /> Back to summary
      </button>
    </div>
  );
}

// ── Main Booking Page ─────────────────────────────────────────────────────────

function BookingContent() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);

  const tabParam = searchParams.get('tab');
  const depParam = searchParams.get('departure');   // ← separate param for departure
  const destParam = searchParams.get('destination') ?? '';

  // Safely resolve bookingType — only 'tour' or 'transfer' are valid
  const resolvedBookingType: BookingType =
    tabParam === 'transfer' ? 'transfer' : 'tour';

  // Safely resolve departure — only 'negril' or 'montego' are valid
  const resolvedDeparture: Departure =
    depParam === 'montego' ? 'montego' : 'negril';

  const [form, setForm] = useState<FormData>({
    bookingType: resolvedBookingType,
    departure: resolvedDeparture,
    destination: destParam,
    people: 1,
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    notes: '',
  });

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };
  const [direction, setDirection] = useState(1);

  const goNext = () => { setDirection(1); setStep((s) => s + 1); };
  const goBack = () => { setDirection(-1); setStep((s) => s - 1); };

  return (
    <main className="min-h-screen bg-[#F9FAF8]">
      <PricingHeader />
      {/* Page header */}
      {/* <div
        className="pt-28 pb-10 text-center"
        style={{ background: 'linear-gradient(160deg, #0f1f14 0%, #132b19 60%, #0a1a0f 100%)' }}
      >
        <p className="text-xs text-green-400 font-semibold uppercase tracking-widest mb-2">
          {step === 1 ? 'Book Your Experience' : step === 2 ? 'Almost There' : 'Secure Your Seat'}
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>
          {step === 1 ? 'Fill in your details' : step === 2 ? 'Review your booking' : 'Pay your deposit'}
        </h1>
      </div> */}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
        <StepBar step={step} />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 1 && <StepForm form={form} setForm={setForm} onNext={goNext} />}
            {step === 2 && <StepReview form={form} onBack={goBack} onNext={goNext} />}
            {step === 3 && <StepPayment form={form} onBack={goBack} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F9FAF8] flex items-center justify-center"><p className="text-gray-400 text-sm">Loading...</p></div>}>
      <BookingContent />
    </Suspense>
  );
}