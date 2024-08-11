package com.demo

import grails.rest.RestfulController
import grails.gorm.transactions.Transactional

class UserController extends RestfulController<AppUser> {
    static responseFormats = ['json', 'xml']
    UserService userService

    UserController(UserService userService) {
        super(AppUser)
        this.userService = userService
    }

    @Transactional
    def create() {
        def userParams = request.JSON
        def result = userService.createUser(userParams)
        if (result.status == 201) {
            respond result.user, status: 201
        } else {
            render status: result.status, text: result.message
        }
    }
}