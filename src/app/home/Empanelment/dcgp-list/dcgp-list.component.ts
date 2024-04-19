import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/_services/common.service';

@Component({
  selector: 'app-dcgp-list',
  templateUrl: './dcgp-list.component.html',
  styleUrls: ['./dcgp-list.component.scss']
})
export class DcgpListComponent {
  form: any = FormGroup;
  formData: FormData = new FormData();

  PanImageFile: any;

  constructor(
    private fb: FormBuilder, 
    private commonService: CommonService,
  ) { }

  ngOnInit() {
    this.initForm();
    this.loadData()
  }

  initForm() {
    this.form = this.fb.group({
      dcName: ['', Validators.required],
      pan_image: [this.PanImageFile],
      aadhar_number: ['', ],
      pan_number: ['', ],
      client: ['', ],
    });
  }

  onSubmit() {
    console.log('Form submitted:');
    this.formData.append('dcName', this.form.value.dcName)
    // this.formData.append('pan_image', this.form.value.pan_image)
    if (this.PanImageFile) {
      this.formData.append('pan_image', this.PanImageFile);
    }
    this.formData.append('pan_number', this.form.value.pan_number)
    this.formData.append('aadhar_number', this.form.value.aadhar_number)
    this.formData.append('client', this.form.value.client)
    if (this.form.valid) {
      // Process form submission
      console.log('Form submitted:', this.form.value);
      const url = "/selfemp/add/" 
      this.commonService.postMethod(url, this.formData).subscribe(
        (res: any) => {
          console.log("res", res)
        },
        (err: any) => {
          console.warn(err)
        })
    }
  }

  employementData : any;
  loadData(){
    const url = "/selfempanelments" 
      this.commonService.getMethod(url).subscribe(
        (res: any) => {
          console.log("res", res)
          this.employementData = res.data
        },
        (err: any) => {
          console.warn(err)
        })
  }
}