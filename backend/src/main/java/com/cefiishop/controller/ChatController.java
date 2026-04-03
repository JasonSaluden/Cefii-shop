package com.cefiishop.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import com.cefiishop.model.Conversation;
import com.cefiishop.service.ChatService;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    // Endpoint pour envoyer un message dans une conversation
    @PostMapping("/{conversationId}")
    public ResponseEntity<Conversation> chat(
            @PathVariable String conversationId,
            @RequestBody Map<String, String> body) {
        if (body.get("content") == null || body.get("content").isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "content est requis");
        }
        return ResponseEntity.ok(chatService.chat(conversationId, body.get("content")));
    }
}
