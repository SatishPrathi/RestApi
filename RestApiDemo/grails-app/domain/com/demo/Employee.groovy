package com.demo

import grails.compiler.GrailsCompileStatic
import grails.gorm.annotation.Entity

@Entity
@GrailsCompileStatic
class Employee {

    String empId
    String empFname
    String empLname
    int age
    String address
    String department

    static constraints = {
        empId nullable: false, blank: false, unique: true
        empFname nullable: false, blank: false
        empLname nullable: false, blank: false
        age nullable: false, min: 18
        address nullable: true
        department nullable: true
    }
    
    static mapping = {
        id name: 'empId', generator: 'assigned'
        version false
    }
}
