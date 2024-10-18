import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContractDataService } from '../../services/contract-data.service';

@Component({
  selector: 'app-seasonal-pricing',
  templateUrl: './seasonal-pricing.component.html',
  styleUrls: ['./seasonal-pricing.component.scss'],
})
export class SeasonalPricingComponent implements OnInit {
  pricingForm: FormGroup;
  predefinedSeasons: any[] = [];
  selectedChart: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private contractDataService: ContractDataService
  ) {
    this.pricingForm = this.fb.group({
      currency: ['GBP', Validators.required],
      chartName: [''],
      seasons: this.fb.array([])
    });
  }

  ngOnInit() {
    this.loadPredefinedSeasons();
  }

  get seasons() {
    return this.pricingForm.get('seasons') as FormArray;
  }

  async loadPredefinedSeasons() {
    // Replace with actual API call
    this.predefinedSeasons = [
      { id: 1, ChartName: 'Default 2023', Level: 1, DateStart: '2023-01-01', DateEnd: '2023-03-31', Description: 'Low Season' },
      { id: 2, ChartName: 'Default 2023', Level: 2, DateStart: '2023-04-01', DateEnd: '2023-06-30', Description: 'Mid Season' },
      { id: 3, ChartName: 'Default 2023', Level: 3, DateStart: '2023-07-01', DateEnd: '2023-08-31', Description: 'High Season' },
      { id: 4, ChartName: 'Default 2023', Level: 2, DateStart: '2023-09-01', DateEnd: '2023-12-31', Description: 'Mid Season' },
    ];

    const chartNames = [...new Set(this.predefinedSeasons.map(season => season.ChartName))];
    if (chartNames.length > 0) {
      this.selectedChart = chartNames[0];
      this.handleChartSelection(this.selectedChart);
    }
  }

  handleChartSelection(chartName: string) {
    this.selectedChart = chartName;
    this.pricingForm.patchValue({ chartName });
    
    const selectedSeasons = this.predefinedSeasons
      .filter(season => season.ChartName === chartName)
      .map(season => this.fb.group({
        id: season.id,
        name: season.Description,
        startDate: season.DateStart,
        endDate: season.DateEnd,
        nightlyRate: ['', [Validators.required, Validators.min(0)]],
        weeklyRate: ['', [Validators.required, Validators.min(0)]]
      }));

    this.pricingForm.setControl('seasons', this.fb.array(selectedSeasons));
  }

  addCustomSeason() {
    const newId = Math.max(...this.seasons.value.map((s: any) => s.id), 0) + 1;
    this.seasons.push(this.fb.group({
      id: newId,
      name: ['Custom Season', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      nightlyRate: ['', [Validators.required, Validators.min(0)]],
      weeklyRate: ['', [Validators.required, Validators.min(0)]]
    }));
  }

  removeSeason(index: number) {
    this.seasons.removeAt(index);
  }

  calculateWeeklyRate(nightlyRate: number): number {
    return parseFloat((nightlyRate * 7).toFixed(2));
  }

  updateWeeklyRate(index: number) {
    const seasonGroup = this.seasons.at(index) as FormGroup;
    const nightlyRate = seasonGroup.get('nightlyRate')?.value;
    if (nightlyRate) {
      seasonGroup.patchValue({ weeklyRate: this.calculateWeeklyRate(nightlyRate) });
    }
  }

  onSubmit() {
    if (this.pricingForm.valid) {
      this.contractDataService.updatePricing(this.pricingForm.value);
      this.router.navigate(['/contract-summary']);
    }
  }

  onPrevious() {
    this.router.navigate(['/service-selection']);
  }
}