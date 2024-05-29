import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/_services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  openRequests: any;
  closedRequests: any;
  newRequests: any;

  constructor(private commonService: CommonService, private router: Router) { }
  
  onOpenRequestClick(requestTicket: any) {
    // Navigate to perspective component and pass Ticket_Id as a parameter
    this.router.navigate(['/empanelment/perspective'], { state: { ticketData: requestTicket } });
  }

  ngOnInit(): void {
    this.fetchRequests();
  }

  fetchRequests(): void {
    const url = '/tickets/';
    this.commonService.getMethod(url).subscribe((res: any) => {
      console.log(res);
      const data = res['data'];
      this.newRequests = data['newTickets'];
      this.openRequests = data['openTickets'];
      this.closedRequests = data['closedTickets']; // Corrected assignment
    },
    (error: any) => {
      console.error('Error fetching requests:', error);
    });
  }
}
