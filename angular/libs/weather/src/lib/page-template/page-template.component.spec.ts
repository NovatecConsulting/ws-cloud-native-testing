import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatInputHarness } from '@angular/material/input/testing';
import { MockBuilder, MockRender } from 'ng-mocks';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PageTemplateComponent } from './page-template.component';
import { ErrorMessageComponent } from '../components/error-message/error-message.component';
import { LocationComponent } from '../components/location/location.component';
import { LoadingComponent } from '../components/loading/loading.component';
import { ResultsComponent } from '../components/result/results.component';
import { of } from 'rxjs';
import { MatButtonHarness } from '@angular/material/button/testing';
import { WeatherLocation } from '../model/model';
import { WeatherModule } from '../weather.module';
import { WeatherTemplateData } from './weather-template-data';

const MaterialModules = [MatCardModule, MatExpansionModule, MatInputModule, MatButtonModule, MatDividerModule, MatProgressSpinnerModule];

describe('A user visiting the Weather Page', () => {
  /**
   * These tests are testing the complete module and give us confidence for bigger refactorings.
   * They are rather brittle and thus, we have to use them carefully.
   * Further, they do not give good insights in why a specific scenario is failing.
   * This loads to a need of additional tests for your components to get better feedback.
   */
  describe('and having their data loaded', () => {
    let fixture: ComponentFixture<PageTemplateComponent>;
    let component: PageTemplateComponent;
    let loader: HarnessLoader;

    beforeEach(async () => {
      return TestBed.configureTestingModule({
        declarations: [PageTemplateComponent, ErrorMessageComponent, LocationComponent, LoadingComponent, ResultsComponent],
        imports: [NoopAnimationsModule, ReactiveFormsModule, ...MaterialModules],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(PageTemplateComponent);
      component = fixture.componentInstance;
      loader = TestbedHarnessEnvironment.loader(fixture);
    });

    it('should be able to search for a location', async () => {
      component.weatherTemplateData = {
        weather$: of([]),
        mainLocation$: of(undefined),
        isLoading$: of(false),
        warning$: of(undefined),
      };

      const inputLocation = 'Stuttgart';

      jest.spyOn(component.searched, 'emit');
      const locationInput = await loader.getHarness(MatInputHarness.with({ placeholder: 'Enter location' }));
      await locationInput.setValue(inputLocation);

      const searchButton = await loader.getHarness(MatButtonHarness.with({ text: 'Search' }));
      await searchButton.click();

      expect(component.searched.emit).toHaveBeenCalledWith(inputLocation);
    });

    it('should be able to save his location', async () => {
      const stuttgart = { location: 'Stuttgart', temp: 25 };
      const weather: WeatherLocation[] = [stuttgart];
      component.weatherTemplateData = {
        weather$: of(weather),
        mainLocation$: of(undefined),
        isLoading$: of(false),
        warning$: of(undefined),
      };

      jest.spyOn(component.savedLocation, 'emit');

      const saveButton = await loader.getHarness(MatButtonHarness.with({ text: 'Save Location & Reload' }));
      await saveButton.click();

      expect(component.savedLocation.emit).toHaveBeenCalledWith(stuttgart);
    });
  });

  describe('should have a consistent layout', () => {
    beforeEach(() => MockBuilder(PageTemplateComponent, WeatherModule));

    it('if their data is still loading', () => {
      const weatherTemplateData: WeatherTemplateData = {
        weather$: of([]),
        mainLocation$: of('Stuttgart'),
        isLoading$: of(true),
        warning$: of(undefined),
      };
      const fixture = MockRender(PageTemplateComponent, { weatherTemplateData });
      expect(fixture).toMatchSnapshot();
    });

    it('if their data contains an error', () => {
      const weatherTemplateData: WeatherTemplateData = {
        weather$: of([]),
        mainLocation$: of('Stuttgart'),
        isLoading$: of(false),
        warning$: of('Something went wrong!'),
      };
      const fixture = MockRender(PageTemplateComponent, { weatherTemplateData });
      expect(fixture).toMatchSnapshot();
    });

    it('if their data has valid results', () => {
      const weather: WeatherLocation[] = [
        { location: 'Stuttgart', temp: 25 },
        { location: 'Frankfurt', temp: 24 },
        { location: 'Berlin', temp: 22 },
      ];
      const weatherTemplateData: WeatherTemplateData = {
        weather$: of(weather),
        mainLocation$: of('Stuttgart'),
        isLoading$: of(false),
        warning$: of(undefined),
      };
      const fixture = MockRender(PageTemplateComponent, { weatherTemplateData });
      expect(fixture).toMatchSnapshot();
    });
  });
});
