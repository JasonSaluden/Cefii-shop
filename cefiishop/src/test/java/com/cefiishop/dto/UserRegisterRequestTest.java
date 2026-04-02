package com.cefiishop.dto;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.fail;

public class UserRegisterRequestTest {
    @Test
    void classExists() {
        try {
            Class.forName("com.cefiishop.dto.UserRegisterRequest");
        } catch (ClassNotFoundException e) {
            fail("Class not found: " + e.getMessage());
        }
    }
}
