package com.demo

import grails.rest.RestfulController
import grails.gorm.transactions.Transactional
import com.demo.AppUser
import com.demo.SecurityRole

class UserController extends RestfulController<AppUser> {
    static responseFormats = ['json', 'xml']

    UserController() {
        super(AppUser)
    }

    @Transactional
    def create() {
        def userParams = request.JSON
        def user = new AppUser(userParams)
        if (user.save(flush: true)) {
            respond user, status: 201
        } else {
            respond user.errors, status: 400
        }
    }
}
