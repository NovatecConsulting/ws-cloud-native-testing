import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as WeatherActions from './weather.actions';
import { WeatherEntity } from './weather.models';

export const WEATHER_FEATURE_KEY = 'weather';

export interface State extends EntityState<WeatherEntity> {
  selectedId?: string | number; // which Weather record has been selected
  loaded: boolean; // has the Weather list been loaded
  error?: string | null; // last known error (if any)
}

export interface WeatherPartialState {
  readonly [WEATHER_FEATURE_KEY]: State;
}

export const weatherAdapter: EntityAdapter<WeatherEntity> = createEntityAdapter<WeatherEntity>();

export const initialState: State = weatherAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const weatherReducer = createReducer(
  initialState,
  on(WeatherActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(WeatherActions.loadWeatherSuccess, (state, { weather }) => weatherAdapter.setAll(weather, { ...state, loaded: true })),
  on(WeatherActions.loadWeatherFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return weatherReducer(state, action);
}
