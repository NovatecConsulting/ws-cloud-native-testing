import { createAction, props } from '@ngrx/store';
import { WeatherEntity } from './weather.models';

export const init = createAction('[Weather Page] Init');

export const loadWeatherSuccess = createAction('[Weather/API] Load Weather Success', props<{ weather: WeatherEntity[] }>());

export const loadWeatherFailure = createAction('[Weather/API] Load Weather Failure', props<{ error: any }>());
