import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {EmployeeService} from "../../_services/employee.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  formGroup : FormGroup

  constructor( public fb: FormBuilder,
               private router: Router,
               public employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: [''],
      email: [''],
      contactNo: [''],
      companyName: [''],
      designation: [''],
      salary: [''],
    })
  }

  back() {
    window.history.back();
  }

  onSubmit() {
    if(this.formGroup.valid) {
      this.createEmployee();
    }
  }

  // Create Employee
  createEmployee() {
    this.employeeService.create(this.formGroup.value).subscribe(response => {
      console.log('Employee Created' , response);
      this.router.navigate(['/employee/']).then(r => {});
    });
  }

}
