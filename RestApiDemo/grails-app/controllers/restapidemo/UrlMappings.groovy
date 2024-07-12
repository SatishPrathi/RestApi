// UrlMappings.groovy
package restapidemo

class UrlMappings {
    static mappings = {
        "/employee/$id?"(controller: "employee", parseRequest: true) {
            action = [PUT: "update"]
        }
        "/employee"(controller: "employee", parseRequest: true) {
            action = [POST: "save"]
        }
        "/employee/list"(controller: "employee", parseRequest: true) {
            action = [GET: "list"]
        }
        "/employee/create"(controller: "employee", parseRequest: true) {
            action = [POST: "create"]
        }
        "/"(view: "/index")
        "500"(view:'/error')
    }
}
