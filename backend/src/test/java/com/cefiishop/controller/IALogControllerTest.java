package com.cefiishop.controller;

import com.cefiishop.service.IALogService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(IALogController.class)
public class IALogControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private IALogService iaLogService;

    @Test
    void getByConversationId_returnsOk() throws Exception {
        when(iaLogService.getByConversationId("conv1")).thenReturn(java.util.List.of());

        mockMvc.perform(get("/api/ia-logs/conversation/conv1"))
                .andExpect(status().isOk());
    }
}
