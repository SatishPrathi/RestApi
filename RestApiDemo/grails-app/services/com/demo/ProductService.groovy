package com.demo

import grails.gorm.transactions.Transactional

@Transactional
class ProductService {

    Map createProduct(Map productParams, String owner) {
        try {
            // Validate if required fields are present
            if (!productParams.name || !productParams.price || !productParams.discount || !productParams.location || !productParams.category) {
                return [status: 400, message: "Required fields missing for creating product."]
            }

            // Create a new Product instance
            Product product = new Product(productParams)
            product.owner = owner // Set the owner from the logged-in user

            // Validate the product instance
            if (!product.validate()) {
                def validationErrors = product.errors.allErrors.collect {
                    "${it.field} ${it.defaultMessage}"
                }.join('; ')
                return [status: 400, message: "Product validation failed: $validationErrors"]
            }

            // Save the product instance
            if (!product.save(flush: true)) {
                def saveErrors = product.errors.allErrors.collect {
                    "${it.field} ${it.defaultMessage}"
                }.join('; ')
                return [status: 400, message: "Error creating product: $saveErrors"]
            }

            return [status: 201, product: product]
        } catch (Exception e) {
            return [status: 500, message: "Internal server error: ${e.message}"]
        }
    }

    Map updateProduct(String productId, Map productParams, String owner) {
        try {
            // Find the existing product by productId
            Product productInstance = Product.findByProductId(productId)
            if (!productInstance) {
                return [status: 404, message: "Product with id $productId not found."]
            }

            // Check ownership and authorization
            if (!productInstance.owner.equals(owner)) {
                return [status: 403, message: "You do not have permission to update this product."]
            }

            // Update allowed fields if provided in productParams
            if (productParams.name) {
                productInstance.name = productParams.name
            }
            if (productParams.price) {
                productInstance.price = productParams.price
            }
            if (productParams.discount) {
                productInstance.discount = productParams.discount
            }
            if (productParams.location) {
                productInstance.location = productParams.location
            }
            if (productParams.category) {
                productInstance.category = productParams.category
            }

            // Validate and save the updated product instance
            if (!productInstance.validate()) {
                def validationErrors = productInstance.errors.allErrors.collect {
                    "${it.field} ${it.defaultMessage}"
                }.join('; ')
                return [status: 400, message: "Validation failed while updating product: $validationErrors"]
            }

            if (!productInstance.save(flush: true)) {
                def saveErrors = productInstance.errors.allErrors.collect {
                    "${it.field} ${it.defaultMessage}"
                }.join('; ')
                return [status: 400, message: "Error updating product: $saveErrors"]
            }

            return [status: 200, product: productInstance]
        } catch (Exception e) {
            return [status: 500, message: "Internal server error: ${e.message}"]
        }
    }

    Map deleteProduct(String productId, String owner) {
        try {
            // Find the existing product by productId
            Product productInstance = Product.findByProductId(productId)
            if (!productInstance) {
                return [status: 404, message: "Product with id $productId not found."]
            }

            // Check ownership and authorization
            if (!productInstance.owner.equals(owner)) {
                return [status: 403, message: "You do not have permission to delete this product."]
            }

            // Delete the product instance
            productInstance.delete(flush: true)
            return [status: 200, message: "Product deleted successfully."]
        } catch (Exception e) {
            return [status: 500, message: "Internal server error: ${e.message}"]
        }
    }

    Map listProducts(String owner) {
        try {
            // List products based on the owner
            def products = Product.findAllByOwner(owner)
            return [status: 200, products: products]
        } catch (Exception e) {
            return [status: 500, message: "Internal server error: ${e.message}"]
        }
    }
}
