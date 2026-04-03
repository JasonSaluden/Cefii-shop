package com.cefiishop.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cefiishop.dto.ProductResponse;
import com.cefiishop.service.RecommendationService;

// Contrôleur pour gérer les endpoints liés à la page d'accueil
@RestController
@RequestMapping("/api/home")
@CrossOrigin(origins = "*")
public class HomeController {

    private final RecommendationService recommendationService;

    public HomeController(RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    // Récupère les recommandations personnalisées pour un utilisateur
    @GetMapping("/recommendations/{userId}")
    public ResponseEntity<List<ProductResponse>> getRecommendations(@PathVariable Integer userId) {
        return ResponseEntity.ok(recommendationService.getPersonalizedRecommantations(userId));
    }
}
