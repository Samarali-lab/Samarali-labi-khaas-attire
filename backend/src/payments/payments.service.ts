import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

interface JazzCashPaymentData {
  amount: number;
  orderId: string;
  description: string;
  mobileNumber: string;
}

interface PaymentInitResponse {
  success: boolean;
  redirectUrl?: string;
  message: string;
  transactionId?: string;
}

@Injectable()
export class PaymentsService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Initiate a JazzCash payment
   */
  async initiateJazzCash(data: JazzCashPaymentData): Promise<PaymentInitResponse> {
    const merchantId = this.configService.get<string>('JAZZCASH_MERCHANT_ID');
    const password = this.configService.get<string>('JAZZCASH_PASSWORD');
    const integritySalt = this.configService.get<string>('JAZZCASH_INTEGRITY_SALT');

    if (!merchantId || !password || !integritySalt) {
      throw new BadRequestException('JazzCash is not configured');
    }

    const dateTime = new Date()
      .toISOString()
      .replace(/[-:T.Z]/g, '')
      .slice(0, 14);
    const expiryDateTime = new Date(Date.now() + 30 * 60 * 1000)
      .toISOString()
      .replace(/[-:T.Z]/g, '')
      .slice(0, 14);

    const amountInPaise = Math.round(data.amount * 100).toString();

    // Build hash string
    const hashString = `${integritySalt}&${amountInPaise}&${dateTime}&${expiryDateTime}&${merchantId}&${data.mobileNumber}&${data.orderId}&PKR&${password}`;
    const hash = crypto
      .createHmac('sha256', integritySalt)
      .update(hashString)
      .digest('hex');

    return {
      success: true,
      message: 'JazzCash payment initiated',
      transactionId: `JC-${data.orderId}-${dateTime}`,
      redirectUrl: `${this.configService.get('JAZZCASH_API_URL')}?pp_MerchantID=${merchantId}&pp_Amount=${amountInPaise}&pp_TxnRefNo=${data.orderId}&pp_SecureHash=${hash}`,
    };
  }

  /**
   * Initiate an EasyPaisa payment
   */
  async initiateEasyPaisa(data: {
    amount: number;
    orderId: string;
    mobileNumber: string;
  }): Promise<PaymentInitResponse> {
    const storeId = this.configService.get<string>('EASYPAISA_STORE_ID');
    const hashKey = this.configService.get<string>('EASYPAISA_HASH_KEY');

    if (!storeId || !hashKey) {
      throw new BadRequestException('EasyPaisa is not configured');
    }

    return {
      success: true,
      message: 'EasyPaisa payment initiated',
      transactionId: `EP-${data.orderId}-${Date.now()}`,
    };
  }

  /**
   * Verify a JazzCash webhook
   */
  verifyJazzCashWebhook(payload: Record<string, string>): boolean {
    const integritySalt = this.configService.get<string>('JAZZCASH_INTEGRITY_SALT');
    if (!integritySalt) return false;

    const receivedHash = payload.pp_SecureHash;
    const { pp_SecureHash: _hash, ...rest } = payload;

    const sortedValues = Object.keys(rest)
      .sort()
      .map((k) => rest[k])
      .join('&');

    const expectedHash = crypto
      .createHmac('sha256', integritySalt)
      .update(`${integritySalt}&${sortedValues}`)
      .digest('hex');

    return receivedHash === expectedHash;
  }

  /**
   * Validate a discount code
   */
  async validateDiscountCode(code: string, orderTotal: number) {
    // This would typically query the database — simplified here
    const validCodes: Record<string, { type: 'PERCENTAGE' | 'FIXED'; value: number; minOrder?: number }> = {
      WELCOME10: { type: 'PERCENTAGE', value: 10, minOrder: 2000 },
      EID2024: { type: 'PERCENTAGE', value: 15, minOrder: 5000 },
      FLAT500: { type: 'FIXED', value: 500, minOrder: 3000 },
    };

    const codeData = validCodes[code.toUpperCase()];
    if (!codeData) {
      throw new BadRequestException('Invalid discount code');
    }

    if (codeData.minOrder !== undefined && orderTotal < codeData.minOrder) {
      throw new BadRequestException(
        `Minimum order of PKR ${codeData.minOrder.toLocaleString()} required for this code`,
      );
    }

    const discount =
      codeData.type === 'PERCENTAGE'
        ? Math.round((orderTotal * codeData.value) / 100)
        : codeData.value;

    return {
      valid: true,
      code: code.toUpperCase(),
      type: codeData.type,
      value: codeData.value,
      discount,
    };
  }
}
