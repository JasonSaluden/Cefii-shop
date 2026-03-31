package com.cefiishop.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.cefiishop.model.Conversation;
import com.cefiishop.service.ConversationService;

@RestController
@RequestMapping("/api/conversations")
public class ConversationController {

    private final ConversationService conversationService;

    public ConversationController(ConversationService conversationService) {
        this.conversationService = conversationService;
    }

    @PostMapping
    public ResponseEntity<Conversation> create(@RequestBody Map<String, String> body) {
        if (body.get("userId") == null || body.get("userId").isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "userId est requis");
        }
        return ResponseEntity.ok(conversationService.create(body.get("userId")));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Conversation> getById(@PathVariable String id) {
        return ResponseEntity.ok(conversationService.getById(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Conversation>> getByUserId(@PathVariable String userId) {
        return ResponseEntity.ok(conversationService.getByUserId(userId));
    }

    @PostMapping("/{id}/messages")
    public ResponseEntity<Conversation> addMessage(
            @PathVariable String id,
            @RequestBody Map<String, String> body) {
        if (body.get("role") == null || body.get("content") == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "role et content sont requis");
        }
        return ResponseEntity.ok(conversationService.addMessage(id, body.get("role"), body.get("content")));
    }
}
