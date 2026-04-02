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

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ConversationServiceUnitTest {

    @Mock
    private ConversationRepository conversationRepository;

    @InjectMocks
    private ConversationService conversationService;

    @Test
    void create_setsUserIdAndSaves() {
        Conversation conv = new Conversation();
        conv.setUserId("u1");
        when(conversationRepository.save(org.mockito.ArgumentMatchers.any())).thenReturn(conv);

        Conversation result = conversationService.create("u1");

        assertEquals("u1", result.getUserId());
    }

    @Test
    void getById_notFound_throws() {
        when(conversationRepository.findById("x")).thenReturn(Optional.empty());
        assertThrows(org.springframework.web.server.ResponseStatusException.class,
                () -> conversationService.getById("x"));
    }

    @Test
    void getByUserId_returnsList() {
        Conversation c = new Conversation(); c.setUserId("u2");
        when(conversationRepository.findByUserId("u2")).thenReturn(List.of(c));
        var res = conversationService.getByUserId("u2");
        assertEquals(1, res.size());
    }

    @Test
    void addMessage_addsAndSaves() {
        Conversation c = new Conversation(); c.setId("cid"); c.setUserId("u3");
        when(conversationRepository.findById("cid")).thenReturn(Optional.of(c));
        when(conversationRepository.save(org.mockito.ArgumentMatchers.any())).thenAnswer(i -> i.getArgument(0));

        Conversation updated = conversationService.addMessage("cid", "user", "hello");
        assertTrue(updated.getMessages().stream().anyMatch(m -> "hello".equals(m.getContent())));
    }
}
