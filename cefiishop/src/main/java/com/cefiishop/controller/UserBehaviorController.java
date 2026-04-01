package com.cefiishop.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cefiishop.model.UserBehavior;
import com.cefiishop.service.UserBehaviorService;

@RestController
@RequestMapping("/api/user-behavior")
public class UserBehaviorController {

    private final UserBehaviorService userBehaviorService;
    
    public UserBehaviorController(UserBehaviorService userBehaviorService) {
        this.userBehaviorService = userBehaviorService;
    }

    @PostMapping("/{userId}/view/{productId}")
    public ResponseEntity<UserBehavior> addProductView(
            @PathVariable Integer userId,
            @PathVariable Integer productId) {
        return ResponseEntity.ok(userBehaviorService.addProductView(userId, productId));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserBehavior> getByUserId(@PathVariable Integer userId) {
        return ResponseEntity.ok(userBehaviorService.getByUserId(userId));
    }
}
