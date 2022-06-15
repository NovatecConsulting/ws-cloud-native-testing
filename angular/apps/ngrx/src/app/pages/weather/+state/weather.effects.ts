import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { WeatherActions } from './weather.state';
import {WeatherService} from "./weather.service";
import {map} from "rxjs";

@Injectable()
export class WeatherEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.init),
      map(() => WeatherActions.loadWeatherLocations({ location: 'Stuttgart' }))
    )
  );

  loadWeatherLocations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.loadWeatherLocations),
      fetch({
        run: (action) => {
          console.log('receive load');
          return this.service
            .getWeatherForLocation(action.location)
            .pipe(map((response) => WeatherActions.loadWeatherLocationsSuccess({ locations: response })));
        },
        onError: (action, error) => {
          console.log(action, error);
        },
      })
    )
  );

  constructor(private readonly actions$: Actions, private service: WeatherService) {}
}
