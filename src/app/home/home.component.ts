import { Component } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  users?: any[];

  constructor(private accountService :AccountService){
    // if (this.accountService.userValue){
    //   this.accountService.getAllUsers().subscribe(user => this.users = user)
    // }
  }

}
