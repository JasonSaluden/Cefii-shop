package com.cefiishop.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cefiishop.dto.CategoryResponse;
import com.cefiishop.service.CategoryService;

// Contrôleur pour gérer les endpoints liés aux catégories de produits
@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "*")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    // Récupère toutes les catégories disponibles
    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    // Récupère une catégorie spécifique par son ID
    @GetMapping("/{id}")
    public ResponseEntity<CategoryResponse> getCategoryById(@PathVariable Integer id) {
        return ResponseEntity.ok(categoryService.getCategoryById(id));
    }

    // Récupère une catégorie spécifique par son nom
    @GetMapping("/search")
    public ResponseEntity<CategoryResponse> getCategoryByNom(@RequestParam String nom) {
        return ResponseEntity.ok(categoryService.getCategoryByNom(nom));
    }
}
