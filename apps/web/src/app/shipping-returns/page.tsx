import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Shipping & Returns',
  description: 'Learn about our shipping rates, delivery times, and return policy at Khaas Attire.',
};

export default function ShippingReturnsPage() {
  return (
    <div className="bg-brand-ivory">
      <section className="bg-brand-charcoal py-16 text-center">
        <div className="container-brand max-w-2xl">
          <h1 className="heading-xl text-white mb-3">Shipping & Returns</h1>
          <div className="gold-divider mt-6" />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-brand max-w-4xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Shipping */}
            <div className="bg-white p-8">
              <h2 className="heading-sm mb-5 text-brand-maroon">🚚 Shipping Policy</h2>
              <div className="space-y-5 text-sm">
                <div>
                  <h3 className="font-semibold mb-2">Standard Delivery</h3>
                  <ul className="space-y-1 text-gray-600">
                    <li>• 3–5 business days across Pakistan</li>
                    <li>• PKR 200 flat rate</li>
                    <li>• FREE on orders above PKR 5,000</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Express Delivery</h3>
                  <ul className="space-y-1 text-gray-600">
                    <li>• 1–2 business days</li>
                    <li>• PKR 500 flat rate</li>
                    <li>• Available for major cities only</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Delivery Areas</h3>
                  <p className="text-gray-600">We deliver across all provinces of Pakistan including Islamabad, Punjab, Sindh, KPK, Balochistan, AJK, and Gilgit-Baltistan.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Order Processing</h3>
                  <p className="text-gray-600">Orders are processed within 1–2 business days. You will receive an SMS/WhatsApp notification once your order is dispatched.</p>
                </div>
              </div>
            </div>

            {/* Returns */}
            <div className="bg-white p-8">
              <h2 className="heading-sm mb-5 text-brand-maroon">🔄 Return Policy</h2>
              <div className="space-y-5 text-sm">
                <div>
                  <h3 className="font-semibold mb-2">Return Window</h3>
                  <p className="text-gray-600">You have <strong>7 days</strong> from the date of delivery to initiate a return.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Return Conditions</h3>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Item must be unworn and unwashed</li>
                    <li>• Original tags must be attached</li>
                    <li>• Item must be in original packaging</li>
                    <li>• No alterations or perfume/odours</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Non-returnable Items</h3>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Sale / discounted items</li>
                    <li>• Custom / made-to-order pieces</li>
                    <li>• Dupattas and scarves (hygiene)</li>
                    <li>• Items marked as final sale</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Refund Process</h3>
                  <p className="text-gray-600">Once we receive and inspect your return, a refund will be processed within 5–7 business days to your original payment method (or store credit for COD).</p>
                </div>
              </div>
            </div>
          </div>

          {/* How to return */}
          <div className="mt-8 bg-white p-8">
            <h2 className="heading-sm mb-5">How to Initiate a Return</h2>
            <ol className="space-y-4">
              {[
                { step: '1', title: 'Contact Us', desc: 'WhatsApp us at +92 300 123 4567 or email hello@khaasattire.pk with your order number and reason for return.' },
                { step: '2', title: 'Receive Return Label', desc: 'We\'ll send you a return shipping label or arrange a pickup from your address.' },
                { step: '3', title: 'Pack and Send', desc: 'Pack the item securely in its original packaging and drop it off or hand it to our courier.' },
                { step: '4', title: 'Refund Processed', desc: 'Once we receive and approve the return, your refund will be processed within 5–7 business days.' },
              ].map(({ step, title, desc }) => (
                <li key={step} className="flex gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-maroon text-sm font-bold text-white">
                    {step}
                  </span>
                  <div>
                    <h3 className="font-semibold text-brand-charcoal">{title}</h3>
                    <p className="mt-0.5 text-sm text-gray-600">{desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Have questions? <Link href="/contact" className="text-brand-maroon hover:underline font-medium">Contact us</Link> or check our <Link href="/faqs" className="text-brand-maroon hover:underline font-medium">FAQs</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
