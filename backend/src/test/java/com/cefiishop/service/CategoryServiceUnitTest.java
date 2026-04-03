package com.cefiishop.service;

import com.cefiishop.dto.CategoryResponse;
import com.cefiishop.model.Category;
import com.cefiishop.repository.CategoryRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class CategoryServiceUnitTest {

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private CategoryService categoryService;

    @Test
    void getAllCategories_returnsMappedResponses() {
        Category c1 = new Category(1, "A", "Desc A", null);
        Category c2 = new Category(2, "B", "Desc B", null);
        when(categoryRepository.findAll()).thenReturn(List.of(c1, c2));

        var result = categoryService.getAllCategories();

        assertEquals(2, result.size());
        CategoryResponse r1 = result.get(0);
        assertEquals(1, r1.getIdCategory());
        assertEquals("A", r1.getNom());
    }

    @Test
    void getCategoryById_found() {
        Category c = new Category(5, "C", "Desc C", null);
        when(categoryRepository.findById(5)).thenReturn(Optional.of(c));

        CategoryResponse resp = categoryService.getCategoryById(5);

        assertEquals(5, resp.getIdCategory());
        assertEquals("C", resp.getNom());
    }

    @Test
    void getCategoryById_notFound_throws() {
        when(categoryRepository.findById(99)).thenReturn(Optional.empty());
        assertThrows(IllegalArgumentException.class, () -> categoryService.getCategoryById(99));
    }

    @Test
    void getCategoryByNom_found() {
        Category c = new Category(7, "X", "Desc X", null);
        when(categoryRepository.findByNom("X")).thenReturn(Optional.of(c));

        CategoryResponse resp = categoryService.getCategoryByNom("X");

        assertEquals("X", resp.getNom());
        assertEquals(7, resp.getIdCategory());
    }

    @Test
    void getCategoryByNom_notFound_throws() {
        when(categoryRepository.findByNom("nope")).thenReturn(Optional.empty());
        assertThrows(IllegalArgumentException.class, () -> categoryService.getCategoryByNom("nope"));
    }
}
