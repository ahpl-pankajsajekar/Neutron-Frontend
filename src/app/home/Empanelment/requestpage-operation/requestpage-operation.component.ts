import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-requestpage-operation',
  templateUrl: './requestpage-operation.component.html',
  styleUrls: ['./requestpage-operation.component.scss']
})
export class RequestpageOperationComponent {

  addProviderForm: FormGroup;
  delistProviderForm: FormGroup;
  activateProviderForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addProviderForm = this.fb.group({
      rows: this.fb.array([this.createAddProviderRow()])
    });

    this.delistProviderForm = this.fb.group({
      rows: this.fb.array([this.createDelistProviderRow()])
    });

    this.activateProviderForm = this.fb.group({
      rows: this.fb.array([this.createActivateProviderRow()])
    });
  }

  // Add Provider Form
  get addProviderRows(): FormArray {
    return this.addProviderForm.get('rows') as FormArray;
  }

  createAddProviderRow(): FormGroup {
    return this.fb.group({
      zone: ['', Validators.required],
      pinCode: ['', Validators.required],
      remarks: ['']
    });
  }

  // Delist Provider Form
  get delistProviderRows(): FormArray {
    return this.delistProviderForm.get('rows') as FormArray;
  }

  createDelistProviderRow(): FormGroup {
    return this.fb.group({
      providerId: ['', Validators.required],
      providerName: ['', Validators.required],
      pinCode: ['', Validators.required]
    });
  }

  // Activate Provider Form
  get activateProviderRows(): FormArray {
    return this.activateProviderForm.get('rows') as FormArray;
  }

  createActivateProviderRow(): FormGroup {
    return this.fb.group({
      providerId: ['', Validators.required],
      providerName: ['', Validators.required],
      pinCode: ['', Validators.required]
    });
  }

  addNewRow(section: string): void {
    switch (section) {
      case 'add':
        this.addProviderRows.push(this.createAddProviderRow());
        break;
      case 'delist':
        this.delistProviderRows.push(this.createDelistProviderRow());
        break;
      case 'activate':
        this.activateProviderRows.push(this.createActivateProviderRow());
        break;
      default:
        break;
    }
  }

  removeRow(section: string, index: number): void {
    switch (section) {
      case 'add':
        this.addProviderRows.removeAt(index);
        break;
      case 'delist':
        this.delistProviderRows.removeAt(index);
        break;
      case 'activate':
        this.activateProviderRows.removeAt(index);
        break;
      default:
        break;
    }
  }


  onSubmit(section: string): void {
    let form: FormGroup | null = null; // Initialize form variable
  
    // Assign value to form based on the section
    switch (section) {
      case 'add':
        form = this.addProviderForm;
        break;
      case 'delist':
        form = this.delistProviderForm;
        break;
      case 'activate':
        form = this.activateProviderForm;
        break;
      default:
        break;
    }
  
    // Check if form is not null and is valid
    if (form && form.valid) {
      // Perform submission or API call here
      console.log(form.value);
    } else {
      alert("Please fill out the details correctly.");
    }
  }
}
