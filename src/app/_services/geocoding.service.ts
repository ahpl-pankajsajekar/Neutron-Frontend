// geocoding.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  private geocodingApiUrl: string = 'https://maps.googleapis.com/maps/api/geocode/json';

  constructor(private http: HttpClient) { }

  geocodeAddress(address: string): Observable<any> {
    const params = new HttpParams().set('address', address).set('key', 'AIzaSyBRYb33KMEvObkfSt_9WZqMHPy9yLXy_x8');
    return this.http.get<any>(this.geocodingApiUrl, { params: params });
  }

}
