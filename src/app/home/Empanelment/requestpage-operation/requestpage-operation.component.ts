import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/_services/common.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-requestpage-operation',
  templateUrl: './requestpage-operation.component.html',
  styleUrls: ['./requestpage-operation.component.scss']
})
export class RequestpageOperationComponent  {

  addProviderForm!: FormGroup;
  delistProviderForm!: FormGroup;
  activateProviderForm!: FormGroup;
  ZoneType = [
    { value: 'EastZone', viewValue: 'EastZone' },
    { value: 'WestZone', viewValue: 'WestZone' },
    { value: 'NorthZone', viewValue: 'NorthZone' },
    { value: 'SouthZone', viewValue: 'SouthZone' },
  ];

  constructor(private fb: FormBuilder,
    public toastrService: ToastrService,
     public commonService: CommonService) {

  }


  ngOnInit(): void {
    this.addProviderForm = this.fb.group({
      pincode: ['', Validators.required],
      zone: ['', Validators.required],
      remark: ['', Validators.required],
      // rows: this.fb.array([this.createAddProviderRow()])
    });
    this.delistProviderForm = this.fb.group({
          providerId: ['', Validators.required],
          providerName: ['', Validators.required],
          pinCode: ['', Validators.required]
    });
    this.activateProviderForm = this.fb.group({
          providerId: ['', Validators.required],
          providerName: ['', Validators.required],
          pinCode: ['', Validators.required]
    });
  }

  // get addProviderRows(): FormArray {
  //   return this.addProviderForm.get('rows') as FormArray;
  // }

  // get delistProviderRows(): FormArray {
  //   return this.delistProviderForm.get('rows') as FormArray;
  // }

  // get activateProviderRows(): FormArray {
  //   return this.activateProviderForm.get('rows') as FormArray;
  // }

  // createAddProviderRow(): FormGroup {
  //   return this.fb.group({
  //     zone: ['', Validators.required],
  //     pinCode: ['', Validators.required],
  //     remarks: ['']
  //   });
  // }

  // createDelistProviderRow(): FormGroup {
  //   return this.fb.group({
  //     providerId: ['', Validators.required],
  //     providerName: ['', Validators.required],
  //     pinCode: ['', Validators.required]
  //   });
  // }

  // createActivateProviderRow(): FormGroup {
  //   return this.fb.group({
  //     providerId: ['', Validators.required],
  //     providerName: ['', Validators.required],
  //     pinCode: ['', Validators.required]
  //   });
  // }

  onSubmitAddProvider(): void {
    if (this.addProviderForm.valid) 
      {
      const formData = this.addProviderForm.value;
      this.commonService.postMethod('/operation/ticket/', formData).subscribe(
        (res: any) => {
          this.toastrService.success('Ticket Created Successful.', 'Successful', {
            closeButton: true,
            timeOut: 5000,
          });
          this.addProviderForm.reset();
          console.log('API response:', res);
        },
        (err: any) => {
          const error = err['error'] 
          if (err['error']['error']) {
            this.toastrService.error(err['error']['error'], 'Error', {
              closeButton: true,
              timeOut: 5000,
            });
          }
          else if(err['error']['non_field_errors']){
            this.toastrService.error(err['error']['non_field_errors'], 'Error', {
              closeButton: true,
              timeOut: 5000,
            });
          }
          else{
            this.toastrService.error(err['error'], 'Error', {
              closeButton: true,
              timeOut: 5000,
            });
          }
          console.error('API error:', error);
        }
      );
    } else {
      this.toastrService.info('Please fill out the details correctly', 'Error', {
        closeButton: true,
      });
      // alert("Please fill out the details correctly in the ADD PROVIDER section.");
    }
  }

  onSubmitDelistProvider(): void {
    if (this.delistProviderForm.valid) {
      console.log("Submitting Delist Provider form:", this.delistProviderForm.value);
      // You can perform further actions here
    } else {
      alert("Please fill out the details correctly in the DELIST PROVIDER section.");
    }
  }

  onSubmitActivateProvider(): void {
    if (this.activateProviderForm.valid) {
      console.log("Submitting Activate Provider form:", this.activateProviderForm.value);
      // You can perform further actions here
    } else {
      alert("Please fill out the details correctly in the ACTIVATE PROVIDER section.");
    }
  }
}
