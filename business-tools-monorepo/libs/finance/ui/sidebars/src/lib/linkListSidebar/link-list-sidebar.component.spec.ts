import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkListSidebarComponent } from './link-list-sidebar.component';

describe('LinkListSidebarComponent', () => {
  let component: LinkListSidebarComponent;
  let fixture: ComponentFixture<LinkListSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkListSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LinkListSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
