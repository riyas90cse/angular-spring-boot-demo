package com.poc.employee.json;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.util.UUID;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class EmployeeReqDto {

    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private UUID id;

    private String name;
    private String email;
    private String contactNo;
    private String companyName;
    private String designation;
    private String salary;
}
