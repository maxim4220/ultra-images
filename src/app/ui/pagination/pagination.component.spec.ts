import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { By } from '@angular/platform-browser';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    component.pagination = { count: 25, offset: 0, total_count: 100 };
    fixture.detectChanges();
  });

  it('should create pagination component', () => {
    expect(component).toBeTruthy();
  });

  it('should have current page equal to 1 by default', () => {
    component.ngOnChanges();
    fixture.detectChanges();
    expect(component.currentPage).toBe(1);
  });

  it('should have next page button', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#next-page').textContent).toBe('Next');
  });

  it('should change current page based on offset', () => {
    component.pagination.offset = 25;
    component.ngOnChanges();
    fixture.detectChanges();
    expect(component.currentPage).toBe(2);
  });

  it('should not have pagination buttons unless data is received', () => {
    const addItemDebugElement = fixture.debugElement.query(By.css('.page-item active'));
    expect(addItemDebugElement).toBeFalsy();
  });

  it('should output increased pagination offset when pagination triggered', () => {
    const submitEl = fixture.debugElement.query(By.css('#next-page'));
    component.emitPagination.subscribe(offset => {
      component.pagination.offset += offset;
    })
    submitEl.triggerEventHandler('click', null);
    expect(component.pagination.offset).toBe(25);
  });



});



