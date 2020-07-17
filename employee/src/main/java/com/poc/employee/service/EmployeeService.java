package com.poc.employee.service;

import com.poc.employee.entity.Employee;
import com.poc.employee.json.EmployeeReqDto;
import com.poc.employee.repository.EmployeeRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class EmployeeService implements IEmployeeService {

    private final Logger LOG = LogManager.getLogger(EmployeeService.class);

    @Autowired
    private EmployeeRepository repository;

    @Override
    public Employee saveEmployee(Employee employee) {
        return repository.save(employee);
    }

    @Override
    public List<Employee> getAllEmployees() {
        return repository.getAllEmployees();
    }

    @Override
    public Employee updateEmployee(EmployeeReqDto reqDto) throws Exception {
        Optional<Employee> optional = repository.findById(reqDto.getId());
        if (optional.isPresent()) {
            Employee employee = optional.get();
            if(!StringUtils.isEmpty(reqDto.getName()))
                employee.setName(reqDto.getName());
            if(!StringUtils.isEmpty(reqDto.getEmail()))
                employee.setEmail(reqDto.getEmail());
            if(!StringUtils.isEmpty(reqDto.getContactNo()))
                employee.setContactNo(reqDto.getContactNo());
            if(!StringUtils.isEmpty(reqDto.getCompanyName()))
                employee.setCompanyName(reqDto.getCompanyName());
            if(!StringUtils.isEmpty(reqDto.getDesignation()))
                employee.setDesignation(reqDto.getDesignation());
            try {
                if(!StringUtils.isEmpty(reqDto.getSalary())) {
                    Long salary = Long.valueOf(reqDto.getSalary());
                    if(salary !=null && (salary > 0)) {
                        employee.setSalary(salary);
                    }
                }
            } catch (Exception e) {
              LOG.debug(e.getStackTrace());
            }
            repository.save(employee);
            return employee;
        }
        throw new Exception(String.format("Employee not found with Id %s" + reqDto.getId()));
    }

    @Override
    public Employee findEmployee(UUID id) throws Exception {
        Optional<Employee> optional = repository.findById(id);
        if(optional.isPresent()) {
            Employee employee = optional.get();
            return employee;
        }
        throw new Exception(String.format("Employee Not found with Id %s" + id));
    }

    @Override
    public void deleteEmployee(UUID id) throws Exception {
        repository.deleteById(id);
    }
}
