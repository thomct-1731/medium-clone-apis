import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  // Enable API versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: config.get<string>('DEFAULT_VERSION') || '1',
  });

  // Swagger setup
  const swaggerConfig = new DocumentBuilder()
    .setTitle(config.get<string>('SWAGGER_TITLE') || 'API Documentation')
    .setDescription(
      config.get<string>('SWAGGER_DESCRIPTION') || 'API Description',
    )
    .setVersion(config.get<string>('SWAGGER_VERSION') || '1.0')
    .addBearerAuth() // JWT
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(config.get<number>('APP_PORT') || 3000);
}
bootstrap();
