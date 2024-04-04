import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  constructor(
    private router: Router,
    private accuntService: AccountService
  ){
    // redirect to home if user is already exist 
    if(this.accuntService.userValue){
      this.router.navigate(['/'])
    }
  }

}
