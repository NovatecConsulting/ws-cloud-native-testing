import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as WeatherActions from './weather.actions';
import * as WeatherFeature from './weather.reducer';
import {map} from "rxjs";

@Injectable()
export class WeatherEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return WeatherActions.loadWeatherSuccess({ weather: [] });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return WeatherActions.loadWeatherFailure({ error });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions) {}
}
