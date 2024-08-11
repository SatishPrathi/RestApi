package com.demo

import grails.rest.RestfulController

class AuthController extends RestfulController {
    static responseFormats = ['json', 'xml']
    AuthService authService

    AuthController(AuthService authService) {
        super()
        this.authService = authService
    }

    def login() {
        def authParams = request.JSON
        def result = authService.authenticate(authParams.username, authParams.password)
        if (result.status == 200) {
            respond([username: authParams.username, roles: result.roles, token_type: "Bearer", access_token: result.token], [status: result.status])
        } else {
            render(status: result.status, text: result.message)
        }
    }
}