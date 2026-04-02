package com.cefiishop.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest(properties = {
        "spring.datasource.url=jdbc:h2:mem:testdb",
        "spring.datasource.driverClassName=org.h2.Driver",
        "spring.jpa.hibernate.ddl-auto=create-drop"
})
public class UserServiceTest {

    @Autowired
    private UserService userService;

    @MockBean
    private com.cefiishop.repository.UserRepository userRepository;

    @MockBean
    private PasswordEncoder passwordEncoder;

    @Test
    void contextLoads() {
        assertNotNull(userService);
    }
}
