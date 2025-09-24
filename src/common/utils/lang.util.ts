import { ConfigService } from '@nestjs/config';
import { I18nContext } from 'nestjs-i18n';

export function getLang(
  configService: ConfigService,
  i18n?: I18nContext,
): string {
  return i18n?.lang || configService.get<string>('DEFAULT_LANG') || 'en';
}
