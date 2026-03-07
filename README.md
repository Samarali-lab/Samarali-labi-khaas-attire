# 🌟 Khaas Attire — Premium Pakistani E-Commerce Platform

> *Dress to Express* — Where tradition meets contemporary grace.

Khaas Attire is a full-stack e-commerce platform for a premium Pakistani clothing brand, built with **Next.js 14**, **NestJS**, **Prisma**, and **PostgreSQL**. It features Pakistan-specific payments (JazzCash, EasyPaisa, COD), WhatsApp integration, and a beautiful brand identity.

---

## 🏗️ Project Architecture

```
khaas-attire/
├── apps/
│   └── web/              # Next.js 14 frontend (App Router)
├── backend/              # NestJS REST API
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Seed data (10 products, 5 categories)
├── docker-compose.yml    # PostgreSQL + Redis services
├── .env.example          # Environment variables template
└── README.md
```

---

## 🎨 Brand Identity

| Token | Value | Usage |
|-------|-------|-------|
| Primary (Maroon) | `#800020` | CTAs, prices, headings |
| Accent (Gold) | `#C9A84C` | Dividers, badges, icons |
| Background (Ivory) | `#FAF7F2` | Page backgrounds |
| Text (Charcoal) | `#2C2C2C` | Body text |

**Fonts:** Playfair Display (headings) + Inter (body)

---

## ✨ Features

### Frontend (Next.js 14)
- 🛍️ **Full Shopping Experience** — Browse, filter, search, add to cart
- 🔍 **Product Filters** — Category, gender, price range, size, color
- 🛒 **Persistent Cart** — Zustand + localStorage
- ❤️ **Wishlist** — Save favourite products
- 📦 **Checkout** — Multi-step with address, payment, and review
- 🗺️ **Pakistan Cities** — Province → City dropdown
- 💳 **Payment Methods** — COD, JazzCash, EasyPaisa, Stripe
- 📱 **WhatsApp Button** — Floating chat widget
- 📐 **Size Guide** — Women, men, and kids sizing tables
- 📖 **Blog** — Fashion tips and brand stories
- 🔐 **Auth** — Email/password + Google OAuth (NextAuth)
- 🎛️ **Admin Dashboard** — Orders, products, customers
- 📱 **Mobile-first** — Fully responsive design
- ⚡ **Performance** — Loading skeletons, image optimization
- 🔍 **SEO** — Meta tags, Open Graph, structured data

### Backend (NestJS)
- 🔐 **JWT Authentication** — Secure user sessions
- 📦 **Products API** — Full CRUD with filters and pagination
- 🛒 **Cart API** — Session and user-based carts
- 📋 **Orders API** — Order management with status tracking
- 👤 **Users API** — Profile, addresses, wishlist
- 💳 **Payments API** — JazzCash, EasyPaisa integration + webhook verification
- 🔒 **Security** — Helmet, rate limiting, input validation
- 📚 **Swagger Docs** — Auto-generated API documentation
- 🗄️ **Prisma ORM** — Type-safe database queries

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Docker + Docker Compose
- Git

### 1. Clone & Setup

```bash
git clone https://github.com/your-org/khaas-attire.git
cd khaas-attire

# Copy environment files
cp .env.example .env
cp apps/web/.env.local.example apps/web/.env.local
```

### 2. Start Database Services

```bash
docker compose up -d postgres redis
```

Wait for services to be healthy:
```bash
docker compose ps
```

### 3. Install Dependencies

```bash
# Backend
cd backend && npm install

# Frontend
cd ../apps/web && npm install
```

### 4. Database Setup

```bash
cd backend

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed the database
npx ts-node --project tsconfig.json -e "require('ts-node/register'); require('../prisma/seed.ts')"
```

### 5. Start Development Servers

**Backend** (terminal 1):
```bash
cd backend
npm run start:dev
# API running at http://localhost:3001
# Swagger docs at http://localhost:3001/api/docs
```

**Frontend** (terminal 2):
```bash
cd apps/web
npm run dev
# App running at http://localhost:3000
```

---

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@khaasattire.pk | Admin@123 |
| Customer | customer@example.com | Customer@123 |

---

## 🛠️ Environment Variables

See `.env.example` for all required variables. Key ones:

```env
DATABASE_URL=postgresql://khaas_user:khaas_password@localhost:5432/khaas_attire
JWT_SECRET=your-super-secret-key
NEXTAUTH_SECRET=your-nextauth-secret
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WHATSAPP_NUMBER=923001234567
```

---

## 📡 API Reference

Full Swagger documentation available at `http://localhost:3001/api/docs` when running in development.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/products` | List products (with filters) |
| GET | `/api/v1/products/:slug` | Get product by slug |
| GET | `/api/v1/products/featured` | Get featured products |
| GET | `/api/v1/products/categories` | List categories |
| POST | `/api/v1/auth/register` | Register account |
| POST | `/api/v1/auth/login` | Sign in |
| GET | `/api/v1/users/profile` | Get profile (auth required) |
| POST | `/api/v1/cart/items` | Add to cart |
| POST | `/api/v1/orders` | Create order |
| GET | `/api/v1/orders/my` | Get user orders (auth required) |
| GET | `/api/v1/orders/track/:orderNumber` | Track order (public) |
| POST | `/api/v1/payments/jazzcash/initiate` | Start JazzCash payment |
| GET | `/api/v1/payments/discount/validate` | Validate discount code |

---

## 🗄️ Database Schema

Key models:

- **User** — Customers and admins with auth
- **Product** — Products with variants (size × color)
- **Category / Collection** — Product organization
- **Cart / CartItem** — Session and user carts
- **Order / OrderItem** — Orders with status tracking
- **Review** — Product reviews with verification
- **Wishlist** — User saved products
- **DiscountCode** — Percentage and fixed discounts
- **BlogPost** — Brand content

---

## 🐳 Production Deployment

```bash
# Build and start all services
docker compose --profile production up -d

# Run migrations
docker compose exec backend npx prisma migrate deploy

# Seed production data
docker compose exec backend npm run prisma:seed
```

---

## 🧪 Testing

```bash
# Backend tests
cd backend && npm test

# Frontend type check
cd apps/web && npm run type-check

# Frontend lint
cd apps/web && npm run lint
```

---

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| State | Zustand (cart + wishlist) |
| Forms | React Hook Form + Zod |
| Backend | NestJS 10, TypeScript |
| Database | PostgreSQL 16 + Prisma ORM |
| Cache | Redis 7 |
| Auth | NextAuth.js (frontend) + Passport JWT (backend) |
| Payments | JazzCash, EasyPaisa, Stripe |
| Storage | Cloudinary |
| Deployment | Docker Compose |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📜 License

This project is proprietary software. All rights reserved — Khaas Attire © 2024.

---

<div align="center">
  <strong>Built with ❤️ in Pakistan 🇵🇰</strong>
</div>
