import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ImagesComponent} from './images.component';
import { ImageSearchComponent } from '../ui/image-search/image-search.component';
import { PaginationComponent } from '../ui/pagination/pagination.component';
import { ImageListComponent } from '../ui/image-list/image-list.component';
import { SpinnerComponent } from '../ui/spinner/spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ImageService } from './services/image.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ImagesComponent', () => {
  let component: ImagesComponent;
  let fixture: ComponentFixture<ImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImagesComponent, ImageSearchComponent, PaginationComponent, ImageListComponent, SpinnerComponent],
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [ImageService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
