package com.demo

import grails.gorm.transactions.Transactional

@Transactional
class EmployeeService {

    Employee createEmployee(Map employeeParams) {
        Employee employee = new Employee(employeeParams)
        if (employee.validate()) {
            employee.save(flush: true)
            return employee
        } else {
            throw new RuntimeException("Employee validation failed: ${employee.errors}")
        }
    }
}
