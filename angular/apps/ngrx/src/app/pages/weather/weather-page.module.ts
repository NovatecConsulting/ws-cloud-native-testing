import { NgModule } from '@angular/core';
import { WeatherPageComponent } from './weather-page/weather-page.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromWeather from './+state/weather.reducer';
import { WeatherEffects } from './+state/weather.effects';
import { WeatherFacade } from './+state/weather.facade';

@NgModule({
  declarations: [WeatherPageComponent],
  providers: [
    WeatherFacade,
  ],
  imports: [
    StoreModule.forFeature(fromWeather.WEATHER_FEATURE_KEY, fromWeather.reducer),
    EffectsModule.forFeature([WeatherEffects])
  ],
  exports: [
    WeatherPageComponent
  ]
})
export class WeatherPageModule {}
