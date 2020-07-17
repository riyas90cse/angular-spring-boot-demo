import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "../../_services/employee.service";
import {FormValidatiors} from "../../_services/form-validatiors";
import {IEmployee} from "../../_interface/employee";

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  public formGroup : FormGroup;
  public empId : string;
  public empData : IEmployee;

  constructor(public fb: FormBuilder,
              private router: Router,
              public actRoute: ActivatedRoute,
              public employeeService: EmployeeService) {
    this.formGroup = this.fb.group({
      name: ['', Validators.required ],
      email: ['', Validators.compose([FormValidatiors.emailValidator]) ],
      contactNo: ['', Validators.required],
      companyName: [''],
      designation: [''],
      salary: [''],
    });
  }

  ngOnInit(): void {
    this.empId = this.actRoute.snapshot.params[ 'empId' ];
    console.log("ID" , this.empId);
    this.employeeService.getById(this.empId).subscribe((empData) => {
      console.log('User Data : ', empData);
      this.formGroup.patchValue({
        name: empData.name,
        email: empData.email,
        contactNo: empData.contactNo,
        companyName: empData.companyName,
        designation: empData.designation,
        salary: empData.salary
      });
      this.empData = empData;
    });
  }

  onSubmit() {
    this.updateEmployee();
  }

  updateEmployee() {
    const empData = { ...this.empData, ...this.formGroup.value };
    this.employeeService.update(this.empId, empData).subscribe((data: {}) => {
      console.log('Data in update User', data);
      return this.router.navigate(['/employee/']).then(r => {});
    });
  }

  back() {
    window.history.back();
  }
}
