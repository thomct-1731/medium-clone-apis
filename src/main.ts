import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable API versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: process.env.DEFAULT_VERSION || '1',
  });

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle(process.env.SWAGGER_TITLE || 'API Documentation')
    .setDescription(process.env.SWAGGER_DESCRIPTION || 'API Description')
    .setVersion(process.env.SWAGGER_VERSION || '1.0')
    .addBearerAuth() // JWT
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();
