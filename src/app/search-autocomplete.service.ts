import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SearchAutocompleteService {
  // URL to web api
  private apiUrl = 'http://dataservice.accuweather.com/';
  private apiKey = 'CN5chK4WAKWExtukoxoTPP3YLNX2qgy2';
  //CN5chK4WAKWExtukoxoTPP3YLNX2qgy2
  //E0HZ33WBbHYpRtGkv3cCTHuG4wOT1dov

  /**
   * GET list of cities by string
   * @param searchText - city name
   */
  getCities(searchText: string): Observable<any> {
    const url = `${this.apiUrl}locations/v1/cities//autocomplete?apikey=${this.apiKey}&q=${searchText}`;
    return this.http.get<any>(url).pipe(
      map(result => result.map((city) => city.LocalizedName)),
      catchError(this.handleError<any>(`error fetching list of cities`))
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
