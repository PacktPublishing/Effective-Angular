import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectableLabelComponent } from './selectable-label.component';

describe('SelectableLabelComponent', () => {
  let component: SelectableLabelComponent;
  let fixture: ComponentFixture<SelectableLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectableLabelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectableLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
