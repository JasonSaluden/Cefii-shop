package com.cefiishop.controller;

import com.cefiishop.service.ProductService;
import com.cefiishop.service.RecommendationService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ProductController.class)
public class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductService productService;

    @MockBean
    private RecommendationService recommendationService;

    @Test
    void getAllProducts_returnsOk() throws Exception {
        when(productService.getAllProducts()).thenReturn(java.util.List.of());

        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk());
    }
}

