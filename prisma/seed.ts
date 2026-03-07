import { PrismaClient, PaymentMethod } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('🌱 Starting seed...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('Admin@123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@khaasattire.pk' },
    update: {},
    create: {
      name: 'Khaas Admin',
      email: 'admin@khaasattire.pk',
      phone: '+923001234567',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });
  console.log(`✅ Admin user: ${admin.email}`);

  // Create demo customer
  const customerPassword = await bcrypt.hash('Customer@123', 12);
  const customer = await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      name: 'Sara Khan',
      email: 'customer@example.com',
      phone: '+923009876543',
      password: customerPassword,
      role: 'CUSTOMER',
    },
  });
  console.log(`✅ Customer user: ${customer.email}`);

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'shalwar-kameez' },
      update: {},
      create: {
        name: 'Shalwar Kameez',
        slug: 'shalwar-kameez',
        description:
          'Traditional Pakistani shalwar kameez in premium fabrics for men and women.',
        image: '/images/categories/shalwar-kameez.jpg',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'kurta' },
      update: {},
      create: {
        name: 'Kurta',
        slug: 'kurta',
        description:
          'Elegant kurtas crafted from finest fabrics for everyday and formal wear.',
        image: '/images/categories/kurta.jpg',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'lehenga' },
      update: {},
      create: {
        name: 'Lehenga',
        slug: 'lehenga',
        description:
          'Exquisite lehengas for weddings, parties, and special occasions.',
        image: '/images/categories/lehenga.jpg',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'dupatta' },
      update: {},
      create: {
        name: 'Dupatta & Scarves',
        slug: 'dupatta',
        description:
          'Beautifully crafted dupattas and scarves to complement your attire.',
        image: '/images/categories/dupatta.jpg',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'kids-wear' },
      update: {},
      create: {
        name: 'Kids Wear',
        slug: 'kids-wear',
        description:
          'Adorable and comfortable clothing for kids inspired by Pakistani traditions.',
        image: '/images/categories/kids-wear.jpg',
      },
    }),
  ]);
  console.log(`✅ ${categories.length} categories created`);

  // Create collections
  const eidCollection = await prisma.collection.upsert({
    where: { slug: 'eid-collection-2024' },
    update: {},
    create: {
      name: 'Eid Collection 2024',
      slug: 'eid-collection-2024',
      description:
        'Celebrate Eid in style with our exclusive 2024 collection featuring timeless designs.',
      image: '/images/collections/eid-2024.jpg',
      featured: true,
    },
  });

  const bridalCollection = await prisma.collection.upsert({
    where: { slug: 'bridal-formals' },
    update: {},
    create: {
      name: 'Bridal Formals',
      slug: 'bridal-formals',
      description:
        'Luxurious bridal and formal wear for the most special occasions.',
      image: '/images/collections/bridal-formals.jpg',
      featured: true,
    },
  });

  const casualCollection = await prisma.collection.upsert({
    where: { slug: 'everyday-classics' },
    update: {},
    create: {
      name: 'Everyday Classics',
      slug: 'everyday-classics',
      description:
        'Comfortable and stylish everyday wear that blends tradition with modernity.',
      image: '/images/collections/everyday-classics.jpg',
      featured: false,
    },
  });
  console.log('✅ Collections created');

  // Products data
  const productsData = [
    {
      name: 'Crimson Rose Embroidered Shalwar Kameez',
      slug: 'crimson-rose-embroidered-shalwar-kameez',
      sku: 'SK-001',
      description:
        'A breathtaking 3-piece shalwar kameez in deep crimson with intricate rose embroidery on the neckline and hem. Crafted from premium lawn fabric, this ensemble is perfect for family gatherings and festive occasions. The set includes a fully embroidered dupatta with scalloped edges.',
      fabric: '100% Pure Lawn',
      careInstructions:
        'Dry clean recommended. If hand washing, use cold water and mild detergent. Do not tumble dry.',
      price: 8500,
      comparePrice: 11000,
      images: [
        '/images/products/sk-001-1.jpg',
        '/images/products/sk-001-2.jpg',
        '/images/products/sk-001-3.jpg',
      ],
      featured: true,
      gender: 'Women',
      categorySlug: 'shalwar-kameez',
      collectionSlug: 'eid-collection-2024',
      variants: [
        { size: 'XS', color: 'Crimson', stock: 8 },
        { size: 'S', color: 'Crimson', stock: 15 },
        { size: 'M', color: 'Crimson', stock: 20 },
        { size: 'L', color: 'Crimson', stock: 18 },
        { size: 'XL', color: 'Crimson', stock: 12 },
        { size: 'XXL', color: 'Crimson', stock: 6 },
      ],
    },
    {
      name: 'Midnight Indigo Handwoven Kurta',
      slug: 'midnight-indigo-handwoven-kurta',
      sku: 'KT-001',
      description:
        'A masterpiece of artisanal craftsmanship — this handwoven kurta in midnight indigo features delicate thread work at the collar and cuffs. Made from fine cotton-silk blend, it offers both comfort and elegance for evening events and casual office wear.',
      fabric: 'Cotton-Silk Blend (60% Cotton, 40% Silk)',
      careInstructions:
        'Hand wash in cold water. Iron on medium heat. Store in a cool, dry place.',
      price: 4200,
      comparePrice: 5500,
      images: [
        '/images/products/kt-001-1.jpg',
        '/images/products/kt-001-2.jpg',
      ],
      featured: true,
      gender: 'Men',
      categorySlug: 'kurta',
      collectionSlug: 'everyday-classics',
      variants: [
        { size: 'S', color: 'Midnight Indigo', stock: 12 },
        { size: 'M', color: 'Midnight Indigo', stock: 25 },
        { size: 'L', color: 'Midnight Indigo', stock: 20 },
        { size: 'XL', color: 'Midnight Indigo', stock: 15 },
        { size: 'XXL', color: 'Midnight Indigo', stock: 8 },
        { size: 'S', color: 'Forest Green', stock: 10 },
        { size: 'M', color: 'Forest Green', stock: 18 },
        { size: 'L', color: 'Forest Green', stock: 15 },
        { size: 'XL', color: 'Forest Green', stock: 10 },
      ],
    },
    {
      name: 'Golden Zardozi Bridal Lehenga',
      slug: 'golden-zardozi-bridal-lehenga',
      sku: 'LH-001',
      description:
        'An opulent bridal lehenga adorned with intricate zardozi embroidery in 22-carat gold thread. The rich burgundy velvet base is complemented by a heavily embroidered choli and a flowing net dupatta with gold border. This masterpiece is a testament to Pakistani craftsmanship.',
      fabric: 'Velvet base with Net dupatta',
      careInstructions:
        'Dry clean only. Store in a breathable garment bag away from sunlight.',
      price: 85000,
      comparePrice: 110000,
      images: [
        '/images/products/lh-001-1.jpg',
        '/images/products/lh-001-2.jpg',
        '/images/products/lh-001-3.jpg',
        '/images/products/lh-001-4.jpg',
      ],
      featured: true,
      gender: 'Women',
      categorySlug: 'lehenga',
      collectionSlug: 'bridal-formals',
      variants: [
        { size: 'XS', color: 'Burgundy Gold', stock: 2 },
        { size: 'S', color: 'Burgundy Gold', stock: 3 },
        { size: 'M', color: 'Burgundy Gold', stock: 4 },
        { size: 'L', color: 'Burgundy Gold', stock: 3 },
        { size: 'XL', color: 'Burgundy Gold', stock: 2 },
      ],
    },
    {
      name: 'Pearl White Chiffon Dupatta',
      slug: 'pearl-white-chiffon-dupatta',
      sku: 'DP-001',
      description:
        'Elevate any outfit with this luxurious pearl white chiffon dupatta, featuring hand-painted floral motifs and a delicate silver border. Lightweight and graceful, it drapes beautifully and adds an air of sophistication to both casual and formal ensembles.',
      fabric: 'Pure Chiffon',
      careInstructions:
        'Dry clean only. Handle with care to preserve the hand-painted design.',
      price: 2800,
      comparePrice: 3500,
      images: [
        '/images/products/dp-001-1.jpg',
        '/images/products/dp-001-2.jpg',
      ],
      featured: false,
      gender: 'Women',
      categorySlug: 'dupatta',
      collectionSlug: 'everyday-classics',
      variants: [
        { size: 'Standard', color: 'Pearl White', stock: 30 },
        { size: 'Standard', color: 'Blush Pink', stock: 25 },
        { size: 'Standard', color: 'Sky Blue', stock: 20 },
      ],
    },
    {
      name: 'Miniature Mughal Kids Shalwar Kameez',
      slug: 'miniature-mughal-kids-shalwar-kameez',
      sku: 'KD-001',
      description:
        'Inspired by the grandeur of Mughal art, this kids shalwar kameez features playful yet intricate block-print patterns. Made from soft, breathable cotton, it ensures all-day comfort for your little ones during festivities and family events.',
      fabric: '100% Soft Cotton',
      careInstructions:
        'Machine wash on gentle cycle with cold water. Tumble dry low.',
      price: 3200,
      comparePrice: 4000,
      images: [
        '/images/products/kd-001-1.jpg',
        '/images/products/kd-001-2.jpg',
      ],
      featured: false,
      gender: 'Kids',
      categorySlug: 'kids-wear',
      collectionSlug: 'eid-collection-2024',
      variants: [
        { size: '2-3Y', color: 'Royal Blue', stock: 15 },
        { size: '4-5Y', color: 'Royal Blue', stock: 18 },
        { size: '6-7Y', color: 'Royal Blue', stock: 20 },
        { size: '8-9Y', color: 'Royal Blue', stock: 16 },
        { size: '10-11Y', color: 'Royal Blue', stock: 12 },
        { size: '2-3Y', color: 'Emerald Green', stock: 10 },
        { size: '4-5Y', color: 'Emerald Green', stock: 14 },
        { size: '6-7Y', color: 'Emerald Green', stock: 16 },
        { size: '8-9Y', color: 'Emerald Green', stock: 12 },
      ],
    },
    {
      name: 'Ivory Georgette Formal Shalwar Kameez',
      slug: 'ivory-georgette-formal-shalwar-kameez',
      sku: 'SK-002',
      description:
        'A refined 3-piece formal shalwar kameez in pristine ivory georgette. The kameez features subtle crystal embellishments at the neckline and sleeves, while the flowing palazzo-style trousers add modern flair. Ideal for office parties, dinner events, and formal gatherings.',
      fabric: 'Pure Georgette',
      careInstructions:
        'Dry clean recommended. If hand washing, use cold water only. Do not wring.',
      price: 7800,
      comparePrice: 9500,
      images: [
        '/images/products/sk-002-1.jpg',
        '/images/products/sk-002-2.jpg',
        '/images/products/sk-002-3.jpg',
      ],
      featured: true,
      gender: 'Women',
      categorySlug: 'shalwar-kameez',
      collectionSlug: 'bridal-formals',
      variants: [
        { size: 'XS', color: 'Ivory', stock: 6 },
        { size: 'S', color: 'Ivory', stock: 12 },
        { size: 'M', color: 'Ivory', stock: 15 },
        { size: 'L', color: 'Ivory', stock: 14 },
        { size: 'XL', color: 'Ivory', stock: 9 },
        { size: 'XXL', color: 'Ivory', stock: 4 },
      ],
    },
    {
      name: 'Terracotta Block Print Casual Kurta',
      slug: 'terracotta-block-print-casual-kurta',
      sku: 'KT-002',
      description:
        'A celebration of traditional block-printing techniques on premium cotton. This terracotta kurta features geometric Ajrak-inspired patterns and a classic straight cut. Perfect for casual outings, college, and relaxed gatherings.',
      fabric: '100% Pure Cotton',
      careInstructions:
        'Machine wash cold. Separate colours. Do not bleach. Iron inside out.',
      price: 2900,
      comparePrice: null,
      images: [
        '/images/products/kt-002-1.jpg',
        '/images/products/kt-002-2.jpg',
      ],
      featured: false,
      gender: 'Men',
      categorySlug: 'kurta',
      collectionSlug: 'everyday-classics',
      variants: [
        { size: 'S', color: 'Terracotta', stock: 20 },
        { size: 'M', color: 'Terracotta', stock: 30 },
        { size: 'L', color: 'Terracotta', stock: 28 },
        { size: 'XL', color: 'Terracotta', stock: 22 },
        { size: 'XXL', color: 'Terracotta', stock: 14 },
        { size: 'XXXL', color: 'Terracotta', stock: 8 },
      ],
    },
    {
      name: 'Mauve Silk Anarkali Lehenga',
      slug: 'mauve-silk-anarkali-lehenga',
      sku: 'LH-002',
      description:
        'A graceful anarkali-style lehenga in soft mauve silk with a flared silhouette. The bodice features hand-embroidered floral motifs in silver and rose gold thread. Comes with matching cigarette-style trousers and a lightweight organza dupatta.',
      fabric: 'Pure Silk with Organza dupatta',
      careInstructions: 'Dry clean only. Store flat or loosely rolled.',
      price: 35000,
      comparePrice: 42000,
      images: [
        '/images/products/lh-002-1.jpg',
        '/images/products/lh-002-2.jpg',
      ],
      featured: true,
      gender: 'Women',
      categorySlug: 'lehenga',
      collectionSlug: 'bridal-formals',
      variants: [
        { size: 'XS', color: 'Mauve', stock: 3 },
        { size: 'S', color: 'Mauve', stock: 5 },
        { size: 'M', color: 'Mauve', stock: 6 },
        { size: 'L', color: 'Mauve', stock: 5 },
        { size: 'XL', color: 'Mauve', stock: 3 },
      ],
    },
    {
      name: 'Sage Green Khaddar Winter Shalwar Kameez',
      slug: 'sage-green-khaddar-winter-shalwar-kameez',
      sku: 'SK-003',
      description:
        'Stay warm and stylish this winter with our sage green khaddar shalwar kameez. The thick, handwoven khaddar fabric provides excellent insulation while the subtle embroidery at the neckline keeps it elegant. A cozy companion for winter celebrations.',
      fabric: 'Handwoven Khaddar',
      careInstructions:
        'Hand wash in lukewarm water. Dry in shade. Iron on medium heat.',
      price: 5500,
      comparePrice: 6800,
      images: [
        '/images/products/sk-003-1.jpg',
        '/images/products/sk-003-2.jpg',
      ],
      featured: false,
      gender: 'Women',
      categorySlug: 'shalwar-kameez',
      collectionSlug: 'everyday-classics',
      variants: [
        { size: 'XS', color: 'Sage Green', stock: 8 },
        { size: 'S', color: 'Sage Green', stock: 14 },
        { size: 'M', color: 'Sage Green', stock: 18 },
        { size: 'L', color: 'Sage Green', stock: 16 },
        { size: 'XL', color: 'Sage Green', stock: 10 },
        { size: 'XXL', color: 'Sage Green', stock: 5 },
        { size: 'S', color: 'Rust Brown', stock: 10 },
        { size: 'M', color: 'Rust Brown', stock: 14 },
        { size: 'L', color: 'Rust Brown', stock: 12 },
        { size: 'XL', color: 'Rust Brown', stock: 8 },
      ],
    },
    {
      name: 'Cobalt Blue Hand-embroidered Party Kurta',
      slug: 'cobalt-blue-hand-embroidered-party-kurta',
      sku: 'KT-003',
      description:
        'Make a bold statement at your next gathering with this striking cobalt blue party kurta. Hand-embroidered with silver sequins and thread work inspired by traditional Sindhi motifs. The contemporary slim-cut silhouette makes it perfect for formal dinners and weddings.',
      fabric: 'Premium Cotton with Embroidery',
      careInstructions:
        'Dry clean recommended to preserve embroidery. If hand washing, cold water only.',
      price: 6800,
      comparePrice: 8500,
      images: [
        '/images/products/kt-003-1.jpg',
        '/images/products/kt-003-2.jpg',
        '/images/products/kt-003-3.jpg',
      ],
      featured: true,
      gender: 'Men',
      categorySlug: 'kurta',
      collectionSlug: 'eid-collection-2024',
      variants: [
        { size: 'S', color: 'Cobalt Blue', stock: 10 },
        { size: 'M', color: 'Cobalt Blue', stock: 18 },
        { size: 'L', color: 'Cobalt Blue', stock: 16 },
        { size: 'XL', color: 'Cobalt Blue', stock: 12 },
        { size: 'XXL', color: 'Cobalt Blue', stock: 7 },
        { size: 'S', color: 'Midnight Black', stock: 8 },
        { size: 'M', color: 'Midnight Black', stock: 14 },
        { size: 'L', color: 'Midnight Black', stock: 12 },
        { size: 'XL', color: 'Midnight Black', stock: 8 },
      ],
    },
  ];

  // Create products
  for (const productData of productsData) {
    const { variants, categorySlug, collectionSlug, ...product } = productData;

    const category = categories.find((c) => c.slug === categorySlug);
    const collection =
      collectionSlug === 'eid-collection-2024'
        ? eidCollection
        : collectionSlug === 'bridal-formals'
          ? bridalCollection
          : casualCollection;

    const createdProduct = await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: {
        ...product,
        categoryId: category?.id,
        collectionId: collection?.id,
        variants: {
          create: variants.map((v, i) => ({
            size: v.size,
            color: v.color,
            stock: v.stock,
            sku: `${product.sku}-${i + 1}`,
          })),
        },
      },
    });
    console.log(`✅ Product: ${createdProduct.name}`);
  }

  // Create discount codes
  await prisma.discountCode.upsert({
    where: { code: 'WELCOME10' },
    update: {},
    create: {
      code: 'WELCOME10',
      description: '10% off for new customers',
      type: 'PERCENTAGE',
      value: 10,
      minOrder: 2000,
      maxUses: 1000,
      active: true,
    },
  });

  await prisma.discountCode.upsert({
    where: { code: 'EID2024' },
    update: {},
    create: {
      code: 'EID2024',
      description: 'Eid Mubarak! 15% off on all orders',
      type: 'PERCENTAGE',
      value: 15,
      minOrder: 5000,
      maxUses: 500,
      active: true,
    },
  });

  await prisma.discountCode.upsert({
    where: { code: 'FLAT500' },
    update: {},
    create: {
      code: 'FLAT500',
      description: 'PKR 500 off on orders above PKR 3000',
      type: 'FIXED',
      value: 500,
      minOrder: 3000,
      active: true,
    },
  });
  console.log('✅ Discount codes created');

  // Create blog posts
  await prisma.blogPost.upsert({
    where: { slug: 'styling-traditional-wear-modern-occasions' },
    update: {},
    create: {
      title: 'How to Style Traditional Wear for Modern Occasions',
      slug: 'styling-traditional-wear-modern-occasions',
      excerpt:
        'Discover how to blend classic Pakistani attire with contemporary styling tips for every modern occasion.',
      body: `Pakistani fashion is a beautiful tapestry of tradition and modernity. As our lifestyles evolve, so do the ways we wear our beloved traditional garments.

**Mix and Match**
One of the most exciting trends is mixing traditional pieces with contemporary ones. Try pairing a classic embroidered kurta with tailored trousers instead of traditional shalwar for a sleek, modern look.

**Accessorize Thoughtfully**
Traditional outfits shine when paired with the right accessories. Consider modern minimal jewelry with heavily embroidered pieces, or statement traditional jewellery with simpler garments.

**Play with Silhouettes**
Contemporary cuts and silhouettes breathe new life into traditional fabrics. Wide-leg pants, asymmetric hems, and structured blazers can transform a classic look into something entirely fresh.`,
      published: true,
    },
  });

  await prisma.blogPost.upsert({
    where: { slug: 'fabric-guide-choosing-right-material' },
    update: {},
    create: {
      title: "The Complete Fabric Guide: Choosing the Right Material for Pakistan's Climate",
      slug: 'fabric-guide-choosing-right-material',
      excerpt:
        "Pakistan's diverse climate demands smart fabric choices. Here's your complete guide to choosing the right material every season.",
      body: `Pakistan experiences a wide range of climates across its provinces, and choosing the right fabric can make all the difference in your comfort and style.

**Summer Fabrics**
Lawn is the quintessential Pakistani summer fabric — lightweight, breathable, and perfect for the intense heat. Cotton and voile are also excellent choices.

**Winter Fabrics**
Khaddar and wool blends are ideal for Pakistan's cold winters. Khaddar's thick weave provides warmth while maintaining the traditional aesthetic we love.

**Year-round Fabrics**
Cotton-silk blends and georgette work beautifully across seasons. They're versatile enough for both casual and formal occasions.`,
      published: true,
    },
  });
  console.log('✅ Blog posts created');

  // Add a demo order
  const products = await prisma.product.findMany({ take: 3, include: { variants: true } });
  if (products.length >= 2 && customer) {
    const address = await prisma.address.create({
      data: {
        userId: customer.id,
        name: 'Sara Khan',
        phone: '+923009876543',
        address: 'House 45, Street 7, F-10/2',
        city: 'Islamabad',
        province: 'Islamabad Capital Territory',
        postalCode: '44000',
        isDefault: true,
      },
    });

    const subtotal = products[0].price + products[1].price;
    await prisma.order.create({
      data: {
        userId: customer.id,
        addressId: address.id,
        orderNumber: `KA-${Date.now()}`,
        status: 'DELIVERED',
        paymentStatus: 'PAID',
        paymentMethod: PaymentMethod.COD,
        subtotal,
        discount: 0,
        shipping: 200,
        total: subtotal + 200,
        items: {
          create: [
            {
              productId: products[0].id,
              variantId: products[0].variants[0]?.id,
              name: products[0].name,
              image: products[0].images[0] ?? null,
              price: products[0].price,
              quantity: 1,
              size: products[0].variants[0]?.size ?? null,
              color: products[0].variants[0]?.color ?? null,
            },
            {
              productId: products[1].id,
              variantId: products[1].variants[0]?.id,
              name: products[1].name,
              image: products[1].images[0] ?? null,
              price: products[1].price,
              quantity: 1,
              size: products[1].variants[0]?.size ?? null,
              color: products[1].variants[0]?.color ?? null,
            },
          ],
        },
      },
    });
    console.log('✅ Demo order created');
  }

  // Newsletter subscribers
  await prisma.newsletterSubscriber.createMany({
    data: [
      { email: 'fashion@example.com' },
      { email: 'style@example.com' },
      { email: 'trendy@example.com' },
    ],
    skipDuplicates: true,
  });
  console.log('✅ Newsletter subscribers created');

  console.log('\n🎉 Seed completed successfully!');
  console.log('\nDemo credentials:');
  console.log('  Admin: admin@khaasattire.pk / Admin@123');
  console.log('  Customer: customer@example.com / Customer@123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
