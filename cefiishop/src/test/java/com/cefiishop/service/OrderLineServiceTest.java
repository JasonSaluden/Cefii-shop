package com.cefiishop.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest(properties = {
        "spring.datasource.url=jdbc:h2:mem:testdb",
        "spring.datasource.driverClassName=org.h2.Driver",
        "spring.jpa.hibernate.ddl-auto=create-drop"
})
public class OrderLineServiceTest {

    @Autowired
    private OrderLineService orderLineService;

    @MockBean
    private com.cefiishop.repository.OrderLineRepository orderLineRepository;

    @MockBean
    private com.cefiishop.repository.OrderRepository orderRepository;

    @MockBean
    private com.cefiishop.repository.ProductRepository productRepository;

    @Test
    void contextLoads() {
        assertNotNull(orderLineService);
    }
}
