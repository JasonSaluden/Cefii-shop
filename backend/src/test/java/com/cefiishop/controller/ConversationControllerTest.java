package com.cefiishop.controller;

import com.cefiishop.service.ConversationService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ConversationController.class)
public class ConversationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ConversationService conversationService;

    @Test
    void createConversation_withUserId_returnsOk() throws Exception {
        when(conversationService.create("u1")).thenReturn(null);

        mockMvc.perform(post("/api/conversations").contentType("application/json").content("{\"userId\":\"u1\"}"))
                .andExpect(status().isOk());
    }
}
