import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/_services/common.service';

@Component({
  selector: 'app-dcgp-list',
  templateUrl: './dcgp-list.component.html',
  styleUrls: ['./dcgp-list.component.scss']
})
export class DcgpListComponent implements OnInit {
  form: FormGroup;
  providerNames: string[] = [];
  providerIDs: string[] = [];
  isLinear = false;

  constructor(private formBuilder: FormBuilder, private commonService: CommonService) { }

  ngOnInit(): void {
    this.initForm();
    this.commonService.getProviderNames().subscribe((names: string[]) => {
      this.providerNames = names;
    });
    this.commonService.getProviderIDs().subscribe((ids: string[]) => {
      this.providerIDs = ids;
    });
  }

  onDCSelected() {
    // Retrieve the selected DC from the form control
    const selectedName = this.form.get('Name').value;
    const selectedID = this.form.get('ID').value;
    console.log('Selected Provider Name:', selectedName);
    console.log('Selected Provider ID:', selectedID);
  }

  initForm() {
    this.form = this.formBuilder.group({
      Name: ['', Validators.required],
      ID: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log('Form submitted:', this.form.value);
    if (this.form.valid) {
      // Process form submission
      console.log('Form submitted:', this.form.value);
    }
  }
}
