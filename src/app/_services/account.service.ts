import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
   }

   public get userValue() {
    return this.userSubject.value;
  }

  public get emailValue() {
    return this.userSubject.value?.email;
  }

  login(email: string, password: string) {
    return this.http.post<User>(`${environment.apiUrl}/api/account/login/`, { email, password })
        .pipe(map((res:any) => {
            const user = res.data
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
            return user;
        }));
  }


  getRole(): string {
    const user = this.userValue;
    const role = user?.role || '0';
    return role;
  }

  register(user: User) {
    return this.http.post<User>(`${environment.apiUrl}/api/account/register/`, user);
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    localStorage.clear()
    this.userSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  getAllUsers(){
    return this.http.get<User[]>(`${environment.apiUrl}/users`)
  }


}
