import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/_services/common.service';

@Component({
  selector: 'app-self-empanlement',
  templateUrl: './self-empanlement.component.html',
  styleUrls: ['./self-empanlement.component.scss']
})
export class SelfEmpanlementComponent {
    documents: File[] = [];
  
    ticketId: any = null;
    constructor(
      private _formBuilder: FormBuilder,
      private commonService: CommonService,
      private activatedRoute: ActivatedRoute
    ) {
      this.ticketId = this.activatedRoute.snapshot.queryParamMap.get('id');
    }
  
    onFileSelect(event: Event, index: number) {
      const inputElement = event.target as HTMLInputElement;
      const fileList: FileList | null = inputElement.files;
      if (fileList && fileList.length > 0) {
        const file = fileList[0]; // Get the selected file
        // Update the 'documents' array with the selected file
        this.documents[index] = file;
      }
    }
  
    addDocument() {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.name = 'documents';
      fileInput.addEventListener('change', (event) =>
        this.onFileSelect(event, this.documents.length)
      );
      fileInput.click();
    }
  
    providerType = [
      { value: 'Dignostics Center', viewValue: 'Dignostics Center' },
      { value: 'Dental Empanelment', viewValue: 'Dental Empanelment' },
      { value: 'Hospital', viewValue: 'Hospital' },
      { value: 'Optics Empanelment', viewValue: 'Optics Empanelment' },
      { value: 'Wellness', viewValue: 'Wellness' },
    ];
  
    DCchainType = [
      { value: 'Standalone', viewValue: 'Standalone' },
      { value: 'Chain', viewValue: 'Chain' },
    ];
  
    ACCREDITATIONType = [
      { value: 'ISO', viewValue: 'ISO' },
      { value: 'NABH', viewValue: 'NABH' },
      { value: 'NABL', viewValue: 'NABL' },
      { value: 'None', viewValue: 'None' },
      { value: 'Other', viewValue: 'Other' },
    ];
  
    // StationType = [
    //   { value: 'Instation', viewValue: 'Instation' },
    //   { value: 'Outstation', viewValue: 'Outstation' },
    // ];
  
    ACType = [
      { value: 'Saving', viewValue: 'Saving' },
      { value: 'Current ', viewValue: 'Current ' },
    ];
  
    TyreType = [
      { value: 'Tyre1', viewValue: 'Tyre1' },
      { value: 'Tyre2', viewValue: 'Tyre2' },
      { value: 'Tyre3', viewValue: 'Tyre3' },
      { value: 'Tyre4', viewValue: 'Tyre4' },
    ];
  
    // GradeType = [
    //   { value: 'A+', viewValue: 'A+' },
    //   { value: 'A', viewValue: 'A' },
    //   { value: 'B', viewValue: 'B' },
    //   { value: 'C', viewValue: 'C' },
    //   { value: 'D', viewValue: 'D' },
    // ];
  
    stateType = [
      { value: 'Assam', viewValue: 'Assam' },
      { value: 'Bihar', viewValue: 'Bihar' },
      { value: 'Panjab', viewValue: 'Panjab' },
      { value: 'Maharastra', viewValue: 'Maharastra' },
      { value: 'Delhi', viewValue: 'Delhi' },
      { value: 'Gujrat', viewValue: 'Gujrat' },
      { value: 'Madhya Pradesh', viewValue: 'Madhya Pradesh' },
      { value: 'Uttar Pradesh', viewValue: 'Uttar Pradesh' },
      { value: 'Hariyana', viewValue: 'Hariyana' },
      { value: 'Chhattisgarh', viewValue: 'Chhattisgarh' },
      { value: 'Mizoram', viewValue: 'Mizoram' },
      { value: 'Karnataka', viewValue: 'Karnataka' },
      { value: 'Arunachal Pradesh', viewValue: 'Arunachal Pradesh' },
      { value: 'Andhra Pradesh', viewValue: 'Andhra Pradesh' },
      { value: 'Kerala', viewValue: 'Kerala' },
    ];
  
    ZoneType = [
      { value: 'East', viewValue: 'East' },
      { value: 'West', viewValue: 'West' },
      { value: 'North', viewValue: 'North' },
      { value: 'South', viewValue: 'South' },
    ];
  
    DCFirmType = [  
      { value: 'Sole Proprietorship Firm', viewValue: 'Sole Proprietorship Firm' },
      { value: 'LLP/Partnership Firm', viewValue: 'LLP/Partnership Firm' },
      { value: 'Private Limited Company', viewValue: 'Private Limited Company' },
    ];
  
    isLinear = false;
  
    ngOnInit() {
      this.initForm();
    }
  
    initForm() {
      this.formgroup = this._formBuilder.group({
        providerName: ['', Validators.required],
        providerType: ['', ],
        DC_Chain: ['', ],
        Regi_number: ['', Validators.required],
        Inception: ['', ],
        Owner_name: ['', Validators.required],
        PanCard_number: ['', Validators.required],
        nameOnPanCard: ['', Validators.required],
        Adhar_number: ['', ],
        Adhar_name: ['', ],
        Center_name: ['', ],
        Accredation: ['', ],
        address1: ['', ],
        address2: ['', ],
        state: ['',],
        city: ['',],
        pincode: ['',],
        emailId: ['', [Validators.required, Validators.email ] ],
        confirmEmailId: ['', [Validators.required ]],
        emailId2: ['', []],
        Cantact_person1: ['',],
        Cantact_person2: ['',],
        fax: ['',],
        accountNumber: ['',],
        accountName: ['',],
        bankName: ['',],
        ifscCode: ['',],
        branchName: ['',],
        accountType: ['',],
        paymentToBeMadeInFavorOf: ['',],

        Opthlmologya: ['',],
        MBBS_PHYSICIAN: ['',],
        GYNECOLOGY: ['',],
        MD_PHYSICIAN: ['',],
        MD_PATHOLOGIST: ['',],
        MD_RADIOLOGIST: ['',],
        DMLT: ['',],
        MD_CARDIOLOGY: ['',],
        XRAY_TECHNICIAN: ['',],
        ECG_TECHNICIAN: ['',],
        BAMS_BHMS: ['',],
        ENT: ['',],
        DENTAL: ['',],
        DIET: ['',],
        ECG_FACILITY: ['',],
        USG: ['',],
        TREAD_MILL_TEST: ['',],
        TMT_WT_CAPACITY: ['',],
        ECHOCARDIOGRAPHY: ['',],
        FUNDOSCOPY_TEST: ['',],
        DMLT_LABORATORY_TECHNICIAN: ['',],
        BASIC_EYE_TEST: ['',],
        X_RAY: ['',],
        ELISA_HIV: ['',],
        PSA: ['',],
        PAP_SMEAR: ['',],
        MAMMOGRAM: ['',],
        WESTERN_BLOT: ['',],
        PULMONARY_FUNCTION_TEST: ['',],
        URINE_NICOTINE_QUALITITATIVE: ['',],
        HBA1C: ['',],
        HBEAG: ['',],
        AUDIOMETRY: ['',],
        GYNAECOLOGIST: ['',],
        MER: ['',],
        PATHOLOGY: ['',],
        FMR: ['',],
        STOOL_ROUTINE: ['',],
        CARDIOLOGY_OUTSOURCED_CENTRE: ['',],
        PATHOLOGY_OUTSOURCED_CENTR: ['',],
        GYNAECOLOGY_OUTSOURCED_CENTRE: ['',],
        DENTAL_OUTSOURCED_CENTRE: ['',],
        PULMONOLOGY_OUTSOURCED_CENTRE: ['',],
        RADIOLOGY_OUTSOURCED_CENTRE: ['',],
        pan_image: ['',],
        aadhar: [''],
        Accreditation: [''],
        Registration_Number: [''],
        Ownership: [''],
        TDS: [''],
        FirmType: ['', Validators.required],
      },
      {
        Validators : this.emailMatchValidator
      }
    );
    }
    
    get f() { return this.formgroup.controls; }

    // not working 
    emailMatchValidator(group: FormGroup) {
      const email = group.get('emailId')?.value;
      const confirmEmail = group.get('confirmEmailId')?.value;
      console.log(email, confirmEmail)
      return email === confirmEmail ? null : { emailMismatch: true };
    }
    // not working 
    emailMatcher(control: AbstractControl) {
      const email = control.get('emailId');
      const confirmEmail = control.get('confirmEmailId');
      console.log(email, confirmEmail)
      if (!email || !confirmEmail) {
        return null;
      }
      return email.value === confirmEmail.value ? null : { emailMismatch: true };
    }

  
    formData: FormData = new FormData();
  
    onPanImageSelected(event: any) {
      const file: File = event.target.files[0];
      if (file) {
        this.formData.append('pan_image', file);
      }
    }
    onAadharImageSelected(event: any) {
      const file: File = event.target.files[0];
      if (file) {
        this.formData.append('aadhar_image', file);
      }
    }
    onAccreditationImageSelected(event: any) {
      const file: File = event.target.files[0];
      if (file) {
        this.formData.append('Accreditation_image', file);
      }
    }
    onRegistrationNumberImageSelected(event: any) {
      const file: File = event.target.files[0];
      if (file) {
        this.formData.append('Registration_Number_image', file);
      }
    }
    onOwnershipImageSelected(event: any) {
      const file: File = event.target.files[0];
      if (file) {
        this.formData.append('Ownership_image', file);
      }
    }
    onTDSImageSelected(event: any) {
      const file: File = event.target.files[0];
      if (file) {
        this.formData.append('TDS_image', file);
      }
    }

