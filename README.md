# KHAAS ATTIRE — *Wear What Speaks.*

A complete, production-ready full-stack e-commerce website for **KHAAS ATTIRE**, a premium Pakistani clothing brand. Built with Next.js 14, Express.js, PostgreSQL, and Tailwind CSS.

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router, SSR/SSG), TypeScript, Tailwind CSS |
| State | Zustand (cart, wishlist) |
| Animations | Framer Motion |
| Backend | Node.js + Express.js |
| Auth | NextAuth.js (Email + Google OAuth) |
| Database | PostgreSQL via Prisma ORM |
| Caching | Redis |
| Images | Cloudinary |
| Email | Nodemailer |
| Payments | JazzCash, Easypaisa, Stripe, Cash on Delivery |
| Admin | Next.js admin dashboard (port 3001) |

---

## 📁 Project Structure

```
khaas-attire/
├── apps/
│   ├── web/              # Next.js frontend (port 3000)
│   └── admin/            # Admin dashboard (port 3001)
├── backend/              # Express.js API (port 4000)
│   ├── src/
│   │   ├── routes/       # API route handlers
│   │   ├── middleware/   # Auth, error handling
│   │   ├── services/     # Email service
│   │   └── lib/          # Prisma, Redis clients
│   └── prisma/           # Seed data
├── packages/
│   └── shared/           # Shared TypeScript types & constants
├── prisma/               # Prisma schema
├── .env.example          # Environment variable template
├── docker-compose.yml    # Local dev: PostgreSQL + Redis
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker (for PostgreSQL + Redis)

### 1. Clone & Install

```bash
git clone <repo-url>
cd khaas-attire
npm install
```

### 2. Environment Setup

```bash
cp .env.example .env
# Edit .env with your actual credentials
```

### 3. Start Database & Redis

```bash
docker-compose up -d
```

### 4. Database Setup

```bash
npm run db:generate    # Generate Prisma client
npm run db:migrate     # Run migrations
npm run db:seed        # Seed with sample data
```

### 5. Start Development

```bash
# Start backend (port 4000)
npm run dev:backend

# Start frontend (port 3000)
npm run dev:web

# Start admin panel (port 3001)
npm run dev:admin
```

---

## 🔐 Environment Variables

See `.env.example` for all required variables. Key ones:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `REDIS_URL` | Redis connection URL |
| `JWT_SECRET` | Secret for JWT signing |
| `NEXTAUTH_SECRET` | NextAuth secret |
| `GOOGLE_CLIENT_ID/SECRET` | Google OAuth credentials |
| `CLOUDINARY_*` | Cloudinary image storage |
| `STRIPE_SECRET_KEY` | Stripe payment processing |
| `JAZZCASH_MERCHANT_ID` | JazzCash payment gateway |
| `EASYPAISA_STORE_ID` | Easypaisa payment gateway |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp business number |

---

## 📄 Pages

### Customer-Facing (`apps/web`)
| Route | Description |
|-------|-------------|
| `/` | Home page with hero, collections, new arrivals, testimonials |
| `/shop` | Product listing with filters & pagination |
| `/product/[slug]` | Product detail with gallery, variants, reviews |
| `/cart` | Shopping cart |
| `/checkout` | Multi-step checkout (shipping → payment → confirm) |
| `/account` | User dashboard |
| `/account/orders` | Order history |
| `/auth/login` | Login (email/phone + Google OAuth) |
| `/auth/register` | Registration |
| `/about` | Brand story |
| `/contact` | Contact form + WhatsApp |
| `/size-guide` | Pakistani clothing size chart |
| `/faq` | Frequently asked questions |
| `/shipping-returns` | Shipping & returns policy |

### Admin Panel (`apps/admin`, port 3001)
| Route | Description |
|-------|-------------|
| `/login` | Admin login |
| `/dashboard` | Revenue, orders, low stock alerts |
| `/dashboard/orders` | All orders with status management |
| `/dashboard/products` | Product management (CRUD) |
| `/dashboard/customers` | Customer list |

---

## 🗄️ Database Schema

Key models: `User`, `Address`, `Product`, `ProductVariant`, `Category`, `Collection`, `Order`, `OrderItem`, `Cart`, `CartItem`, `Review`, `Wishlist`, `DiscountCode`, `BlogPost`, `NewsletterSubscriber`

User roles: `CUSTOMER`, `ADMIN`

Order statuses: `PENDING`, `PROCESSING`, `SHIPPED`, `DELIVERED`, `CANCELLED`, `REFUNDED`

Payment methods: `JAZZCASH`, `EASYPAISA`, `STRIPE`, `COD`

---

## 🌍 Pakistan-Specific Features

- ✅ **Cash on Delivery (COD)** — most popular payment method in Pakistan
- ✅ **WhatsApp floating button** — opens WhatsApp with pre-filled message
- ✅ **Pakistan province & city dropdowns** — in address forms
- ✅ **PKR currency formatting** — `Rs. 4,500`
- ✅ **Urdu text support** — Unicode Urdu in testimonials
- ✅ **Pakistani clothing sizes** — XS to 3XL chart
- ✅ **JazzCash & Easypaisa** — local payment gateways
- ✅ **SMS notification support** — via Twilio (configurable)

---

## 🔒 Security

- Input validation with Zod (frontend + backend)
- JWT in httpOnly cookies via NextAuth
- Rate limiting on all API endpoints (`express-rate-limit`)
- CORS configured for frontend origins only
- SQL injection protection via Prisma ORM
- XSS protection headers via Helmet.js
- All secrets in environment variables

---

## 🚢 Deployment

### Frontend + Admin: Vercel
```bash
# Deploy web app
cd apps/web && vercel deploy

# Deploy admin panel
cd apps/admin && vercel deploy
```

### Backend: Railway or Render
```bash
cd backend && railway up
```

### Database: Supabase (PostgreSQL)
Set `DATABASE_URL` to your Supabase connection string.

### Images: Cloudinary
Sign up at cloudinary.com and set the `CLOUDINARY_*` env vars.

---

## 📦 Shipping Integration

The backend is prepared for integration with Pakistani courier APIs:

- **TCS**: Use tracking number from `order.trackingNumber`
- **Leopards Courier**: POST to their API with shipment details
- **BlueEx**: REST API integration  
- **DHL**: For international orders

Documentation links in `backend/src/routes/orders.ts`.

---

## 🧪 Testing

```bash
# Backend tests
cd backend && npm test
```

---

## 🎨 Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `brand-maroon` | `#800020` | Primary CTA, headings |
| `brand-gold` | `#C9A84C` | Accents, highlights |
| `brand-ivory` | `#FAF7F2` | Background |
| `brand-charcoal` | `#2C2C2C` | Body text |
| Font (Headings) | Playfair Display | Serif, elegant |
| Font (Body) | Inter | Clean, readable |

---

## 📝 Seed Data

After running `npm run db:seed`:
- **Admin account**: `admin@khaasattire.com` / `admin123`
- **Categories**: Lawn Suits, Kurtas, Formals, Shalwar Kameez
- **Collections**: Eid Collection 2024, Winter Formals 2024
- **Products**: 6 sample products with variants
- **Discount code**: `WELCOME10` (10% off orders over Rs. 2,000)

---

> Built with ❤️ in Pakistan for KHAAS ATTIRE — *Wear What Speaks.*
