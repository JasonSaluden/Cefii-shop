package com.cefiishop.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.fail;

public class CategoryTest {
    @Test
    void classExists() {
        try {
            Class.forName("com.cefiishop.model.Category");
        } catch (ClassNotFoundException e) {
            fail("Class not found: " + e.getMessage());
        }
    }
}
