import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'FAQs',
  description: 'Frequently asked questions about Khaas Attire — ordering, shipping, payments, returns, and more.',
};

const FAQS = [
  {
    category: 'Ordering',
    questions: [
      {
        q: 'How do I place an order?',
        a: 'Browse our shop, select your desired product, choose your size and color, and click "Add to Cart". Once you\'ve finished shopping, proceed to checkout and fill in your delivery details.',
      },
      {
        q: 'Can I modify or cancel my order after placing it?',
        a: 'Orders can be modified or cancelled within 2 hours of placing them. Please contact us immediately on WhatsApp at +92 300 123 4567 or email hello@khaasattire.pk.',
      },
      {
        q: 'Do you accept custom orders?',
        a: 'Yes! We accept custom sizing and colour requests for select products. Please contact us before placing your order to discuss requirements and additional lead time.',
      },
    ],
  },
  {
    category: 'Shipping',
    questions: [
      {
        q: 'What are the shipping charges?',
        a: 'Standard delivery is PKR 200. Orders above PKR 5,000 qualify for FREE shipping. Express delivery (1-2 days) is PKR 500 for major cities.',
      },
      {
        q: 'How long will my order take to arrive?',
        a: 'Standard delivery takes 3-5 business days. Express delivery takes 1-2 business days. You\'ll receive tracking information via SMS/WhatsApp once your order is dispatched.',
      },
      {
        q: 'Do you ship to all cities in Pakistan?',
        a: 'Yes, we deliver to all cities and towns across Pakistan including remote areas. Express delivery may not be available for some remote locations.',
      },
    ],
  },
  {
    category: 'Payments',
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept Cash on Delivery (COD), JazzCash, EasyPaisa, and international credit/debit cards via Stripe (Visa, Mastercard).',
      },
      {
        q: 'Is Cash on Delivery (COD) available?',
        a: 'Yes! COD is available nationwide across Pakistan. Pay when you receive your order.',
      },
      {
        q: 'Is my payment information secure?',
        a: 'Absolutely. All online payments are processed through secure, encrypted payment gateways. We never store your card details.',
      },
    ],
  },
  {
    category: 'Returns & Exchanges',
    questions: [
      {
        q: 'What is your return policy?',
        a: 'We accept returns within 7 days of delivery for unworn, unwashed items with original tags attached. Sale items, dupattas, and custom orders are non-returnable.',
      },
      {
        q: 'How do I initiate a return?',
        a: 'Contact us on WhatsApp (+92 300 123 4567) or email with your order number and reason for return. We\'ll guide you through the process.',
      },
      {
        q: 'How long does a refund take?',
        a: 'Once we receive and inspect your return, refunds are processed within 5-7 business days to your original payment method. For COD orders, you\'ll receive store credit.',
      },
    ],
  },
  {
    category: 'Sizing & Products',
    questions: [
      {
        q: 'How do I know which size to order?',
        a: 'Please refer to our detailed Size Guide page. If you\'re still unsure, contact us with your measurements and we\'ll help you choose the right size.',
      },
      {
        q: 'Are the colours accurate in the photos?',
        a: 'We make every effort to display colours accurately. However, slight variations may occur due to screen settings. If colour accuracy is critical, please contact us.',
      },
      {
        q: 'What fabrics do you use?',
        a: 'We use premium Pakistani fabrics including pure lawn, cotton-silk blends, georgette, khaddar, pure silk, and velvet — depending on the garment and season.',
      },
    ],
  },
];

export default function FAQsPage() {
  return (
    <div className="bg-brand-ivory">
      <section className="bg-brand-charcoal py-16 text-center">
        <div className="container-brand max-w-2xl">
          <h1 className="heading-xl text-white mb-3">Frequently Asked Questions</h1>
          <p className="text-gray-400">Everything you need to know about Khaas Attire.</p>
          <div className="gold-divider mt-6" />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-brand max-w-3xl">
          {FAQS.map(({ category, questions }) => (
            <div key={category} className="mb-10">
              <h2 className="mb-5 font-playfair text-xl font-semibold text-brand-maroon">
                {category}
              </h2>
              <div className="space-y-3">
                {questions.map(({ q, a }) => (
                  <details key={q} className="group bg-white">
                    <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 text-sm font-semibold text-brand-charcoal hover:text-brand-maroon transition-colors">
                      <span>{q}</span>
                      <span className="flex-shrink-0 text-2xl transition-transform duration-200 group-open:rotate-45 text-brand-gold">
                        +
                      </span>
                    </summary>
                    <div className="border-t border-gray-100 px-5 pb-5">
                      <p className="mt-4 text-sm leading-relaxed text-gray-600">{a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}

          {/* Still have questions */}
          <div className="mt-10 bg-brand-maroon p-8 text-center text-white">
            <h2 className="font-playfair text-xl font-semibold mb-3">Still Have Questions?</h2>
            <p className="mb-5 text-white/80 text-sm">
              Our customer support team is here to help you, 6 days a week.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="btn-gold">
                WhatsApp Us
              </a>
              <Link href="/contact" className="btn-secondary !border-white !text-white hover:!bg-white hover:!text-brand-charcoal">
                Send a Message
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
