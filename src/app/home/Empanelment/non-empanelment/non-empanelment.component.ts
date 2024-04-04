import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-non-empanelment',
  templateUrl: './non-empanelment.component.html',
  styleUrls: ['./non-empanelment.component.scss']
})
export class NonEmpanelmentComponent {

  providerType = [
    {value: 'Non Empanelment', viewValue: 'Non Empanelment'},
    {value: 'Dental Empanelment', viewValue: 'Dental Empanelment'},
    {value: 'Optics Empanelment', viewValue: 'Optics Empanelment'},
  ];
  
  firstFormGroup = this._formBuilder.group({
    providerName: ['', Validators.required],
    providerType: ['', Validators.required],
    panNumber: ['', Validators.required],
    nameOnPanCard: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    address1: ['', Validators.required],
    address2: ['', Validators.required],
    ahplLocation: ['', Validators.required],
    lcLocation: ['', Validators.required],
    state: ['', Validators.required],
    city: ['', Validators.required],
    pincode: ['', Validators.required],
    zone: ['', Validators.required],
    contactPersonName1: ['', Validators.required],
    mobileNumber: ['', Validators.required],
    contactPersonName2: ['', ],
    altMobileNumber: ['', ],
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
  });
  fourthFormGroup = this._formBuilder.group({
  });
  isLinear = false;

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

  constructor(private _formBuilder: FormBuilder) {}



}
