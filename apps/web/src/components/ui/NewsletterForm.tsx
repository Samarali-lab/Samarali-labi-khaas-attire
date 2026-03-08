'use client';

import { useState } from 'react';
import { z } from 'zod';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      z.string().email().parse(email);
      setStatus('loading');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-brand-gold"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-brand-gold text-black px-4 py-2 text-sm font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50"
        >
          {status === 'loading' ? '...' : 'Join'}
        </button>
      </div>
      {status === 'success' && (
        <p className="text-green-400 text-xs">🎉 Subscribed! Check your email for your 10% discount code.</p>
      )}
      {status === 'error' && (
        <p className="text-red-400 text-xs">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
