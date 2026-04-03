package com.cefiishop.controller;

import com.cefiishop.service.ChatService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ChatController.class)
public class ChatControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ChatService chatService;

    @Test
    void chat_returnsOk() throws Exception {
        when(chatService.chat("conv1", "hello")).thenReturn(null);

        mockMvc.perform(post("/api/chat/conv1").contentType("application/json").content("{\"content\":\"hello\"}"))
                .andExpect(status().isOk());
    }
}
