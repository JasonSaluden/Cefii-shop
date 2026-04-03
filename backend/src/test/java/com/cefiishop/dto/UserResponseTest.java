package com.cefiishop.dto;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

/**
 * DTO test for UserResponse — validates getters/setters, JSON serialization, and equality.
 */
public class UserResponseTest {

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
        objectMapper.findAndRegisterModules(); // Enable LocalDateTime support
    }

    @Test
    void constructor_noArg_instantiates() {
        UserResponse user = new UserResponse();
        assertNotNull(user);
    }

    @Test
    void constructor_withArgs_setsAllFields() {
        LocalDateTime now = LocalDateTime.now();
        UserResponse user = new UserResponse(1, "test@mail.com", "USER", now);

        assertEquals(1, user.getId());
        assertEquals("test@mail.com", user.getMail());
        assertEquals("USER", user.getRole());
        assertEquals(now, user.getCreatedAt());
    }

    @Test
    void setters_updateFields() {
        UserResponse user = new UserResponse();
        LocalDateTime now = LocalDateTime.now();

        user.setId(42);
        user.setMail("newmail@test.com");
        user.setRole("ADMIN");
        user.setCreatedAt(now);

        assertEquals(42, user.getId());
        assertEquals("newmail@test.com", user.getMail());
        assertEquals("ADMIN", user.getRole());
        assertEquals(now, user.getCreatedAt());
    }

    @Test
    void getters_returnCorrectValues() {
        LocalDateTime now = LocalDateTime.now();
        UserResponse user = new UserResponse(5, "user@domain.com", "USER", now);

        // Validate getters
        assertEquals(5, user.getId());
        assertEquals("user@domain.com", user.getMail());
        assertEquals("USER", user.getRole());
        assertEquals(now, user.getCreatedAt());
    }

    @Test
    void serialize_toJson_success() throws Exception {
        LocalDateTime now = LocalDateTime.now();
        UserResponse user = new UserResponse(1, "test@mail.com", "USER", now);

        String json = objectMapper.writeValueAsString(user);

        assertNotNull(json);
        assertTrue(json.contains("test@mail.com"));
        assertTrue(json.contains("\"id\":1"));
        assertTrue(json.contains("USER"));
    }

    @Test
    void deserialize_fromJson_success() throws Exception {
        String json = "{\"id\":10,\"mail\":\"deserialize@test.com\",\"role\":\"ADMIN\",\"createdAt\":\"2026-04-02T12:00:00\"}";

        UserResponse user = objectMapper.readValue(json, UserResponse.class);

        assertEquals(10, user.getId());
        assertEquals("deserialize@test.com", user.getMail());
        assertEquals("ADMIN", user.getRole());
        assertNotNull(user.getCreatedAt());
    }

    @Test
    void roundTrip_serialize_deserialize_success() throws Exception {
        LocalDateTime now = LocalDateTime.of(2026, 4, 2, 12, 30, 45);
        UserResponse original = new UserResponse(7, "roundtrip@test.com", "USER", now);

        // Serialize to JSON
        String json = objectMapper.writeValueAsString(original);

        // Deserialize back
        UserResponse restored = objectMapper.readValue(json, UserResponse.class);

        // Verify all fields match
        assertEquals(original.getId(), restored.getId());
        assertEquals(original.getMail(), restored.getMail());
        assertEquals(original.getRole(), restored.getRole());
        assertEquals(original.getCreatedAt(), restored.getCreatedAt());
    }

    @Test
    void nullFields_handled() {
        UserResponse user = new UserResponse();
        user.setId(null);
        user.setMail(null);
        user.setRole(null);
        user.setCreatedAt(null);

        assertNull(user.getId());
        assertNull(user.getMail());
        assertNull(user.getRole());
        assertNull(user.getCreatedAt());
    }
}
