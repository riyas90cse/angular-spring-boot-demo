import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Employee} from "../_interface/employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiServer = "http://localhost:8080/api";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }

  constructor(private httpClient: HttpClient) { }

  create(employee): Observable<Employee> {
    return this.httpClient.post<Employee>(this.apiServer + '/employee/save', JSON.stringify(employee), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getById(id): Observable<Employee> {
    return this.httpClient.get<Employee>(this.apiServer + '/employee/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAll(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.apiServer + '/employee/getAll')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  update(id, employee): Observable<Employee> {
    return this.httpClient.put<Employee>(this.apiServer + '/employee/update' + id, JSON.stringify(employee), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  delete(id){
    return this.httpClient.delete<Employee>(this.apiServer + '/employee/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
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
