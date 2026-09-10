import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GIPHY_PAGE_SIZE, GIPHY_SEARCH_API } from '../../api-config';
import { environment } from '../../../environments/environment';
import { GiphySearchResponse, ImageSearchResult } from '../models/giphy.model';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private readonly http = inject(HttpClient);

  public getImages(query: string, offset: number): Observable<ImageSearchResult> {
    const params = new HttpParams()
      .set('api_key', environment.apiKey)
      .set('q', query)
      .set('offset', String(offset))
      .set('limit', String(GIPHY_PAGE_SIZE));

    return this.http.get<GiphySearchResponse>(GIPHY_SEARCH_API, { params }).pipe(
      map((response) => ({
        images: response.data.map((gif) => gif.images.fixed_width_downsampled.url),
        pagination: response.pagination,
      }))
    );
  }
}
