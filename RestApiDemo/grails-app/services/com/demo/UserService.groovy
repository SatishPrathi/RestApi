package com.demo

import grails.gorm.transactions.Transactional
import groovy.util.logging.Slf4j

@Slf4j
@Transactional
class UserService {

    def createUser(Map userParams) {
        try {
            log.info("Creating user with username: ${userParams.username} and role: ${userParams.role}")
            def role = SecurityRole.findByAuthority(userParams.role)
            if (!role) {
                log.info("Role ${userParams.role} not found. Creating new role.")
                role = new SecurityRole(authority: userParams.role).save(flush: true)
            }

            def user = new AppUser(username: userParams.username, password: userParams.password, enabled: true)
            if (user.save(flush: true)) {
                log.info("User ${user.username} created successfully with ID: ${user.id}")

                def userRole = new AppUserSecurityRole(appUser: user, securityRole: role).save(flush: true)
                if (userRole) {
                    log.info("Role ${role.authority} assigned to user ${user.username} successfully")
                } else {
                    log.error("Failed to assign role ${role.authority} to user ${user.username}")
                }

                return [status: 201, user: user]
            } else {
                log.error("Failed to create user. Errors: ${user.errors.allErrors.collect { it.defaultMessage }.join(', ')}")
                return [status: 400, message: "Failed to create user. Errors: ${user.errors.allErrors.collect { it.defaultMessage }.join(', ')}"]
            }
        } catch (Exception e) {
            log.error("Internal server error while creating user. ${e.message}", e)
            return [status: 500, message: "Internal server error while creating user. ${e.message}"]
        }
    }
}
