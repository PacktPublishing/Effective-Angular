import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import ExpensesOverviewPageComponent from './expenses-overview-page.component';
import { ExpensesFacade, StubExpensesFacade } from '@bt-libs/finance/data-access/expenses';
import { getTranslocoModule } from '../../transloco-testing.module';
import { provideTranslocoLocale } from '@ngneat/transloco-locale';
import { TranslationService } from '../../translation.serive';
import { WritableSignal, signal } from '@angular/core';

describe('ExpensesOverviewPageComponent', () => {
  let component: ExpensesOverviewPageComponent;
  let fixture: ComponentFixture<ExpensesOverviewPageComponent>;

  const mockTranslationService = {
    translocoService: { translate: jest.fn() },
    translationsLoaded: signal(false) as WritableSignal<boolean>,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensesOverviewPageComponent, getTranslocoModule()],
      providers: [
        { provide: ExpensesFacade, useClass: StubExpensesFacade },
        { provide: TranslationService, useValue: mockTranslationService, },
        provideTranslocoLocale({
          langToLocaleMapping: {
            en: 'en-US',
            nl: 'nl-NL'
          },
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ExpensesOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component and initialize the properties correctly', () => {
    expect(component).toBeTruthy();
    expect(component['expensesFacade']).toBeInstanceOf(StubExpensesFacade);
    expect(component['translationService']).toEqual(mockTranslationService);
    expect(component.translationEventsEffect).toBeDefined();
    expect(component.expenses()).toEqual(component['expensesFacade'].expenses());
    expect(component.showAddExpenseModal()).toBeFalsy();
    expect(component.showSummary()).toBeFalsy();
    expect(component.summaryBtnText()).toEqual('Show summary');
  });

  it('should fetch expenses on init', () => {
    const fetchExpenses = jest.spyOn(component['expensesFacade'], 'fetchExpenses');
    component.ngOnInit();
    expect(fetchExpenses).toHaveBeenCalled();
  });

  it('should translate title if translations are loaded', fakeAsync(() => {
    const translateSpy = jest.spyOn(component['translationService'].translocoService, 'translate');
    expect(component['translationService'].translationsLoaded()).toBeFalsy();
    expect(translateSpy).not.toHaveBeenCalled();

    mockTranslationService.translationsLoaded.set(true);
    tick();
    expect(translateSpy).toHaveBeenCalledWith('expenses_overview_page.title');
  }));

  it('should change the summaryBtnText if onSummaryChange is called', () => {
    expect(component.showSummary()).toBeFalsy();
    expect(component.summaryBtnText()).toEqual('Show summary');

    component.onSummaryChange();
    expect(component.showSummary()).toBeTruthy();
    expect(component.summaryBtnText()).toEqual('Hide summary');
  });

  it('should call addExpense on the expenses facade with the correct values when onAddExpense is called', () => {
    const addExpense = jest.spyOn(component['expensesFacade'], 'addExpense');
    const expenseToAdd = { description: 'test', amount: { value: 50, vatPercentage: 20 }, date: '2019-01-04', tags: ['printer'], id: 999 };
    component.onAddExpense(expenseToAdd);
    expect(addExpense).toHaveBeenCalledWith(expenseToAdd);
    expect(component.expenses().expenses).toContainEqual(expenseToAdd);
  });
});
