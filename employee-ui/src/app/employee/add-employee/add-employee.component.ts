import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmployeeService} from "../../_services/employee.service";
import { Router } from '@angular/router';
import {FormValidatiors} from "../../_services/form-validatiors";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  public formGroup : FormGroup;

  constructor( public fb: FormBuilder,
               private router: Router,
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

  ngOnInit(): void {}

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
      return this.router.navigate(['/employee/']).then(r => {});
    });
  }

}
