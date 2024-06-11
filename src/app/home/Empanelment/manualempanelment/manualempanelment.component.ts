import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // Check this import statement
import { HttpClient } from '@angular/common/http';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manualempanelment',
  templateUrl: './manualempanelment.component.html',
  styleUrls: ['./manualempanelment.component.scss']
})


export class ManualempanelmentComponent implements OnInit {
  nameLocationFormGroup!: FormGroup;// Check the declaration of this property
 

  // councils: string[] = ['Council 1', 'Council 2', 'Council 3', 'Council 4'];
  // Qualifications: string[] = ['Council 1', 'Council 2', 'Council 3', 'Council 4'];
  Bio_Chemistry: string[] = ['Council 1', 'Council 2', 'Council 3', 'Council 4'];
  
  // KLL: string[] = ['Council 1', 'Council 2', 'Council 3', 'Council 4'];
  Home_Visit_test: string[] = ['Council 1', 'Council 2', 'Council 3', 'Council 4'];
  Specialized: string[] = ['Council 1', 'Council 2', 'Council 3', 'Council 4'];
  // Radiology: string[] = ['Council 1', 'Council 2', 'Council 3', 'Council 4'];
  Account_Type: string[] = ['Council 1', 'Council 2', 'Council 3', 'Council 4'];
  
  // councils = [
  //   { value: 'Council 1', viewValue: 'Council 1' },
  //   { value: 'Council 2', viewValue: 'Council 2' },
  //   { value: 'Council 3', viewValue: 'Council 3' },
  // ]
  councils = [
    { value: 'MCI', viewValue: 'Medical Council of India' },
    { value: 'DCI', viewValue: 'Dental Council of India' },
    { value: 'NMC', viewValue: 'National Medical Commission' },
    { value: 'INC', viewValue: 'Indian Nursing Council' },
    { value: 'PCI', viewValue: 'Pharmacy Council of India' },
    { value: 'CCIM', viewValue: 'Central Council of Indian Medicine' },
    { value: 'CCH', viewValue: 'Central Council of Homeopathy' },
    { value: 'COC', viewValue: 'Central Council of Homoeopathy' },
    { value: 'BOG', viewValue: 'Board of Governors in Supersession of the MCI' },
    { value: 'NBE', viewValue: 'National Board of Examinations' },
    { value: 'Other', viewValue: 'Other' }
    // Add more councils as needed
];

  // Qualifications = [
  //   { value: 'Council 1', viewValue: 'Council 1' },
  //   { value: 'Council 2', viewValue: 'Council 2' },
  //   { value: 'Council 3', viewValue: 'Council 3' },
  // ]

  Ownership = [
    { value: 'Self', viewValue: 'Self' },
    { value: 'LLP', viewValue: 'LLP' },
    { value: 'Private', viewValue: 'Private' },
    { value: 'Public', viewValue: 'Public' },
  ];

  Radiology = [
    { value: 'East', viewValue: 'East' },
    { value: 'West', viewValue: 'West' },
    { value: 'North', viewValue: 'North' },
    { value: 'South', viewValue: 'South' },
  ];

  ACType = [
    { value: 'Saving', viewValue: 'Saving' },
    { value: 'Current ', viewValue: 'Current ' },
  ];

  KLL= [
    { value: 'Saving', viewValue: 'Saving' },
    { value: 'Current ', viewValue: 'Current ' },
  ];

  Qualifications = [
    { value: 'MBBS', viewValue: 'MBBS (Bachelor of Medicine, Bachelor of Surgery)' },
    { value: 'BAMS', viewValue: 'BAMS (Bachelor of Ayurvedic Medicine and Surgery)' },
    { value: 'BHMS', viewValue: 'BHMS (Bachelor of Homeopathic Medicine and Surgery)' },
    { value: 'BUMS', viewValue: 'BUMS (Bachelor of Unani Medicine and Surgery)' },
    { value: 'BNYS', viewValue: 'BNYS (Bachelor of Naturopathy and Yogic Sciences)' },
    { value: 'BDS', viewValue: 'BDS (Bachelor of Dental Surgery)' },
    { value: 'MD', viewValue: 'MD (Doctor of Medicine)' },
    { value: 'MS', viewValue: 'MS (Master of Surgery)' },
    { value: 'DNB', viewValue: 'DNB (Diplomate of National Board)' },
    { value: 'MDS', viewValue: 'MDS (Master of Dental Surgery)' },
    { value: 'DM', viewValue: 'DM (Doctorate of Medicine)' },
    { value: 'MCh', viewValue: 'MCh (Master of Chirurgiae)' },
    { value: 'DGO', viewValue: 'DGO (Diploma in Gynecology and Obstetrics)' },
    { value: 'DCH', viewValue: 'DCH (Diploma in Child Health)' },
    { value: 'DA', viewValue: 'DA (Diploma in Anesthesiology)' },
    { value: 'DLO', viewValue: 'DLO (Diploma in Otorhinolaryngology)' },
    { value: 'DO', viewValue: 'DO (Diploma in Ophthalmology)' },
    { value: 'DOrtho', viewValue: 'D.Ortho (Diploma in Orthopedics)' },
    { value: 'DPM', viewValue: 'DPM (Diploma in Psychological Medicine)' },
    { value: 'PhD', viewValue: 'Ph.D. (Doctor of Philosophy)' },
    { value: 'Fellowship', viewValue: 'Fellowship' },
    { value: 'Other', viewValue: 'Other' }
];

  constructor(private formBuilder: FormBuilder, private http: HttpClient,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.nameLocationFormGroup = this.formBuilder.group({
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
      Adhar_Card_Name:[''],
      Adhar_Card_Number:[''],
      secondary_contact_email1:[''],
      reenter_contact_email2:[''],
      Pin_code1:[''],
      state1:[''],
      city1:[''],
      Full_Name_Authorized_Signatory:[''],
      Destination_Authorized_Signatory:[''],
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
    if (this.nameLocationFormGroup.valid) {
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
          this.nameLocationFormGroup.patchValue({
            state: data?.State,
            city: data?.District
          });
        } else {
          console.error('Invalid pincode or API response.');
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
