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
import { DebugElement } from '@angular/core';

describe('ImagesComponent', () => {
  let component: ImagesComponent;
  let fixture: ComponentFixture<ImagesComponent>;
  let service: ImageService;
  let debugElement: DebugElement;
  let serviceSpy;

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
    debugElement = fixture.debugElement;

    service = debugElement.injector.get(ImageService);
    serviceSpy = spyOn(service, 'getImages').and.callThrough();

  });

  it('should create images component', () => {
    expect(component).toBeTruthy();
  });

  it('should should reassign properties when pagination called', () => {
    component.getPagination(25);
    expect(component.showMessage).toBe(true);
    component.getSearchOutput('dog');
    expect(component.showMessage).toBe(false);
    expect(component.showSpinner).toBe(true);
  });

  it('should call ImageService getImages method when getSearch has been called', () => {
   component.getSearchOutput('dog');
   expect(component.showSpinner).toBe(true);
   expect(serviceSpy).toHaveBeenCalled();
  });

  it('should call ImageService getImages method when getPagination has been called', () => {
    expect(serviceSpy).not.toHaveBeenCalled();
    component.getPagination(25);
    expect(component.showSpinner).toBe(true);
    expect(serviceSpy).toHaveBeenCalled();
   });

});
