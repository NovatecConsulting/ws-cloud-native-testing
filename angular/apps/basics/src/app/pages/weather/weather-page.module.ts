import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherPageComponent } from './weather-page.component';
import { WeatherService } from './service/weather.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { WeatherIntroductionComponent } from './paragraphs/introduction/weather-introduction.component';
import { WeatherExplanationComponent } from './paragraphs/explanation/weather-explanation.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { WeatherModule } from '@cntws/weather';

@NgModule({
  declarations: [WeatherPageComponent, WeatherIntroductionComponent, WeatherExplanationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    WeatherModule,
  ],
  providers: [WeatherService],
})
export class WeatherPageModule {}
