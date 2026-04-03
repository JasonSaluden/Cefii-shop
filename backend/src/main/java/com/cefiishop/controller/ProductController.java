package com.cefiishop.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cefiishop.dto.ProductResponse;
import com.cefiishop.service.ProductService;
import com.cefiishop.service.RecommendationService;

// Contrôleur pour gérer les endpoints liés aux produits, notamment pour récupérer tous les produits, 
// récupérer un produit par son ID, rechercher des produits par nom,
@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductService productService;
    private final RecommendationService recommendationService;

    public ProductController(ProductService productService, RecommendationService recommendationService) {
        this.productService = productService;
        this.recommendationService = recommendationService;
    }

    // Récupère tous les produits disponibles
    @GetMapping
    public ResponseEntity<List<ProductResponse>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    // Récupère un produit spécifique par son ID
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable Integer id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    // Recherche des produits par nom 
    @GetMapping("/search")
    public ResponseEntity<List<ProductResponse>> searchByNom(@RequestParam String nom) {
        return ResponseEntity.ok(productService.searchByNom(nom));
    }

    // Récupère les produits d'une catégorie donnée
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<ProductResponse>> getProductsByCategory(@PathVariable Integer categoryId) {
        return ResponseEntity.ok(productService.getProductsByCategory(categoryId));
    }

    // Récupère les produits disponibles (en stock)
    @GetMapping("/available")
    public ResponseEntity<List<ProductResponse>> getAvailableProducts() {
        return ResponseEntity.ok(productService.getAvailableProducts());
    }

    // Récupère les produits d'une catégorie donnée triés par prix
    @GetMapping("/category/{categoryId}/sorted")
    public ResponseEntity<List<ProductResponse>> getProductsByCategoryOrderByPrice(@PathVariable Integer categoryId) {
        return ResponseEntity.ok(productService.getProductsByCategoryOrderByPrice(categoryId));
    }

    // Récupère les recommandations de produits similaires à un produit donné
    @GetMapping("/{id}/recommendations")
    public ResponseEntity<List<ProductResponse>> getRecommendations(@PathVariable Integer id) {
        return ResponseEntity.ok(recommendationService.getRecommendations(id));
    }
}
