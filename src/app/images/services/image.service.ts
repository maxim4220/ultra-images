import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class ImageService {
  // Link includes api address and api application key.
  private readonly link = 'http://api.giphy.com/v1/gifs/search?api_key=krYLN9xmR99j1WQkm5nERGA0w3bXmD2D';

  constructor(private http: HttpClient) {
  }

  public getImages(searchParams): Observable<any> {
    const url = this.link + searchParams;
    return this.http.get(url);
  }

}
