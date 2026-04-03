package com.cefiishop.service;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import com.cefiishop.model.Conversation;
import com.cefiishop.repository.ConversationRepository;

// Service pour gérer les conversations, avec des méthodes pour créer une conversation, récupérer une conversation par ID ou par utilisateur, 
// et ajouter des messages à une conversation existante
@Service
public class ConversationService {

    private final ConversationRepository conversationRepository;

    public ConversationService(ConversationRepository conversationRepository) {
        this.conversationRepository = conversationRepository;
    }

    public Conversation create(String userId) {
        Conversation conv = new Conversation();
        conv.setUserId(userId);
        return conversationRepository.save(conv);
    }

    public Conversation getById(String id) {
        return conversationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Conversation non trouvee : " + id));
    }

    public List<Conversation> getByUserId(String userId) {
        return conversationRepository.findByUserId(userId);
    }

    public Conversation addMessage(String id, String role, String content) {
        Conversation conv = getById(id);
        Conversation.Message message = new Conversation.Message();
        message.setRole(role);
        message.setContent(content);
        conv.getMessages().add(message);
        return conversationRepository.save(conv);
    }
}
