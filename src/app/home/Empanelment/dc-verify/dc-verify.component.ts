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
      id: ['', Validators.required], 
    });
  }

  selfemployementData : any;
  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
      const url = "/empanelment/" 
      this.commonService.postMethod(url, this.form.value).subscribe(
        (res: any) => {
          console.log("res", res)
          this.selfemployementData = res.data
        },
        (err: any) => {
          console.warn(err)
        })


    } else {
      // Handle form validation errors
    }
  }

  verification(value:string){
    const url = '/selfemp/verification/'
    const body = {"DCVerificationStatus": value, "id": this.form.get('id')?.value}
    console.log(body)
    this.commonService.postMethod(url, body).subscribe(
      (res:any)=>{
        console.log(res);
      },
      (error:any)=>{},
    )
  }

  loadData(){
    const url = '/selfemp/select/'
    this.commonService.getMethod(url).subscribe(
      (res:any)=>{
        console.log(res);
        // Iterate over the records
        this.providerNames = res
  // .filter((item: { id: any, providerName: any }) => item.providerName !== undefined) // Filter out records with undefined providerName
  // .map((item: { id: any, providerName: any }) => ({
  //   itemValue: item.id,
  //   itemName: `${item.providerName}`
  // }));
        console.log(this.providerNames)
      },
      (error:any)=>{},
    )
  }

}
