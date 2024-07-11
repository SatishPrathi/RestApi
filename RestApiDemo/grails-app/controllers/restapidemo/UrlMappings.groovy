// UrlMappings.groovy
package restapidemo

class UrlMappings {
    static mappings = {
        "/Employee/$id?"(controller: "employee", parseRequest: true) {
            action = [PUT: "update"]
        }
        "/Employee"(controller: "employee", parseRequest: true) {
            action = [POST: "save"]
        }
        "/Employee/list"(controller: "employee", parseRequest: true) {
            action = [GET: "list"]
        }
        "/"(view: "/index")
        "500"(view:'/error')
    }
}
