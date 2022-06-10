import { Observable } from 'rxjs';
import { WeatherLocation } from '../model/model';

export type WeatherTemplateData = {
  weather$: Observable<WeatherLocation[]>;
  warning$: Observable<string | undefined>;
  isLoading$: Observable<boolean>;
  mainLocation$: Observable<string | undefined>;
};
