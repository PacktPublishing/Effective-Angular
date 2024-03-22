import { inject, Injectable } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { TranslocoService } from "@ngneat/transloco";
import { filter, map } from "rxjs";

@Injectable({ providedIn: 'root' })
export class TranslationService {
  translocoService = inject(TranslocoService);
  translationsLoaded = toSignal<boolean>(this.translocoService.events$.pipe(filter(event => event.type === 'translationLoadSuccess'), map(event => !!event)));

  setActiveLanguage(lang: 'en' | 'nl') {
    this.translocoService.setActiveLang(lang);
  }

  getLanguages() {
    return this.translocoService.getAvailableLangs() as string[];
  }
}
