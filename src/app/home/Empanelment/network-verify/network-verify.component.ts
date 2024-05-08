import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CommonService } from 'src/app/_services/common.service';

@Component({
  selector: 'app-network-verify',
  templateUrl: './network-verify.component.html',
  styleUrls: ['./network-verify.component.scss']
})
export class NetworkVerifyComponent {
  form: FormGroup = new FormGroup({}); // Declare form as FormGroup
  providerNames: any[] = []; // Initialize providerNames as an empty array
  providerIDs: any[] = []; // Initialize providerIDs as an empty array
  isLinear = true; // Initialize isLinear property

  showAnalytics:any

  constructor(private fb: FormBuilder,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadData();
  }

  isPanVerify: boolean = false;
  isAadharVerify: boolean = false;
  isAccredationVerify: boolean = false;
  isTDSVerify: boolean = false;
  isRegistrationVerify :boolean =false;
  panVerified: boolean = false;
  panVerification2: boolean = false;
  accreditationVerified: boolean = false;
  tdsVerified: boolean = false;
  ownershipVerified: boolean = false;
  registrationVerified: boolean = false;
  initForm(): void {
    this.form = this.fb.group({
      id: ['', Validators.required], 
      isPanVerify: [this.isPanVerify, Validators.required], 
      isAadharVerify: [this.isAadharVerify, Validators.required], 
      isAccredationVerify: [this.isAccredationVerify, Validators.required], 
      isTDSVerify: [this.isTDSVerify, Validators.required], 
      isRegistrationVerify:[this.isRegistrationVerify, Validators.required],
    });
  }
  
  selfemployementData : any;
  onSearch(): void {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
      const id = this.form.get('id')?.value
      this.sendRequestForSearch(id)
    } 
    else {
      alert("Please Select DC.");
    }
  }

  sendRequestForSearch(id:string){
    const url = "/empanelment/" 
      this.commonService.postMethod(url, {"id": id}).subscribe(
        (res: any) => {
          console.log("res", res)
          this.selfemployementData = res.data
        },
        (err: any) => {
          console.warn(err)
        })
  }

  onVerificationChange(verificationType: string, event: any): void {
    let isVerified = event.target.value === 'verify';
    switch (verificationType) {
      case 'pan':
        this.panVerified = isVerified;
        break;
      case 'aadhar':
        this.panVerification2 = isVerified;
        break;
      case 'accreditation':
        this.accreditationVerified = isVerified;
        break;
      case 'tds':
        this.tdsVerified = isVerified;
        break;
      case 'ownership':
        this.ownershipVerified = isVerified;
        break;
      case 'registration':
        this.registrationVerified = isVerified;
        break;
    }
    if (!isVerified) {
      console.log("inside")
      this.updateRemark();
    } else {
      this.remark = ''; // Reset remark if verification passed
    }
  }
  
  updateRemark(): void {
    let unverifiedFields: string[] = [];
    if (!this.panVerified) {
      unverifiedFields.push('PAN');
    }
    if (!this.panVerification2) {
      unverifiedFields.push('Aadhar');
    }
    if (!this.accreditationVerified) {
      unverifiedFields.push('Accreditation');
    }
    if (!this.tdsVerified) {
      unverifiedFields.push('TDS');
    }
    if (!this.ownershipVerified) {
      unverifiedFields.push('Ownership');
    }
    if (!this.registrationVerified) {
      unverifiedFields.push('Registration');
    }
  
    this.remark = `Verification failed for ${unverifiedFields.join(', ')}.`;
  }
  

  areAllCheckboxesVerified(): boolean {
    return (
      this.panVerified &&
      this.panVerification2 &&
      this.accreditationVerified &&
      this.tdsVerified &&
      this.ownershipVerified &&
      this.registrationVerified
    );
  }

  unverifiedCheckboxValue: string = 'not-verify'; // Default value

  remark: string = 'not-verify';
  
  verification(value:string){
    const url = '/selfemp/verification/'
    const body = {"DCVerificationStatus": value, "id": this.form.get('id')?.value,  "verificationRemark": this.remark,
     "isPanVerify":  this.isPanVerify, "isAadharVerify": this.isAadharVerify, "isAccredationVerify": this.isAccredationVerify,
     "isTDSVerify": this.isTDSVerify ,"isRegistrationVerify": this.isRegistrationVerify}
    console.log(body)
    this.commonService.postMethod(url, body).subscribe(
      (res:any)=>{
        console.log(res);
        alert("Document verified by Network Team")
        window.location.reload();
      },
      (error:any)=>{},
    )
  }

  loadData(){
    const url = '/selfemp/select/';
    this.commonService.getMethod(url).subscribe(
      (res: any) => {
        console.log(res);
        // Iterate over the records
        this.showAnalytics = res.networkAnalyticsData
        this.providerNames = res.selectDropdown
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

  
  showDetails: number | null = null;
  toggleDetails(boxNumber: number) {
    if (this.showDetails === boxNumber) {
      this.showDetails = null; // Hide details if already open
    } else {
      this.showDetails = boxNumber; // Show details for the clicked box
    }
  }

  

  // multi select dropdown
  selectedItems:any =[];
  dropdownList:any = [
  ]
  dropdownSettings:IDropdownSettings = {
    singleSelection: true,
    defaultOpen: false,
    idField: "id",
    textField: "providerName" ,
    // selectAllText: "Select All",
    // unSelectAllText: "UnSelect All",
    enableCheckAll: false,
    itemsShowLimit: 1,
    allowSearchFilter: true,
    // limitSelection: 2,
    noDataAvailablePlaceholderText: "Data not found."
  };

  onSubmit(): void {
    // Placeholder method for form submission logic
    console.log("Form submitted!");
  }

}

