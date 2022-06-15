import { EntryComponent } from './pages/entry/entry.component';
import { DefinedRoute } from '@cntws/layout';
import {WeatherPageComponent} from "./pages/weather/weather-page/weather-page.component";

export const DEFINED_ROUTES: DefinedRoute[] = [
  new DefinedRoute('**', WeatherPageComponent, 'Weather'),
  new DefinedRoute('**', EntryComponent, 'Home')
];
