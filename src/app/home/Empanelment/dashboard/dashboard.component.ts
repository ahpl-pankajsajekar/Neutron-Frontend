import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonService } from 'src/app/_services/common.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy{

  private requestSubmittedSubscription: Subscription = new Subscription();

  openRequests: any;
  closedRequests: any;
  newRequests: any;

  constructor(private commonService: CommonService,
    public accountService: AccountService,
     private router: Router) { }
  
  onOpenRequestClick(requestTicket: any) {
    console.log(requestTicket, requestTicket?.requestType );
    if (this.accountService.getRole() == '1'){
      if(requestTicket?.requestType == 'Empanel'){
        // Navigate to perspective component and pass Ticket_Id as a parameter
        this.router.navigate(['/empanelment/perspective'], { state: { ticketData: requestTicket } });
      }
      else{
        this.router.navigate(['/empanelment/manage'], { state: { ticketData: requestTicket } });
      }
    }
  }

  ngOnInit(): void {
    this.fetchRequests();

    // call from RequestpageOperationComponent after submit form
    this.requestSubmittedSubscription = this.commonService.requestSubmitted$.subscribe(() => {
      this.fetchRequests();
    });
  }
  ngOnDestroy() {
    if (this.requestSubmittedSubscription) {
      this.requestSubmittedSubscription.unsubscribe();
    }
  }

  fetchRequests(): void {
    const url = '/tickets/';
    this.commonService.getMethod(url).subscribe((res: any) => {
      console.log(res);
      const data = res['data'];
      this.newRequests = data['newTickets'];
      this.openRequests = data['openTickets'];
      this.closedRequests = data['closedTickets']; // Corrected assignment
      console.log(this.closedRequests);
    },
    (error: any) => {
      console.error('Error fetching requests:', error);
    });
  }
}
