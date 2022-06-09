import { WeatherPageComponent } from './pages/weather/weather-page.component';
import { EntryComponent } from './pages/entry/entry.component';
import { DefinedRoute } from '@cntws/layout';

export const DEFINED_ROUTES: DefinedRoute[] = [
  new DefinedRoute('weather', WeatherPageComponent, 'Weather'),
  new DefinedRoute('**', EntryComponent, 'Home'),
];
