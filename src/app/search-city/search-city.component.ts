import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, tap, map, switchMap } from 'rxjs/operators';
import { SearchAutocompleteService } from '../search-autocomplete.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.scss']
})
export class SearchCityComponent {
  model: any;
  searching = false;
  searchFailed = false;
  city: string;

  constructor(private service: SearchAutocompleteService, private router: Router) {}

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(searchText =>
        this.service.getCities(searchText).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )

  showCityDetails(): void {
    const searchInput: string = (document.querySelector('.search-input') as HTMLInputElement).value;
    this.router.navigateByUrl(`/detail/${searchInput}`);
  }

}
