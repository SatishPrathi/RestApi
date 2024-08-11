package com.demo

import grails.gorm.transactions.Transactional
import groovy.util.logging.Slf4j

@Slf4j
@Transactional
class AuthService {

    def authenticate(String username, String password) {
        try {
            def user = AppUser.findByUsername(username)
            if (user && user.password == password) {
                // Generate a token for the authenticated user
                def token = "some-unique-token-value"  // Replace with actual token generation logic

                // Retrieve roles
                def roles = AppUserSecurityRole.findAllByAppUser(user).collect { it.securityRole.authority }

                log.info("User ${username} authenticated successfully with roles: ${roles}")

                return [status: 200, token: token, roles: roles]
            } else {
                log.warn("Invalid credentials for user ${username}")

                return [status: 401, message: "Invalid credentials"]
            }
        } catch (Exception e) {
            log.error("Internal server error during authentication. ${e.message}", e)

            return [status: 500, message: "Internal server error during authentication. ${e.message}"]
        }
    }
}