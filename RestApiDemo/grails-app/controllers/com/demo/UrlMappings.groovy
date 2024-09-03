package restapidemo

class UrlMappings {
    static mappings = {
        "/user/create"(controller: 'user', action: 'create', method: 'POST')
        "/api/login"(controller: "login", action: "login", method: "POST")
        "/product/create"(controller: "product", action: "create", method: "POST")
        "/product/update"(controller: "product", action: "update", method: "PUT")
        "/product/delete"(controller: "product", action: "delete", method: "DELETE")
        "/product/list"(controller: "product", action: "list", method: "GET")
         "/employee/create"(controller: 'employee', action: 'create', method: 'POST')
        "/employee/update"(controller: 'employee', action: 'update', method: 'POST')
        "/employee/delete"(controller: 'employee', action: 'delete', method: 'DELETE')
        "/employee/list"(controller: 'employee', action: 'list', method: 'GET')
        "/employee/get/$empId"(controller: 'employee', action: 'get', method: 'GET')
        "/employee/save"(controller: 'employee', action: 'save', method: 'POST')



        // Other mappings
        "/"(view: "/index")
        "500"(view: '/error')
        "404"(view: '/notFound')
    }
}
