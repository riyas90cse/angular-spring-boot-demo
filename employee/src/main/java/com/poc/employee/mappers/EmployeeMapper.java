package com.poc.employee.mappers;

import com.poc.employee.entity.Employee;
import com.poc.employee.json.EmployeeReqDto;
import org.springframework.stereotype.Component;

@Component
public class EmployeeMapper implements EntityMapper<EmployeeReqDto, Employee>{

    @Override
    public Employee map(EmployeeReqDto reqDto) {
        System.out.println("Request DTO" + reqDto.toString());
        Employee employee = new Employee();
        employee.setName(reqDto.getName());
        employee.setEmail(reqDto.getEmail());
        employee.setContactNo(reqDto.getContactNo());
        employee.setCompanyName(reqDto.getCompanyName());
        employee.setDesignation(reqDto.getDesignation());
        employee.setSalary(Long.valueOf(reqDto.getSalary()));
        System.out.println("OBJECT :: " + reqDto.toString());
        return  employee;
    }
}
