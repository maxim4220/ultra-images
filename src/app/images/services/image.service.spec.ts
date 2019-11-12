import { Observable } from 'rxjs';
import {TestBed, inject, getTestBed} from '@angular/core/testing';

import {ImageService} from './image.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('ImageService', () => {
  let service: ImageService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ImageService]
    });
    // inject the service
    service = TestBed.get(ImageService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should get the data successful from Giphy', () => {
    service.getImages('&q=10').subscribe((result: Observable<any>) => {
      expect(result).toBeDefined(); 
    });
    const req = httpMock.expectOne('http://api.giphy.com/v1/gifs/search?api_key=krYLN9xmR99j1WQkm5nERGA0w3bXmD2D&q=10');
    expect(req.request.method).toBe('GET')
    req.flush(10);
    httpMock.verify();
  });

  it('should be created', () => {
        expect(service).toBeTruthy();
      });

});



