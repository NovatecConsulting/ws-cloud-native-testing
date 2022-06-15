import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as WeatherActions from './weather.actions';
import { WeatherEffects } from './weather.effects';

describe('WeatherEffects', () => {
  let actions: Observable<Action>;
  let effects: WeatherEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [WeatherEffects, provideMockActions(() => actions), provideMockStore()],
    });

    effects = TestBed.inject(WeatherEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: WeatherActions.init() });

      const expected = hot('-a-|', { a: WeatherActions.loadWeatherSuccess({ weather: [] }) });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
