import { TestBed } from '@angular/core/testing';

import { CurrentCityWeatherService } from './current-city-weather.service';

describe('CurrentCityWeatherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrentCityWeatherService = TestBed.get(CurrentCityWeatherService);
    expect(service).toBeTruthy();
  });
});
