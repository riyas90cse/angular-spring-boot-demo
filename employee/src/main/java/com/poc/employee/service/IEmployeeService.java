package com.poc.employee.service;

import com.poc.employee.entity.Employee;
import com.poc.employee.json.EmployeeReqDto;

import java.util.List;
import java.util.UUID;

public interface IEmployeeService {

    Employee saveEmployee(final Employee employee);

    List<Employee> getAllEmployees();

    Employee updateEmployee(EmployeeReqDto reqDto) throws Exception;

    Employee findEmployee(UUID id) throws Exception;

    void deleteEmployee(UUID id) throws Exception;

}
