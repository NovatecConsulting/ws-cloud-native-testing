import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as WeatherActions from './weather.actions';
import { WeatherEffects } from './weather.effects';
import { WeatherFacade } from './weather.facade';
import { WeatherEntity } from './weather.models';
import { WEATHER_FEATURE_KEY, State, initialState, reducer } from './weather.reducer';
import * as WeatherSelectors from './weather.selectors';

interface TestSchema {
  weather: State;
}

describe('WeatherFacade', () => {
  let facade: WeatherFacade;
  let store: Store<TestSchema>;
  const createWeatherEntity = (id: string, name = ''): WeatherEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [StoreModule.forFeature(WEATHER_FEATURE_KEY, reducer), EffectsModule.forFeature([WeatherEffects])],
        providers: [WeatherFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [NxModule.forRoot(), StoreModule.forRoot({}), EffectsModule.forRoot([]), CustomFeatureModule],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(WeatherFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allWeather$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allWeather$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadWeatherSuccess` to manually update list
     */
    it('allWeather$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allWeather$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        WeatherActions.loadWeatherSuccess({
          weather: [createWeatherEntity('AAA'), createWeatherEntity('BBB')],
        })
      );

      list = await readFirst(facade.allWeather$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
