import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PaginationComponent} from './pagination.component';
import { Component } from '@angular/core';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationComponent, TestHostComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create pagination component', () => {
    expect(component).toBeTruthy();
  });

  it('should show pagination buttons, current page will be 1 by default', () => {
    component.pagination = { count: 25, offset: 0, total_count: 100};
    component.ngOnChanges();
    fixture.detectChanges();
    expect(component.currentPage).toBe(1);
 
  });

  it('should have all public properties undefined by default in case no data has been provided to input', () => {
  // component.ngOnChanges();
   //fixture.detectChanges();
  // expect(component.currentPage).toBe(1);
  })

  @Component({
    selector: `host-component`,
    template: `<app-pagination [pagination]="testPagination"></app-pagination>`
  })

  class TestHostComponent {
    public testPagination = { count: 25, offset: 0, total_count: 100 };
  }
});



