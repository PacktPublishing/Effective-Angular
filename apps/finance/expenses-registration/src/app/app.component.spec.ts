import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { RouterTestingModule } from '@angular/router/testing';
import { getTranslocoModule } from './transloco-testing.module';
import { NavbarComponent, StubNavbarComponent } from '@bt-libs/shared/common-components';
import { TranslationService } from './translation.serive';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const mockTranslationService = {
    setActiveLanguage: jest.fn(),
    getLanguages: jest.fn().mockReturnValue([]),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule, getTranslocoModule()],
      providers: [
        {
          provide: TranslationService,
          useValue: mockTranslationService,
        },
      ]
    }).compileComponents();

    TestBed.overrideComponent(AppComponent, {
      add: {
        imports: [StubNavbarComponent],
      },
      remove: {
        imports: [NavbarComponent],
      },
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component and set the component properties with the expected values', () => {
    expect(component).toBeDefined();
    expect(component.navItems).toEqual([{ label: 'expenses approval', route: '/expenses-approval' }]);
    expect(component['translationService']).toEqual(mockTranslationService);
  });

  it('should call the setActiveLanguage method when the languageChange event is emitted', () => {
    const setActiveLanguage = jest.spyOn(component['translationService'], 'setActiveLanguage');
    const navbarElement = fixture.debugElement.query(By.directive(StubNavbarComponent));
    navbarElement.triggerEventHandler('languageChange', 'nl');
    expect(setActiveLanguage).toHaveBeenCalledWith('nl');
  });
});
