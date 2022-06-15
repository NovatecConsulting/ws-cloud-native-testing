export interface WeatherLocation {
  temp: number;
  location: string;
}

export interface WeatherApiModel {
  temp: number;
  name: string;
}

export interface LocationApiModel {
  name: string;
}

export const mapWeatherApiModel: (apiModel: WeatherApiModel[]) => WeatherLocation[] = (apiModel: WeatherApiModel[]) => {
  return apiModel.map((apiWeather) => ({ temp: apiWeather.temp, location: apiWeather.name }));
}
