import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';
import { CommonService } from 'src/app/_services/common.service';
import Swal from 'sweetalert2';
import { ModifyModalComponent } from './modify-modal/modify-modal.component';

export interface ModifyDialogData{
  insurerList: any;
  DcName: any;
}

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
    private accountService: AccountService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
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
    console.log("qValue onSubmit", qValue)
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
      }});

    }
    
  animal: any;
  name: any;
  
  insurerList = [
    {Name:'HDFC', Active: true, Deactive: false},
    {Name:'IPRU', Active: true, Deactive: false},
    {Name:'Max Life', Active: true, Deactive: false},
    {Name:'Relaince', Active: true, Deactive: false},
    {Name:'RS', Active: true, Deactive: false},
    {Name:'SBI', Active: true, Deactive: false},
  ]
  openDialog(): void {
      const dialogRef = this.dialog.open(ModifyModalComponent, {
        width: '500px',
        height: '370px',
        // data: {name: this.name, animal: this.animal}
        data: { insurerList: this.insurerList }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.animal = result;
      });
  }
  openModifyDialog(dc:any): void {
      const dialogRef = this.dialog.open(ModifyModalComponent, {
        width: '500px',
        height: '370px',
        data: { insurerList: dc['insurerList'], DcName: dc['DC Name'] },
        // data: { insurerList: this.insurerList, DcName: dc['DC Name'] }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.animal = result;
      });
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
              if(this.requestedTicketObj){
                this.router.navigate(['/empanelment/dashboard']);
              }
              else{
                this.onSubmit();
              }
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
        'TicketID': item?.Ticket_Id
      }
      console.log(body)
      const networkUser = this.accountService.getRole()
      if (networkUser=='1'){
        if(this.requestedTicketObj){
          body['TicketID'] = this.requestedTicketObj.Ticket_Id;
        }
        this.getConfirmation(status, url, body)
      }
      else{
        Swal.fire({
          title: "Are you sure?",
          text: "You are going to "+ status +" this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Confirm it!"
        }).then((result) => {
          if (result.isConfirmed){
            this.commonService.postMethod(url, body).subscribe(
              (res:any)=>{
                console.log("res", res);
                if(res.message=='Ticket Already Exists'){
                  this.toastrService.warning(res.message, 'Warning', {
                    closeButton: true,
                    timeOut: 5000,
                  });
                }
                else{
                  this.toastrService.success(res.message, 'Successful', {
                    closeButton: true,
                    timeOut: 5000,
                  });
                  this.router.navigate(['/empanelment/dashboard']);
                }
                // this.onSubmit();
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

      
    }

}
