import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  cityData: any[];

  @Output() errorEvent = new EventEmitter<any>();

  constructor(private currentCityWeather: CurrentCityWeatherService) {
    this.errors = [];
    this.cityData = [];
  }

  ngOnInit() {
    // this.currentCityWeather.currentData.subscribe(message => this.message = message);


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
        this.cityData.push(this.currentCity);
        this.currentCityWeather.getCurrentWeather(currentCity.EnglishName, currentCity.Key, false)
          .subscribe(currentWeather => {
          this.currentWeather = currentWeather;
          this.cityData.push(this.currentWeather);
          this.currentCityWeather.getCityImage(currentCity.EnglishName)
            .subscribe(city => {
              const wrapper = document.querySelector('.basic-info-wrapper');
              this.backgroundImage = city.hits[0].largeImageURL;
              wrapper.setAttribute('style', `background-image: url("` + this.backgroundImage + `")`);
              this.cityData.push(this.backgroundImage);
            }, error => {
              this.errors.push(error);
              this.loading = false;
            });
          this.currentCityWeather.getWeatherForToday(currentCity.EnglishName, currentCity.Key, false)
            .subscribe(todaysWether => {
              this.todaysWeather = todaysWether.filter((item, index) => index < 4);
              this.cityData.push(this.todaysWeather);
              this.currentCityWeather.handleCityData(this.cityData);
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
        this.errorEvent.emit(this.errors);
        this.loading = false;
      });
  }

}
