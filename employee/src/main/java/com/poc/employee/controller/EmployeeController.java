package com.poc.employee.controller;

import com.poc.employee.entity.Employee;
import com.poc.employee.json.EmployeeReqDto;
import com.poc.employee.json.EmployeeResDto;
import com.poc.employee.mappers.EmployeeMapper;
import com.poc.employee.service.EmployeeService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController extends BaseController {

    private final Logger LOG = LogManager.getLogger(EmployeeController.class);

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    @Qualifier("employeeMapper")
    private EmployeeMapper employeeMapper;

    @GetMapping(value = "/{empId}")
    public ResponseEntity<EmployeeResDto> getEmployee(@PathVariable("empId") String id) {
        EmployeeResDto employeeResDto;
        try {
            employeeResDto = mapper(employeeService.findEmployee(UUID.fromString(id)));
            return new ResponseEntity<>(employeeResDto, HttpStatus.OK);
        } catch (Exception e) {
            LOG.debug(e.getStackTrace());
            return new ResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(value = "/getAll")
    public ResponseEntity<List<EmployeeResDto>> getUserList() {
        List<EmployeeResDto> employeeResDtoList = new ArrayList<>();
        employeeResDtoList.addAll(getListOfEmployees());
        return new ResponseEntity<>(employeeResDtoList, HttpStatus.OK);
    }

    private List<EmployeeResDto> getListOfEmployees() {
        List<Employee> employees = employeeService.getAllEmployees();
        return mapperEmployees(employees);
    }

    @PostMapping(value = "/save")
    public ResponseEntity<EmployeeResDto> saveUser(@RequestBody EmployeeReqDto addOrEditUser) {
        Employee employee = employeeService.saveEmployee(employeeMapper.map(addOrEditUser));
        EmployeeResDto dto = mapper(employee);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @PutMapping(value = "/update")
    public ResponseEntity<EmployeeResDto> updateUser(@RequestBody EmployeeReqDto addOrEditUser) {
        try {
            Employee employee = employeeService.updateEmployee(addOrEditUser);
            EmployeeResDto dto = mapper(employee);
            return new ResponseEntity<>(dto, HttpStatus.OK);
        } catch (Exception e) {
            LOG.debug(e.getStackTrace());
            return new ResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping(value = "/delete")
    public ResponseEntity<String> deleteEmployee(@RequestParam(name = "empId") String id){
        try {
            employeeService.deleteEmployee(UUID.fromString(id));
        } catch (Exception e) {
            LOG.debug(e.getStackTrace());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("Deleted Successfully", HttpStatus.OK);
    }

}
