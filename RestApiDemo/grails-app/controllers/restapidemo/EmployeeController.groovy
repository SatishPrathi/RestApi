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
    def update(Long id) {
        def employeeInstance = Employee.get(id)
        if (!employeeInstance) {
            notFound()
            return
        }

        if (request.JSON) {
            bindData(employeeInstance, request.JSON)
        } else {
            respond employeeInstance.errors, view: 'edit'
            return
        }

        if (!employeeInstance.save(flush: true)) {
            respond employeeInstance.errors, view: 'edit'
            return
        }

        respond employeeInstance, [status: OK]
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
