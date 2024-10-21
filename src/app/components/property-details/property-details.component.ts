import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ContractDataService } from '../../services/contract-data.service';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss'],
})
export class PropertyDetailsComponent implements OnInit {
  propertyForm: FormGroup;
  properties: any[] = [];
  owners: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private contractDataService: ContractDataService
  ) {
    this.propertyForm = this.fb.group({
      selectedProperty: [''],
      owners: this.fb.array([])
    });
  }

  ngOnInit() {
    this.loadProperties();
    this.loadOwners();
  }

  get ownersFormArray() {
    return this.propertyForm.get('owners') as FormArray;
  }

  async loadProperties() {
    // Replace with actual API call
    this.properties = [
      { PropertyID: '1', PropertyHeadline: 'Seaside Villa', NombreVia: 'Beach Road', NumeroVivienda: '42' },
      { PropertyID: '2', PropertyHeadline: 'Mountain Chalet', NombreVia: 'Alpine Way', NumeroVivienda: '15' },
    ];
  }

  async loadOwners() {
    // Replace with actual API call
    this.owners = [
      { OwnerCode: 'OWN001', firstname: 'John', sirname: 'Doe' },
      { OwnerCode: 'OWN002', firstname: 'Jane', sirname: 'Smith' },
    ];
  }

  onPropertyChange() {
    const selectedPropertyId = this.propertyForm.get('selectedProperty')?.value;
    if (selectedPropertyId) {
      this.loadOwnerProperties(selectedPropertyId);
    }
  }

  async loadOwnerProperties(propertyId: string) {
    console.log('Loading owner properties for property ID:', propertyId);
    // Replace with actual API call
    const ownerProperties = [
      { owcode: 'OWN001', PropertyID: '1', rentals: 60, expenses: 60 },
      { owcode: 'OWN002', PropertyID: '1', rentals: 40, expenses: 40 },
    ];

    this.ownersFormArray.clear();
    ownerProperties.forEach(op => {
      this.ownersFormArray.push(this.fb.group({
        OwnerCode: op.owcode,
        rentalParticipation: op.rentals,
        expenseParticipation: op.expenses
      }));
    });
  }

  onSubmit() {
    if (this.propertyForm.valid) {
      const selectedProperty = this.properties.find(p => p.PropertyID === this.propertyForm.get('selectedProperty')?.value);
      const propertyDetails = {
        PropertyID: selectedProperty.PropertyID,
        address: `${selectedProperty.NombreVia} ${selectedProperty.NumeroVivienda}`,
        owners: this.propertyForm.get('owners')?.value
      };
      this.contractDataService.updatePropertyDetails(propertyDetails);
      this.router.navigate(['/service-selection']);
    }
  }
}