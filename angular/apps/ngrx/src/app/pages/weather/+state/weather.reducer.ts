import {Action, createReducer, on} from "@ngrx/store";
import {initialState, WeatherActions, WeatherState} from "./weather.state";
import {WeatherLocation} from "@cntws/weather";

const setWeather = (state: WeatherState, { locations }: { locations: ReadonlyArray<WeatherLocation> }) => {
  console.log('reducing');
  return ({...state, locations});
}
const weatherReducer = createReducer(
  initialState,
  on(WeatherActions.loadWeatherLocationsSuccess, setWeather),
);

export function reducer(state: WeatherState | undefined, action: Action) {
  return weatherReducer(state, action);
}
