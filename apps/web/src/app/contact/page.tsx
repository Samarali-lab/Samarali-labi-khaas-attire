'use client';

import type { Metadata } from 'next';
import { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { BRAND } from '@/lib/constants';
import { generateWhatsAppLink } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
    toast.success('Message sent! We\'ll get back to you within 24 hours.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const whatsappLink = generateWhatsAppLink(
    BRAND.whatsapp,
    'Hi! I have a question about Khaas Attire.',
  );

  return (
    <div className="bg-brand-ivory">
      {/* Header */}
      <section className="bg-brand-charcoal py-16 text-center">
        <div className="container-brand max-w-2xl">
          <h1 className="heading-xl text-white mb-3">Contact Us</h1>
          <p className="text-gray-400">
            We&apos;d love to hear from you. Our team responds within 24 hours.
          </p>
          <div className="gold-divider mt-6" />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-brand max-w-5xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Contact info */}
            <div className="space-y-6">
              <div>
                <h2 className="heading-sm mb-5">Get in Touch</h2>
                <p className="text-sm leading-relaxed text-gray-600">
                  Have a question about an order, sizing, or our products? We&apos;re here to help!
                </p>
              </div>

              {[
                {
                  icon: Phone,
                  label: 'Phone / WhatsApp',
                  value: BRAND.phone,
                  href: whatsappLink,
                  external: true,
                },
                {
                  icon: Mail,
                  label: 'Email',
                  value: BRAND.email,
                  href: `mailto:${BRAND.email}`,
                  external: false,
                },
                {
                  icon: MapPin,
                  label: 'Location',
                  value: BRAND.address,
                  href: null,
                  external: false,
                },
              ].map(({ icon: Icon, label, value, href, external }) => (
                <div key={label} className="flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center bg-brand-ivory-dark text-brand-maroon">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noopener noreferrer' : undefined}
                        className="text-sm text-brand-charcoal hover:text-brand-maroon transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm text-brand-charcoal">{value}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* WhatsApp CTA */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
              </a>

              {/* Business hours */}
              <div className="border-t border-gray-200 pt-5">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
                  Business Hours
                </h3>
                <div className="space-y-1.5 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Monday – Friday</span>
                    <span>9 AM – 7 PM PKT</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10 AM – 5 PM PKT</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-red-400">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="bg-white p-8 lg:col-span-2">
              <h2 className="heading-sm mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input
                    label="Full Name"
                    required
                    placeholder="Sara Khan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    required
                    placeholder="sara@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <Input
                  label="Subject"
                  required
                  placeholder="Order inquiry, sizing question..."
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />

                <div>
                  <label className="label-brand" htmlFor="message">
                    Message <span className="text-brand-maroon">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    placeholder="Tell us how we can help you..."
                    className="input-brand w-full resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <Button type="submit" loading={isLoading} size="lg">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
