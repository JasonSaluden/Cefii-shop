package com.cefiishop.service;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.fail;

public class OrderServiceTest {
    @Test
    void classExists() {
            try {
                Class.forName("com.cefiishop.service.OrderService");
            } catch (ClassNotFoundException e) {
                fail("Class not found: " + e.getMessage());
            }
    }
}
