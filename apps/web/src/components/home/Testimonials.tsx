import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Aisha Malik',
    city: 'Lahore',
    rating: 5,
    text: "The quality of the embroidery on my Eid shalwar kameez was absolutely breathtaking. I've never received so many compliments! Khaas Attire truly lives up to its name — it's genuinely special.",
    product: 'Crimson Rose Embroidered Shalwar Kameez',
    avatar: 'AM',
  },
  {
    id: 2,
    name: 'Fatima Zahra',
    city: 'Karachi',
    rating: 5,
    text: "I ordered the bridal lehenga for my sister's mehndi and it was even more gorgeous in person. The zardozi work was immaculate and the fabric was luxurious. Highly recommend!",
    product: 'Golden Zardozi Bridal Lehenga',
    avatar: 'FZ',
  },
  {
    id: 3,
    name: 'Zara Ahmed',
    city: 'Islamabad',
    rating: 5,
    text: "Finally found a brand that delivers on its promises! The sizing was perfect, the fabric was premium, and the packaging was beautiful. Will definitely be ordering again.",
    product: 'Ivory Georgette Formal Shalwar Kameez',
    avatar: 'ZA',
  },
  {
    id: 4,
    name: 'Omar Khan',
    city: 'Faisalabad',
    rating: 5,
    text: "Bought the indigo kurta for Eid and got so many compliments. The fabric is incredibly comfortable for summer and the craftsmanship is top-notch. Super fast delivery too!",
    product: 'Midnight Indigo Handwoven Kurta',
    avatar: 'OK',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? 'fill-brand-gold text-brand-gold' : 'text-gray-300'}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="section-padding bg-brand-ivory" aria-labelledby="testimonials-heading">
      <div className="container-brand">
        {/* Section header */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">
            Customer Love
          </p>
          <h2 id="testimonials-heading" className="heading-lg mb-4">
            What Our Customers Say
          </h2>
          <div className="gold-divider" />
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((testimonial) => (
            <article
              key={testimonial.id}
              className="bg-white p-6 shadow-sm hover:shadow-brand transition-shadow duration-300"
            >
              {/* Stars */}
              <StarRating rating={testimonial.rating} />

              {/* Quote */}
              <blockquote className="mt-4">
                <p className="text-sm leading-relaxed text-brand-charcoal-light">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
              </blockquote>

              {/* Author */}
              <footer className="mt-5 flex items-center gap-3 border-t border-gray-100 pt-5">
                <div
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-maroon text-sm font-bold text-white"
                  aria-hidden="true"
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-charcoal">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-gray-400">{testimonial.city}</p>
                </div>
              </footer>

              {/* Product */}
              <p className="mt-3 text-xs text-brand-maroon">
                Bought: {testimonial.product}
              </p>
            </article>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-brand-ivory-dark pt-16 sm:grid-cols-4">
          {[
            { value: '10,000+', label: 'Happy Customers' },
            { value: '4.9/5', label: 'Average Rating' },
            { value: '500+', label: 'Products' },
            { value: '100%', label: 'Authentic Craftsmanship' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-playfair text-3xl font-bold text-brand-maroon sm:text-4xl">
                {stat.value}
              </div>
              <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
