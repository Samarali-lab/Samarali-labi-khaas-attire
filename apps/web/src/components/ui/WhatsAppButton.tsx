'use client';

import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '923001234567';
  const message = encodeURIComponent('Hi! I would like to know more about KHAAS ATTIRE products.');
  const url = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-200 flex items-center gap-2 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={24} />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap text-sm font-medium">
        Chat with us
      </span>
    </a>
  );
}
