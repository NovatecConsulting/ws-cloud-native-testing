import { Action } from '@ngrx/store';

import * as WeatherActions from './weather.actions';
import { WeatherEntity } from './weather.models';
import { State, initialState, reducer } from './weather.reducer';

describe('Weather Reducer', () => {
  const createWeatherEntity = (id: string, name = ''): WeatherEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Weather actions', () => {
    it('loadWeatherSuccess should return the list of known Weather', () => {
      const weather = [createWeatherEntity('PRODUCT-AAA'), createWeatherEntity('PRODUCT-zzz')];
      const action = WeatherActions.loadWeatherSuccess({ weather });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
