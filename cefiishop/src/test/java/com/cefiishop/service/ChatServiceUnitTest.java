package com.cefiishop.service;

import com.cefiishop.model.Conversation;
import com.cefiishop.repository.ConversationRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ChatServiceUnitTest {

    @Mock
    private org.springframework.ai.chat.client.ChatClient chatClient;

    @Mock
    private ConversationRepository conversationRepository;

    @Mock
    private ProductService productService;

    @InjectMocks
    private ChatService chatService;

    @Test
    void chat_conversationNotFound_throws() {
        when(conversationRepository.findById("nope")).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> chatService.chat("nope", "hello"));
    }

    @Test
    void chat_callsProductService_and_propagatesOnChatClientError() {
        Conversation conv = new Conversation();
        conv.setId("c1");
        when(conversationRepository.findById("c1")).thenReturn(Optional.of(conv));
        when(productService.getAvailableProducts()).thenReturn(List.of());

        // force chatClient to throw so we can assert productService was invoked beforehand
        when(chatClient.prompt(org.mockito.ArgumentMatchers.any(org.springframework.ai.chat.prompt.Prompt.class)))
            .thenThrow(new RuntimeException("ai error"));

        assertThrows(RuntimeException.class, () -> chatService.chat("c1", "bonjour"));

        verify(productService).getAvailableProducts();
        verify(conversationRepository).findById("c1");
    }
}
