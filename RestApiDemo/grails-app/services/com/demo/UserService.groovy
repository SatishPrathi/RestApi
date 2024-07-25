package com.demo

import grails.gorm.transactions.Transactional
import com.demo.AppUser
import com.demo.SecurityRole
import com.demo.AppUserSecurityRole

@Transactional
class UserService {

    def createUser(Map userParams) {
        try {
            def role = SecurityRole.findByAuthority(userParams.role)
            if (!role) {
                role = new SecurityRole(authority: userParams.role).save(flush: true)
            }

            def user = new AppUser(username: userParams.username, password: userParams.password, enabled: true)
            if (user.save(flush: true)) {
                AppUserSecurityRole.create(user, role, true)
                return [status: 201, user: user]
            } else {
                return [status: 400, message: "Failed to create user. Errors: ${user.errors.allErrors.collect { it.defaultMessage }.join(', ')}"]
            }
        } catch (Exception e) {
            return [status: 500, message: "Internal server error while creating user. ${e.message}"]
        }
    }
}
