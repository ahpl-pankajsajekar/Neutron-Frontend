import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/_services/common.service';

interface PerspectiveProvider {
  name: string;
}

@Component({
  selector: 'app-perspective-provider',
  templateUrl: './perspective-provider.component.html',
  styleUrls: ['./perspective-provider.component.scss']
})
export class PerspectiveProviderComponent {
  providerName: string = '';
  providerPinCode: string = '';
  state: string = '';
  city: string = '';
  contactPersonName: string = '';
  contactEmail: string = '';
  contactMobileNumber: string = '';
  perspectiveProviders: PerspectiveProvider[] = [];

  Form! : FormGroup;

  constructor(public formBuilder: FormBuilder,
    public commonService: CommonService, 
     public toastrService: ToastrService) { }

  ngOnInit(): void {
    this.Form = this.formBuilder.group({
      providerName: ['', ], 
      providerPinCode: ['',],
      state: ['', ], 
      city: ['', ], 
      Contact_Person_Name: ['', ],
      Contact_Email: ['', ],
      Contact_Mobile_Number: ['', ]
    });
  }

  onSubmit(): void {
    console.log(this.Form.value)
    if (this.Form.invalid) {
      this.toastrService.info("All required values should be provided!", 'Required', {
        closeButton: true,
      });
    }
    else{
      const url = ''
      this.commonService.postMethod(url, this.Form.value)
        .subscribe(
          (data: any) => {
            setTimeout(() => {
              this.toastrService.success('User Registered Successfully', 'Successful', {
                closeButton: true,
              });
            },
            1000);
          },
          (error:any) => {
            console.error(error)
            this.toastrService.error(error.error.non_field_errors[0], 'Incorrect', {
              closeButton: true,
            });
            // already register error not show/ working
            if(error.error['error']){
              this.toastrService.error(error['error'], 'error', {
                closeButton: true,
              });
            }
          }
        );
    }
  }

  clearForm(): void {
    // Clear all form fields
    this.providerName = '';
    this.providerPinCode = '';
    this.state = '';
    this.city = '';
    this.contactPersonName = '';
    this.contactEmail = '';
    this.contactMobileNumber = '';
  }

  addAutomaticProvider(): void {
    // Add automatic provider functionality here
    console.log('Automatic provider added.');
    const url = ''
    this.commonService.postMethod(url, this.Form.value)
        .subscribe(
          (data: any) => {
            setTimeout(() => {
              this.toastrService.success('Empalment link send Successfully', 'Successful', {
                closeButton: true,
              });
            },
            1000);
          },
          (error:any) => {
            if(error.error['error']){
              this.toastrService.error(error['error'], 'error', {
                closeButton: true,
              });
            }
          }
        );
  }
  addManualProvider(): void {
    // Add manual provider functionality here
    console.log('Manual provider added.');
    const url = ''
    this.commonService.postMethod(url, this.Form.value)
        .subscribe(
          (data: any) => {
            setTimeout(() => {
              this.toastrService.success('Empalment link send Successfully', 'Successful', {
                closeButton: true,
              });
            },
            1000);
          },
          (error:any) => {
            if(error.error['error']){
              this.toastrService.error(error['error'], 'error', {
                closeButton: true,
              });
            }
          }
        );
      }
}
