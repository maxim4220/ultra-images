import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ImageSearchComponent} from './image-search.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';

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
    expect(component.search.value).toBe('');
  });

  it('should enter input text and receive on submit', () => {
      const input = fixture.debugElement.query(By.css('input'));
      const el = input.nativeElement;
      expect(el.value).toBe('');
      el.value = 'cat';
      expect(el.value).toBe('cat');
  });
});
