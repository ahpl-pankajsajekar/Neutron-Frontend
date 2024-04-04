import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { error } from 'jquery';
import { first } from 'rxjs';
import { CommonService } from 'src/app/_services/common.service';

@Component({
  selector: 'app-dc-registration',
  templateUrl: './dc-registration.component.html',
  styleUrls: ['./dc-registration.component.scss'],
})
export class DcRegistrationComponent {

  providerType = [
    {value: 'Non Empanelment', viewValue: 'Non Empanelment'},
    {value: 'Dental Empanelment', viewValue: 'Dental Empanelment'},
    {value: 'Optics Empanelment', viewValue: 'Optics Empanelment'},
  ];

  firstFormGroup = this._formBuilder.group({
    providerName: ['', Validators.required],
    providerType: ['', Validators.required],
    dcChainStandalone: ['', Validators.required],
    instationOutstation: ['', Validators.required],
    registrationNumber: ['', Validators.required],
    dateOfInception: ['', Validators.required],
    ownersName: ['', Validators.required],
    panNumber: ['', Validators.required],
    nameOnPanCard: ['', Validators.required],
    grade: ['', Validators.required],
    tier: ['', Validators.required],
    accreditation: ['', Validators.required],
    accreditationIssueDate: ['', Validators.required],
    accreditationExpiryDate: ['', Validators.required],
    aadharCardNumber: ['', Validators.required],
    aadharName: ['', Validators.required],
    mysteryShopping: ['', Validators.required],
    msDate: ['', Validators.required],
    audit: ['', Validators.required],
    auditType: ['', Validators.required],
    auditDate: ['', Validators.required],
    ndcStatus: ['', Validators.required],
    dateTillNDC: ['', Validators.required],
    ownerNameAsPerOwnershipDocument: ['', Validators.required],
    centerNameAsPerOwnershipDocument: ['', Validators.required],
  });
  selectedOption: string = 'No';
  secondFormGroup = this._formBuilder.group({
    address1: ['', Validators.required],
    address2: ['', ],
    ahplLocation: ['', Validators.required],
    lcLocation: ['', Validators.required],
    state: ['', Validators.required],
    city: ['', Validators.required],
    pincode: ['', Validators.required],
    area: ['', Validators.required],
    landMark: ['', Validators.required],
    zone: ['', Validators.required],
    ownerContactNumeber: ['', Validators.required],
    contactPersonName1: ['', Validators.required],
    mobileNumber: ['', Validators.required],
    landlineNumber: ['',],
    contactPersonName2: ['',],
    altMobileNumber: ['', ],
    altLandlineNumber: ['',],
    emailId: ['', Validators.required],
    emailId2: ['',],
    fax: ['', ],
  });
  thirdFormGroup = this._formBuilder.group({
    accountNumber: ['', Validators.required],
    accountName: ['', Validators.required],
    bankName: ['', Validators.required],
    ifscCode: ['', Validators.required],
    branchName: ['', Validators.required],
    accountType: ['', Validators.required],
    paymentToBeMadeInFavorOf: ['', Validators.required],
    paymentMode : ['', Validators.required],
    emailIDForSettlementVoucher : ['', Validators.required],
  });
  fourthFormGroup = this._formBuilder.group({
  });
  fifthFormGroup = this._formBuilder.group({
  });
  sexthFormGroup = this._formBuilder.group({
  });
  seventhFormGroup = this._formBuilder.group({
  });
  eighthFormGroup = this._formBuilder.group({
  });
  ninethFormGroup = this._formBuilder.group({
  });

  firstFormSubmit(){
    console.log(this.firstFormGroup.value)
  }
  secondFormSubmit(){
    console.log(this.secondFormGroup.value)
  }
  thirdFormSubmit(){
    console.log(this.thirdFormGroup.value)
  }
  fourthFormSubmit(){
    console.log(this.fourthFormGroup.value)
  }
  fifthFormSubmit(){
    console.log(this.fifthFormGroup.value)
  }
  sexthFormSubmit(){
    console.log(this.sexthFormGroup.value)
  }
  seventhFormSubmit(){
    console.log(this.seventhFormGroup.value)
  }
  eighthFormSubmit(){
    console.log(this.eighthFormGroup.value)
  }
  ninethFormSubmit(){
    console.log(this.ninethFormGroup.value)
  }
  isLinear = false;

  constructor(private _formBuilder: FormBuilder,
    private commonService: CommonService) {}

  formGroupNested = this._formBuilder.group({
    dc_detail : this.firstFormGroup,
    contact_detail : this.secondFormGroup,
    bank_detail : this.thirdFormGroup
    })
  
  formGroupNestedSubmit(){
    // const wholeFormData = this.formGroupNested
    const wholeFormData = [this.firstFormGroup.value, this.secondFormGroup.value, this.thirdFormGroup.value] 
    console.log(wholeFormData)
    // if (this.firstFormGroup.invalid) {
    //   return;
    // }
    const url = '/empanelment/add'
    this.commonService.postMethod(url, wholeFormData ).pipe(first()).subscribe(
      {
        next: ()=>{
          console.log('save Data');
        },
        error: ()=>{
          console.log(error)
        }
      }
    )
  }

}
