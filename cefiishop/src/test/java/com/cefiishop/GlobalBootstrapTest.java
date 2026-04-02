package com.cefiishop;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Global bootstrap test — validates that Spring context loads correctly.
 * 
 * This smoke test catches major configuration/wiring issues early.
 * All service/controller smoke tests should be removed; this replaces them.
 */
@SpringBootTest(properties = {
    "spring.datasource.url=jdbc:h2:mem:testdb",
    "spring.datasource.driverClassName=org.h2.Driver",
    "spring.jpa.hibernate.ddl-auto=none",
    "spring.mongodb.uri=mongodb://localhost:27017/cefii-test"
})
public class GlobalBootstrapTest {

    @Test
    void applicationContextLoads() {
        // If we reach here, Spring successfully initialized all beans and configurations.
        // This validates:
        // - All @Component/@Service/@Repository annotations are resolvable
        // - No missing dependencies or circular dependencies
        // - Database connections configured
        // - External service mocks (ChatModel, etc.) are available
        assertTrue(true, "Context loaded successfully");
    }
}
