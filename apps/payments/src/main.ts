import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);
  const configService = app.get(ConfigService);

  app.useLogger(app.get(Logger));

  app.connectMicroservice({
    options: {
      host: '0.0.0.0',
      port: configService.get('PORT'),
    },
  });

  await app.startAllMicroservices();
}
bootstrap();
