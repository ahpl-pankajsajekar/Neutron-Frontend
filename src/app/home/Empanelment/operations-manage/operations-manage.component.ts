import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/_services/common.service';

@Component({
  selector: 'app-operations-manage',
  templateUrl: './operations-manage.component.html',
  styleUrls: ['./operations-manage.component.scss']
})
export class OperationsManageComponent {

  DCSerachForm!: FormGroup

  constructor(private formBuilder: FormBuilder,
    private toastrService: ToastrService,
     private commonService: CommonService){}
  
  ngOnInit():void{
    this.DCSerachForm = this.formBuilder.group({
      q : ['', [Validators.required]],
    });
  }

  dcSearchDisplayResponseData = []
  isSubmited = false
  onSubmit(){
    const qValue = this.DCSerachForm.get('q')?.value;
    if (!qValue) {
      this.dcSearchDisplayResponseData = []
      return 
    }
    this.isSubmited = true
    const url = '/manage/DCsearch/'
    this.commonService.postMethod(url, this.DCSerachForm.value).subscribe({
      next: (res:any) => {
        console.log(res);
        if(!(res['data'] === undefined || res === null || Object.keys(res['data']).length === 0) ){
          this.dcSearchDisplayResponseData = res.data
        }
        else{
          this.dcSearchDisplayResponseData = []
        }
      },
      error: (error:any) => {
        console.warn(error)
      }})
    }

    UpdateDCStatus(item:any, status: string){
      const url = '/manage/DCstatus/'
      const body = {
        'RequestedStatus' : status,
        'DCName' : item['DC Name'],
        'DCID' : item.DCID,
        'DCAddress' : item.Address,
        'Pincode' : item.Pincode,
      }
      console.log(body)
      this.commonService.postMethod(url, body).subscribe(
        (res:any)=>{
          console.log(res);
          this.toastrService.success('Ticket Created Successful.', 'Successful', {
            closeButton: true,
            timeOut: 5000,
          });
        },
        (error:any)=>{
          console.log(error);
          this.toastrService.error('Error', 'Error', {
            closeButton: true,
            timeOut: 5000,
          });
        }
      )
    }

}
