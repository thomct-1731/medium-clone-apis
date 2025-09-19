import { Injectable, Logger } from '@nestjs/common';
import { I18nService, I18nContext } from 'nestjs-i18n';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly i18n: I18nService) {}

  getHello(i18n?: I18nContext): string {
    const lang = i18n?.lang || 'en';
    this.logger.log(`Current language: ${lang}`);

    return this.i18n.t('common.HELLO', { lang });
  }
}
