package com.poc.employee.mappers;

public interface EntityMapper<I, O> {
    O map(I input) throws Exception;
}
