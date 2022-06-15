import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Endpoints, mapWeatherApiModel, WeatherApiModel, WeatherLocation } from '@cntws/weather';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable()
export class WeatherService {
  static ENDPOINTS = new Endpoints(environment);

  constructor(private http: HttpClient) {}

  getWeatherForLocation(location: string): Observable<WeatherLocation[]> {
    return this.http.get<WeatherApiModel[]>(WeatherService.ENDPOINTS.queryLocation(location)).pipe(map(mapWeatherApiModel));
  }
}
