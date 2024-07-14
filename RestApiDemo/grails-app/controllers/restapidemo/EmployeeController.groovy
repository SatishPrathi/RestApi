package restapidemo

import com.demo.Employee
import com.demo.EmployeeService
import grails.rest.RestfulController
import static org.springframework.http.HttpStatus.*

class EmployeeController extends RestfulController<Employee> {
    static responseFormats = ['json', 'xml']

    EmployeeService employeeService

    EmployeeController(EmployeeService employeeService) {
        super(Employee)
        this.employeeService = employeeService
    }

    // PUT request to update an employee
    def update() {
        def employeeParams = request.JSON
        if (!employeeParams.id) {
            render(status: BAD_REQUEST, text: "Employee id must be provided.")
            return
        }

        try {
            Employee employeeInstance = employeeService.updateEmployee(employeeParams.id, employeeParams)
            respond employeeInstance, [status: OK]
        } catch (RuntimeException e) {
            render(status: BAD_REQUEST, text: e.message)
        }
    }

    // POST request to create a new employee
    def create() {
        def employeeParams = request.JSON
        try {
            Employee employeeInstance = employeeService.createEmployee(employeeParams)
            respond employeeInstance, [status: CREATED]
        } catch (RuntimeException e) {
            render(status: BAD_REQUEST, text: e.message)
        }
    }
}
