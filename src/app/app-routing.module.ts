import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'company-details', pathMatch: 'full' },
  { path: 'company-details', loadComponent: () => import('./components/company-details/company-details.component').then(m => m.CompanyDetailsComponent) },
  { path: 'property-details', loadComponent: () => import('./components/property-details/property-details.component').then(m => m.PropertyDetailsComponent) },
  { path: 'service-selection', loadComponent: () => import('./components/service-selection/service-selection.component').then(m => m.ServiceSelectionComponent) },
  { path: 'seasonal-pricing', loadComponent: () => import('./components/seasonal-pricing/seasonal-pricing.component').then(m => m.SeasonalPricingComponent) },
  { path: 'contract-summary', loadComponent: () => import('./components/contract-summary/contract-summary.component').then(m => m.ContractSummaryComponent) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }