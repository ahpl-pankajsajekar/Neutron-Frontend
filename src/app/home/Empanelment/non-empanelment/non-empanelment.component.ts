import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/_services/common.service';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-non-empanelment',
  templateUrl: './non-empanelment.component.html',
  styleUrls: ['./non-empanelment.component.scss'],
})
export class NonEmpanelmentComponent {
  documents: File[] = [];
  fileInputsToShow: { id: string, label: string, controlName: string }[] = [];

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

  StationType = [
    { value: 'Instation', viewValue: 'Instation' },
    { value: 'Outstation', viewValue: 'Outstation' },
  ];

  ACType = [
    { value: 'Saving', viewValue: 'Saving' },
    { value: 'Current ', viewValue: 'Current ' },
    { value: 'Salary', viewValue: 'Salary' },
    { value: 'Fixed deposit', viewValue: 'Fixed deposit' },
    { value: 'Recurring deposit', viewValue: 'Recurring deposit' },
    { value: ' NRI', viewValue: 'NRI' },
  ];

  TyreType = [
    { value: 'Tyre1', viewValue: 'Tyre1' },
    { value: 'Tyre2', viewValue: 'Tyre2' },
    { value: 'Tyre3', viewValue: 'Tyre3' },
    { value: 'Tyre4', viewValue: 'Tyre4' },
  ];

  GradeType = [
    { value: 'A+', viewValue: 'A+' },
    { value: 'A', viewValue: 'A' },
    { value: 'B', viewValue: 'B' },
    { value: 'C', viewValue: 'C' },
    { value: 'D', viewValue: 'D' },
  ];

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

  AHPLLocationType = [
    { value: 'Mumbai', viewValue: 'Mumbai' },
    { value: 'Benglore', viewValue: 'Benglore' },
    { value: 'New Delhi', viewValue: 'New Delhi' },
    { value: 'Hyderabad', viewValue: 'Hyderabad' },
    { value: 'Chennai', viewValue: 'Chennai' },
    { value: 'Kolkata', viewValue: 'Kolkata' },
    { value: 'Kochi', viewValue: 'Kochi' },
    { value: 'Ahmedabad', viewValue: 'Ahmedabad' },
    { value: 'Delhi', viewValue: 'Delhi' },
    { value: 'Jammu', viewValue: 'Jammu' },
    { value: 'Pune', viewValue: 'Pune' },
    { value: 'Chandigarh', viewValue: 'Chandigarh' },
    { value: 'Jaipur', viewValue: 'Arunachal PJaipurradesh' },
    { value: 'Indore', viewValue: 'Indore' },
    { value: 'LK-HO', viewValue: 'LK-HO' },
  ];

