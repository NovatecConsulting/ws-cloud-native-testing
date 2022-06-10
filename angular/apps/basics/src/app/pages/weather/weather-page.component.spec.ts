import '../../testing-helpers/window.mock';
import { MockBuilder, MockRender, MockService } from 'ng-mocks';
import { WeatherPageComponent } from './weather-page.component';
import { WeatherPageModule } from './weather-page.module';
import { WeatherService } from './service/weather.service';
import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { environment } from '../../../environments/environment';
import { ApiModelGenerators } from '../../testing-helpers/api-model-generators';
import { MatCardHarness } from '@angular/material/card/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatCardModule } from '@angular/material/card';
import { WeatherIntroductionComponent } from './paragraphs/introduction/weather-introduction.component';
import { WeatherExplanationComponent } from './paragraphs/explanation/weather-explanation.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WeatherLocation, WeatherModule } from '@cntws/weather';

type serviceMockProps = {
  isLoading?: boolean;
  warning?: string | undefined;
  weather?: WeatherLocation[];
  mainLocation?: string | undefined;
};

function createServiceMock(opts: serviceMockProps) {
  const stateOverrides = {
    isLoading$: of(!!opts.isLoading),
    warning$: of(opts.warning),
    weather$: of(opts.weather ? opts.weather : []),
    mainLocation$: of(opts.mainLocation),
  };
  return MockService(WeatherService, stateOverrides);
}

const MaterialModules = [MatCardModule, MatExpansionModule, MatInputModule, MatButtonModule, MatDividerModule, MatProgressSpinnerModule];

describe('A user visiting the Component Testing Page', () => {
  /**
   * These tests are testing the complete module and give us confidence for bigger refactorings.
   * They are rather brittle and thus, we have to use them carefully.
   * Further, they do not give good insights in why a specific scenario is failing.
   * This leads to a need of additional tests for your components to get better feedback.
   */
  describe('and having their data loaded', () => {
    const stuttgart = 'stuttgart';
    const twentyFive = 25;
    let fixture: ComponentFixture<WeatherPageComponent>;
    let loader: HarnessLoader;
    let controller: HttpTestingController;

    beforeEach(async () => {
      return TestBed.configureTestingModule({
        declarations: [WeatherPageComponent, WeatherIntroductionComponent, WeatherExplanationComponent],
        imports: [NoopAnimationsModule, HttpClientTestingModule, ReactiveFormsModule, WeatherModule, ...MaterialModules],
        providers: [WeatherService],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(WeatherPageComponent);
      loader = TestbedHarnessEnvironment.loader(fixture);
      controller = TestBed.inject(HttpTestingController);
    });

    function flushLocationAndWeather() {
      const locationRequest = controller.expectOne(`${environment.weatherApi}/mainLocation`);
      locationRequest.flush(ApiModelGenerators.createLocationApiModel(stuttgart));
      const weatherRequest = controller.expectOne(`${environment.weatherApi}/locations?q=${stuttgart}`);
      weatherRequest.flush(ApiModelGenerators.createWeatherApiModel(stuttgart, twentyFive));
    }

    async function searchAndFlushWeather() {
      const locationCard = await loader.getHarness(MatCardHarness.with({ subtitle: new RegExp(`.*(location).*`) }));
      const locationInput = await locationCard.getHarness(MatInputHarness);
      const searchedWeather = 'Frankfurt';
      await locationInput.setValue(searchedWeather);
      const searchButton = await locationCard.getHarness(MatButtonHarness);
      await searchButton.click();
      const searchedWeatherRequest = controller.expectOne(`${environment.weatherApi}/locations?q=${searchedWeather}`);
      searchedWeatherRequest.flush(ApiModelGenerators.createWeatherApiModel(searchedWeather, twentyFive));
      return searchedWeather;
    }

    it('should load their saved location', async () => {
      flushLocationAndWeather();
      await loader.getHarness(MatCardHarness.with({ subtitle: new RegExp(`.*(${stuttgart}).*`) }));
    });

    it('should load the weather for their saved location', async () => {
      flushLocationAndWeather();
      await loader.getHarness(MatCardHarness.with({ title: stuttgart }));
    });

    it('should be able to search for a location', async () => {
      flushLocationAndWeather();
      const searchedWeather = await searchAndFlushWeather();

      await loader.getHarness(MatCardHarness.with({ title: searchedWeather }));
    });

    it('should be able to save a location', async () => {
      flushLocationAndWeather();
      const searchedWeather = await searchAndFlushWeather();

      const searchedWeatherResult = await loader.getHarness(MatCardHarness.with({ title: searchedWeather }));
      const saveButton = await searchedWeatherResult.getHarness(MatButtonHarness);
      await saveButton.click();
      const saveRequest = controller.expectOne(`${environment.weatherApi}/mainLocation`);
      expect(saveRequest.request.method).toEqual('POST');
    });
  });

  describe('should have a consistent layout', () => {
    beforeEach(() => MockBuilder(WeatherPageComponent, WeatherPageModule));

    it('if the service is loading', () => {
      const service = createServiceMock({});
      const fixture = MockRender(WeatherPageComponent, {}, { providers: [{ provide: WeatherService, useValue: service }] });
      expect(fixture).toMatchSnapshot();
    });
  });
});
