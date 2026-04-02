package com.cefiishop.repository;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

public class UserBehaviorRepositoryTest {
    @Test
    void classExists() {
        assertDoesNotThrow(() -> Class.forName("com.cefiishop.repository.UserBehaviorRepository"));
    }
}
