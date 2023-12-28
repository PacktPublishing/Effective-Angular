import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeferWidgetComponent } from './defer-widget.component';

describe('DeferWidgetComponent', () => {
  let component: DeferWidgetComponent;
  let fixture: ComponentFixture<DeferWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeferWidgetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeferWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
