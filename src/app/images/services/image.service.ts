import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ImageService {
  private link = "http://api.giphy.com/v1/gifs/search?api_key=krYLN9xmR99j1WQkm5nERGA0w3bXmD2D&q=";

  constructor(private http: HttpClient,) { }

  public getImages(searchParams): Observable<any> {
    const url = this.link + searchParams;
    return this.http.get(url);
}
}
