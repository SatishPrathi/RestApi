package restapidemo

import com.demo.SecurityRole
import com.demo.AppUser
import com.demo.AppUserSecurityRole

class BootStrap {

    def init = { servletContext ->
        /*// Create and save the initial data within a transactional block
        def roleUser = new SecurityRole(authority: 'ROLE_USER')
        def roleEmployee = new SecurityRole(authority: 'ROLE_EMPLOYEE')

        if (!roleUser.save()) {
            roleUser.errors.allErrors.each { println it }
        }
        if (!roleEmployee.save()) {
            roleEmployee.errors.allErrors.each { println it }
        }

        def user1 = new AppUser(username: 'user1@example.com', password: 'password1', enabled: true, accountExpired: false, accountLocked: false, passwordExpired: false)
        def user2 = new AppUser(username: 'user2@example.com', password: 'password2', enabled: true, accountExpired: false, accountLocked: false, passwordExpired: false)

        if (!user1.save()) {
            user1.errors.allErrors.each { println it }
        }
        if (!user2.save()) {
            user2.errors.allErrors.each { println it }
        }

        AppUserSecurityRole.create(user1, roleUser)
        AppUserSecurityRole.create(user2, roleEmployee)

        AppUserSecurityRole.withSession {
            it.flush()
            it.clear()
        }*/
    }
}
