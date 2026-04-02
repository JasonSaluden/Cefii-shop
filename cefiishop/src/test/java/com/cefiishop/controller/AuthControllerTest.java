package com.cefiishop.controller;

import com.cefiishop.dto.UserRegisterRequest;
import com.cefiishop.dto.UserResponse;
import com.cefiishop.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AuthController.class)
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    private final ObjectMapper om = new ObjectMapper();

    @Test
    void register_returnsCreated() throws Exception {
        UserRegisterRequest req = new UserRegisterRequest("a@b.c", "pwd");
        when(userService.register(any())).thenReturn(new UserResponse(1, "a@b.c", "CLIENT", LocalDateTime.now()));

        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(om.writeValueAsString(req)))
                .andExpect(status().isCreated());
    }

    @Test
    void logout_returnsOk() throws Exception {
        mockMvc.perform(post("/api/auth/logout"))
                .andExpect(status().isOk());
    }
}
