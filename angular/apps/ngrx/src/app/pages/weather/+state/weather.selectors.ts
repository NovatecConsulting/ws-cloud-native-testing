import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WEATHER_FEATURE_KEY, State, weatherAdapter } from './weather.reducer';

// Lookup the 'Weather' feature state managed by NgRx
export const getWeatherState = createFeatureSelector<State>(WEATHER_FEATURE_KEY);

const { selectAll, selectEntities } = weatherAdapter.getSelectors();

export const getWeatherLoaded = createSelector(getWeatherState, (state: State) => state.loaded);

export const getWeatherError = createSelector(getWeatherState, (state: State) => state.error);

export const getAllWeather = createSelector(getWeatherState, (state: State) => selectAll(state));

export const getWeatherEntities = createSelector(getWeatherState, (state: State) => selectEntities(state));

export const getSelectedId = createSelector(getWeatherState, (state: State) => state.selectedId);

export const getSelected = createSelector(getWeatherEntities, getSelectedId, (entities, selectedId) =>
  selectedId ? entities[selectedId] : undefined
);
