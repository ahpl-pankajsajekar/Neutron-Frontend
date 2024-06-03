import { HttpClient } from '@angular/common/http';
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

  myForm! : FormGroup;

  requestedTicketObj: any

  PTicket_id: any;
  PTicket_zone: any
  PTicket_pincode: any
  constructor(public formBuilder: FormBuilder,
    public commonService: CommonService, 
    public http: HttpClient, 
    public route: ActivatedRoute,
    private router: Router,
     public toastrService: ToastrService) {
        this.route.paramMap.subscribe(params  => {
          this.requestedTicketObj = history.state.ticketData
          this.PTicket_id = this.requestedTicketObj.Ticket_Id
          this.PTicket_zone = this.requestedTicketObj.zone
          this.PTicket_pincode = this.requestedTicketObj.pincode
          console.log(this.requestedTicketObj);
          this.getPincodeDetails(this.requestedTicketObj.pincode)
        })      
      }

  ngOnInit(): void {
    this.loadData(); // list of perspectiveProviders
    this.myForm = this.formBuilder.group({
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
    const formData = this.myForm.value
    formData['zone'] = this.PTicket_zone
    formData['parent_pincode'] = this.PTicket_pincode
    formData['parent_ticket_id'] = this.PTicket_id
    console.log(formData)
    if (this.myForm.invalid) {
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
            this.myForm.reset();
          },
          (err:any) => {
            console.error(err)
            this.toastrService.error(err.error.non_field_errors[0], 'Incorrect', {
              closeButton: true,
            });
            // already register error not show/ working
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

  // Function to fetch pincode details from API
  getPincodeDetails(pincode: string): void {
    this.http.get(`https://api.postalpincode.in/pincode/${pincode}`).subscribe((response: any) => {
      if (response && response.length > 0 && response[0]?.Status === 'Success') {
        const data = response[0]?.PostOffice[0];
        this.myForm.patchValue({
          state: data?.State,
          city: data?.District,
          pincode: data?.Pincode
        });
      } else {
        // console.error('Invalid pincode or API response.');
        this.toastrService.error('Invalid pincode or API response', 'Error', {
          closeButton: true,
          timeOut: 5000,
        });
      }
    }, (error) => {
      // console.error('Error fetching pincode details:', error);
      this.toastrService.error('Error fetching pincode details', 'Error', {
        closeButton: true,
        timeOut: 5000,
      });
    });
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
