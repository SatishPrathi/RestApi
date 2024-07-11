// grails-app/controllers/com/demo/AuthenticationController.groovy

package com.demo

import grails.plugin.springsecurity.annotation.Secured

@Secured(['permitAll'])
class AuthenticationController {

    static responseFormats = ['json']

    def authenticate() {
        render status: 200, contentType: 'text/json', text: '{"status":"success"}'
    }

    def logout() {
        render status: 200, contentType: 'text/json', text: '{"status":"success"}'
    }
}
