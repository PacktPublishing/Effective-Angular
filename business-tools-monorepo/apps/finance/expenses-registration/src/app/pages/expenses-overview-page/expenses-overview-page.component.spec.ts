import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpensesOverviewPageComponent } from './expenses-overview-page.component';

describe('ExpensesOverviewPageComponent', () => {
  let component: ExpensesOverviewPageComponent;
  let fixture: ComponentFixture<ExpensesOverviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensesOverviewPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpensesOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
