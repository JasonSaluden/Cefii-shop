package com.cefiishop.controller;

import com.cefiishop.service.OrderLineService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(OrderLineController.class)
public class OrderLineControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private OrderLineService orderLineService;

    @Test
    void getOrderLinesByOrderId_returnsOk() throws Exception {
        when(orderLineService.getOrderLinesByOrderId(1)).thenReturn(java.util.List.of());

        mockMvc.perform(get("/api/orderlines/orders/1"))
                .andExpect(status().isOk());
    }
}
