import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/_services/common.service';

interface PerspectiveProvider {
  DignosticCenter_ProviderName: string;
  Ticket_Id: string;
  DignosticCenter_State: string;
}

@Component({
  selector: 'app-perspective-provider',
  templateUrl: './perspective-provider.component.html',
  styleUrls: ['./perspective-provider.component.scss']
})
export class PerspectiveProviderComponent {

  perspectiveProviders: PerspectiveProvider[] = [];

  Form! : FormGroup;

  requestedTicketObj: any

  PTicket_id: any;
  PTicket_zone: any
  PTicket_pincode: any
  constructor(public formBuilder: FormBuilder,
    public commonService: CommonService, 
    public route: ActivatedRoute,
    private router: Router,
     public toastrService: ToastrService) {
        this.route.paramMap.subscribe(params  => {
          this.requestedTicketObj = history.state.ticketData
          this.PTicket_id = this.requestedTicketObj.Ticket_Id
          this.PTicket_zone = this.requestedTicketObj.zone
          this.PTicket_pincode = this.requestedTicketObj.pincode
          console.log(this.requestedTicketObj);
        })      
      }

  ngOnInit(): void {
    this.loadData(); // list of perspectiveProviders
    this.Form = this.formBuilder.group({
      providerName: ['', [Validators.required]], 
      pincode: ['', [Validators.required]],
      state: ['',[Validators.required] ], 
      city: ['', [Validators.required]], 
      contactPersonName: ['',[Validators.required] ],
      contactEmailID: ['', [Validators.required]],
      contactNumber: ['',[Validators.required] ]
    });
  }

  onSubmit(): void {
    const formData = this.Form.value
    formData['zone'] = this.PTicket_zone
    formData['parent_pincode'] = this.PTicket_pincode
    formData['parent_ticket_id'] = this.PTicket_id
    console.log(formData)
    if (this.Form.invalid) {
      this.toastrService.info("All required values should be provided!", 'Required', {
        closeButton: true,
      });
    }
    else{
      const url = '/network/ticket/child/'
      this.commonService.postMethod(url, formData)
        .subscribe(
          (res: any) => {
            console.log(res);
            setTimeout(() => {
              this.toastrService.success('Perspective Provider Added', 'Successful', {
                closeButton: true,
              });
            },
            1000);
            this.loadData();
            this.Form.reset();
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


  loadData(){
    // get perspectiveProviders list
    const url = '/prospectiveprovider/tickets/';
    this.commonService.getMethodWithParams(url, {"parent_ticket_id": this.PTicket_id }).subscribe(
      (res: any) => {
        console.log(res);
        this.perspectiveProviders = res.data
        console.log(this.perspectiveProviders);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }


  addAutomaticProvider(ticket:any): void {
    const url = '/prospectiveprovider/ticket/'
    this.commonService.putMethod(url, {'ticket_id': ticket.Ticket_Id})
        .subscribe(
          (res: any) => {
            console.log(res)
            this.toastrService.success('Empanelment link sent', 'Successful', {
              closeButton: true,
            });
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

  addManualProvider(ticket:any): void {
      // this.router.navigate(['/selfempanelment'], {queryParams: {id: ticket.Ticket_Id }})
      const url = this.router.createUrlTree(['/selfempanelment'], { queryParams: { id: ticket.Ticket_Id }}).toString();
      window.open(url, '_blank');
    }
}
