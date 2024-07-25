package com.demo

import grails.gorm.transactions.Transactional
import com.demo.AppUser

@Transactional
class AuthService {

    def authenticate(String username, String password) {
        try {
            def user = AppUser.findByUsername(username)
            if (user && user.password == password) {
                // Generate and return a token for the authenticated user
                def token = "some-unique-token-value"
                
                // Retrieve roles
                def roles = user.getAuthorities().collect { it.authority }
                
                return [status: 200, token: token, roles: PRODUCT_USER]
            } else {
                return [status: 401, message: "Invalid credentials"]
            }
        } catch (Exception e) {
            return [status: 500, message: "Internal server error during authentication. ${e.message}"]
        }
    }
}
