package com.cefiishop.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.cefiishop.dto.CategoryResponse;
import com.cefiishop.model.Category;
import com.cefiishop.repository.CategoryRepository;

// Service pour gérer les opérations liées aux catégories de produits, avec des méthodes pour récupérer toutes les catégories, 
// une catégorie par ID et une catégorie par nom, en utilisant le repository de catégories pour accéder à la base de données et en mappant les entités Category vers des DTO CategoryResponse pour la réponse
@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // Méthode pour récupérer toutes les catégories
    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // Méthode pour récupérer une catégorie par son ID
    public CategoryResponse getCategoryById(Integer id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Catégorie non trouvée"));
        return mapToResponse(category);
    }

    // Méthode pour récupérer une catégorie par son nom
    public CategoryResponse getCategoryByNom(String nom) {
        Category category = categoryRepository.findByNom(nom)
                .orElseThrow(() -> new IllegalArgumentException("Catégorie non trouvée"));
        return mapToResponse(category);
    }
    
    // Méthode privée pour mapper une entité Category vers un DTO CategoryResponse
    private CategoryResponse mapToResponse(Category category) {
        CategoryResponse response = new CategoryResponse();
        response.setIdCategory(category.getIdCategory());
        response.setNom(category.getNom());
        response.setDescription(category.getDescription());
        return response;
    }
}
