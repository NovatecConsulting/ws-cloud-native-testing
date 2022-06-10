import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WeatherLocation } from '../../model/model';

@Component({
  selector: 'weather-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent {
  @Input() weatherLocations: WeatherLocation[] = [];
  @Output() savedLocation = new EventEmitter<WeatherLocation>();

  saveLocation($event: MouseEvent, location: WeatherLocation) {
    $event.stopPropagation();
    this.savedLocation.emit(location);
  }

  locationId(location: WeatherLocation): string {
    const locationForId = location.location.replace(' ', '-');
    return `location-${locationForId}`;
  }
}
