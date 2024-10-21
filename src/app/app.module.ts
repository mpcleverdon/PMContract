import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UniqueChartNamesPipe } from './pipes/unique-chart-names.pipe'; // Import the pipe

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';
import { ServiceSelectionComponent } from './components/service-selection/service-selection.component';
import { SeasonalPricingComponent } from './components/seasonal-pricing/seasonal-pricing.component';
import { ContractSummaryComponent } from './components/contract-summary/contract-summary.component';
import { BilingualDisplayComponent } from './components/bilingual-display/bilingual-display.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    UniqueChartNamesPipe, // Declare the pipe
    PropertyDetailsComponent,
    ServiceSelectionComponent,
    SeasonalPricingComponent,
    ContractSummaryComponent,
    BilingualDisplayComponent
  ],
  imports: [
    CompanyDetailsComponent,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}