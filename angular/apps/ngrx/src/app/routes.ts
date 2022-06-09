import { EntryComponent } from './pages/entry/entry.component';
import { DefinedRoute } from '@cntws/layout';

export const DEFINED_ROUTES: DefinedRoute[] = [new DefinedRoute('**', EntryComponent, 'Home')];
