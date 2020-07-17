import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {Employee} from "../../_interface/employee";
import {EmployeeService} from "../../_services/employee.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnDestroy, OnInit {

  isModify: boolean;
  employees : Employee []
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
    this.getAllEmployees();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  onRoute(modify: boolean) {

  }

  // Get Employee list
  getAllEmployees() {
    return this.employeeService.getAll().pipe(map((data) => {
      return data;
    })).subscribe((employees) => {
      this.employees = employees;
      this.dtTrigger.next();
      console.log('Get All Users', employees);
    });
  }
}
