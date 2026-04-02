package com.cefiishop.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

import java.math.BigDecimal;

public class OrderModelTest {

    @Test
    void prePersist_setsDefaults() {
        Order o = new Order();
        assertNull(o.getTotal());
        o.onCreate();
        assertNotNull(o.getTotal());
        assertEquals(BigDecimal.ZERO, o.getTotal());
    }
}
