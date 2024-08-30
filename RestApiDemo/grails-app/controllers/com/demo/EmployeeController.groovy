package restapidemo

import com.demo.Employee
import com.demo.EmployeeService
import grails.rest.RestfulController

class EmployeeController extends RestfulController<Employee> {
    static responseFormats = ['json', 'xml']

    EmployeeService employeeService

    EmployeeController(EmployeeService employeeService) {
        super(Employee)
        this.employeeService = employeeService
    }

    // POST request to create a new employee
    def create() {
        def employeeParams = request.JSON
        def result = employeeService.createEmployee(employeeParams)

        if (result.status == 201) {
            respond result.employee, [status: result.status]
        } else {
            render(status: result.status, text: result.message)
        }
    }

    // PUT request to update an employee
    def update() {
        def employeeParams = request.JSON
        if (!employeeParams.empId) {
            render(status: 400, text: "Employee empId must be provided.")
            return
        }

        def result = employeeService.updateEmployee(employeeParams.empId, employeeParams)
        if (result.status == 200) {
            respond result.employee, [status: result.status]
        } else {
            render(status: result.status, text: result.message)
        }
    }

    // DELETE request to delete an employee
    def delete() {
        def employeeParams = request.JSON
        if (!employeeParams.empId) {
            render(status: 400, text: "Employee empId must be provided.")
            return
        }

        def result = employeeService.deleteEmployee(employeeParams.empId)
        if (result.status == 200) {
            render(status: result.status, text: result.message)
        } else {
            render(status: result.status, text: result.message)
        }
    }

    // GET request to list all employees
    def list() {
        try {
            def employees = Employee.list() // Fetch all employees from the database
            respond employees, [status: 200] // Respond with the list of employees in JSON/XML format
        } catch (Exception e) {
            render(status: 500, text: "Internal server error: ${e.message}")
        }
    }

    // GET request to retrieve a single employee by ID
    def show(Long id) {
        try {
            def result = employeeService.getEmployeeById(id)
            if (result.status == 200) {
                respond result.employee, [status: result.status]
            } else {
                render(status: result.status, text: result.message)
            }
        } catch (Exception e) {
            render(status: 500, text: "Internal server error: ${e.message}")
        }
    }

    // GET method to retrieve an employee by empId
    def get(Long empId) {
        try {
            def result = employeeService.getEmployeeById(empId)
            if (result.status == 200) {
                respond result.employee, [status: result.status]
            } else {
                render(status: result.status, text: result.message)
            }
        } catch (Exception e) {
            render(status: 500, text: "Internal server error: ${e.message}")
        }
    }

    // PUT method to update and save an employee
    def save() {
        def employeeParams = request.JSON
        if (!employeeParams.empId) {
            render(status: 400, text: "Employee empId must be provided.")
            return
        }

        def result = employeeService.updateEmployee(employeeParams.empId, employeeParams)
        if (result.status == 200) {
            respond result.employee, [status: result.status]
        } else {
            render(status: result.status, text: result.message)
        }
    }
}
