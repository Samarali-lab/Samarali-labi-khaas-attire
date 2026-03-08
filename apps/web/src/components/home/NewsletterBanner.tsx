import { NewsletterForm } from '@/components/ui/NewsletterForm';

export function NewsletterBanner() {
  return (
    <section className="bg-brand-ivory border-t border-gray-200 py-20">
      <div className="container-brand text-center">
        <p className="text-brand-gold tracking-[0.3em] uppercase text-sm font-medium mb-3">
          Exclusive Offer
        </p>
        <h2 className="font-serif text-4xl font-bold text-brand-charcoal mb-4">
          Get 10% Off Your First Order
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Subscribe to our newsletter for exclusive deals, new arrivals, and style inspiration.
        </p>
        <div className="max-w-md mx-auto">
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
