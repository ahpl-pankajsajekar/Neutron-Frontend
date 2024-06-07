import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';
import { CommonService } from 'src/app/_services/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-operations-manage',
  templateUrl: './operations-manage.component.html',
  styleUrls: ['./operations-manage.component.scss']
})
export class OperationsManageComponent {

  DCSerachForm!: FormGroup;

  requestedTicketObj: any;
  requestedProviderID: any;
  constructor(private formBuilder: FormBuilder,
    public accountService: AccountService,
    private toastrService: ToastrService,
    public route: ActivatedRoute,
     private commonService: CommonService){
      
      this.DCSerachForm = this.formBuilder.group({
        q : ['', [Validators.required]],
      });
      
      this.route.paramMap.subscribe(param=>{
        this.requestedTicketObj = history.state.ticketData  // came from dashboard if tikect present 
        console.log("init ticket:", this.requestedTicketObj)
        this.requestedProviderID = this.requestedTicketObj?.Provider_Id || null
        if(this.requestedProviderID){
          console.log(this.requestedProviderID)
          this.DCSerachForm.patchValue({
            q: String(this.requestedProviderID)
          });
          this.onSubmit();
        }
      })
      
     }
  
  ngOnInit():void{
  }

  dcSearchDisplayResponseData = []
  isSubmited = false
  onSubmit(){
    const qValue = this.DCSerachForm.get('q')?.value;
    this.dcSearchDisplayResponseData = []
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

    getConfirmation(status:string, url:string,  body:any){
      Swal.fire({
        title: "Are you sure?",
        text: "You are going to "+ status +" this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Confirm it!"
      }).then((result) => {
        // return result.isConfirmed
        if (result.isConfirmed) {
          this.commonService.postMethod(url, body).subscribe(
            (res:any)=>{
              console.log(res);
              this.toastrService.success(res.message, 'Successful', {
                closeButton: true,
                timeOut: 5000,
              });
            },
            (error:any)=>{
              console.log(error);
              this.toastrService.error(error.error, 'Error', {
                closeButton: true,
                timeOut: 5000,
              });
            }
          )
        }
      });
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
      const networkUser = this.accountService.getRole()
      if (networkUser=='1'){
        this.getConfirmation(status, url, body)
      }
      else{
        this.commonService.postMethod(url, body).subscribe(
          (res:any)=>{
            console.log(res);
            this.toastrService.success(res.message, 'Successful', {
              closeButton: true,
              timeOut: 5000,
            });
          },
          (error:any)=>{
            console.log(error);
            this.toastrService.error(error.error, 'Error', {
              closeButton: true,
              timeOut: 5000,
            });
          }
        )
      }

      
    }

}
