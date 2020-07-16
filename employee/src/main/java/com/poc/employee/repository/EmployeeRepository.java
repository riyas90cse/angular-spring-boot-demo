package com.poc.employee.repository;

import com.poc.employee.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface EmployeeRepository  extends JpaRepository<Employee, UUID> {

    Optional<Employee> findById(UUID id);

    @Query("select e from Employee e")
    List<Employee> getAllEmployees();

    @Query("select e from Employee e where e.id = :id")
    Optional<Employee> getEmployeeById(@Param("id") UUID id);

    @Query("select e from Employee e where e.name = :name")
    Optional<Employee> getEmployeeByName(@Param("name") String name);

    @Query("select e from Employee e where e.email = :email")
    Optional<Employee> getEmployeeByEmail(@Param("email") String email);
}
