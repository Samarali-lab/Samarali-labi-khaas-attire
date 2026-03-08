import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping & Returns',
  description: 'Learn about our shipping rates, delivery times, and return policy.',
};

export default function ShippingReturnsPage() {
  return (
    <div className="container-brand py-16 max-w-3xl mx-auto">
      <h1 className="font-serif text-4xl font-bold text-brand-charcoal mb-10">
        Shipping & Returns
      </h1>

      <div className="space-y-10">
        <section>
          <h2 className="font-serif text-2xl font-bold text-brand-charcoal mb-4">
            Shipping Policy
          </h2>
          <div className="bg-white border border-gray-100 p-6 space-y-4 text-gray-600 text-sm leading-relaxed">
            <p><strong className="text-brand-charcoal">Free Shipping:</strong> All orders above Rs. 5,000 get free shipping.</p>
            <p><strong className="text-brand-charcoal">Standard Delivery:</strong> 3–5 business days — Rs. 200</p>
            <p><strong className="text-brand-charcoal">Express Delivery:</strong> 1–2 business days (major cities) — Rs. 400</p>
            <p><strong className="text-brand-charcoal">International Shipping:</strong> Available to USA, UK, UAE, Canada, Australia. Rates calculated at checkout. Delivery in 7–14 business days.</p>
            <p><strong className="text-brand-charcoal">Courier Partners:</strong> TCS, Leopards Courier, BlueEx, DHL (international).</p>
            <p>Orders placed before 2 PM (PKT) are dispatched the same business day.</p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-brand-charcoal mb-4">
            Return Policy
          </h2>
          <div className="bg-white border border-gray-100 p-6 space-y-4 text-gray-600 text-sm leading-relaxed">
            <p>We want you to be 100% satisfied. If you're not, here's what you can do:</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Returns accepted within <strong className="text-brand-charcoal">7 days</strong> of delivery.</li>
              <li>Items must be <strong className="text-brand-charcoal">unworn, unwashed</strong>, with all original tags attached.</li>
              <li>Sale items, innerwear, and customized products are <strong className="text-brand-charcoal">non-returnable</strong>.</li>
              <li>Refunds are processed within 5–7 business days to your original payment method.</li>
              <li>For COD orders, refunds are via bank transfer or Easypaisa/JazzCash.</li>
            </ul>
            <p className="mt-4">
              To initiate a return, contact us on{' '}
              <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer"
                className="text-green-600 hover:underline">
                WhatsApp
              </a>{' '}
              or email us at returns@khaasattire.com.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
