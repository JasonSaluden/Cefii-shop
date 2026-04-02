package com.cefiishop.controller;

import com.cefiishop.service.UserBehaviorService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserBehaviorController.class)
public class UserBehaviorControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserBehaviorService userBehaviorService;

    @Test
    void getByUserId_returnsOk() throws Exception {
        when(userBehaviorService.getByUserId(1)).thenReturn(null);

        mockMvc.perform(get("/api/user-behavior/1"))
                .andExpect(status().isOk());
    }
}
