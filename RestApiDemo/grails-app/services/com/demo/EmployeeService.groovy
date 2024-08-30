package com.demo

import grails.gorm.transactions.Transactional

@Transactional
class EmployeeService {

    Map createEmployee(Map employeeParams) {
        try {
            Employee employee = new Employee(employeeParams)
            
            if (!employee.validate()) {
                def validationErrors = employee.errors.allErrors.collect {
                    "${it.field} ${it.defaultMessage}"
                }.join('; ')
                return [status: 400, message: "Employee validation failed: $validationErrors"]
            }

            if (!employee.save(flush: true)) {
                def saveErrors = employee.errors.allErrors.collect {
                    "${it.field} ${it.defaultMessage}"
                }.join('; ')
                return [status: 500, message: "Error saving employee: $saveErrors"]
            }

            return [status: 201, employee: employee]
        } catch (Exception e) {
            return [status: 500, message: "Internal server error: ${e.message}"]
        }
    }

    Map updateEmployee(String empId, Map employeeParams) {
        try {
            Employee employeeInstance = Employee.findByEmpId(empId)
            if (!employeeInstance) {
                return [status: 404, message: "Employee with empId $empId not found."]
            }

            employeeInstance.properties = employeeParams

            if (!employeeInstance.validate()) {
                def validationErrors = employeeInstance.errors.allErrors.collect {
                    "${it.field} ${it.defaultMessage}"
                }.join('; ')
                return [status: 400, message: "Validation failed while updating employee: $validationErrors"]
            }

            if (!employeeInstance.save(flush: true)) {
                def saveErrors = employeeInstance.errors.allErrors.collect {
                    "${it.field} ${it.defaultMessage}"
                }.join('; ')
                return [status: 500, message: "Error updating employee: $saveErrors"]
            }

            return [status: 200, employee: employeeInstance]
        } catch (Exception e) {
            return [status: 500, message: "Internal server error: ${e.message}"]
        }
    }

    Map deleteEmployee(String empId) {
        try {
            Employee employeeInstance = Employee.findByEmpId(empId)
            if (!employeeInstance) {
                return [status: 404, message: "Employee with empId $empId not found."]
            }

            employeeInstance.delete(flush: true)
            return [status: 200, message: "Employee deleted successfully."]
        } catch (Exception e) {
            return [status: 500, message: "Internal server error: ${e.message}"]
        }
    }

    // Method to get employee by ID
    Map getEmployeeById(Long id) {
        try {
            Employee employeeInstance = Employee.findById(id)
            if (employeeInstance) {
                return [status: 200, employee: employeeInstance]
            } else {
                return [status: 404, message: "Employee with ID $id not found."]
            }
        } catch (Exception e) {
            return [status: 500, message: "Internal server error: ${e.message}"]
        }
    }
}
