import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';
import { ServiceSelectionComponent } from './components/service-selection/service-selection.component';
import { SeasonalPricingComponent } from './components/seasonal-pricing/seasonal-pricing.component';
import { ContractSummaryComponent } from './components/contract-summary/contract-summary.component';
import { BilingualDisplayComponent } from './components/bilingual-display/bilingual-display.component';

@NgModule({
  declarations: [
    AppComponent,
    CompanyDetailsComponent,
    PropertyDetailsComponent,
    ServiceSelectionComponent,
    SeasonalPricingComponent,
    ContractSummaryComponent,
    BilingualDisplayComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}