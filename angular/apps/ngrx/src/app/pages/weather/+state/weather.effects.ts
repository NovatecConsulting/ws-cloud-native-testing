import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { WeatherActions } from './weather.state';

@Injectable()
export class WeatherEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.init),
      fetch({
        run: () => {
          console.log('receive init');
          // Your custom service 'load' logic goes here. For now just return a success action...
          return WeatherActions.loadWeatherLocations();
        },
      })
    )
  );

  loadWeatherLocations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.loadWeatherLocations),
      fetch({
        run: () => {
          console.log('receive load');
          return WeatherActions.loadWeatherLocationsSuccess({
            locations: [{ location: 'Stuttgart', temp: 25 }],
          });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions) {}
}
