import { inject, Injectable } from "@angular/core";
import { Translation, TranslocoLoader } from "@ngneat/transloco";
import { HttpClient } from "@angular/common/http";
import { APP_BASE_HREF } from "@angular/common";

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private http = inject(HttpClient);
  protected readonly baseHref = inject(APP_BASE_HREF);

  getTranslation(lang: 'en' | 'nl') {
    return this.http.get<Translation>(`${this.baseHref}assets/i18n/${lang}.json`);
  }
}
