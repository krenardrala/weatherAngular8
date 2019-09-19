import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CurrentCityWeatherService } from '../../current-city-weather.service';
import {flatMap, map, switchMap} from 'rxjs/operators';
import {forkJoin, Subscription} from 'rxjs';

@Component({
  selector: 'app-city-details',
  templateUrl: './city-details.component.html',
  styleUrls: ['./city-details.component.scss']
})
export class CityDetailsComponent implements OnInit, OnDestroy {
  city: string;
  currentWeather: any[];
  todaysWeather: any[];
  currentCity: any[];
  currentDate: number = Date.now();
  backgroundImage: string;
  nextDaysWeather: any[];
  loading: boolean;
  subsOb: Subscription;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private currentCityWeather: CurrentCityWeatherService
  ) { }

  ngOnInit(): void {
    this.getCity();
  }

  ngOnDestroy(): void {
    this.subsOb.unsubscribe();
  }

  getCity(): void {
    this.city = this.route.snapshot.paramMap.get('city');
    if (this.city) {
      this.getWeatherDetails();
    }
  }

  getWeatherDetails(): void {
    this.loading = true;
    this.subsOb = this.currentCityWeather.getCityByName(this.city).pipe(
      flatMap(currentCity => {
        this.currentCity = currentCity[0];
        return this.currentCityWeather.getCurrentWeather(currentCity[0].EnglishName, currentCity[0].Key, true).pipe(
          flatMap(currentWeather => {
            this.currentWeather = currentWeather[0];
            const cityImage = this.currentCityWeather.getCityImage(currentCity[0].EnglishName);
            const weatherForToday = this.currentCityWeather.getWeatherForToday(currentCity[0].EnglishName, currentCity[0].Key, true);
            const weatherForNextDays =  this.currentCityWeather.getWeatherForNextDays(currentCity[0].EnglishName, currentCity[0].Key, true);
            return forkJoin([cityImage, weatherForToday, weatherForNextDays]).pipe(map(results => {
              const city = results[0];
              const todaysWeather = results[1];
              const nextDaysWeather = results[2];
              const wrapper = document.querySelector('.image-wrapper');
              this.backgroundImage = city.hits[0].largeImageURL;
              wrapper.setAttribute('style', `background-image: url("` + this.backgroundImage + `")`);
              this.todaysWeather = todaysWeather.filter((item, index) => index < 3);
              this.nextDaysWeather = nextDaysWeather;
              this.loading = false;
            }));
        }));
      }))
      .subscribe();
  }

  showModal(): void {
    const modal = document.getElementById('myModal');
    const modalImg = document.getElementById('img01');

    modal.style.display = 'block';
    modalImg.setAttribute('src',  this.backgroundImage);
  }

  closeModal(): void {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
  }

  goBack(): void {
    this.location.back();
  }

}
