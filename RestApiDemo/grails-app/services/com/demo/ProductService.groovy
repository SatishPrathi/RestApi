package com.demo

import grails.gorm.transactions.Transactional

@Transactional
class ProductService {

    def createProduct(Map productParams, AppUser currentUser) {
        try {
            def product = new Product(productParams)
            product.owner = currentUser

            if (product.save(flush: true)) {
                return [status: 201, product: product]
            } else {
                return [status: 400, message: "Failed to create product. Errors: ${product.errors.allErrors.collect { it.defaultMessage }.join(', ')}"]
            }
        } catch (Exception e) {
            return [status: 500, message: "Internal server error while creating product. ${e.message}"]
        }
    }

    def updateProduct(String productId, Map productParams, AppUser currentUser) {
        try {
            def product = Product.findByProductId(productId)

            if (!product) {
                return [status: 404, message: "Product not found."]
            }

            def roles = currentUser.getAuthorities().collect { it.authority }
            def isAdmin = roles.contains('ROLE_PRODUCT_ADMIN')

            /*if (product.owner != currentUser && !isAdmin) {
                return [status: 403, message: "You do not have permission to update this product."]
            }*/

            product.properties = productParams

            if (product.save(flush: true)) {
                return [status: 200, product: product]
            } else {
                return [status: 400, message: "Failed to update product. Errors: ${product.errors.allErrors.collect { it.defaultMessage }.join(', ')}"]
            }
        } catch (Exception e) {
            return [status: 500, message: "Internal server error while updating product. ${e.message}"]
        }
    }

    def deleteProduct(String productId, AppUser currentUser) {
        try {
            def product = Product.findByProductId(productId)

            if (!product) {
                return [status: 404, message: "Product not found."]
            }

            def roles = currentUser.getAuthorities().collect { it.authority }
            def isAdmin = roles.contains('ROLE_PRODUCT_ADMIN')

            if (product.owner != currentUser && !isAdmin) {
                return [status: 403, message: "You do not have permission to delete this product."]
            }

            product.delete(flush: true)
            return [status: 200, message: "Product deleted successfully."]
        } catch (Exception e) {
            return [status: 500, message: "Internal server error while deleting product. ${e.message}"]
        }
    }

    def listProducts(AppUser currentUser) {
        try {
            def roles = currentUser.getAuthorities().collect { it.authority }

            def isAdmin = roles.contains('ROLE_PRODUCT_ADMIN')
            def isProductOwner = roles.contains('ROLE_PRODUCT_USER')

            def products
            if (isAdmin) {
                products = Product.list()
            } else if (isProductOwner) {
                products = Product.findAllByOwner(currentUser)
            } else {
                return [status: 403, message: "You do not have permission to view products."]
            }

            return [status: 200, products: products]
        } catch (Exception e) {
            return [status: 500, message: "Internal server error while listing products. ${e.message}"]
        }
    }
}