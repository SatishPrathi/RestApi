package com.demo

import grails.rest.RestfulController
import grails.gorm.transactions.Transactional

@Transactional
class ProductController extends RestfulController<Product> {
    static responseFormats = ['json', 'xml']

    ProductService productService
    CommonsService commonsService

    ProductController(ProductService productService, CommonsService commonsService) {
        super(Product)
        this.productService = productService
        this.commonsService = commonsService
    }

    def create() {
        def productParams = request.JSON
        def currentUser = commonsService.getCurrentUser(request.getHeader("Authorization"))

        if (!currentUser) {
            log.warn("No current user found for token.")
            render(status: 401, text: "Unauthorized")
            return
        }

        if (!currentUser.getAuthorities().any { it.authority == 'ROLE_PRODUCT_USER' }) {
            log.warn("User ${currentUser.username} does not have ROLE_PRODUCT_USER.")
            render(status: 403, text: "You do not have permission to create products.")
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

        def currentUser = commonsService.getCurrentUser(request.getHeader("Authorization"))
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

        def currentUser = commonsService.getCurrentUser(request.getHeader("Authorization"))
        if (!currentUser) {
            render(status: 401, text: "Unauthorized")
            return
        }

        def result = productService.deleteProduct(productParams.productId, currentUser)
        render(status: result.status, text: result.message)
    }

    def list() {
        def currentUser = commonsService.getCurrentUser(request.getHeader("Authorization"))
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
}
