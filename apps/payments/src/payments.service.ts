import { CreateChargeDto, NOTIFICATION_SERVICE } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import Stripe from 'stripe';
import { PaymentsCreateChargeDto } from './dto';
import { text } from 'stream/consumers';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationsService: ClientProxy,
  ) {}

  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2024-06-20',
    },
  );

  async createCharge({ card, amount, email }: PaymentsCreateChargeDto) {
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

    this.notificationsService.emit('notify_email', {
      email,
      text: `Payment of ${amount} was successful from payment service`,
    });

    return paymentIntent;
  }
}
