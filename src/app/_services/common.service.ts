import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private http: HttpClient,
  ) { }

  postMethod(url:string, data:any){
    return this.http.post(`${environment.apiUrl}`+ url, data)
  }

  putMethod(url:string, data:any){
    return this.http.put(`${environment.apiUrl}`+ url, data)
  }

  getMethod(url:string){
    return this.http.get(`${environment.apiUrl}`+ url)
  }

  httpOptions = {
    Headers : new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }),
  }

  getMethodWithParams(url:string, queryParams: any){
    return this.http.get(`${environment.apiUrl}`+ url, {params: queryParams}, )
    //  .pipe(map(data => {
    //         return JSON.stringify(data);
    //     }));
  }


  private requestSubmittedSource = new Subject<void>();
  requestSubmitted$ = this.requestSubmittedSource.asObservable();

  notifyRequestSubmitted() {
    this.requestSubmittedSource.next();
  }


  // DC search Result
  private searchResults: any[] = [];
  private displayResults: any[] = [];
  private searchTerm: string = '';
  setResults(results: any[], displayResult: any[], term:string) {
    this.searchResults = results;
    this.displayResults = displayResult;
    this.searchTerm = term;
  }
  getResults() {
    return this.searchResults;
  }
  getDisplayResult() {
    return this.displayResults;
  }
  getSearchTerm() {
    return this.searchTerm;
  }
  
}
