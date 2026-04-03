package com.cefiishop.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

public class ProductTest {
    @Test
    void classExists() {
        assertDoesNotThrow(() -> Class.forName("com.cefiishop.model.Product"));
    }
}
