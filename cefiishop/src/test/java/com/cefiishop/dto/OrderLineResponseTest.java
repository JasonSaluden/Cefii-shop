package com.cefiishop.dto;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.fail;

public class OrderLineResponseTest {
    @Test
    void classExists() {
        try {
            Class.forName("com.cefiishop.dto.OrderLineResponse");
        } catch (ClassNotFoundException e) {
            fail("Class not found: " + e.getMessage());
        }
    }
}
