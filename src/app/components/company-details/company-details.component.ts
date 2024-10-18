import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ContractDataService } from '../../services/contract-data.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class CompanyDetailsComponent {
  companyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private contractDataService: ContractDataService
  ) {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      representatives: this.fb.array([this.createRepresentativeFormGroup()])
    });
  }

  get representatives() {
    return this.companyForm.get('representatives') as FormArray;
  }

  createRepresentativeFormGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      position: ['', Validators.required]
    });
  }

  addRepresentative() {
    this.representatives.push(this.createRepresentativeFormGroup());
  }

  removeRepresentative(index: number) {
    this.representatives.removeAt(index);
  }

  onSubmit() {
    if (this.companyForm.valid) {
      this.contractDataService.updateCompanyDetails(this.companyForm.value);
      this.router.navigate(['/property-details']);
    }
  }
}