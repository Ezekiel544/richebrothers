'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'Services', href: '/#why-us' },
  { label: 'Tours', href: '/#tours' },
  { label: 'Reviews', href: '/#reviews' },
  { label: 'Contact', href: '/#contact' },
];

export default function PricingHeader() {
  const pathname = usePathname();
  const isBooking = pathname?.includes('booking');

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 sm:h-18">

          {/* Logo - Left */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="relative w-10 h-10">
              <Image
                src="/logo.png"
                alt="Richie Brothers Tours"
                fill
                className="object-contain"
              />
            </div>

            <div className="hidden sm:block">
              <p
                className="text-[13px] font-bold text-gray-900 leading-tight"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Richie Brothers
              </p>
              <p className="text-[10px] text-green-600 tracking-widest uppercase">
                Tours Jamaica
              </p>
            </div>
          </Link>

          {/* Navigation - Center */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button - Right */}
          <div className="flex-shrink-0">
            {isBooking ? (
              <Link
                href="/pricing"
                className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-[13px] font-semibold px-5 py-2 rounded-full transition-colors duration-200 shadow-sm"
              >
                View Pricing
              </Link>
            ) : (
              <Link
                href="/booking"
                className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-[13px] font-semibold px-5 py-2 rounded-full transition-colors duration-200 shadow-sm"
              >
                Book Now
              </Link>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}