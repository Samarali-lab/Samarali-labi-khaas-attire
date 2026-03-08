'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Do you offer Cash on Delivery (COD)?',
    a: 'Yes! We offer Cash on Delivery across Pakistan. Pay when your order arrives at your doorstep.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Standard delivery takes 3-5 business days. Express delivery (1-2 days) is available in major cities like Lahore, Karachi, and Islamabad.',
  },
  {
    q: 'What is your return policy?',
    a: 'We offer a 7-day return policy for unworn items with original tags. Sale items are non-returnable. For exchanges, contact us via WhatsApp.',
  },
  {
    q: 'Is there free shipping?',
    a: 'Yes! Orders over Rs. 5,000 get free shipping anywhere in Pakistan.',
  },
  {
    q: 'Can I track my order?',
    a: 'Yes. Once your order is shipped, you will receive a tracking number via SMS/WhatsApp to track your package.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Yes, we ship to the USA, UK, UAE, Canada, Australia, and other countries. International shipping costs are calculated at checkout.',
  },
  {
    q: 'How do I care for my KHAAS ATTIRE clothing?',
    a: 'Care instructions vary by product and are printed on the garment label. Generally, hand wash or gentle machine wash in cold water. Avoid bleach and tumble drying.',
  },
  {
    q: 'Can I exchange sizes?',
    a: 'Yes, size exchanges are available within 7 days of delivery, subject to stock availability. Contact our WhatsApp for fastest assistance.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="container-brand py-16 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl font-bold text-brand-charcoal mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600">Can't find your answer? Chat with us on WhatsApp!</p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-gray-200 bg-white">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-6 py-4 text-left"
            >
              <span className="font-medium text-brand-charcoal">{faq.q}</span>
              <ChevronDown
                size={18}
                className={`flex-shrink-0 text-gray-400 transition-transform ${
                  openIndex === i ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === i && (
              <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
