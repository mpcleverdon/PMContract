import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractDataService {
  private contractData = new BehaviorSubject<any>({
    company: {},
    property: {},
    services: [],
    pricing: {},
    customParagraphs: {}
  });

  constructor() { }

  updateCompanyDetails(companyDetails: any) {
    const currentData = this.contractData.value;
    this.contractData.next({ ...currentData, company: companyDetails });
  }

  updatePropertyDetails(propertyDetails: any) {
    const currentData = this.contractData.value;
    this.contractData.next({ ...currentData, property: propertyDetails });
  }

  updateServices(services: string[]) {
    const currentData = this.contractData.value;
    this.contractData.next({ ...currentData, services });
  }

  updatePricing(pricing: any) {
    const currentData = this.contractData.value;
    this.contractData.next({ ...currentData, pricing });
  }

  updateCustomParagraphs(customParagraphs: any) {
    const currentData = this.contractData.value;
    this.contractData.next({ ...currentData, customParagraphs });
  }

  getContractData() {
    return this.contractData.asObservable();
  }
}