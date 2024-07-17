package com.demo

import grails.compiler.GrailsCompileStatic
import grails.gorm.annotation.Entity

@Entity
@GrailsCompileStatic
class Product {

    String productId
    String name
    Double price
    Double discount
    String location
    String category
    String owner

    static constraints = {
        productId nullable: false, blank: false, unique: true
        name nullable: false, blank: false
        price nullable: false
        discount nullable: false
        location nullable: false
        category nullable: false
        owner nullable: false
    }

    static mapping = {
        id name: 'productId', generator: 'assigned'
        version false
    }
}
