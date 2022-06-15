import { Component, OnInit } from '@angular/core';
import {WeatherFacade} from "../+state/weather.facade";

@Component({
  selector: 'ngrx-weather-page',
  templateUrl: './weather-page.component.html',
  styleUrls: ['./weather-page.component.scss'],
})
export class WeatherPageComponent implements OnInit {
  constructor(private weather: WeatherFacade) {}

  ngOnInit(): void {
    this.weather.init();
  }
}
