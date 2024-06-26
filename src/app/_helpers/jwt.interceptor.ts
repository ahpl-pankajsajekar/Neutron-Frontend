import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    urlsToNotUse : Array<string> = [
        'empanelment/non-empanelment/',
    ];

    constructor(private accountService: AccountService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const user = this.accountService.userValue;
        const isLoggedIn = user && user.token;
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        const isExcludedUrl = this.urlsToNotUse.some(url => request.url.includes(url));
        if (isLoggedIn && isApiUrl && !isExcludedUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `${user.token}`,
                    // Authorization: `${user.email}`,
                }
            });
        }
        return next.handle(request);
    }
    
}
