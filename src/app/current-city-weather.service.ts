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
  private apiKey = 'CN5chK4WAKWExtukoxoTPP3YLNX2qgy2';
  //CN5chK4WAKWExtukoxoTPP3YLNX2qgy2
  //E0HZ33WBbHYpRtGkv3cCTHuG4wOT1dov
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

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
      catchError(this.handleError<any>(`error fetching city by name`))
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
      catchError(this.handleError<any>(`error fetching current weather`))
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
      catchError(this.handleError<any>(`error fetching image`))
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
      catchError(this.handleError<any>(`error fetching todays weather`))
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
      catchError(this.handleError<any>(`error fetching weather for next days`))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(
    private http: HttpClient
  ) { }
}
