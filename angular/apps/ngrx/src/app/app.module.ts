import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '@cntws/layout';
import { EntryComponent } from './pages/entry/entry.component';
import { DEFINED_ROUTES } from './routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, NavbarComponent, EntryComponent, RouterModule.forRoot(DEFINED_ROUTES)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
