export class Endpoints {
  mainLocation = () => `${this.environment.weatherApi}/mainLocation`;
  queryLocation = (location: string) => `${this.environment.weatherApi}/locations?q=${location}`;

  constructor(private environment: {weatherApi: string}) {}
}
