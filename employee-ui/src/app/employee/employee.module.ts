import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import {RouterModule, Routes} from "@angular/router";
import {DataTablesModule} from "angular-datatables";
import {HttpClientModule} from "@angular/common/http";
import {EmployeeService} from "../_services/employee.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  { path: '', redirectTo: 'view', pathMatch: 'full'},
  { path: 'view', component: ViewEmployeeComponent },
  {
    path: '',
    children: [
      { path: 'add', component: AddEmployeeComponent },
      { path : 'edit/:empId', component: EditEmployeeComponent }
    ]
  }
];

const httpModules = [ HttpClientModule ];

@NgModule({
  declarations: [
    AddEmployeeComponent,
    EditEmployeeComponent,
    ViewEmployeeComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    HttpClientModule,
    FormsModule,
    ...httpModules,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  providers: [
    EmployeeService
  ]
})
export class EmployeeModule { }
