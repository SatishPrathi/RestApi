package com.demo

class Employee implements Serializable {

    private static final long serialVersionUID = 1

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
}
