import { Component, OnInit } from '@angular/core';
import { error } from 'jquery';
import { CommonService } from 'src/app/_services/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  openRequests: any;
  closedRequests: any;
  newRequests: any;

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.fetchRequests();
  }

  fetchRequests(): void {
    const url = 'tickets/'
    this.commonService.getMethod(url).subscribe((res: any) => {
      console.log(res)
      const data = res['data']
      this.newRequests = data['newTickets'];
      this.openRequests =  data['openTickets'];
      this.closedRequests = data['newTickets'];
    },
    (error: any)=>{
    }
  );

  }
}
