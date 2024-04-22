import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/_services/common.service';

@Component({
  selector: 'app-dc-verify',
  templateUrl: './dc-verify.component.html',
  styleUrls: ['./dc-verify.component.scss']
})
export class DcVerifyComponent {
  form: FormGroup = new FormGroup({}); // Declare form as FormGroup
  providerNames: any[] = []; // Initialize providerNames as an empty array
  providerIDs: any[] = []; // Initialize providerIDs as an empty array
  isLinear = true; // Initialize isLinear property


  constructor(private fb: FormBuilder,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadData();
  }

  initForm(): void {
    this.form = this.fb.group({
      providerName: ['', Validators.required], 
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

  loadData(){
    const url = '/selfempanelments/'
    this.commonService.getMethod(url).subscribe(
      (res:any)=>{
        console.log(res);
        // Iterate over the records
        this.providerNames = res.data
          .filter((item: { providerName: any }) => item.providerName !== undefined) // Filter out records with undefined providerName
          .map((item: { providerName: any }) => ({
            itemValue: item.providerName,
            itemName: `${item.providerName}`
          }));

        console.log(this.providerNames)
      },
      (error:any)=>{},
    )
  }

}
