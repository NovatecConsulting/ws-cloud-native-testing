import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as WeatherActions from './weather.actions';

@Injectable()
export class WeatherFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */

  constructor(private readonly store: Store) {
    console.log('facade injected');
  }

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    console.log('dispatching init');
    this.store.dispatch(WeatherActions.init());
  }
}
