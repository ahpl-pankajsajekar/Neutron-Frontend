import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'; // Import FormBuilder and FormGroup

@Component({
  selector: 'app-dcgp-list',
  templateUrl: './dcgp-list.component.html',
  styleUrls: ['./dcgp-list.component.scss']
})
export class DcgpListComponent implements OnInit {
  form: FormGroup = new FormGroup({}); // Declare form as FormGroup
  providerNames: string[] = []; // Initialize providerNames as an empty array
  providerIDs: string[] = []; // Initialize providerIDs as an empty array
  isLinear = true; // Initialize isLinear property

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    // Initialize providerNames and providerIDs arrays if needed
  }

  initForm(): void {
    this.form = this.fb.group({
      Name: [''], // Initialize form controls with default values if needed
      ID: ['']
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
      // Perform form submission actions here
    } else {
      // Handle form validation errors
    }
  }
}
