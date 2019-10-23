import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Access } from './access.model';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserAccessService {

  //private apiUrl = 'http://www.mocky.io/v2/5d6be5113300002c00346cdd';
  private apiUrl = "http://www.mocky.io/v2/5db05b492f00002901c13b72";

  constructor(private http:HttpClient) { }

  getUsersAccess(): Observable<Access> {
    return this.http.get<Access>(this.apiUrl)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }


}
