import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { GIPHY_PAGE_SIZE, GIPHY_SEARCH_API } from '../../api-config';
import { environment } from '../../../environments/environment';
import { createGiphySearchResponse, mockImageUrls } from '../../../testing/giphy.fixtures';
import { ImageService } from './image.service';

describe('ImageService', () => {
  let service: ImageService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(ImageService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('requests GIFs with the API key, query, offset, and page size', () => {
    const query = 'cats';
    const offset = 25;

    service.getImages(query, offset).subscribe((result) => {
      expect(result.images).toEqual([...mockImageUrls]);
      expect(result.pagination).toEqual({
        count: 25,
        offset: 0,
        total_count: 100,
      });
    });

    const request = httpMock.expectOne((req) => req.url === GIPHY_SEARCH_API && req.method === 'GET');

    expect(request.request.params.get('api_key')).toBe(environment.apiKey);
    expect(request.request.params.get('q')).toBe(query);
    expect(request.request.params.get('offset')).toBe('25');
    expect(request.request.params.get('limit')).toBe(String(GIPHY_PAGE_SIZE));

    request.flush(createGiphySearchResponse());
  });

  it('maps Giphy payload URLs and pagination into the view model', () => {
    let images: readonly string[] = [];

    service.getImages('dogs', 0).subscribe((result) => {
      images = result.images;
    });

    httpMock.expectOne((req) => req.url === GIPHY_SEARCH_API).flush(createGiphySearchResponse(['https://media.giphy.com/custom.gif']));

    expect(images).toEqual(['https://media.giphy.com/custom.gif']);
  });
});
