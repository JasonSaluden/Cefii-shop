package com.cefiishop.service;

import com.cefiishop.dto.ProductResponse;
import com.cefiishop.model.Category;
import com.cefiishop.model.Product;
import com.cefiishop.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class RecommendationServiceUnitTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private RecommendationService recommendationService;

    @Test
    void getRecommendations_productNotFound_throws() {
        when(productRepository.findById(1)).thenReturn(Optional.empty());
        assertThrows(IllegalArgumentException.class, () -> recommendationService.getRecommendations(1));
    }

    @Test
    void getRecommendations_noCategory_returnsEmpty() {
        Product p = new Product(); p.setIdProduct(2); p.setCategory(null);
        when(productRepository.findById(2)).thenReturn(Optional.of(p));
        var res = recommendationService.getRecommendations(2);
        assertTrue(res.isEmpty());
    }

    @Test
    void getRecommendations_mapsSimilarProducts() {
        Category cat = new Category(3, "Cat", "d", null);
        Product p = new Product(); p.setIdProduct(4); p.setCategory(cat);
        Product s1 = new Product(); s1.setIdProduct(5); s1.setNom("S"); s1.setCategory(cat);
        when(productRepository.findById(4)).thenReturn(Optional.of(p));
        when(productRepository.findSimilarProducts(3, 4)).thenReturn(List.of(s1));

        var res = recommendationService.getRecommendations(4);
        assertEquals(1, res.size());
        ProductResponse r = res.get(0);
        assertEquals("S", r.getNom());
    }
}
