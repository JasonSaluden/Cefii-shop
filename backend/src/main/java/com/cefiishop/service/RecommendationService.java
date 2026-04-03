package com.cefiishop.service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.cefiishop.dto.ProductResponse;
import com.cefiishop.model.Product;
import com.cefiishop.model.UserBehavior;
import com.cefiishop.repository.ProductRepository;

// Service pour gérer les recommandations de produits, avec des méthodes pour obtenir des recommandations basées sur un produit spécifique et 
// des recommandations personnalisées basées sur le comportement de l'utilisateur
@Service
public class RecommendationService {

    private final UserBehaviorService userBehaviorService;

    // Recommandations limitées à 4 pour éviter de surcharger l'interface utilisateur
    private static final int MAX_RECOMMENDATIONS = 4;

    private final ProductRepository productRepository;

    public RecommendationService(ProductRepository productRepository, UserBehaviorService userBehaviorService) {
        this.productRepository = productRepository;
        this.userBehaviorService = userBehaviorService;
    }

    // Méthode pour obtenir des recommandations de produits similaires
    public List<ProductResponse> getRecommendations(Integer productId) {
        // Récupérer le produit actuel pour obtenir sa catégorie
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Produit non trouvé : " + productId));

        // Récupérer les produits similaires dans la même catégorie, en excluant le produit actuel
        Integer categoryId = product.getCategory() != null ? product.getCategory().getIdCategory() : null;
        if (categoryId == null) {
            return List.of();
        }

        // Récupérer les produits similaires et les mapper en ProductResponse
        return productRepository.findSimilarProducts(categoryId, productId)
                .stream()
                .limit(MAX_RECOMMENDATIONS)
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<ProductResponse> getPersonalizedRecommantations(Integer userId) {
        // Récupère UserBehavior depuis MongoDB - vide si pas d'historique
        UserBehavior behavior;
        try {
            behavior = userBehaviorService.getByUserId(userId);
        } catch (RuntimeException e) {
            return List.of();
        }

        // Extrait les IDs des produits consultés
        List<Integer> viewedIds = behavior.getViewedProducts().stream()
                .map(UserBehavior.ProductView::getProductId)
                .distinct()
                .collect(Collectors.toList());
        // Si pas de produits consultés retourne liste vide
        if (viewedIds.isEmpty()) {
            return List.of();
        }

        // Charge ces produits depuis MySQL pour extraire leurs catégories
        List<Integer> categoryIds = productRepository.findAllById(viewedIds).stream()
                .filter(p -> p.getCategory() != null)
                .map(p -> p.getCategory().getIdCategory())
                .distinct()
                .collect(Collectors.toList());

        // Si pas de catégories trouvées, retourne liste vide
        if (categoryIds.isEmpty()) {
            return List.of();
        }

        // Exclut les produits déjà consultés des recommandations
        List<Integer> excludeIds = viewedIds.isEmpty() ? Collections.singletonList(-1) : viewedIds;

        // Récupère les produits recommandés et les mappe en ProductResponse
        return productRepository.findByCategoryExcluding(categoryIds, excludeIds)
                .stream()
                .limit(8)
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // Méthode pour mapper un objet Product en ProductResponse
    private ProductResponse mapToResponse(Product product) {
        ProductResponse response = new ProductResponse();
        response.setIdProduct(product.getIdProduct());
        response.setNom(product.getNom());
        response.setDescription(product.getDescription());
        response.setPrix(product.getPrix());
        response.setStock(product.getStock());
        response.setImgUrl(product.getImgUrl());
        response.setIdCategory(product.getCategory() != null ? product.getCategory().getIdCategory() : null);
        response.setCategoryNom(product.getCategory() != null ? product.getCategory().getNom() : null);
        return response;
    }
}
