import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { NavigationModule } from '@cntws/layout';
import { EntryComponent } from './pages/entry/entry.component';
import { DEFINED_ROUTES } from './routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {WeatherModule} from "@cntws/weather";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {WeatherPageModule} from "./pages/weather/weather-page.module";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../environments/environment";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NavigationModule,
    EntryComponent,
    WeatherModule,
    WeatherPageModule,
    RouterModule.forRoot(DEFINED_ROUTES),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
