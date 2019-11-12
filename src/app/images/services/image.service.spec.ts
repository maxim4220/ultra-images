import {TestBed} from '@angular/core/testing';

import {ImageService} from './image.service';
import {async} from '@angular/core/testing';
import { ImagesModule } from '../images.module';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('ImageService', () => {
  // beforeEach(() => TestBed.configureTestingModule({
  //   providers: [
  //     ImageService,
  //   ],
  // }));
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      //providers: [ImageService]
      imports: [ImagesModule,  HttpClientTestingModule,]
    });
  }));

  it('should be created', () => {
    const service: ImageService = TestBed.get(ImageService);
    expect(service).toBeTruthy();
  });
});
