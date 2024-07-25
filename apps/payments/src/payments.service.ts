import { CreateChargeDto } from '@app/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  constructor(private readonly configService: ConfigService) {}

  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2024-06-20',
    },
  );

  async createCharge({ card, amount }: CreateChargeDto) {
    // Create a customer if you don't have one
    const customer = await this.stripe.customers.create({
      name: 'Aman Test Customer Name',
      email: 'aman.khubani+teststripe@gmail.com',
      address: {
        city: 'Indore',
        country: 'India',
        state: 'Madhya Pradesh',
        line1: 'Test Address',
        postal_code: '452001',
      },
    });

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'inr',
      payment_method: 'pm_card_visa',
      confirm: true,
      customer: customer.id,
      description: 'Test payment',
      automatic_payment_methods: {
        allow_redirects: 'never',
        enabled: true,
      },
    });

    return paymentIntent;
  }
}
