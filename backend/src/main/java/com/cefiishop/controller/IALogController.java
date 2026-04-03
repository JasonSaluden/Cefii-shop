package com.cefiishop.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cefiishop.model.IALog;
import com.cefiishop.service.IALogService;

// Contrôleur pour gérer les endpoints liés aux logs de conversation avec l'IA, notamment pour enregistrer et récupérer les logs d'une conversation spécifique
@RestController
@RequestMapping("/api/ia-logs")
public class IALogController {

    private final IALogService iaLogService;

    public IALogController(IALogService iaLogService) {
        this.iaLogService = iaLogService;
    }

    // Enregistre un log de conversation avec l'IA
    @PostMapping
    public ResponseEntity<IALog> save(@RequestBody IALog log) {
        return ResponseEntity.ok(iaLogService.save(log));
    }

    // Récupère les logs d'une conversation spécifique
    @GetMapping("/conversation/{conversationId}")
    public ResponseEntity<List<IALog>> getByConversationId(@PathVariable String conversationId) {
        return ResponseEntity.ok(iaLogService.getByConversationId(conversationId));
    }
}
