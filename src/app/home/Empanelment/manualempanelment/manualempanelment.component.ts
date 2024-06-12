import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // Check this import statement
import { HttpClient } from '@angular/common/http';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { DC_TESTS_BioChemistry, DC_TESTS_HomeVisitTests, DC_TESTS_KidneyLiverLipid, DC_TESTS_Radiology, DC_TESTS_Specialized } from 'src/app/dc/self-empanlement/dc_tests_list';
import { CouncilsServiceDataList, QualificationsServiceDataList } from 'src/app/_services/list_data';

@Component({
  selector: 'app-manualempanelment',
  templateUrl: './manualempanelment.component.html',
  styleUrls: ['./manualempanelment.component.scss']
})


export class ManualempanelmentComponent implements OnInit {
  nameLocationFormGroup!: FormGroup;// Check the declaration of this property

  ManualEmpanelmentForm!: FormGroup;
  
  findInvalidControls(formGroup: FormGroup) {
    const invalidControls = [];
    const controls = formGroup.controls;
    for (const controlName in controls) {
      const control = controls[controlName];
      if (control.invalid) {
        invalidControls.push({ name: controlName });
      }
    }
    return invalidControls;
  }

  get f() { return this.ManualEmpanelmentForm.controls; }
 

  selectedTestsItems:any =[];
  dropdownSettings:IDropdownSettings = {
    singleSelection: false,
    idField: "item_Standard_Code",
    textField: "item_Standard_Description",
    selectAllText: "Select All",
    // unSelectAllText: "UnSelect All",
    enableCheckAll: false,
    itemsShowLimit: 0,
    allowSearchFilter: true,
    noDataAvailablePlaceholderText: "There is no Test availabale."
  };


  DC_TESTS_Radiology = DC_TESTS_Radiology
  DC_TESTS_Specialized = DC_TESTS_Specialized
  DC_TESTS_HomeVisitTests = DC_TESTS_HomeVisitTests
  DC_TESTS_KidneyLiverLipid = DC_TESTS_KidneyLiverLipid
  DC_TESTS_BioChemistry = DC_TESTS_BioChemistry

  
  Qualifications = QualificationsServiceDataList
  councils = CouncilsServiceDataList
  


  Ownership = [
    { value: 'Self', viewValue: 'Self' },
    { value: 'LLP', viewValue: 'LLP' },
    { value: 'Private', viewValue: 'Private' },
    { value: 'Public', viewValue: 'Public' },
  ];


  ACType = [
    { value: 'Saving', viewValue: 'Saving' },
    { value: 'Current ', viewValue: 'Current ' },
  ];

  KLL= [
    { value: 'Saving', viewValue: 'Saving' },
    { value: 'Current ', viewValue: 'Current ' },
  ];


  constructor(private formBuilder: FormBuilder, private http: HttpClient,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.ManualEmpanelmentForm = this.formBuilder.group({
      providerName: ['', Validators.required],
      pincode: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      landmarks: [''],
      centerTelephone: [''],
      website: [''],
      latitude:[''],
      longitude:[''],
      gmap:[''],
      primary_contact_name:[''],
      primary_contact_email:[''],
      reenter_contact_email:[''],
      secondary_contact_name:[''],
      secondary_contact_email:[''],
      reenter_contact_email1:[''],
      Council: [''],
      owner_name:[''],
      cuin:[''],
      PAN_Card_Name:[''],
      PAN_Card_Number:[''],
      Aadhaar_Card_Name:[''],
      Aadhaar_Card_Number:[''],
      secondary_contact_email1:[''],
      reenter_contact_email2:[''],
      pincode1:[''],
      state1:[''],
      city1:[''],
      Full_Name_Authorized_Signatory:[''],
      Designation_Authorized_Signatory:[''],
      Email_Authorized_Signatory:[''],
      Account_Name:[''],
      Account_Number:[''],
      IFSC_Code:[''],
      Bank_Name:[''],
      Branch:[''],
      city2:[''],
      Account_Type:[''],
      Bio_Chemistry:[''],
      KLL:[''],
      Home_Visit_test:[''],
      Specialized:[''],
      SpeciaRadiologylized:[''],
      MD_Pathologist_Name:[''],
      Qualifications:[''],
      Registration_Number:[''],
      Council1:[''],
      MD_Cardiologist_Name:[''],
      Qualifications1:[''],
      Registration_Number1:[''],
      Council2:[''],
      MD_Radiologist_Name:[''],
      Qualifications2:[''],
      Registration_Number2:[''],
      council3:[''],
      Gynaecologist_Name:[''],
      Qualifications3:[''],
      Registration_Number3:[''],
      Council4:[''],
      MBBS_Doctor_Name:[''],
      Qualifications4:[''],
      Registration_Number4:[''],
      Council5:[''],
      upload_Pan:[''],
      Upload_Aadhar:[''],
      Cancelled_Cheque:[''],
      Shops:[''],
      Signing_Authority:[''],
      Stamp_date:[''],
      Stamp_Paper:[''],
      Radiology:['']
    });
  }

