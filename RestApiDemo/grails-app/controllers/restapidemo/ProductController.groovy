package restapidemo

import com.demo.Product
import com.demo.ProductService
import grails.rest.RestfulController

class ProductController extends RestfulController<Product> {
    static responseFormats = ['json', 'xml']
    
    ProductService productService

    ProductController(ProductService productService) {
        super(Product)
        this.productService = productService
    }

    // POST request to create a new product
    def create() {
        def productParams = request.JSON
        def currentUser = getCurrentUser() // Fetch current user details
        def result = productService.createProduct(productParams, currentUser)

        if (result.status == 201) {
            respond result.product, [status: result.status]
        } else {
            render(status: result.status, text: result.message)
        }
    }

    // PUT request to update a product
    def update() {
        def productParams = request.JSON
        if (!productParams.productId) {
            render(status: 400, text: "Product id must be provided.")
            return
        }

        def currentUser = getCurrentUser() // Fetch current user details
        def result = productService.updateProduct(productParams.productId, productParams, currentUser)
        if (result.status == 200) {
            respond result.product, [status: result.status]
        } else {
            render(status: result.status, text: result.message)
        }
    }

    // DELETE request to delete a product
    def delete() {
        def productParams = request.JSON
        if (!productParams.productId) {
            render(status: 400, text: "Product id must be provided.")
            return
        }

        def currentUser = getCurrentUser() // Fetch current user details
        def result = productService.deleteProduct(productParams.productId, currentUser)
        render(status: result.status, text: result.message)
    }

    // GET request to list products
    def list() {
        def currentUser = getCurrentUser() // Fetch current user details
        def result = productService.listProducts(currentUser)
        if (result.status == 200) {
            respond result.products, [status: result.status]
        } else {
            render(status: result.status, text: result.message)
        }
    }

    private getCurrentUser() {
       
        return "satish kumar"
    }
}
