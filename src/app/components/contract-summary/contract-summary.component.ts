import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContractDataService } from '../../services/contract-data.service';

@Component({
  selector: 'app-contract-summary',
  templateUrl: './contract-summary.component.html',
  styleUrls: ['./contract-summary.component.scss'],
})
export class ContractSummaryComponent implements OnInit {
  contractData: any;

  constructor(
    private router: Router,
    private contractDataService: ContractDataService
  ) {}

  ngOnInit() {
    this.contractDataService.getContractData().subscribe(data => {
      this.contractData = data;
    });
  }

  onEdit() {
    this.router.navigate(['/company-details']);
  }
}