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

            if (!currentUser.getAuthorities().any { it.authority == 'ROLE_PRODUCT_ADMIN' } && product.owner != currentUser) {
                return [status: 403, message: "You do not have permission to update this product."]
            }

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

            if (!currentUser.getAuthorities().any { it.authority == 'ROLE_PRODUCT_ADMIN' } && product.owner != currentUser) {
                return [status: 403, message: "You do not have permission to delete this product."]
            }

            if (product.delete(flush: true)) {
                return [status: 200, message: "Product deleted successfully."]
            } else {
                return [status: 400, message: "Failed to delete product. Errors: ${product.errors.allErrors.collect { it.defaultMessage }.join(', ')}"]
            }
        } catch (Exception e) {
            return [status: 500, message: "Internal server error while deleting product. ${e.message}"]
        }
    }

    def listProducts(AppUser currentUser) {
        try {
            def isAdmin = currentUser.getAuthorities().any { it.authority == 'ROLE_PRODUCT_ADMIN' }
            
            def products
            if (isAdmin) {
                products = Product.list()
            } else {
                products = Product.findAllByOwner(currentUser)
            }
            
            if (!products) {
                return [status: 404, message: "No products found."]
            }
            return [status: 200, products: products]
        } catch (Exception e) {
            return [status: 500, message: "Internal server error while listing products. ${e.message}"]
        }
    }
}
