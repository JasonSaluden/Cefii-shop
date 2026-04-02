package com.cefiishop.dto;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.fail;

public class OrderResponseTest {
    @Test
    void classExists() {
        try {
            Class.forName("com.cefiishop.dto.OrderResponse");
        } catch (ClassNotFoundException e) {
            fail("Class not found: " + e.getMessage());
        }
    }
}
