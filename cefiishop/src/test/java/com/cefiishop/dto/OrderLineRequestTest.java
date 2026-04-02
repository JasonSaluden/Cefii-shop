package com.cefiishop.dto;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

public class OrderLineRequestTest {

    private final ObjectMapper om = new ObjectMapper();

    @Test
    void json_roundtrip_preserves_fields() throws Exception {
        OrderLineRequest r = new OrderLineRequest(10, 2, new BigDecimal("3.50"));

        String json = om.writeValueAsString(r);
        assertNotNull(json);

        OrderLineRequest out = om.readValue(json, OrderLineRequest.class);

        assertEquals(r.getProductId(), out.getProductId());
        assertEquals(r.getQuantite(), out.getQuantite());
        assertEquals(r.getPrixUnitaire(), out.getPrixUnitaire());
    }
}
