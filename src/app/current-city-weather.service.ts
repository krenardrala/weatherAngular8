import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CurrentCityWeatherService {
  // URL to web api
  private apiUrl = 'http://dataservice.accuweather.com/';
  private apiKey = 'E0HZ33WBbHYpRtGkv3cCTHuG4wOT1dov';
  //CN5chK4WAKWExtukoxoTPP3YLNX2qgy2
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  /* GET hero by id. Will 404 if id not found */
  getCityByGeoLocation(lat: number, long: number): Observable<any> {
    const url = `${this.apiUrl}locations/v1/cities/geoposition/search?apikey=${this.apiKey}&q=${lat},${long}`;
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`fetched city`)),
      catchError(this.handleError<any>(`error fetch city`))
    );
  }

  getCurrentWeather(city: string, key: string): Observable<any> {
    const url = `${this.apiUrl}currentconditions/v1//${key}?apikey=${this.apiKey}&metric=true`;
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`fetched weather`)),
      catchError(this.handleError<any>(`error fetch city`))
    );
  }

  getCityImage(city: string): Observable<any> {
    const url = `https://pixabay.com/api/?key=13591826-c8ebe304a1d5d65dac71bb9a4&q=${city}&image_type=photo`;
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`fetched image`)),
      catchError(this.handleError<any>(`error fetch image`))
    );
  }

  getWeatherForToday(city: string, key: number): Observable<any> {
    const url = `${this.apiUrl}forecasts/v1/hourly/12hour/${key}?apikey=${this.apiKey}&metric=true`;
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`fetched todays temperature`)),
      catchError(this.handleError<any>(`error fetch temperature`))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

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
