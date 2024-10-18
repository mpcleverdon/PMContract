import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContractDataService } from '../../services/contract-data.service';

@Component({
  selector: 'app-service-selection',
  templateUrl: './service-selection.component.html',
  styleUrls: ['./service-selection.component.scss'],
})
export class ServiceSelectionComponent implements OnInit {
  availableServices = [
    { id: 'maintenance', name: 'Maintenance' },
    { id: 'cleaning', name: 'Cleaning' },
    { id: 'gardening', name: 'Gardening' },
    { id: 'poolCleaning', name: 'Pool Cleaning' },
  ];

  selectedServices: string[] = [];

  constructor(
    private router: Router,
    private contractDataService: ContractDataService
  ) {}

  ngOnInit() {}

  toggleService(serviceId: string) {
    const index = this.selectedServices.indexOf(serviceId);
    if (index > -1) {
      this.selectedServices.splice(index, 1);
    } else {
      this.selectedServices.push(serviceId);
    }
  }

  onSubmit() {
    this.contractDataService.updateServices(this.selectedServices);
    this.router.navigate(['/seasonal-pricing']);
  }

  onPrevious() {
    this.router.navigate(['/property-details']);
  }
}