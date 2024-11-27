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

    // POST request to update an existing employee
    def update() {
        def employeeParams = request.JSON
        if (!employeeParams.empId) {
            render(status: 400, text: "Employee empId must be provided.")
            return
        }

        def result = employeeService.updateEmployee(employeeParams.empId as String, employeeParams)
        if (result.status == 200) {
            respond result.employee, [status: result.status]
        } else {
            render(status: result.status, text: result.message)
        }
    }

    // DELETE request to delete an employee
  def delete() {
    def employeeParams = request.JSON
    log.info("Received delete request with parameters: ${employeeParams}")
    if (!employeeParams.empId) {
        render(status: 400, text: "Employee empId must be provided.")
        return
    }

    def result = employeeService.deleteEmployee(employeeParams.empId as String)
    if (result.status == 200) {
        render(status: 200, text: result.message)
    } else {
        render(status: result.status, text: result.message)
    }
}

    // GET request to list all employees
    def list() {
        try {
            def employees = Employee.list()
            respond employees, [status: 200]
        } catch (Exception e) {
            render(status: 500, text: "Internal server error: ${e.message}")
        }
    }

    // GET request to retrieve a single employee by ID (Long)
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

    // POST request to retrieve a single employee by empId from the request body
    def get() {
        def employeeParams = request.JSON
        if (!employeeParams.empId) {
            render(status: 400, text: "Employee empId must be provided.")
            return
        }

        def result = employeeService.getEmployeeByEmpId(employeeParams.empId as String)
        if (result.status == 200) {
            respond result.employee, [status: result.status]
        } else {
            render(status: result.status, text: result.message)
        }
    }
}
