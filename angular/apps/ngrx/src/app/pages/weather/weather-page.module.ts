import { NgModule } from '@angular/core';
import { WeatherPageComponent } from './weather-page/weather-page.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromWeather from './+state/weather.reducer';
import { WeatherEffects } from './+state/weather.effects';
import { WeatherFacade } from './+state/weather.facade';
import {WEATHER_FEATURE_KEY} from "./+state/weather.state";
import {WeatherService} from "./+state/weather.service";
import {HttpClientModule} from "@angular/common/http";

// TODO: state can be an own module
@NgModule({
  declarations: [WeatherPageComponent],
  providers: [
    WeatherFacade,
    WeatherService
  ],
  imports: [
    StoreModule.forFeature(WEATHER_FEATURE_KEY, fromWeather.reducer),
    EffectsModule.forFeature([WeatherEffects]),
    HttpClientModule
  ],
  exports: [
    WeatherPageComponent
  ]
})
export class WeatherPageModule {}
