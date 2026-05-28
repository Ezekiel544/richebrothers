'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowRight, Clock } from 'lucide-react';
import Logoimg from '@/public/logo.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    { label: 'Airport Transfers', href: '#services' },
    { label: 'Half Day Tours', href: '#services' },
    { label: 'Full Day Tours', href: '#services' },
    { label: 'Fishing Charters', href: '#services' },
  ];

  const company = [
    { label: 'About Us', href: '#about' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
    { label: 'Book Now', href: '#booking' },
  ];

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA Strip */}
        <div className="py-10 sm:py-12">
          <div className="rounded-2xl border border-green-100 bg-green-50 px-6 py-8 sm:px-8 lg:px-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 shadow-sm">
            <div>
              <p className="text-sm font-semibold text-green-700 mb-2">
                Ready to explore Jamaica?
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-950">
                Book your private tour or airport transfer today.
              </h3>
              <p className="mt-3 max-w-2xl text-sm sm:text-base text-slate-600 leading-relaxed">
                Reliable, friendly, UK-managed service with local Jamaican drivers you can trust.
              </p>
            </div>

            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-green-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-600/25"
            >
              Book Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Main Footer */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-slate-200 py-10 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img
                src={Logoimg.src}
                alt="Rasta Bus Logo"
                className="h-12 w-auto rounded-full"
              />
            </div>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-600">
              <Clock className="h-4 w-4 text-green-600" />
              Available nationwide
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-base font-bold text-slate-950 mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 transition hover:text-green-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-serif text-base font-bold text-slate-950 mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 transition hover:text-green-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
         {/* Contact */}
<div className="min-w-0">
  <h4 className="font-serif text-base font-bold text-slate-950 mb-4">
    Contact
  </h4>

  <div className="space-y-4">
    <a
      href="tel:+18760000000"
      className="flex min-w-0 items-center gap-2 text-[12px] sm:text-sm text-slate-500 transition hover:text-green-600"
    >
      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-100">
        <Phone className="h-4 w-4 text-green-600" />
      </span>
      <span className="min-w-0 break-words">+1 (876) 000-0000</span>
    </a>

    <a
      href="mailto:info@richiebrotherstours.com"
      className="flex min-w-0 items-center gap-2 text-[12px] sm:text-sm text-slate-500 transition hover:text-green-600"
    >
      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-100">
        <Mail className="h-4 w-4 text-green-600" />
      </span>
      <span className="min-w-0 break-all sm:break-words">
        info@richiebrotherstours.com
      </span>
    </a>

    <div className="flex min-w-0 items-start gap-2 text-[12px] sm:text-sm text-slate-500">
      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-100">
        <MapPin className="h-4 w-4 text-green-600" />
      </span>
      <span className="min-w-0">
        Kingston, Jamaica
        <br />
        Available Nationwide
      </span>
    </div>
  </div>
</div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col gap-4 border-t border-slate-200 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            © {currentYear} Richie Brothers Tours Jamaica. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <Link
              href="#"
              className="text-xs text-slate-500 transition hover:text-green-600"
            >
              Privacy Policy
            </Link>

            <Link
              href="#"
              className="text-xs text-slate-500 transition hover:text-green-600"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}