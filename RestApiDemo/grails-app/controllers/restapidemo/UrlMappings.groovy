package restapidemo

class UrlMappings {
    static mappings = {
        "/employee/create"(controller: "employee", action: "create", method: "POST")
        "/employee/update"(controller: "employee", action: "update", method: "PUT")
        "/employee/delete"(controller: "employee", action: "delete", method: "POST")

        // Other mappings
        "/"(view: "/index")
        "500"(view:'/error')
        "404"(view:'/notFound')
    }
}
