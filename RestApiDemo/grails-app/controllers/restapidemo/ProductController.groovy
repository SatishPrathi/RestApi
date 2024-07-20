package com.demo
import grails.rest.RestfulController

class ProductController extends RestfulController<Product> {
    static responseFormats = ['json', 'xml']
    
    ProductService productService

    ProductController(ProductService productService) {
        super(Product)
        this.productService = productService
    }

    def create() {
        def productParams = request.JSON
        def currentUser = getCurrentUser()

        if (!currentUser) {
            render(status: 401, text: "Unauthorized")
            return
        }

        def result = productService.createProduct(productParams, currentUser)
        if (result.status == 201) {
            respond result.product, [status: result.status]
        } else {
            render(status: result.status, text: result.message)
        }
    }

    def update() {
        def productParams = request.JSON
        if (!productParams.productId) {
            render(status: 400, text: "Product id must be provided.")
            return
        }

        def currentUser = getCurrentUser()
        if (!currentUser) {
            render(status: 401, text: "Unauthorized")
            return
        }

        def result = productService.updateProduct(productParams.productId, productParams, currentUser)
        if (result.status == 200) {
            respond result.product, [status: result.status]
        } else {
            render(status: result.status, text: result.message)
        }
    }

    def delete() {
        def productParams = request.JSON
        if (!productParams.productId) {
            render(status: 400, text: "Product id must be provided.")
            return
        }

        def currentUser = getCurrentUser()
        if (!currentUser) {
            render(status: 401, text: "Unauthorized")
            return
        }

        def result = productService.deleteProduct(productParams.productId, currentUser)
        render(status: result.status, text: result.message)
    }

    def list() {
        def currentUser = getCurrentUser()
        if (!currentUser) {
            render(status: 401, text: "Unauthorized")
            return
        }

        def result = productService.listProducts(currentUser)
        if (result.status == 200) {
            respond result.products, [status: result.status]
        } else {
            render(status: result.status, text: result.message)
        }
    }

    def show() {
        def productId = params.id
        if (!productId) {
            render(status: 400, text: "Product id must be provided.")
            return
        }

        def currentUser = getCurrentUser()
        if (!currentUser) {
            render(status: 401, text: "Unauthorized")
            return
        }

        def product = Product.findByProductIdAndOwner(productId, currentUser)
        if (!product) {
            render(status: 404, text: "Product not found or you do not have permission to view this product.")
            return
        }

        respond product, [status: 200]
    }

    private AppUser getCurrentUser() {
        String token = request.getHeader("Authorization")?.split(" ")?.last()
        if (!token) {
            return null
        }

        AuthenticationToken authToken = AuthenticationToken.findByTokenValue(token)
        return authToken ? AppUser.findByUsername(authToken.username) : null
    }
}
