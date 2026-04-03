package com.cefiishop.dto;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * DTO test for CategoryResponse — validates getters/setters and JSON serialization.
 */
public class CategoryResponseTest {

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
    }

    @Test
    void constructor_noArg_instantiates() {
        CategoryResponse category = new CategoryResponse();
        assertNotNull(category);
    }

    @Test
    void constructor_withArgs_setsAllFields() {
        CategoryResponse category = new CategoryResponse(1, "Vélos", "Tous types de vélos");

        assertEquals(1, category.getIdCategory());
        assertEquals("Vélos", category.getNom());
        assertEquals("Tous types de vélos", category.getDescription());
    }

    @Test
    void setters_updateFields() {
        CategoryResponse category = new CategoryResponse();

        category.setIdCategory(5);
        category.setNom("Accessoires");
        category.setDescription("Accessoires de vélo");

        assertEquals(5, category.getIdCategory());
        assertEquals("Accessoires", category.getNom());
        assertEquals("Accessoires de vélo", category.getDescription());
    }

    @Test
    void serialize_toJson_success() throws Exception {
        CategoryResponse category = new CategoryResponse(2, "Équipements", "Équipement de cyclisme");

        String json = objectMapper.writeValueAsString(category);

        assertNotNull(json);
        assertTrue(json.contains("Équipements"));
        assertTrue(json.contains("\"idCategory\":2"));
        assertTrue(json.contains("Équipement de cyclisme"));
    }

    @Test
    void deserialize_fromJson_success() throws Exception {
        String json = "{\"idCategory\":3,\"nom\":\"Pneus\",\"description\":\"Pneus de tous types\"}";

        CategoryResponse category = objectMapper.readValue(json, CategoryResponse.class);

        assertEquals(3, category.getIdCategory());
        assertEquals("Pneus", category.getNom());
        assertEquals("Pneus de tous types", category.getDescription());
    }

    @Test
    void roundTrip_serialize_deserialize_success() throws Exception {
        CategoryResponse original = new CategoryResponse(10, "Cadres", "Cadres de qualité professionnelle");

        String json = objectMapper.writeValueAsString(original);
        CategoryResponse restored = objectMapper.readValue(json, CategoryResponse.class);

        assertEquals(original.getIdCategory(), restored.getIdCategory());
        assertEquals(original.getNom(), restored.getNom());
        assertEquals(original.getDescription(), restored.getDescription());
    }

    @Test
    void nullFields_handled() {
        CategoryResponse category = new CategoryResponse();

        assertNull(category.getIdCategory());
        assertNull(category.getNom());
        assertNull(category.getDescription());
    }
}
