package com.cefiishop.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.cefiishop.model.IALog;
import com.cefiishop.repository.IALogRepository;

// Service pour gérer les logs d'IA, avec des méthodes pour enregistrer un log et récupérer les logs d'une conversation spécifique
@Service
public class IALogService {

    private final IALogRepository iaLogRepository;

    public IALogService(IALogRepository iaLogRepository) {
        this.iaLogRepository = iaLogRepository;
    }

    public IALog save(IALog log) {
        return iaLogRepository.save(log);
    }

    public List<IALog> getByConversationId(String conversationId) {
        return iaLogRepository.findByConversationId(conversationId);
    }
}
