import type { Metadata } from 'next';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Fashion tips, style guides, and stories from Khaas Attire.',
};

const BLOG_POSTS = [
  {
    id: '1',
    title: 'How to Style Traditional Wear for Modern Occasions',
    slug: 'styling-traditional-wear-modern-occasions',
    excerpt: 'Discover how to blend classic Pakistani attire with contemporary styling tips for every modern occasion.',
    image: null,
    category: 'Style Guide',
    readTime: '5 min read',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    title: "The Complete Fabric Guide: Choosing the Right Material for Pakistan's Climate",
    slug: 'fabric-guide-choosing-right-material',
    excerpt: "Pakistan's diverse climate demands smart fabric choices. Here's your complete guide to choosing the right material every season.",
    image: null,
    category: 'Care & Fabrics',
    readTime: '7 min read',
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    title: 'Eid 2024: Our Top Picks for the Perfect Festive Look',
    slug: 'eid-2024-top-picks-festive-look',
    excerpt: 'Eid is approaching and we\'ve curated the most stunning pieces from our collection to help you dress to impress.',
    image: null,
    category: 'Collections',
    readTime: '4 min read',
    createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    title: 'The Art of Zardozi: Pakistan\'s Golden Embroidery Heritage',
    slug: 'art-of-zardozi-golden-embroidery-heritage',
    excerpt: 'Explore the centuries-old tradition of zardozi embroidery — an art form that turns fabric into wearable gold.',
    image: null,
    category: 'Heritage & Culture',
    readTime: '6 min read',
    createdAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '5',
    title: 'Caring for Your Embroidered Garments: A Complete Guide',
    slug: 'caring-for-embroidered-garments',
    excerpt: 'Preserve the beauty of your embroidered pieces for years to come with these expert care tips.',
    image: null,
    category: 'Care & Fabrics',
    readTime: '4 min read',
    createdAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '6',
    title: 'From Lahore to Karachi: Regional Textile Traditions of Pakistan',
    slug: 'regional-textile-traditions-pakistan',
    excerpt: 'A journey through Pakistan\'s diverse textile heritage — from Lahori embroidery to Sindhi Ajrak to Balochi mirror work.',
    image: null,
    category: 'Heritage & Culture',
    readTime: '8 min read',
    createdAt: new Date(Date.now() - 42 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const CATEGORIES = ['All', 'Style Guide', 'Collections', 'Care & Fabrics', 'Heritage & Culture'];

export default function BlogPage() {
  return (
    <div className="bg-brand-ivory">
      {/* Header */}
      <section className="bg-brand-charcoal py-16 text-center">
        <div className="container-brand max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">
            Stories & Style
          </p>
          <h1 className="heading-xl text-white mb-3">The Khaas Journal</h1>
          <p className="text-gray-400">
            Fashion inspiration, cultural stories, and styling tips from our world.
          </p>
          <div className="gold-divider mt-6" />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-brand">
          {/* Category filter */}
          <div className="mb-10 flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`rounded-none border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                  cat === 'All'
                    ? 'border-brand-maroon bg-brand-maroon text-white'
                    : 'border-gray-200 text-gray-600 hover:border-brand-maroon hover:text-brand-maroon'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured post */}
          <div className="mb-10">
            <Link href={`/blog/${BLOG_POSTS[0].slug}`} className="group block bg-white hover:shadow-brand transition-shadow">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="aspect-video bg-gradient-to-br from-brand-maroon-dark to-brand-maroon md:aspect-auto" />
                <div className="p-8 flex flex-col justify-center">
                  <span className="badge-new mb-3">{BLOG_POSTS[0].category}</span>
                  <h2 className="font-playfair text-2xl font-bold text-brand-charcoal group-hover:text-brand-maroon transition-colors mb-3">
                    {BLOG_POSTS[0].title}
                  </h2>
                  <p className="text-sm leading-relaxed text-gray-600 mb-4">
                    {BLOG_POSTS[0].excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span>{formatDate(BLOG_POSTS[0].createdAt)}</span>
                    <span>·</span>
                    <span>{BLOG_POSTS[0].readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Posts grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.slice(1).map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-white hover:shadow-brand transition-shadow"
              >
                <div className="aspect-[16/9] bg-gradient-to-br from-brand-ivory-dark to-gray-200" />
                <div className="p-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand-gold">
                    {post.category}
                  </span>
                  <h3 className="mt-2 font-playfair text-lg font-semibold text-brand-charcoal group-hover:text-brand-maroon transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                    <span>{formatDate(post.createdAt)}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
