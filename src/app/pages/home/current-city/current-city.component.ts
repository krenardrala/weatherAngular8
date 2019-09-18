import { Component, OnInit } from '@angular/core';
import { CurrentCityWeatherService } from '../../../current-city-weather.service';

@Component({
  selector: 'app-current-city',
  templateUrl: './current-city.component.html',
  styleUrls: ['./current-city.component.scss']
})
export class CurrentCityComponent implements OnInit {
  currentWeather: any[];
  todaysWeather: any[];
  currentCity: any[];
  currentDate: number = Date.now();
  backgroundImage: string;
  loading: boolean;
  errors: any[];

  constructor(private currentCityWeather: CurrentCityWeatherService) {
    this.errors = [];
  }

  ngOnInit() {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            this.getCurrentWeather(lat, long);
        },
        error => {
          switch (error.code) {
            case 1:
              console.log('Permission Denied');
              break;
            case 2:
              console.log('Position Unavailable');
              break;
            case 3:
              console.log('Timeout');
              break;
          }
        }
      );
    }
  }

  getCurrentWeather(lat: number, long: number): void {
    this.loading = true;
    this.currentCityWeather.getCityByGeoLocation(lat, long)
      .subscribe(currentCity => {
        this.currentCity = currentCity;
        this.currentCityWeather.getCurrentWeather(currentCity.EnglishName, currentCity.Key, false)
          .subscribe(currentWeather => {
          this.currentWeather = currentWeather;
          this.currentCityWeather.getCityImage(currentCity.EnglishName)
            .subscribe(city => {
              const wrapper = document.querySelector('.basic-info-wrapper');
              this.backgroundImage = city.hits[0].largeImageURL;
              wrapper.setAttribute('style', `background-image: url("` + this.backgroundImage + `")`);
            }, error => {
              this.errors.push(error);
              this.loading = false;
            });
          this.currentCityWeather.getWeatherForToday(currentCity.EnglishName, currentCity.Key, false)
            .subscribe(todaysWether => {
              this.todaysWeather = todaysWether.filter((item, index) => index < 4);
              this.loading = false;
            }, error => {
              this.errors.push(error);
              this.loading = false;
            });
        }, error => {
            this.errors.push(error);
            this.loading = false;
          });
      }, error => {
        this.errors.push(error);
        this.loading = false;
      });
  }

}