  LCLocationType = [
    { value: 'Mumbai', viewValue: 'Mumbai' },
    { value: 'Benglore', viewValue: 'Benglore' },
    { value: 'New Delhi', viewValue: 'New Delhi' },
    { value: 'Hyderabad', viewValue: 'Hyderabad' },
    { value: 'Chennai', viewValue: 'Chennai' },
    { value: 'Kolkata', viewValue: 'Kolkata' },
    { value: 'Kochi', viewValue: 'Kochi' },
    { value: 'Ahmedabad', viewValue: 'Ahmedabad' },
    { value: 'Delhi', viewValue: 'Delhi' },
    { value: 'Jammu', viewValue: 'Jammu' },
    { value: 'Pune', viewValue: 'Pune' },
    { value: 'Chandigarh', viewValue: 'Chandigarh' },
    { value: 'Jaipur', viewValue: 'Arunachal PJaipurradesh' },
    { value: 'Indore', viewValue: 'Indore' },
    { value: 'LK-HO', viewValue: 'LK-HO' },
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
      providerType: ['', Validators.required],
      DC_Chain: ['', Validators.required],
      Regi_number: ['', Validators.required],
      Inception: ['', Validators.required],
      Owner_name: ['', Validators.required],
      PanCard_number: ['', Validators.required],
      nameOnPanCard: ['', Validators.required],
      Adhar_number: ['', Validators.required],
      Adhar_name: ['', Validators.required],
      Center_name: ['', Validators.required],
      Grade: ['', Validators.required],
      Tier: ['', Validators.required],
      Accredation: ['', Validators.required],
      Station: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      ahplLocation: ['', Validators.required],
      lcLocation: ['',Validators.required],
      state: ['',Validators.required],
      city: ['',Validators.required],
      pincode: ['',Validators.required],
      zone: ['',Validators.required],
      emailId: ['',Validators.required],
      emailId2: ['',Validators.required],
      Cantact_person1: ['',Validators.required],
      Cantact_person2: ['',Validators.required],
      fax: ['',Validators.required],
      accountNumber: ['',Validators.required],
      accountName: ['',Validators.required],
      bankName: ['',Validators.required],
      ifscCode: ['',Validators.required],
      branchName: ['',Validators.required],
      accountType: ['',Validators.required],
      paymentToBeMadeInFavorOf: ['',Validators.required],
      paymentMode: ['',Validators.required],
      Opthlmologya: ['',Validators.required],
      MBBS_PHYSICIAN: ['',Validators.required],
      GYNECOLOGY: ['',Validators.required],
      MD_PHYSICIAN: ['',Validators.required],
      MD_PATHOLOGIST: ['',Validators.required],
      MD_RADIOLOGIST: ['',Validators.required],
      DMLT: ['',Validators.required],
      MD_CARDIOLOGY: ['',Validators.required],
      XRAY_TECHNICIAN: ['',Validators.required],
      ECG_TECHNICIAN: ['',Validators.required],
      BAMS_BHMS: ['',Validators.required],
      ENT: ['',Validators.required],
      DENTAL: ['',Validators.required],
      DIET: ['',Validators.required],
      ECG_FACILITY: ['',Validators.required],
      USG: ['',Validators.required],
      TREAD_MILL_TEST: ['',Validators.required],
      TMT_WT_CAPACITY: ['',Validators.required],
      ECHOCARDIOGRAPHY: ['',Validators.required],
      FUNDOSCOPY_TEST: ['',Validators.required],
      DMLT_LABORATORY_TECHNICIAN: ['',Validators.required],
      BASIC_EYE_TEST: ['',Validators.required],
      X_RAY: ['',Validators.required],
      ELISA_HIV: ['',Validators.required],
      PSA: ['',Validators.required],
      PAP_SMEAR: ['',Validators.required],
      MAMMOGRAM: ['',Validators.required],
      WESTERN_BLOT: ['',Validators.required],
      PULMONARY_FUNCTION_TEST: ['',Validators.required],
      URINE_NICOTINE_QUALITITATIVE: ['',Validators.required],
      HBA1C: ['',Validators.required],
      HBEAG: ['',Validators.required],
      AUDIOMETRY: ['',Validators.required],
      GYNAECOLOGIST: ['',Validators.required],
      MER: ['',Validators.required],
      PATHOLOGY: ['',Validators.required],
      FMR: ['',Validators.required],
      STOOL_ROUTINE: ['',Validators.required],
      CARDIOLOGY_OUTSOURCED_CENTRE: ['',Validators.required],
      PATHOLOGY_OUTSOURCED_CENTR: ['',Validators.required],
      GYNAECOLOGY_OUTSOURCED_CENTRE: ['',Validators.required],
      DENTAL_OUTSOURCED_CENTRE: ['',Validators.required],
      PULMONOLOGY_OUTSOURCED_CENTRE: ['',Validators.required],
      RADIOLOGY_OUTSOURCED_CENTRE: ['',Validators.required],
      pan: [''],
      aadhar: [''],
      Accreditation: [''],
      Registration_Number: [''],
      Ownership: [''],
      TDS: [''],
      FirmType: [''],
    });
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
  



  onFirmTypeChange(event: any) {
    console.log("myyyevent:", event.target.value);
    this.updateFileInputsToShow();
  }
  updateFileInputsToShow() {
    const selectedFirmType = this.formgroup.get('FirmType').value;
    switch (selectedFirmType) {
      case 'Sole Proprietorship Firm':
        this.fileInputsToShow = [
          { id: 'pan', label: 'DC Owner PAN:', controlName: 'pan' },
          { id: 'aadhar', label: 'DC Owner Aadhar:', controlName: 'aadhar' },
          { id: 'Accreditation', label: 'Accreditation Certificates:', controlName: 'Accreditation' },
          { id: 'Registration_Number', label: 'Dr Registration Number/Certificate:', controlName: 'Registration_Number' },
          { id: 'Ownership', label: 'Ownership Documents:', controlName: 'Ownership' },
          { id: 'TDS', label: 'TDS certificate:', controlName: 'TDS' }
        ];
        break;
      case 'LLP/Partnership Firm':
        this.fileInputsToShow = [
          { id: 'pan', label: 'DC Owner PAN:', controlName: 'pan' },
          { id: 'aadhar', label: 'DC Owner Aadhar:', controlName: 'aadhar' },
          { id: 'Signing Authority Letter', label: 'Accreditation Certificates:', controlName: 'Signing_Authority_Letter' },
          { id: 'Clinical Establishment Certificate', label: 'Dr Registration Number/Certificate:', controlName: 'Clinical_Establishment_Certificate' },
          { id: 'Ownership', label: 'Ownership Documents:', controlName: 'Ownership' },
          { id: '	Signing Authority Letter', label: 'TDS certificate:', controlName: '	Signing_Authority_Letter' }
        ];
        break;
      case 'Private Limited Company':
        this.fileInputsToShow = [
          { id: 'pan', label: 'DC Owner PAN:', controlName: 'pan' },
          { id: 'aadhar', label: 'DC Owner Aadhar:', controlName: 'aadhar' },
          { id: 'Accreditation', label: 'Accreditation Certificates:', controlName: 'Accreditation' },
          { id: 'Registration_Number', label: 'Dr Registration Number/Certificate:', controlName: 'Registration_Number' },
          { id: 'Ownership', label: 'Ownership Documents:', controlName: 'Ownership' },
          { id: 'Legal', label: 'Legal agreement:', controlName: 'Legal' }
        ];
        break;
      default:
        this.fileInputsToShow = [];
        break;
    }
  }
  onFileInputChange(event: any, controlName: string) {
    // Handle file input change here
  }


 


  formgroup: any = FormGroup;
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
    this.formData.append('Grade', this.formgroup.value.Grade);
    this.formData.append('Tier', this.formgroup.value.Tier);
    this.formData.append('Accredation', this.formgroup.value.Accredation);
    this.formData.append('Station', this.formgroup.value.Station);
    this.formData.append('address1', this.formgroup.value.address1);
    this.formData.append('address2', this.formgroup.value.address2);
    this.formData.append('ahplLocation', this.formgroup.value.ahplLocation);
    this.formData.append('lcLocation', this.formgroup.value.lcLocation);
    this.formData.append('state', this.formgroup.value.state);
    this.formData.append('city', this.formgroup.value.city);
    this.formData.append('pincode', this.formgroup.value.pincode);
    this.formData.append('zone', this.formgroup.value.zone);
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
    this.formData.append('paymentMode', this.formgroup.value.paymentMode);
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
