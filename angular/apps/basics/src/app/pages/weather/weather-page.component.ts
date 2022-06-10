import { Component } from '@angular/core';
import { WeatherService } from './service/weather.service';
import { WeatherLocation } from '@cntws/weather';

@Component({
  selector: 'basics-weather-page',
  templateUrl: './weather-page.component.html',
  styleUrls: ['./weather-page.component.scss'],
})
export class WeatherPageComponent {
  weatherTemplateData = {
    weather$: this.service.weather$,
    warning$: this.service.warning$,
    isLoading$: this.service.isLoading$,
    mainLocation$: this.service.mainLocation$,
  };

  constructor(private service: WeatherService) {
    this.service.getMainLocation();
    this.weatherTemplateData.mainLocation$.subscribe((location) => {
      if (location) {
        this.service.getWeatherForLocation(location);
      }
    });
  }

  search(location: string) {
    this.service.getWeatherForLocation(location);
  }

  saveLocation(location: WeatherLocation) {
    this.service.saveMainLocation(location.location);
  }
}
