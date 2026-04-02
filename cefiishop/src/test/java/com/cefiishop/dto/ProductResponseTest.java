package com.cefiishop.dto;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

public class ProductResponseTest {

    private final ObjectMapper om = new ObjectMapper();

    @Test
    void serialize_and_deserialize() throws Exception {
        ProductResponse p = new ProductResponse(1, "n", "d", new BigDecimal("5.00"), 2, "img", 3, "cat");

        String json = om.writeValueAsString(p);
        assertNotNull(json);

        ProductResponse read = om.readValue(json, ProductResponse.class);
        assertEquals(p.getNom(), read.getNom());
        assertEquals(p.getPrix(), read.getPrix());
        assertEquals(p.getIdCategory(), read.getIdCategory());
    }
}

