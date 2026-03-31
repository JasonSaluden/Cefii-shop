package com.cefiishop.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.messages.AssistantMessage;
import org.springframework.ai.chat.messages.Message;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.stereotype.Service;

import com.cefiishop.dto.ProductResponse;
import com.cefiishop.model.Conversation; 
import com.cefiishop.repository.ConversationRepository;

@Service
public class ChatService {

    private final ChatClient chatClient;
    private final ConversationRepository conversationRepository;
    private final ProductService productService;

    public ChatService(ChatClient chatClient, ConversationRepository conversationRepository, ProductService productService) {
        this.chatClient = chatClient;
        this.conversationRepository = conversationRepository;
        this.productService = productService;
    }

    // Cette méthode gère une interaction de chat, en enrichissant le prompt avec les produits disponibles
    public Conversation chat(String conversationId, String userContent) {
        Conversation conv = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new RuntimeException("Conversation non trouvee : " + conversationId));

        // Enrichissement du system prompt avec le catalogue produits
        List<ProductResponse> products = productService.getAvailableProducts();

        // Construire la liste produits pour le prompt
        StringBuilder productList = new StringBuilder();
        for (ProductResponse p : products) {
            productList.append(String.format("- %s (%s) : %.2f€, stock: %d — %s\n",
                p.getNom(), p.getCategoryNom(), p.getPrix(), p.getStock(), p.getDescription()));
        }

        // System prompt dynamique
        String systemPrompt = "Tu es un assistant e-commerce spécialisé dans la vente de produits pour dragons. " +
        "Réponds en français, de manière concise et utile. " +
        "Ne liste pas tous les produits systématiquement — cite uniquement ceux qui sont pertinents à la question. " +
        "Voici les produits disponibles :\n" + productList;

        List<Message> history = new ArrayList<>();
        history.add(new SystemMessage(systemPrompt));


        for (Conversation.Message m : conv.getMessages()) {
            if ("user".equals(m.getRole())) history.add(new UserMessage(m.getContent()));
            else if ("assistant".equals(m.getRole())) history.add(new AssistantMessage(m.getContent()));
        }
        history.add(new UserMessage(userContent));

        String aiResponse = chatClient.prompt(new Prompt(history)).call().content();

        Conversation.Message userMsg = new Conversation.Message();
        userMsg.setRole("user");
        userMsg.setContent(userContent);
        conv.getMessages().add(userMsg);

        Conversation.Message assistantMsg = new Conversation.Message();
        assistantMsg.setRole("assistant");
        assistantMsg.setContent(aiResponse);
        conv.getMessages().add(assistantMsg);

        return conversationRepository.save(conv);
    }
}
