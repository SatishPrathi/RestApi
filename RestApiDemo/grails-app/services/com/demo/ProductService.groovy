package com.demo

import grails.gorm.transactions.Transactional

@Transactional
class ProductService {

    Map createProduct(Map productParams, String role) {
        try {
            // Check if the role is authorized to create a product
            if (!role.equals("PRODUCT_OWNER")) {
                return [status: 403, message: "You do not have permission to create a product."]
            }

            Product product = new Product(productParams)
            if (!product.validate()) {
                def validationErrors = product.errors.allErrors.collect {
                    "${it.field} ${it.defaultMessage}"
                }.join('; ')
                return [status: 400, message: "Product validation failed: $validationErrors"]
            }

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

    Map updateProduct(String productId, Map productParams, String role) {
        try {
            // Check if the role is authorized to update a product
            if (!role.equals("PRODUCT_OWNER")) {
                return [status: 403, message: "You do not have permission to update this product."]
            }

            Product productInstance = Product.findByProductId(productId)
            if (!productInstance) {
                return [status: 404, message: "Product with id $productId not found."]
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

    Map deleteProduct(String productId, String role) {
        try {
            // Check if the role is authorized to delete a product
            if (!role.equals("PRODUCT_OWNER")) {
                return [status: 403, message: "You do not have permission to delete this product."]
            }

            Product productInstance = Product.findByProductId(productId)
            if (!productInstance) {
                return [status: 404, message: "Product with id $productId not found."]
            }

            productInstance.delete(flush: true)
            return [status: 200, message: "Product deleted successfully."]
        } catch (Exception e) {
            return [status: 500, message: "Internal server error: ${e.message}"]
        }
    }

    Map listProducts(String role) {
        try {
            // List products based on the role
            def products
            if (role.equals("PRODUCT_OWNER")) {
                products = Product.findAll()
            } else {
                products = Product.list()
            }
            return [status: 200, products: products]
        } catch (Exception e) {
            return [status: 500, message: "Internal server error: ${e.message}"]
        }
    }
}