    selectedCompanyFirmType: string | undefined;
  
    formgroup: any;
    onSubmit() {
      this.formData.append('TicketID', this.ticketId);
      this.formData.append('DCID', this.ticketId);
      this.formData.append('providerName', this.formgroup.value.providerName);
      this.formData.append('providerType', this.formgroup.value.providerType);
      this.formData.append('DC_Chain', this.formgroup.value.DC_Chain);
      this.formData.append('Regi_number', this.formgroup.value.Regi_number);
      this.formData.append('Inception', this.formgroup.value.Inception);
      this.formData.append('Owner_name', this.formgroup.value.Owner_name);
      this.formData.append('PanCard_number', this.formgroup.value.PanCard_number);
      this.formData.append('nameOnPanCard', this.formgroup.value.nameOnPanCard);
      this.formData.append('Adhar_number', this.formgroup.value.Adhar_number);
      this.formData.append('Adhar_name', this.formgroup.value.Adhar_name);
      this.formData.append('Center_name', this.formgroup.value.Center_name);
      // this.formData.append('Grade', this.formgroup.value.Grade);
      // this.formData.append('Tier', this.formgroup.value.Tier);
      this.formData.append('Accredation', this.formgroup.value.Accredation);
      // this.formData.append('Station', this.formgroup.value.Station);
      this.formData.append('address1', this.formgroup.value.address1);
      this.formData.append('address2', this.formgroup.value.address2);
      // this.formData.append('ahplLocation', this.formgroup.value.ahplLocation);
      // this.formData.append('lcLocation', this.formgroup.value.lcLocation);
      this.formData.append('state', this.formgroup.value.state);
      this.formData.append('city', this.formgroup.value.city);
      this.formData.append('pincode', this.formgroup.value.pincode);
      // this.formData.append('zone', this.formgroup.value.zone);
      this.formData.append('emailId', this.formgroup.value.emailId);
      this.formData.append('emailId2', this.formgroup.value.emailId2);
      this.formData.append(
        'Cantact_person1',
        this.formgroup.value.Cantact_person1
      );
      this.formData.append(
        'Cantact_person2',
        this.formgroup.value.Cantact_person2
      );
      this.formData.append('fax', this.formgroup.value.fax);
      this.formData.append('accountNumber', this.formgroup.value.accountNumber);
      this.formData.append('accountName', this.formgroup.value.accountName);
      this.formData.append('bankName', this.formgroup.value.bankName);
      this.formData.append('ifscCode', this.formgroup.value.ifscCode);
      this.formData.append('branchName', this.formgroup.value.branchName);
      this.formData.append('accountType', this.formgroup.value.accountType);
      this.formData.append(
        'paymentToBeMadeInFavorOf',
        this.formgroup.value.paymentToBeMadeInFavorOf
      );
      // this.formData.append('paymentMode', this.formgroup.value.paymentMode);
      this.formData.append('Opthlmologya', this.formgroup.value.Opthlmologya);
      this.formData.append('MBBS_PHYSICIAN', this.formgroup.value.MBBS_PHYSICIAN);
      this.formData.append('GYNECOLOGY', this.formgroup.value.GYNECOLOGY);
      this.formData.append('MD_PHYSICIAN', this.formgroup.value.MD_PHYSICIAN);
      this.formData.append('MD_PATHOLOGIST', this.formgroup.value.MD_PATHOLOGIST);
      this.formData.append('MD_RADIOLOGIST', this.formgroup.value.MD_RADIOLOGIST);
      this.formData.append('MBBS_PHYSICIAN', this.formgroup.value.MBBS_PHYSICIAN);
      this.formData.append('DMLT', this.formgroup.value.DMLT);
      this.formData.append('MD_CARDIOLOGY', this.formgroup.value.MD_CARDIOLOGY);
      this.formData.append(
        'XRAY_TECHNICIAN',
        this.formgroup.value.XRAY_TECHNICIAN
      );
      this.formData.append('ECG_TECHNICIAN', this.formgroup.value.ECG_TECHNICIAN);
      this.formData.append('BAMS_BHMS', this.formgroup.value.BAMS_BHMS);
      this.formData.append('ENT', this.formgroup.value.ENT);
      this.formData.append('DENTAL', this.formgroup.value.DENTAL);
      this.formData.append('DIET', this.formgroup.value.DIET);
      this.formData.append('ECG_FACILITY', this.formgroup.value.ECG_FACILITY);
      this.formData.append('USG', this.formgroup.value.USG);
      this.formData.append(
        'TREAD_MILL_TEST',
        this.formgroup.value.TREAD_MILL_TEST
      );
      this.formData.append(
        'TMT_WT_CAPACITY',
        this.formgroup.value.TMT_WT_CAPACITY
      );
      this.formData.append(
        'ECHOCARDIOGRAPHY',
        this.formgroup.value.ECHOCARDIOGRAPHY
      );
      this.formData.append('MD_RADIOLOGIST', this.formgroup.value.MD_RADIOLOGIST);
      this.formData.append(
        'FUNDOSCOPY_TEST',
        this.formgroup.value.FUNDOSCOPY_TEST
      );
      this.formData.append(
        'DMLT_LABORATORY_TECHNICIAN',
        this.formgroup.value.DMLT_LABORATORY_TECHNICIAN
      );
      this.formData.append('BASIC_EYE_TEST', this.formgroup.value.BASIC_EYE_TEST);
      this.formData.append('X_RAY', this.formgroup.value.X_RAY);
      this.formData.append('ELISA_HIV', this.formgroup.value.ELISA_HIV);
      this.formData.append('PSA', this.formgroup.value.PSA);
      this.formData.append('ENT', this.formgroup.value.ENT);
      this.formData.append('PAP_SMEAR', this.formgroup.value.PAP_SMEAR);
      this.formData.append('MAMMOGRAM', this.formgroup.value.MAMMOGRAM);
      this.formData.append('WESTERN_BLOT', this.formgroup.value.WESTERN_BLOT);
      this.formData.append(
        'PULMONARY_FUNCTION_TEST',
        this.formgroup.value.PULMONARY_FUNCTION_TEST
      );
      this.formData.append(
        'URINE_NICOTINE_QUALITITATIVE',
        this.formgroup.value.URINE_NICOTINE_QUALITITATIVE
      );
      this.formData.append('HBA1C', this.formgroup.value.HBA1C);
      this.formData.append('HBEAG', this.formgroup.value.HBEAG);
      this.formData.append('AUDIOMETRY', this.formgroup.value.AUDIOMETRY);
      this.formData.append('GYNAECOLOGIST', this.formgroup.value.GYNAECOLOGIST);
      this.formData.append('MER', this.formgroup.value.MER);
      this.formData.append('DENTAL', this.formgroup.value.DENTAL);
      this.formData.append('PATHOLOGY', this.formgroup.value.PATHOLOGY);
      this.formData.append('FMR', this.formgroup.value.FMR);
      this.formData.append('STOOL_ROUTINE', this.formgroup.value.STOOL_ROUTINE);
      this.formData.append(
        'CARDIOLOGY_OUTSOURCED_CENTRE',
        this.formgroup.value.CARDIOLOGY_OUTSOURCED_CENTRE
      );
      this.formData.append(
        'PATHOLOGY_OUTSOURCED_CENTR',
        this.formgroup.value.PATHOLOGY_OUTSOURCED_CENTR
      );
      this.formData.append(
        'GYNAECOLOGY_OUTSOURCED_CENTRE',
        this.formgroup.value.GYNAECOLOGY_OUTSOURCED_CENTRE
      );
      this.formData.append(
        'DENTAL_OUTSOURCED_CENTRE',
        this.formgroup.value.DENTAL_OUTSOURCED_CENTRE
      );
      this.formData.append(
        'PULMONOLOGY_OUTSOURCED_CENTRE',
        this.formgroup.value.PULMONOLOGY_OUTSOURCED_CENTRE
      );
      this.formData.append(
        'RADIOLOGY_OUTSOURCED_CENTRE',
        this.formgroup.value.RADIOLOGY_OUTSOURCED_CENTRE
      );
      // this.formData.append('Start_Date', this.formgroup.value.Start_Date);
      // this.formData.append('End_Date', this.formgroup.value.End_Date);
      this.formData.append('FirmType', this.formgroup.value.End_Date);
  
      // comp_profile
      console.log('Form submitted!', this.formgroup.value);
  
      // if (this.formgroup.invalid) {
      //   alert('All required values should be provided!')
      //   return;
      // }
      // else {
      const url = '/selfempanelment/add/' + this.ticketId + '/';
      this.commonService.postMethod(url, this.formData).subscribe(
        (res: any) => {
          console.log('res', res);
          alert("Form Submitted Successfully")
        },
        (err: any) => {
          console.warn(err);
        }
      );
      // }
    }
  }
