package restapidemo

class UrlMappings {
    static mappings = {
        "/product/create"(controller: "product", action: "create", method: "POST")
        "/product/update"(controller: "product", action: "update", method: "PUT")
        "/product/delete"(controller: "product", action: "delete", method: "POST")
        "/product/list"(controller: "product", action: "list", method: "GET")

        // Other mappings
        "/"(view: "/index")
        "500"(view: '/error')
        "404"(view: '/notFound')
    }
}
