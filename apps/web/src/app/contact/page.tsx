'use client';

import { useState } from 'react';
import { MessageCircle, Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div>
      <section className="relative h-48 bg-brand-charcoal flex items-center justify-center text-white text-center">
        <div>
          <h1 className="font-serif text-4xl font-bold">Contact Us</h1>
          <p className="text-gray-400 mt-2">We are here to help</p>
        </div>
      </section>

      <div className="container-brand py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="font-serif text-2xl font-bold text-brand-charcoal mb-8">Get in Touch</h2>
            {sent ? (
              <div className="bg-green-50 border border-green-200 p-6 text-green-700">
                <h3 className="font-bold mb-2">Message Sent!</h3>
                <p>Thank you for contacting us. We will get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-brand-maroon"
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-brand-maroon"
                />
                <input
                  type="text"
                  placeholder="Subject"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-brand-maroon"
                />
                <textarea
                  required
                  rows={5}
                  placeholder="Your message..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-brand-maroon resize-none"
                />
                <button type="submit" className="btn-primary w-full py-4">Send Message</button>
              </form>
            )}
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-brand-charcoal mb-8">Contact Info</h2>
            <div className="space-y-6">
              {[
                { icon: MapPin, label: 'Address', value: 'Main Boulevard, Gulberg III, Lahore, Pakistan' },
                { icon: Phone, label: 'Phone', value: '+92 300 1234567' },
                { icon: Mail, label: 'Email', value: 'hello@khaasattire.com' },
              ].map((item) => (
                <div key={item.label} className="flex gap-4">
                  <div className="w-12 h-12 bg-brand-ivory rounded-full flex items-center justify-center flex-shrink-0">
                    <item.icon size={20} className="text-brand-maroon" />
                  </div>
                  <div>
                    <p className="font-medium text-brand-charcoal">{item.label}</p>
                    <p className="text-gray-500 text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-brand-charcoal">WhatsApp</p>
                  <a
                    href="https://wa.me/923001234567?text=Hi KHAAS ATTIRE!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 text-sm hover:underline"
                  >
                    Chat with us on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-medium text-brand-charcoal mb-3">Business Hours</h3>
              <div className="text-sm text-gray-500 space-y-1">
                <p>Monday – Saturday: 10:00 AM – 7:00 PM</p>
                <p>Sunday: 12:00 PM – 5:00 PM</p>
                <p className="text-brand-gold">WhatsApp support: 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
