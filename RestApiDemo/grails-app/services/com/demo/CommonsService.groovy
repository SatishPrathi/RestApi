package com.demo

import grails.gorm.transactions.Transactional
import com.demo.AppUser
import com.demo.AuthenticationToken

@Transactional
class CommonsService {

    AppUser getCurrentUser(String tokenHeader) {
        if (!tokenHeader?.startsWith('Bearer ')) {
            return null
        }

        String token = tokenHeader.substring(7)
        if (!token) {
            return null
        }

        AuthenticationToken authToken = AuthenticationToken.findByTokenValue(token)
        if (authToken) {
            return AppUser.findByUsername(authToken.username)
        } else {
            return null
        }
    }
}
