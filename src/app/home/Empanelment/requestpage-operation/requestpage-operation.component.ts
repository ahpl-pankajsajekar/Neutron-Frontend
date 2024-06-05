import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/_services/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-requestpage-operation',
  templateUrl: './requestpage-operation.component.html',
  styleUrls: ['./requestpage-operation.component.scss']
})
export class RequestpageOperationComponent  {

  addProviderForm!: FormGroup;

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
      pincode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      zone: ['', Validators.required],
      remark: ['', Validators.required],
    });
  }

  get f(){
    return this.addProviderForm.controls;
  }

  isSubmitted = false
  onSubmitAddProvider(): void {
    this.isSubmitted = true
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
          this.isSubmitted = false;
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
    }
  }

}
