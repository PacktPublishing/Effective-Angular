import { TranslocoTestingModule, TranslocoTestingOptions } from '@ngneat/transloco';
import en from '../assets/i18n/en.json';
import nl from '../assets/i18n/nl.json';

export function getTranslocoModule(options: TranslocoTestingOptions = {}) {
  return TranslocoTestingModule.forRoot({
    langs: { en, nl },
    translocoConfig: {
      availableLangs: ['en', 'nl'],
      defaultLang: 'en',
    },
    preloadLangs: true,
    ...options
  });
}
