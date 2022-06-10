import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { WeatherPageModule } from './pages/weather/weather-page.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DEFINED_ROUTES } from './routes';
import { EntryModule } from './pages/entry/entry.module';
import { NavigationModule } from '@cntws/layout';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(DEFINED_ROUTES),
    WeatherPageModule,
    EntryModule,
    BrowserAnimationsModule,
    NavigationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
