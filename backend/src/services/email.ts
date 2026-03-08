import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface OrderConfirmationData {
  customerName: string;
  orderNumber: string;
  orderTotal: number;
  items: Array<{ name: string; quantity: number; price: number }>;
}

/** Send order confirmation email */
export const sendOrderConfirmationEmail = async (
  email: string,
  data: OrderConfirmationData,
): Promise<void> => {
  const itemsList = data.items
    .map((item) => `<li>${item.name} x${item.quantity} - Rs. ${item.price.toLocaleString()}</li>`)
    .join('');

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || 'noreply@khaasattire.com',
    to: email,
    subject: `Order Confirmed - ${data.orderNumber} | KHAAS ATTIRE`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #800020; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-family: Georgia, serif;">KHAAS ATTIRE</h1>
          <p style="margin: 5px 0 0; font-style: italic;">Wear What Speaks.</p>
        </div>
        <div style="padding: 30px; background: #FAF7F2;">
          <h2>Order Confirmed! 🎉</h2>
          <p>Dear ${data.customerName},</p>
          <p>Thank you for your order. We're processing it now!</p>
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Order #${data.orderNumber}</h3>
            <ul>${itemsList}</ul>
            <hr />
            <strong>Total: Rs. ${data.orderTotal.toLocaleString()}</strong>
          </div>
          <p>You'll receive a shipping notification once your order is on the way.</p>
          <p style="color: #666; font-size: 12px;">KHAAS ATTIRE | Pakistan's Premium Clothing Brand</p>
        </div>
      </div>
    `,
  });
};

/** Send order shipped email */
export const sendOrderShippedEmail = async (
  email: string,
  customerName: string,
  orderNumber: string,
  trackingNumber: string,
): Promise<void> => {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM || 'noreply@khaasattire.com',
    to: email,
    subject: `Your Order Has Shipped! - ${orderNumber} | KHAAS ATTIRE`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #800020; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-family: Georgia, serif;">KHAAS ATTIRE</h1>
        </div>
        <div style="padding: 30px; background: #FAF7F2;">
          <h2>Your Order is on the Way! 📦</h2>
          <p>Dear ${customerName},</p>
          <p>Your order <strong>#${orderNumber}</strong> has been shipped!</p>
          <p>Tracking Number: <strong>${trackingNumber}</strong></p>
          <p>You can track your order with TCS, Leopards, or BlueEx using the tracking number above.</p>
        </div>
      </div>
    `,
  });
};
