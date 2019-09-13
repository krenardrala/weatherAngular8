import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CurrentCityWeatherService } from '../current-city-weather.service';

@Component({
  selector: 'app-city-details',
  templateUrl: './city-details.component.html',
  styleUrls: ['./city-details.component.scss']
})
export class CityDetailsComponent implements OnInit {
  city: string;
  currentWeather: any[];
  todaysWeather: any[];
  currentCity: any[];
  currentDate: number = Date.now();
  backgroundImage: string;
  nextDaysWeather: any[];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private currentCityWeather: CurrentCityWeatherService
  ) { }

  ngOnInit(): void {
    this.getCity();
  }

  getCity(): void {
    const city: string = this.route.snapshot.paramMap.get('city');
    this.city = city;
    console.log('city name: ', city);
    if (this.city) {
      this.getWeatherDetails();
    }
  }

  getWeatherDetails(): void {
    this.currentCityWeather.getCityByName(this.city)
      .subscribe(currentCity => {
        this.currentCity = currentCity[0];
        this.currentCityWeather.getCurrentWeather(currentCity[0].EnglishName, currentCity[0].Key, true).subscribe(currentWeather => {
          this.currentWeather = currentWeather[0];
          this.currentCityWeather.getCityImage(currentCity[0].EnglishName)
            .subscribe(city => {
              const wrapper = document.querySelector('.image-wrapper');
              this.backgroundImage = city.hits[0].largeImageURL;
              wrapper.setAttribute('style', `background-image: url("` + this.backgroundImage + `")`);
            });
          this.currentCityWeather.getWeatherForToday(currentCity[0].EnglishName, currentCity[0].Key, true)
            .subscribe(todaysWether => {
              this.todaysWeather = todaysWether.filter((item, index) => index < 3);
            });
          this.currentCityWeather.getWeatherForNextDays(currentCity[0].EnglishName, currentCity[0].Key, true)
            .subscribe(nextDaysWeather => {
              this.nextDaysWeather = nextDaysWeather;
          });
        });
      });
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
