import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpensesApprovalPageComponent } from './expenses-approval-page.component';

describe('ExpensesApprovalPageComponent', () => {
  let component: ExpensesApprovalPageComponent;
  let fixture: ComponentFixture<ExpensesApprovalPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensesApprovalPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpensesApprovalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
