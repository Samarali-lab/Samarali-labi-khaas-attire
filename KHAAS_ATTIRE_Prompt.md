# 🧵 Full Stack E-Commerce Website Prompt for "KHAAS ATTIRE"

## 🎯 Project Overview

Build a **complete, production-ready, full stack e-commerce website** for a Pakistani clothing brand called **KHAAS ATTIRE**. The website must reflect the brand's identity — elegant, premium, culturally rooted, and fashion-forward. The UI should feel luxurious and modern, with a **Pakistani cultural aesthetic** (think rich colors like deep emerald, gold, ivory, maroon, and soft beige tones). The site must work flawlessly on mobile, tablet, and desktop.

---

## 🏷️ Brand Details

- **Brand Name:** KHAAS ATTIRE
- **Tagline:** *"Wear What Speaks."* (or suggest a better one)
- **Location:** Pakistan
- **Products:** Men's & Women's ethnic and semi-formal Pakistani clothing (e.g., lawn suits, shalwar kameez, kurtas, formals, embroidered collections)
- **Target Audience:** Pakistani consumers (local) and Pakistani diaspora internationally
- **Currency:** PKR (Pakistani Rupee) as default; USD optional
- **Language:** English (with Urdu font/text support optional)

---

## ⚙️ Tech Stack (Full Stack)

### Frontend
- **Framework:** Next.js 14+ (App Router, SSR + SSG)
- **Styling:** Tailwind CSS + custom CSS variables for brand colors
- **Language:** TypeScript
- **State Management:** Zustand (for cart, wishlist)
- **Animations:** Framer Motion
- **Icons:** Lucide React or React Icons

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js or NestJS (your choice — clearly state which)
- **Authentication:** NextAuth.js / Auth.js (Email + Google OAuth)
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Caching:** Redis (for sessions and cart)
- **File/Image Storage:** Cloudinary (for product images)
- **Email Service:** Nodemailer or Resend

### Payment Integration
- **Primary:** JazzCash and Easypaisa (Pakistan local payments)
- **Secondary:** Stripe (for international orders / card payments)
- **Optional:** Cash on Delivery (COD) — very popular in Pakistan, must be included

### Deployment
- **Frontend + Backend:** Vercel or Railway
- **Database:** Supabase (PostgreSQL) or PlanetScale
- **Image CDN:** Cloudinary

---

## 📄 Pages & Features

### 1. 🏠 Home Page
- Hero section with full-screen banner/slideshow (latest collection)
- Brand story / "About KHAAS ATTIRE" section (brief)
- Featured Collections (e.g., *Eid Collection*, *Winter Formals*, *Everyday Lawn*)
- New Arrivals section (grid layout)
- Testimonials / reviews carousel
- Instagram-style lookbook grid
- Newsletter signup ("Get 10% off your first order")
- Sticky header with: Logo | Nav Links | Search | Wishlist Icon | Cart Icon | Login

### 2. 🛍️ Shop / Product Listing Page
- Filter sidebar: Category, Size, Color, Price Range, Fabric, Gender
- Sort by: Newest, Price (Low-High, High-Low), Most Popular, On Sale
- Pagination + infinite scroll option
- Product card: Image, Name, Price, Quick Add to Cart, Wishlist icon, Sale badge
- Responsive grid: 4 cols desktop / 2 cols mobile

### 3. 👗 Product Detail Page
- Multiple product images (gallery with zoom)
- Product name, SKU, price (strike-through if on sale)
- Size selector with size guide modal
- Color/variant selector
- Quantity picker
- Add to Cart + Buy Now buttons
- Product description, fabric details, care instructions (tabs)
- Customer reviews & ratings section
- "You may also like" recommended products
- Breadcrumb navigation
- Share on WhatsApp / social share button

### 4. 🛒 Cart Page
- Cart item list with image, name, size, color, quantity editor, remove
- Order summary: subtotal, discount code field, shipping estimate, total
- "Proceed to Checkout" button

### 5. 💳 Checkout Page
- Multi-step checkout: Shipping Info → Payment → Review & Confirm
- Address form (Pakistan-specific: city, province/state, postal code)
- Payment method selection: JazzCash, Easypaisa, Stripe Card, Cash on Delivery
- Order summary sidebar
- Place Order → confirmation page with order number

### 6. 👤 User Dashboard (Account Pages)
- Register / Login / Forgot Password
- Profile: name, email, phone, address book
- Order History: list of past orders with status (Pending, Processing, Shipped, Delivered)
- Order Detail: itemized with tracking info
- Wishlist management
- Change password

### 7. 📦 Admin Dashboard (Protected)
- Login-protected admin panel at `/admin`
- **Dashboard:** Total revenue, orders today, total customers, low stock alerts
- **Products Management:** Add / Edit / Delete products; upload images to Cloudinary; set price, category, sizes, colors, stock
- **Orders Management:** View all orders, update order status, view customer details
- **Customers Management:** List of all registered users
- **Discount Codes:** Create and manage promo codes
- **Categories Management:** Add/edit product categories and collections
- **Settings:** Update store info, social links, banner images