  onSubmit(): void {
    const formData = this.ManualEmpanelmentForm.value
    if (this.ManualEmpanelmentForm.valid) {
      console.log(formData)
      // Place your form submission logic here
      console.log('Form is valid, submitting...');
    } else {
      // Handle form validation errors
      console.log('Form is invalid, cannot submit.');
    }
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('Selected file:', file.name);
      // Handle the file selection, e.g., upload the file
    }
  }

  fetchBankDetails(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const IFSC_Code = inputElement.value;
    console.log('IFSC Code:', IFSC_Code); 
    this.http.get<any>('https://bank-apis.justinclicks.com/API/V1/IFSC/' + IFSC_Code)
      .subscribe(data => {
        console.log('API Response:', data)
        const BankName = document.getElementById('BankName') as HTMLInputElement;
        BankName.value = data.BANK;
        const Branch = document.getElementById('Branch') as HTMLInputElement;
        Branch.value = data.BRANCH;
        const City2 = document.getElementById('City2') as HTMLInputElement;
        City2.value = data.CITY;

        this.nameLocationFormGroup.patchValue({
          Bank_Name:  data.BANK,
          Branch:  data.BRANCH,
          City2: data.CITY
        })
      }, error => {
        console.error('Error:', error);
        // alert("Please enter valid IFSC Code.")
        this.toastrService.info('Please enter valid IFSC Code.', '', {
          closeButton: true,
          timeOut: 5000,
        });
      });
  }

  getPincodeDetails(event: Event): void {
    const pincode= (event.target as HTMLInputElement).value
    console.log(pincode)
    if(pincode.length==6){
      this.http.get(`https://api.postalpincode.in/pincode/${pincode}`).subscribe((response: any) => {
        if (response && response.length > 0 && response[0]?.Status === 'Success') {
          const data = response[0]?.PostOffice[0];
          this.ManualEmpanelmentForm.patchValue({
            state: data?.State,
            city: data?.District
          });
        } else {
          this.toastrService.info("Invalid Pincode", "Incorrect");
          console.error('Invalid pincode or API response.');
          this.ManualEmpanelmentForm.patchValue({
            state: '',
            city: ''
          });
        }
      }, (error) => {
        console.error('Error fetching pincode details:', error);
      });
    }
    
  }
  getPincodeDetail(event: Event): void {
    const pincode1= (event.target as HTMLInputElement).value
    console.log(pincode1)
    if(pincode1.length==6){
      this.http.get(`https://api.postalpincode.in/pincode/${pincode1}`).subscribe((response: any) => {
        if (response && response.length > 0 && response[0]?.Status === 'Success') {
          const data = response[0]?.PostOffice[0];
          this.ManualEmpanelmentForm.patchValue({
            state1: data?.State,
            city1: data?.District
          });
        } else {
          this.toastrService.info("Invalid Pincode", "Incorrect");
          console.error('Invalid pincode or API response.');
          this.ManualEmpanelmentForm.patchValue({
            state1: '',
            city1: ''
          });
        }
      }, (error) => {
        console.error('Error fetching pincode details:', error);
      });
    }
    
  }


  step: number = 1;
  next(){
    this.step++;
  }
  previous(){
    this.step--;
  }


}
