// EmployeeController.groovy
package restapidemo

import com.demo.Employee
import grails.rest.RestfulController

class EmployeeController extends RestfulController<Employee> {
    static responseFormats = ['json', 'xml']

    EmployeeController() {
        super(Employee)
    }

    def update(Long id) {
        def employeeInstance = Employee.get(id)
        if (!employeeInstance) {
            notFound()
            return
        }

        if (request.JSON) {
            bindData(employeeInstance, request.JSON)
        } else {
            respond employeeInstance.errors, view:'edit'
            return
        }

        if (!employeeInstance.save(flush: true)) {
            respond employeeInstance.errors, view:'edit'
            return
        }

        respond employeeInstance, [status: OK]
    }
}
