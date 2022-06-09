import { Type } from '@angular/core';

export class DefinedRoute {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(public path: string, public component: Type<any>, public displayName: string) {}

  buildRouterLink() {
    return '/' + this.path.replace('**', '');
  }
}
