import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { consumer } from './globals';

async function bootstrap() {
  const logger = new Logger('bootstrap function');
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.enableCors({
    origin: consumer,
  });

  const port = process.env.APP_PORT;
  await app
    .listen(port)
    .then(() => logger.debug(`server listening on port ${port}`));
}

bootstrap();
