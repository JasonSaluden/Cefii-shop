package com.cefiishop.model;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

public class UserModelTest {

    @Test
    void prePersist_setsCreatedAt() {
        User u = new User();
        assertNull(u.getCreatedAt());
        u.onCreate();
        assertNotNull(u.getCreatedAt());
        assertTrue(u.getCreatedAt().isBefore(LocalDateTime.now().plusSeconds(1)));
    }
}
