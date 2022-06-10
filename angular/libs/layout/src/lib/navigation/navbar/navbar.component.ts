import { Component, Input } from '@angular/core';
import { DefinedRoute } from '../model';

@Component({
  selector: 'layout-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() routes: DefinedRoute[] = [];
}
