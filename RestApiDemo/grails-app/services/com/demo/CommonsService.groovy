package com.demo

import grails.gorm.transactions.Transactional

@Transactional
class CommonsService {

    AppUser getCurrentUser(String tokenHeader) {
        String token = tokenHeader?.split(" ")?.last()
        if (!token) {
            return null
        }

        AuthenticationToken authToken = AuthenticationToken.findByTokenValue(token)
        return authToken ? AppUser.findByUsername(authToken.username) : null
    }
}