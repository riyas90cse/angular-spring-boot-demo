import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {IEmployee} from "../_interface/employee";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getById(empId): Observable<IEmployee> {
    return this.httpClient.get<IEmployee>(environment.apiUrl + '/employee/' + empId)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAll(): Observable<IEmployee[]> {
    return this.httpClient.get<IEmployee[]>(environment.apiUrl + '/employee/getAll')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  create(employee): Observable<IEmployee> {
    return this.httpClient.post<IEmployee>(environment.apiUrl + '/employee/save', JSON.stringify(employee), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  update(empId, employee): Observable<IEmployee> {
    return this.httpClient.put<IEmployee>(environment.apiUrl + '/employee/update', JSON.stringify(employee), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  delete(empId): Observable<any>{
    return this.httpClient.delete(environment.apiUrl + '/employee/delete/' + empId, { responseType: 'text' });
  }

  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
