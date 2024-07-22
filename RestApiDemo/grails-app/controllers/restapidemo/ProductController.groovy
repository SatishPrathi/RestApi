package com.demo

import grails.rest.RestfulController

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
    println "Received delete request with params: ${productParams}"

    if (!productParams.productId) {
        println "Product id not provided."
        render(status: 400, text: "Product id must be provided.")
        return
    }

    def currentUser = commonsService.getCurrentUser(request.getHeader("Authorization"))
    if (!currentUser) {
        println "Unauthorized user."
        render(status: 401, text: "Unauthorized")
        return
    }

    def result = productService.deleteProduct(productParams.productId, currentUser)
    println "Delete result: ${result}"
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
    /*def show() {
        def productId = params.id
        if (!productId) {
            render(status: 400, text: "Product id must be provided.")
            return
        }

        def currentUser = commonsService.getCurrentUser(request.getHeader("Authorization"))
        if (!currentUser) {
            render(status: 401, text: "Unauthorized")
            return
        }

        def product = Product.findByProductIdAndOwner(productId, currentUser)
        if (!product) {
            render(status: 404, text: "Product not found or you do not have permission to view this product.")
            return
        }*/

        //respond product, [status: 200]
   // }

