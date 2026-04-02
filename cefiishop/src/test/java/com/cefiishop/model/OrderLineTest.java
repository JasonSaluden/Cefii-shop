package com.cefiishop.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

public class OrderLineTest {
    @Test
    void classExists() {
        assertDoesNotThrow(() -> Class.forName("com.cefiishop.model.OrderLine"));
    }
}
