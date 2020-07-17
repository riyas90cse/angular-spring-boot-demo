package com.poc.employee.json;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import java.util.UUID;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class EmployeeResDto {

    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @JsonIgnore
    private UUID id;

    private String name;
    private String email;
    private String contactNo;
    private String companyName;
    private String designation;
    private String salary;
}
