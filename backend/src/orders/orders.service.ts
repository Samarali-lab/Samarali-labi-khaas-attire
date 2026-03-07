import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Order, Prisma, PaymentMethod } from '@prisma/client';

interface CreateOrderDto {
  userId?: string;
  addressId?: string;
  paymentMethod: PaymentMethod;
  items: Array<{
    productId: string;
    variantId?: string;
    quantity: number;
    price: number;
    name: string;
    image?: string;
    size?: string;
    color?: string;
  }>;
  shipping?: number;
  discount?: number;
  discountCode?: string;
  notes?: string;
}

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  private generateOrderNumber(): string {
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.random().toString(36).slice(2, 6).toUpperCase();
    return `KA-${timestamp}-${random}`;
  }

  async create(dto: CreateOrderDto): Promise<Order> {
    const subtotal = dto.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const discount = dto.discount ?? 0;
    const shipping = dto.shipping ?? (subtotal >= 5000 ? 0 : 200);
    const total = subtotal - discount + shipping;

    return this.prisma.order.create({
      data: {
        userId: dto.userId,
        addressId: dto.addressId,
        orderNumber: this.generateOrderNumber(),
        paymentMethod: dto.paymentMethod,
        paymentStatus: dto.paymentMethod === 'COD' ? 'COD_PENDING' : 'UNPAID',
        subtotal,
        discount,
        shipping,
        total,
        notes: dto.notes,
        discountCode: dto.discountCode,
        items: {
          create: dto.items.map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
          })),
        },
      },
      include: { items: true, address: true, user: true },
    });
  }

  async findByUser(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        items: { include: { product: { select: { id: true, name: true, slug: true, images: true } } } },
        address: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string, userId?: string): Promise<Order> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: { include: { product: true, variant: true } },
        address: true,
        user: { select: { id: true, name: true, email: true, phone: true } },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order not found`);
    }

    if (userId && order.userId !== userId) {
      throw new ForbiddenException('You do not have access to this order');
    }

    return order;
  }

  async findByOrderNumber(orderNumber: string): Promise<Order> {
    const order = await this.prisma.order.findUnique({
      where: { orderNumber },
      include: {
        items: { include: { product: true } },
        address: true,
      },
    });

    if (!order) {
      throw new NotFoundException(`Order #${orderNumber} not found`);
    }

    return order;
  }

  async findAll(page = 1, limit = 20) {
    const [data, total] = await Promise.all([
      this.prisma.order.findMany({
        skip: (page - 1) * limit,
        take: limit,
        include: {
          items: true,
          address: true,
          user: { select: { id: true, name: true, email: true, phone: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.order.count(),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async updateStatus(
    id: string,
    status: string,
    trackingNumber?: string,
  ): Promise<Order> {
    await this.findById(id);
    return this.prisma.order.update({
      where: { id },
      data: {
        status: status as Prisma.OrderUpdateInput['status'],
        ...(trackingNumber && { trackingNumber }),
      },
    });
  }
}
