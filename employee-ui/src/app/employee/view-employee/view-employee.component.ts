import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject} from "rxjs";
import {IEmployee} from "../../_interface/employee";
import {EmployeeService} from "../../_services/employee.service";
import {map} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {DataTableDirective} from "angular-datatables";

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnDestroy, OnInit {

  isModify: boolean;
  employees : IEmployee [];
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  public empId = this.actRoute.snapshot.params[ 'empId' ];

  constructor(private router: Router, public actRoute: ActivatedRoute, private employeeService: EmployeeService) {

  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.getAllEmployees();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  onRoute(modify: boolean, empId) {
    this.isModify = modify;
    if(this.isModify == true) {
      this.router.navigate([`/employee/edit/${empId}`]).then(r => {
        console.log('Navigate to Route Edit', r);
      });
    } else  {
      this.router.navigate(['/employee/add/']).then(r => {
        console.log('Navigate to Route Add', r);
      });
    }
  }

  // Get Employee list
  getAllEmployees() {
    return this.employeeService.getAll().pipe(map((data) => {
      return data;
    })).subscribe((employees) => {
      this.employees = employees;
      if (this.isDtInitialized) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
        });
      } else {
        this.isDtInitialized = true
        this.dtTrigger.next();
      }
      console.log('Get All Users', employees);
    });
  }

  // Delete Employee
  deleteEmployee(id) {
    if (window.confirm('Are you sure, you want to delete?')) {
      this.employeeService.delete(id).subscribe( response => {
        this.getAllEmployees();
        //this.router.navigate(['/employee/view']).then(r => {});
      },
      error => console.log(error));
    }
  }

}
