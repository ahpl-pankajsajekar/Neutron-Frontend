import { Component, HostListener  } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  title = 'Project Neutron'

  // after screen scroll top navbar hide
  isScrolled: boolean = false;
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    this.isScrolled = (window.pageYOffset > 0);
  }
  
  user?:User | null;

  constructor(private accountService: AccountService){
    this.accountService.user.subscribe(x => this.user = x)
  }

  logout(){
    this.accountService.logout()
  }

}
