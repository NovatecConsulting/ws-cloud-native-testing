import { NavbarComponent } from './navbar.component';
import { MockBuilder, MockRender } from 'ng-mocks';
import { NavigationModule } from '../../../../../../apps/basics/src/app/layout/navigation/navigation.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('Navbar', () => {
  beforeEach(() => MockBuilder(NavbarComponent, NavigationModule).keep(RouterTestingModule));

  it('should stay consistent', () => {
    const fixture = MockRender(NavbarComponent);
    expect(fixture).toMatchSnapshot();
  });
});
