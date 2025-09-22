import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  AcceptLanguageResolver,
  QueryResolver,
  HeaderResolver,
  I18nJsonLoader,
  I18nModule,
} from 'nestjs-i18n';
import * as path from 'path';

@Module({
  imports: [
    I18nModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        fallbackLanguage: config.get<string>('I18N_DEFAULT_LANG') || 'en',
        loader: I18nJsonLoader,
        loaderOptions: {
          path: path.resolve(__dirname, '..', 'i18n'),
          watch: true,
        },
      }),
      resolvers: [
        new QueryResolver(['lang']),
        new HeaderResolver(['x-lang']),
        new AcceptLanguageResolver(),
      ],
    }),
  ],
  exports: [I18nModule],
})
export class CustomI18nModule {}