### 8. 📖 Other Pages
- **About Us:** Brand story, values, "Made in Pakistan" commitment
- **Contact Us:** Contact form + WhatsApp button + address + Google Maps embed
- **Size Guide:** Pakistani clothing size chart (XS–3XL)
- **Shipping & Returns Policy**
- **FAQs**
- **Blog / Lookbook** (optional, can be simple)

---

## 🗄️ Database Schema (Prisma Models)

Design the following models in PostgreSQL via Prisma:

```prisma
User, Address, Product, ProductVariant, Category, Collection,
Order, OrderItem, Cart, CartItem, Review, Wishlist,
DiscountCode, BlogPost, NewsletterSubscriber
```

Include:
- User roles: `CUSTOMER`, `ADMIN`
- Product variants: size + color combinations with individual stock
- Order statuses: `PENDING`, `PROCESSING`, `SHIPPED`, `DELIVERED`, `CANCELLED`, `REFUNDED`
- Payment statuses: `UNPAID`, `PAID`, `COD_PENDING`

---

## 🎨 Design & Branding Guidelines

- **Primary Color:** Deep Emerald Green `#1B5E20` or Rich Maroon `#800020`
- **Accent Color:** Gold / Champagne `#C9A84C`
- **Background:** Soft Ivory / Off-White `#FAF7F2`
- **Text:** Charcoal `#2C2C2C`
- **Font (Headings):** Playfair Display or Cormorant Garamond (elegant, serif)
- **Font (Body):** Inter or DM Sans (clean, readable)
- **Logo:** Text-based elegant logo — "KHAAS ATTIRE" in serif font with a small embroidery/thread icon
- **Mood:** Luxury boutique feel — think clean whitespace, editorial imagery, premium look
- **Mobile First:** Hamburger nav, bottom cart bar on mobile

---

## 🚀 Special Pakistan-Specific Requirements

- ✅ **Cash on Delivery (COD)** as a payment option — this is critical for Pakistan
- ✅ **WhatsApp Business integration** — "Chat with us on WhatsApp" button (floating)
- ✅ **Pakistan city/province dropdown** in address forms
- ✅ **PKR currency formatting** (e.g., Rs. 4,500)
- ✅ **Urdu text support** (at minimum, use proper Urdu Unicode in testimonials or taglines if needed)
- ✅ **Daraz / local shipping integration notes** (document how to plug in TCS, Leopards Courier, or BlueEx APIs)
- ✅ **SMS notifications** using a Pakistani SMS gateway like Twilio or Zong/Jazz SMS API for order updates
- ✅ **Mobile number as login option** (Pakistan users prefer phone login)

---

## 🔐 Security Requirements

- Input validation & sanitization (Zod on both frontend and backend)
- JWT + httpOnly cookies for auth sessions
- Rate limiting on API endpoints (express-rate-limit)
- CORS configuration
- SQL injection protection via Prisma
- XSS protection headers (Helmet.js)
- Environment variables for all secrets (.env.local)
- HTTPS enforced in production

---

## 📁 Folder Structure

Generate a clean, scalable folder structure:

```
khaas-attire/
├── apps/
│   ├── web/              # Next.js frontend
│   └── admin/            # Admin dashboard (Next.js or separate)
├── backend/              # Express.js / NestJS API
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── middleware/
│   │   └── prisma/
├── packages/
│   └── shared/           # Shared types, utils, constants
├── prisma/               # Prisma schema and migrations
├── .env.example
├── README.md
└── docker-compose.yml    # Optional: local dev setup
```

---

## 📦 Deliverables Expected

1. ✅ Full working Next.js frontend (all pages listed above)
2. ✅ Full REST API backend (Node.js + Express/NestJS) with all endpoints
3. ✅ Prisma schema with seed data (sample products, categories)
4. ✅ Admin dashboard (fully functional)
5. ✅ Authentication system (register, login, Google OAuth)
6. ✅ Cart & checkout flow with COD + Stripe + JazzCash
7. ✅ Cloudinary image upload for products
8. ✅ Email notifications (order confirmed, shipped)
9. ✅ README with setup instructions, env variables guide, deployment steps
10. ✅ Responsive, mobile-first design matching brand guidelines

---

## 📝 Additional Notes

- Use **TypeScript** throughout — strictly typed, no `any`
- Add **JSDoc comments** on all major functions
- Include **.env.example** with all required environment variable names
- Write **basic unit tests** for critical backend services (Jest)
- Use **Git-friendly structure** — clean commits, meaningful names
- The site must be **SEO optimized**: dynamic meta tags per page, Open Graph tags, sitemap.xml, robots.txt
- Add **loading skeletons** and **error boundaries** on the frontend
- Implement **dark mode toggle** (optional but appreciated)
- WhatsApp floating button: opens `https://wa.me/92XXXXXXXXXX` with a pre-filled message

---

> **Final note:** This is a real brand — KHAAS ATTIRE — based in Pakistan. Make the experience feel premium, authentic, and optimized for the Pakistani market while also being globally accessible for the diaspora. Every detail matters.
