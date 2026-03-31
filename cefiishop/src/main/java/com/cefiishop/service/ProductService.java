package com.cefiishop.service;

import com.cefiishop.dto.ProductResponse;
import com.cefiishop.model.Product;
import com.cefiishop.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public ProductResponse getProductById(Integer id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Produit non trouvé"));
        return mapToResponse(product);
    }

    public List<ProductResponse> searchByNom(String nom) {
        return productRepository.findByNomContainingIgnoreCase(nom)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<ProductResponse> getProductsByCategory(Integer categoryId) {
        return productRepository.findByCategoryIdCategory(categoryId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<ProductResponse> getAvailableProducts() {
        return productRepository.findAvailableProducts()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<ProductResponse> getProductsByCategoryOrderByPrice(Integer categoryId) {
        return productRepository.findByCategoryOrderByPrice(categoryId)
                .stream()
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
