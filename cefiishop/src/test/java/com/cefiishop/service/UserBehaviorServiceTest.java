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
public class UserBehaviorServiceTest {

    @Autowired
    private UserBehaviorService userBehaviorService;

    @MockBean
    private com.cefiishop.repository.UserBehaviorRepository userBehaviorRepository;

    @Test
    void contextLoads() {
        assertNotNull(userBehaviorService);
    }
}
