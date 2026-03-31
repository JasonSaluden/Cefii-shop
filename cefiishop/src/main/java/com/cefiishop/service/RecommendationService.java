package com.cefiishop.service;

import com.cefiishop.dto.ProductResponse;
import com.cefiishop.model.Product;
import com.cefiishop.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecommendationService {

    private static final int MAX_RECOMMENDATIONS = 4;

    private final ProductRepository productRepository;

    public RecommendationService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<ProductResponse> getRecommendations(Integer productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Produit non trouvé : " + productId));

        Integer categoryId = product.getCategory() != null ? product.getCategory().getIdCategory() : null;
        if (categoryId == null) {
            return List.of();
        }

        return productRepository.findSimilarProducts(categoryId, productId)
                .stream()
                .limit(MAX_RECOMMENDATIONS)
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

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
