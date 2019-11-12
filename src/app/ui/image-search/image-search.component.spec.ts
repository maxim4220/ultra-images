import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ImageSearchComponent} from './image-search.component';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('ImageSearchComponent', () => {
  let component: ImageSearchComponent;
  let fixture: ComponentFixture<ImageSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImageSearchComponent],
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have search form value as empty string by default', () => {
    expect(component.searchForm.value).toBe('');
  });

  it('should should input text and receive on submit', () => {
    fixture.whenStable().then(() => {
      let input = fixture.debugElement.query(By.css('input'));
      let el = input.nativeElement;
      expect(el.value).toBe('');
      el.value = 'cat';
      el.dispatchEvent(new Event('input'));
      expect(el.value).toBe('cat');
    });
 
  });
  
});
 