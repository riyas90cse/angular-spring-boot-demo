package com.poc.employee.controller;

import com.poc.employee.entity.Employee;
import com.poc.employee.json.EmployeeResDto;

import java.util.ArrayList;
import java.util.List;

public class BaseController {

    protected EmployeeResDto mapper(Employee employee) {
        EmployeeResDto dto = new EmployeeResDto();
        dto.setId(employee.getId());
        dto.setName(employee.getName());
        dto.setEmail(employee.getEmail());
        dto.setContactNo(employee.getContactNo());
        dto.setCompanyName(employee.getCompanyName());
        dto.setDesignation(employee.getDesignation());
        dto.setSalary(String.valueOf(employee.getSalary()));
        return dto;
    }

    protected List<EmployeeResDto> mapperEmployees(List<Employee> employees) {
        List<EmployeeResDto> resDtos = new ArrayList<>();
        employees.forEach(employee -> {
            EmployeeResDto dto = mapper(employee);
            resDtos.add(dto);
        });
        return resDtos;
    }

}
