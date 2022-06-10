import { NavbarComponent } from './navbar.component';
import { MockBuilder, MockRender } from 'ng-mocks';
import { RouterTestingModule } from '@angular/router/testing';

// TODO: fix me, own module
describe('Navbar', () => {
  beforeEach(() => MockBuilder(NavbarComponent).keep(RouterTestingModule));

  it('should stay consistent', () => {
    const fixture = MockRender(NavbarComponent);
    expect(fixture).toMatchSnapshot();
  });
});
