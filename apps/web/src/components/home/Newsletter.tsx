'use client';

import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setSubscribed(true);
    setEmail('');
    toast.success("You're now subscribed to Khaas Attire!", { icon: '🎉' });
  };

  return (
    <section className="bg-brand-maroon py-16 sm:py-20" aria-labelledby="newsletter-heading">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern opacity-10" aria-hidden="true" />

      <div className="container-brand relative text-center">
        <div className="mx-auto max-w-xl">
          <div className="mb-4 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
              <Mail className="h-6 w-6 text-brand-gold" aria-hidden="true" />
            </div>
          </div>

          <h2 id="newsletter-heading" className="heading-lg mb-3 text-white">
            Stay in the Loop
          </h2>
          <p className="mb-8 text-brand-maroon-light/70 text-base text-white/80">
            Subscribe to get exclusive offers, new arrivals, and styling
            inspiration delivered to your inbox.
          </p>

          {subscribed ? (
            <div className="flex items-center justify-center gap-3 rounded-none border-2 border-brand-gold bg-white/10 p-4 text-white">
              <CheckCircle className="h-5 w-5 text-brand-gold" />
              <span className="font-medium">
                Thank you for subscribing! Welcome to the Khaas family. 🎉
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 sm:flex-row"
              noValidate
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 rounded-none border-0 bg-white/10 px-5 py-3.5 text-sm text-white placeholder-white/50 backdrop-blur-sm transition-colors focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                aria-label="Email address for newsletter"
              />
              <button
                type="submit"
                disabled={loading || !email.trim()}
                className="btn-gold flex-shrink-0 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Subscribing...
                  </span>
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>
          )}

          <p className="mt-4 text-xs text-white/50">
            No spam. Unsubscribe anytime. By subscribing, you agree to our{' '}
            <a href="/privacy-policy" className="underline hover:text-white transition-colors">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
