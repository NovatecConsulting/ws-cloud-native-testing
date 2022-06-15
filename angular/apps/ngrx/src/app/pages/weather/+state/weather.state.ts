import {createAction, createSelector, props} from "@ngrx/store";
import {WeatherLocation} from "@cntws/weather";

export const WEATHER_FEATURE_KEY = 'weather'

/**
 * ##### STATE #####
 */

type WEATHER_LOCATIONS = {
  readonly locations: ReadonlyArray<WeatherLocation>
}

export type WeatherState = WEATHER_LOCATIONS;

export const initialState: WeatherState = {
  locations: []
}

/**
 * ##### ACTIONS #####
 */

const weatherPageActionName = (name: string) => `[Weather Page] ${name}`;

export const WeatherActions = {
  init: createAction(weatherPageActionName('Initialize')),
  loadWeatherLocations: createAction(weatherPageActionName('Load weather locations')),
  loadWeatherLocationsSuccess: createAction(weatherPageActionName('Successfully loaded weather'), props<WEATHER_LOCATIONS>())
}

/**
 * ##### SELECTORS #####
 */

const selectWeatherLocations = createSelector(
  (state: WeatherState) => state,
  (state: WeatherState) => state.locations
);
