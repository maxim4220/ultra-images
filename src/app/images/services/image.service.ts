import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from 'src/app/api-config';
import { environment } from 'src/environments/environment';

@Injectable()
export class ImageService {
  private api = ApiConfig.searchApi;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  public getImages(searchParams): Observable<any> {
    const url = this.api + this.apiKey + searchParams;
    return this.http.get(url);
  }
}
