export const BRAND = {
  name: 'Khaas Attire',
  tagline: 'Dress to Express',
  description:
    'Premium Pakistani clothing brand celebrating the artistry of traditional craftsmanship with contemporary design.',
  email: 'hello@khaasattire.pk',
  phone: '+92 300 123 4567',
  whatsapp: '923001234567',
  address: 'Gulberg III, Lahore, Pakistan',
  socialLinks: {
    instagram: 'https://instagram.com/khaasattire',
    facebook: 'https://facebook.com/khaasattire',
    tiktok: 'https://tiktok.com/@khaasattire',
    pinterest: 'https://pinterest.com/khaasattire',
  },
} as const;

export const COLORS = {
  primary: '#800020',
  primaryDark: '#5C0016',
  primaryLight: '#A0002A',
  accent: '#C9A84C',
  accentDark: '#A88930',
  accentLight: '#DFC06E',
  background: '#FAF7F2',
  backgroundDark: '#F0EBE0',
  text: '#2C2C2C',
  textLight: '#4A4A4A',
} as const;

export const PAKISTAN_PROVINCES = [
  'Punjab',
  'Sindh',
  'Khyber Pakhtunkhwa',
  'Balochistan',
  'Islamabad Capital Territory',
  'Azad Kashmir',
  'Gilgit-Baltistan',
] as const;

export const PAKISTAN_CITIES: Record<string, string[]> = {
  Punjab: [
    'Lahore',
    'Faisalabad',
    'Rawalpindi',
    'Gujranwala',
    'Multan',
    'Sialkot',
    'Bahawalpur',
    'Sargodha',
    'Sheikhupura',
    'Jhang',
    'Gujrat',
    'Rahim Yar Khan',
    'Kasur',
    'Sahiwal',
    'Okara',
    'Chiniot',
    'Khanewal',
    'Hafizabad',
    'Pakpattan',
    'Mandi Bahauddin',
  ],
  Sindh: [
    'Karachi',
    'Hyderabad',
    'Sukkur',
    'Larkana',
    'Nawabshah',
    'Mirpur Khas',
    'Jacobabad',
    'Shikarpur',
    'Khairpur',
    'Dadu',
    'Thatta',
    'Umerkot',
  ],
  'Khyber Pakhtunkhwa': [
    'Peshawar',
    'Abbottabad',
    'Mardan',
    'Swat',
    'Mansehra',
    'Kohat',
    'Bannu',
    'Dera Ismail Khan',
    'Nowshera',
    'Charsadda',
    'Haripur',
    'Mingora',
  ],
  Balochistan: [
    'Quetta',
    'Gwadar',
    'Turbat',
    'Khuzdar',
    'Chaman',
    'Hub',
    'Dera Murad Jamali',
    'Sui',
    'Loralai',
    'Sibi',
  ],
  'Islamabad Capital Territory': ['Islamabad'],
  'Azad Kashmir': [
    'Muzaffarabad',
    'Mirpur',
    'Rawalakot',
    'Kotli',
    'Bhimber',
    'Bagh',
  ],
  'Gilgit-Baltistan': [
    'Gilgit',
    'Skardu',
    'Hunza',
    'Chilas',
    'Astore',
    'Ghanche',
  ],
};

export const SIZES_WOMEN = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] as const;
export const SIZES_MEN = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'] as const;
export const SIZES_KIDS = [
  '2-3Y',
  '4-5Y',
  '6-7Y',
  '8-9Y',
  '10-11Y',
  '12-13Y',
] as const;

export const GENDER_OPTIONS = ['Women', 'Men', 'Kids', 'Unisex'] as const;

export const PAYMENT_METHODS = [
  { id: 'COD', label: 'Cash on Delivery', icon: '💵', description: 'Pay when you receive your order' },
  { id: 'JAZZCASH', label: 'JazzCash', icon: '📱', description: 'Pay via JazzCash mobile wallet' },
  { id: 'EASYPAISA', label: 'EasyPaisa', icon: '📱', description: 'Pay via EasyPaisa mobile wallet' },
  { id: 'STRIPE', label: 'Credit / Debit Card', icon: '💳', description: 'Pay with Visa, Mastercard, or American Express' },
] as const;

export const SHIPPING = {
  standardFee: 200,
  expressFee: 500,
  freeThreshold: 5000,
  estimatedDaysStandard: '3-5 business days',
  estimatedDaysExpress: '1-2 business days',
} as const;

export const ORDER_STATUS_LABELS: Record<string, string> = {
  PENDING: 'Order Placed',
  PROCESSING: 'Processing',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
  REFUNDED: 'Refunded',
};

export const ORDER_STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  PROCESSING: 'bg-blue-100 text-blue-800',
  SHIPPED: 'bg-purple-100 text-purple-800',
  DELIVERED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
  REFUNDED: 'bg-gray-100 text-gray-800',
};

export const NAV_LINKS = [
  { label: 'New Arrivals', href: '/shop?sort=newest' },
  { label: 'Shop', href: '/shop' },
  { label: 'Collections', href: '/shop?view=collections' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
] as const;

export const FOOTER_LINKS = {
  shop: [
    { label: 'New Arrivals', href: '/shop?sort=newest' },
    { label: 'Shalwar Kameez', href: '/shop?category=shalwar-kameez' },
    { label: 'Kurta', href: '/shop?category=kurta' },
    { label: 'Lehenga', href: '/shop?category=lehenga' },
    { label: 'Dupatta & Scarves', href: '/shop?category=dupatta' },
    { label: 'Kids Wear', href: '/shop?category=kids-wear' },
  ],
  customer: [
    { label: 'My Account', href: '/account' },
    { label: 'Track Order', href: '/account/orders' },
    { label: 'Size Guide', href: '/size-guide' },
    { label: 'Shipping & Returns', href: '/shipping-returns' },
    { label: 'FAQs', href: '/faqs' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
} as const;
