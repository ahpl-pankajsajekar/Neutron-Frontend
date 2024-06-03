import { Component, HostListener , OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  title = 'Project Neutron'

  // after screen scroll top navbar hide
  isScrolled: boolean = false;
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    this.isScrolled = (window.pageYOffset > 0);
  }
  
  user?:User | null;


  isNetworkRole : boolean = false;
  isLegalRole : boolean = false;
  isOperationRole : boolean = false;
  isITRole : boolean = false;
  isUserNotLoginTemp : boolean = false;
  constructor(private accountService: AccountService){
    this.accountService.user.subscribe(x => this.user = x)
    this.getRole()
    this.emailUser()
  }

  ngOnInit(): void {
  }

  logout(){
    this.accountService.logout()
  }

  emailUserName:any;
  emailUser(){
    const user = this.accountService.userValue
    this.emailUserName = user?.email?.split("@")[0]
  }

  getRole(){
    const user = this.accountService.userValue
    const role = user?.role || 0
    console.warn(role)
    if (role == String(1)) {
      this.isNetworkRole = true;
    }
    else if(role == String(2)){
      this.isLegalRole = true
    }
    else if(role == String(4)){
      this.isOperationRole = true
    }
    else if(role == String(0)){
      this.isUserNotLoginTemp = true
    }
    else{
      this.isITRole = true
    }
  }

}
