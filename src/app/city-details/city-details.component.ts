import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-city-details',
  templateUrl: './city-details.component.html',
  styleUrls: ['./city-details.component.scss']
})
export class CityDetailsComponent implements OnInit {
  city: string;

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getCity();
  }

  getCity(): void {
    const city: string = this.route.snapshot.paramMap.get('city');
    this.city = city;
    console.log('city name: ', city);
    /*this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);*/
  }

  goBack(): void {
    this.location.back();
  }

}
