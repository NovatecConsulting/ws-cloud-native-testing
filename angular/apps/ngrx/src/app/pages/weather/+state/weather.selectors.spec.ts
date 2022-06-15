import { WeatherEntity } from './weather.models';
import { weatherAdapter, WeatherPartialState, initialState } from './weather.reducer';
import * as WeatherSelectors from './weather.selectors';

describe('Weather Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getWeatherId = (it: WeatherEntity) => it.id;
  const createWeatherEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as WeatherEntity);

  let state: WeatherPartialState;

  beforeEach(() => {
    state = {
      weather: weatherAdapter.setAll([createWeatherEntity('PRODUCT-AAA'), createWeatherEntity('PRODUCT-BBB'), createWeatherEntity('PRODUCT-CCC')], {
        ...initialState,
        selectedId: 'PRODUCT-BBB',
        error: ERROR_MSG,
        loaded: true,
      }),
    };
  });

  describe('Weather Selectors', () => {
    it('getAllWeather() should return the list of Weather', () => {
      const results = WeatherSelectors.getAllWeather(state);
      const selId = getWeatherId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = WeatherSelectors.getSelected(state) as WeatherEntity;
      const selId = getWeatherId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getWeatherLoaded() should return the current "loaded" status', () => {
      const result = WeatherSelectors.getWeatherLoaded(state);

      expect(result).toBe(true);
    });

    it('getWeatherError() should return the current "error" state', () => {
      const result = WeatherSelectors.getWeatherError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
