import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminPasswordHash = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@khaasattire.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@khaasattire.com',
      passwordHash: adminPasswordHash,
      role: 'ADMIN',
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'lawn-suits' },
      update: {},
      create: {
        name: 'Lawn Suits',
        slug: 'lawn-suits',
        description: 'Premium lawn fabric suits for women',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'kurtas' },
      update: {},
      create: {
        name: 'Kurtas',
        slug: 'kurtas',
        description: 'Traditional and modern kurtas for men',
        image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'formals' },
      update: {},
      create: {
        name: 'Formals',
        slug: 'formals',
        description: 'Elegant formal wear for special occasions',
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4f04?w=400',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'shalwar-kameez' },
      update: {},
      create: {
        name: 'Shalwar Kameez',
        slug: 'shalwar-kameez',
        description: 'Classic Pakistani shalwar kameez',
        image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400',
      },
    }),
  ]);
  console.log('✅ Categories created:', categories.length);

  // Create collections
  const eidCollection = await prisma.collection.upsert({
    where: { slug: 'eid-collection-2024' },
    update: {},
    create: {
      name: 'Eid Collection 2024',
      slug: 'eid-collection-2024',
      description: 'Celebrate Eid with our exclusive premium collection',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800',
    },
  });

  const winterCollection = await prisma.collection.upsert({
    where: { slug: 'winter-formals-2024' },
    update: {},
    create: {
      name: 'Winter Formals 2024',
      slug: 'winter-formals-2024',
      description: 'Stay warm and stylish this winter',
      image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800',
    },
  });
  console.log('✅ Collections created');

  // Create sample products
  const products = [
    {
      name: 'Embroidered Lawn Suit - Emerald',
      slug: 'embroidered-lawn-suit-emerald',
      description: 'A stunning embroidered lawn suit in deep emerald green. Perfect for summer gatherings and casual wear. Features intricate thread work on the neckline and sleeves.',
      price: 4500,
      compareAtPrice: 5500,
      sku: 'KA-LS-001',
      images: [
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600',
        'https://images.unsplash.com/photo-1594938298603-c8148c4b4f04?w=600',
      ],
      categoryId: categories[0].id,
      collectionId: eidCollection.id,
      fabric: 'Premium Egyptian Lawn Cotton',
      careInstructions: 'Machine wash cold, gentle cycle. Do not tumble dry. Iron on low heat.',
      gender: 'Women',
      isFeatured: true,
    },
    {
      name: 'Royal Maroon Kurta',
      slug: 'royal-maroon-kurta',
      description: 'A classic royal maroon kurta with subtle embroidery on the collar. Crafted from fine cotton blend fabric for all-day comfort.',
      price: 3200,
      sku: 'KA-KT-001',
      images: [
        'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600',
      ],
      categoryId: categories[1].id,
      fabric: 'Cotton Blend',
      careInstructions: 'Hand wash or machine wash gentle. Hang to dry.',
      gender: 'Men',
      isFeatured: true,
    },
    {
      name: 'Gold Embroidered Formal Set',
      slug: 'gold-embroidered-formal-set',
      description: 'An exquisite formal 3-piece set featuring gold zari embroidery. Perfect for weddings and formal events.',
      price: 12000,
      compareAtPrice: 15000,
      sku: 'KA-FM-001',
      images: [
        'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600',
      ],
      categoryId: categories[2].id,
      collectionId: eidCollection.id,
      fabric: 'Chiffon with Net Dupatta',
      careInstructions: 'Dry clean only.',
      gender: 'Women',
      isFeatured: true,
    },
    {
      name: 'Classic White Shalwar Kameez',
      slug: 'classic-white-shalwar-kameez',
      description: 'A timeless white shalwar kameez with delicate white-on-white embroidery. A wardrobe essential.',
      price: 2800,
      sku: 'KA-SK-001',
      images: [
        'https://images.unsplash.com/photo-1594938298603-c8148c4b4f04?w=600',
      ],
      categoryId: categories[3].id,
      fabric: 'Premium Cotton',
      careInstructions: 'Machine wash cold.',
      gender: 'Men',
    },
    {
      name: 'Winter Velvet Shawl Suit',
      slug: 'winter-velvet-shawl-suit',
      description: 'Stay warm and elegant this winter with our plush velvet shawl suit. Features a matching embroidered shawl.',
      price: 8500,
      sku: 'KA-WN-001',
      images: [
        'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600',
      ],
      categoryId: categories[2].id,
      collectionId: winterCollection.id,
      fabric: 'Velvet with Pashmina Shawl',
      careInstructions: 'Dry clean recommended.',
      gender: 'Women',
      isFeatured: true,
    },
    {
      name: 'Ivory Embroidered Lawn Suit',
      slug: 'ivory-embroidered-lawn-suit',
      description: 'A beautiful ivory lawn suit with multicolor floral embroidery. Light and breezy for summer.',
      price: 3800,
      sku: 'KA-LS-002',
      images: [
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600',
      ],
      categoryId: categories[0].id,
      fabric: 'Lawn Cotton',
      careInstructions: 'Machine wash cold.',
      gender: 'Women',
    },
  ];

  for (const productData of products) {
    const product = await prisma.product.upsert({
      where: { slug: productData.slug },
      update: {},
      create: {
        ...productData,
        price: productData.price,
        compareAtPrice: productData.compareAtPrice,
      },
    });

    // Create variants for each product
    const colors = ['Maroon', 'Emerald', 'Navy', 'Ivory'];
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

    const variantColor = colors[Math.floor(Math.random() * colors.length)];
    for (const size of sizes) {
      await prisma.productVariant.upsert({
        where: { sku: `${product.sku}-${size}-${variantColor}` },
        update: {},
        create: {
          productId: product.id,
          size,
          color: variantColor,
          stock: Math.floor(Math.random() * 20) + 5,
          sku: `${product.sku}-${size}-${variantColor}`,
        },
      });
    }

    console.log(`✅ Product created: ${product.name}`);
  }

  // Create sample discount code
  await prisma.discountCode.upsert({
    where: { code: 'WELCOME10' },
    update: {},
    create: {
      code: 'WELCOME10',
      type: 'PERCENTAGE',
      value: 10,
      minOrderAmount: 2000,
      usageLimit: 100,
      isActive: true,
    },
  });
  console.log('✅ Discount code created: WELCOME10');

  console.log('🎉 Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
