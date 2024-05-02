import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/_services/common.service';
import { routes } from 'src/app/app-routing.module';

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

  showAnalytics:any;

  constructor(private fb: FormBuilder,
    private commonService: CommonService,
    private router: Router
  ) { 
  }

  ngOnInit(): void {
    this.initForm();
    this.loadData();
  }

  isPanVerify: boolean = false;
  isAadharVerify: boolean = false;
  isAccredationVerify: boolean = false;
  isTDSVerify: boolean = false;
  initForm(): void {
    this.form = this.fb.group({
      id: ['', Validators.required], 
      isPanVerify: [this.isPanVerify], 
      isAadharVerify: [this.isAadharVerify], 
      isAccredationVerify: [this.isAccredationVerify], 
      isTDSVerify: [this.isTDSVerify], 
    });
  }

  selfemployementData : any;
  onSearch(): void {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
      const url = "/empanelment/details/legal/" 
      this.commonService.postMethod(url, {"id": this.form.get('id')?.value}).subscribe(
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

  remark: string = '';
  verification(value:string){
    const url = '/selfemp/verification/legal/'
    const body = {"DCVerificationStatusByLegal": value, "id": this.form.get('id')?.value,  "verificationRemark": this.remark,
     "isPanVerify":  this.isPanVerify, "isAadharVerify": this.isAadharVerify, "isAccredationVerify": this.isAccredationVerify,
     "isTDSVerify": this.isTDSVerify }
    console.log(body)
    this.commonService.postMethod(url, body).subscribe(
      (res:any)=>{
        console.log(res);
        alert("Thank you, Your DC verified successful");
        this.router.navigateByUrl("/empanelment/dc-docusign")
      },
      (error:any)=>{},
    )
  }

  loadData(){
    const url = '/selfemp/select/legal/';
    this.commonService.getMethod(url).subscribe(
      (res: any) => {
        console.log(res);
        // Iterate over the records
        this.providerNames = res.selectDropdown
        this.showAnalytics = res.networkAnalyticsData
        // this.providerNames = res.map((item: any) => ({
        //   itemValue: item.id,
        //   itemName: `${item.providerName}`,
        // }));
        console.log(this.providerNames);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  

}
