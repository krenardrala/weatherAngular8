import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CurrentCityWeatherService {
  // URL to web api
  private apiUrl = 'http://dataservice.accuweather.com/';
  private apiKey = 'CN5chK4WAKWExtukoxoTPP3YLNX2qgy21';
  //CN5chK4WAKWExtukoxoTPP3YLNX2qgy2
  //E0HZ33WBbHYpRtGkv3cCTHuG4wOT1dov

  /**
   * GET City Info by Name
   * @param lat - latitude
   * @param long - longitude
   */
  getCityByGeoLocation(lat: number, long: number): Observable<any> {
    const url = `${this.apiUrl}locations/v1/cities/geoposition/search?apikey=${this.apiKey}&q=${lat},${long}`;
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`fetched city by geolocation`)),
      catchError(err => {
        return throwError(err.error);
      })
    );
  }

  /**
   * GET City Info by Name
   * @param city - name of city
   */
  getCityByName(city: string): Observable<any> {
    const url = `${this.apiUrl}locations/v1/cities/search?apikey=${this.apiKey}&q=${city}`;
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`fetched city by name`)),
      catchError(err => {
        return throwError(err.error);
      })
    );
  }

  /**
   * GET Current Weather Conditions by City name
   * @param city - name of city
   * @param key - city key
   * @param details - show details
   */
  getCurrentWeather(city: string, key: string, details: boolean = false): Observable<any> {
    const url = `${this.apiUrl}currentconditions/v1/${key}?apikey=${this.apiKey}&metric=true&details=${details}`;
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`fetched current weather`)),
      catchError(err => {
        return throwError(err.error);
      })
    );
  }

  /**
   * GET City Image by Name
   * @param city - name of city
   */
  getCityImage(city: string): Observable<any> {
    const url = `https://pixabay.com/api/?key=13591826-c8ebe304a1d5d65dac71bb9a4&q=${city}&image_type=photo`;
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`fetched image`)),
      catchError(err => {
        return throwError(err.error);
      })
    );
  }

  /**
   * GET Weather for next 12 hours
   * @param city - name of city
   * @param key - city key
   * @param details - show details
   */
  getWeatherForToday(city: string, key: number, details: boolean = false): Observable<any> {
    const url = `${this.apiUrl}forecasts/v1/hourly/12hour/${key}?apikey=${this.apiKey}&metric=true&details=${details}`;
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`fetched todays weather`)),
      catchError(err => {
        return throwError(err.error);
      })
    );
  }

  /**
   * GET Weather for next 5 days
   * @param city - name of city
   * @param key - city key
   * @param details - show details
   */
  getWeatherForNextDays(city: string, key: number, details: boolean = false): Observable<any> {
    const url = `${this.apiUrl}forecasts/v1/daily/5day/${key}?apikey=${this.apiKey}&metric=true&details=${details}`;
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`fetched next days weather`)),
      catchError(err => {
        return throwError(err.error);
      })
    );
  }

  constructor(
    private http: HttpClient
  ) { }
}
