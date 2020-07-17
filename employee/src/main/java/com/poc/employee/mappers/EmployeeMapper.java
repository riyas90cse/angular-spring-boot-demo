package com.poc.employee.mappers;

import com.poc.employee.controller.EmployeeController;
import com.poc.employee.entity.Employee;
import com.poc.employee.json.EmployeeReqDto;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Component;

@Component
public class EmployeeMapper implements EntityMapper<EmployeeReqDto, Employee>{

    private final Logger LOG = LogManager.getLogger(EmployeeMapper.class);

    @Override
    public Employee map(EmployeeReqDto reqDto) {

        Employee employee = new Employee();
        employee.setName(reqDto.getName());
        employee.setEmail(reqDto.getEmail());
        employee.setContactNo(reqDto.getContactNo());
        employee.setCompanyName(reqDto.getCompanyName());
        employee.setDesignation(reqDto.getDesignation());
        employee.setSalary(Long.valueOf(reqDto.getSalary()));

        LOG.debug(employee.toString());
        return  employee;
    }
}
