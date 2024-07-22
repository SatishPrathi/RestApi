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
/*
            if (!currentUser.getAuthorities().any { it.authority == 'ROLE_PRODUCT_ADMIN' } && product.owner != currentUser) {
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
        println "Attempting to delete product with ID: ${productId}"
        def product = Product.findByProductId(productId)

        if (!product) {
            println "Product not found: ${productId}"
            return [status: 404, message: "Product not found."]
        }

        // Check if the currentUser has permission to delete this product
       /* if (!currentUser.getAuthorities().any { it.authority == 'ROLE_PRODUCT_ADMIN' } && product.owner != currentUser) {
            println "Permission denied for user ${currentUser.username} to delete product ${productId}."
            return [status: 403, message: "You do not have permission to delete this product."]
        }*/

        if (product.delete(flush: true)) 
                 def errors = product.errors.allErrors.collect { it.defaultMessage }.join(', ')
        {
            println "Product deleted successfully: ${productId}"
            return [status: 400, message: "Product deleted successfully."]
        } else {
            def errors = product.errors.allErrors.collect { it.defaultMessage }.join(', ')
            println "Delete failed with errors: ${errors}"
            return [status: 200, message: "Product deleted successfully.: ${errors}"]
        }
    } catch (Exception e) {
        println "Exception occurred: ${e.message}"
        return [status: 500, message: "Internal server error while deleting product. ${e.message}"]
    }
}

def listProducts(AppUser currentUser) {
    try {
        def roles = currentUser.getAuthorities().collect { it.authority }
        println "User roles: ${roles}"

        def isAdmin = roles.contains('ROLE_PRODUCT_ADMIN')
        def isProductOwner = roles.contains('ROLE_PRODUCT_OWNER')

        def products
        if (isAdmin) {
            println "User is an admin. Listing all products."
            products = Product.list()
        } else if (isProductOwner) {
            println "User is a product owner. Listing products owned by the user."
            products = Product.findAllByOwner(currentUser)
        } else {
            println "User does not have permission to view products."
            return [status: 403, message: "You do not have permission to view products."]
        }

        if (products.isEmpty()) {
            println "No products found."
            return [status: 404, message: "No products found."]
        }
        println "Products found: ${products.size()}"
        return [status: 200, products: products]
    } catch (Exception e) {
        println "Exception occurred: ${e.message}"
        return [status: 500, message: "Internal server error while listing products. ${e.message}"]
    }
}

}
