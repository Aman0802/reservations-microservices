import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);
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
