import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WeatherTemplateData } from '../page-template/weather-template-data';
import { WeatherLocation } from '../model/model';

@Component({
  selector: 'weather-page-template',
  templateUrl: './page-template.component.html',
  styleUrls: ['./page-template.component.scss'],
})
export class PageTemplateComponent implements OnInit {
  @Input() weatherTemplateData!: WeatherTemplateData;
  @Output() searched = new EventEmitter<string>();
  @Output() savedLocation = new EventEmitter<WeatherLocation>();

  ngOnInit(): void {
    if (!this.weatherTemplateData) {
      throw new Error('No data provided for weather template!');
    }
  }
}
