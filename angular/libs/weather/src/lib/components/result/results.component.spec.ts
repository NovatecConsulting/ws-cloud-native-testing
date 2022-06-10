import { MockBuilder, MockRender } from 'ng-mocks';
import { ResultsComponent } from './results.component';
import { WeatherModule } from '../../weather.module';
import { By } from '@angular/platform-browser';
import { WeatherLocation } from '../../model/model';

describe('A user', () => {
  describe('viewing their results', () => {
    beforeEach(() => MockBuilder(ResultsComponent, WeatherModule));

    it('should see a consistent layout', () => {
      const weatherLocations: WeatherLocation[] = [
        { temp: 25, location: 'Stuttgart' },
        { temp: 22, location: 'Freiburg' },
      ];
      const fixture = MockRender(ResultsComponent, { weatherLocations });
      expect(fixture).toMatchSnapshot();
    });

    it('should be able to save their location', () => {
      const stuttgartLocation = { temp: 25, location: 'Stuttgart' };
      const weatherLocations: WeatherLocation[] = [stuttgartLocation, { temp: 22, location: 'Freiburg' }];
      const fixture = MockRender(ResultsComponent, { weatherLocations });
      jest.spyOn(fixture.point.componentInstance.savedLocation, 'emit');
      const card = fixture.debugElement.query(By.css(`#location-${stuttgartLocation.location}`));
      const button = card.query(By.css('button')).nativeElement;
      button.click();
      expect(fixture.point.componentInstance.savedLocation.emit).toHaveBeenCalledWith(stuttgartLocation);
    });
  });
});
