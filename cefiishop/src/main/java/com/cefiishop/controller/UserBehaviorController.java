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

    // Endpoint pour enregistrer le produit consulté par un utilisateur, utile pour recommandation
    @PostMapping("/{userId}/view/{productId}")
    public ResponseEntity<Void> addProductView(
            @PathVariable Integer userId,
            @PathVariable Integer productId) {
        userBehaviorService.addProductView(userId, productId);
        return ResponseEntity.ok().build();
    }

    // Endpoint pour récupérer le comportement d'un utilisateur
    @GetMapping("/{userId}")
    public ResponseEntity<UserBehavior> getByUserId(@PathVariable Integer userId) {
        return ResponseEntity.ok(userBehaviorService.getByUserId(userId));
    }
}
