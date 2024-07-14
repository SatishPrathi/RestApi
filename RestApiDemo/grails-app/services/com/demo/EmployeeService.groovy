package com.demo

import grails.gorm.transactions.Transactional

@Transactional
class EmployeeService {

    Employee updateEmployee(Long id, Map employeeParams) {
        Employee employeeInstance = Employee.get(id)
        if (!employeeInstance) {
            throw new IllegalArgumentException("Employee with id $id not found.")
        }

        // Update only the allowed fields if provided in employeeParams
        if (employeeParams.empFname) {
            employeeInstance.empFname = employeeParams.empFname
        }
        if (employeeParams.empLname) {
            employeeInstance.empLname = employeeParams.empLname
        }
        if (employeeParams.age) {
            employeeInstance.age = employeeParams.age
        }
        if (employeeParams.address) {
            employeeInstance.address = employeeParams.address
        }
        if (employeeParams.department) {
            employeeInstance.department = employeeParams.department
        }

        // Validate and save the updated employee instance
        if (!employeeInstance.validate()) {
            def validationErrors = employeeInstance.errors.allErrors.collect {
                "${it.field} ${it.defaultMessage}"
            }.join('; ')
            throw new RuntimeException("Validation failed while updating employee: $validationErrors")
        }

        if (!employeeInstance.save(flush: true)) {
            throw new RuntimeException("Error updating employee: ${employeeInstance.errors}")
        }

        return employeeInstance
    }

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
