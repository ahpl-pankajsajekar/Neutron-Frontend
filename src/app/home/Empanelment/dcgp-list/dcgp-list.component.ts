import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dcgp-list',
  templateUrl: './dcgp-list.component.html',
  styleUrls: ['./dcgp-list.component.scss']
})
export class DcgpListComponent {
  form: any = FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      dcName: ['', Validators.required],
      pan: ['', ],
      aadhar: ['', ],
      client: ['', ],
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