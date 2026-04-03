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
public class ProductServiceUnitTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    @Test
    void getAllProducts_mapsResponses() {
        Category cat = new Category(1, "c", "d", null);
        Product p = new Product(); p.setIdProduct(10); p.setNom("P"); p.setCategory(cat);
        when(productRepository.findAll()).thenReturn(List.of(p));

        var res = productService.getAllProducts();
        assertEquals(1, res.size());
        ProductResponse r = res.get(0);
        assertEquals(10, r.getIdProduct());
    }

    @Test
    void getProductById_notFound_throws() {
        when(productRepository.findById(99)).thenReturn(Optional.empty());
        assertThrows(IllegalArgumentException.class, () -> productService.getProductById(99));
    }

    @Test
    void searchByNom_returnsMapped() {
        Product p = new Product(); p.setIdProduct(11); p.setNom("abc");
        when(productRepository.findByNomContainingIgnoreCase("a")).thenReturn(List.of(p));
        var res = productService.searchByNom("a");
        assertEquals(1, res.size());
    }
}
