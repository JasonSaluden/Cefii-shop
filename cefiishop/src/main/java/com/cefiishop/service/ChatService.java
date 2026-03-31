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
import com.cefiishop.model.Conversation;
import com.cefiishop.repository.ConversationRepository;

@Service
public class ChatService {

    private final ChatClient chatClient;
    private final ConversationRepository conversationRepository;

    public ChatService(ChatClient chatClient, ConversationRepository conversationRepository) {
        this.chatClient = chatClient;
        this.conversationRepository = conversationRepository;
    }

    public Conversation chat(String conversationId, String userContent) {
        Conversation conv = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new RuntimeException("Conversation non trouvee : " + conversationId));

        List<Message> history = new ArrayList<>();
        history.add(new SystemMessage(
            "Tu es un assistant e-commerce specialise dans la vente de produits pour dragons. " +
            "Reponds en francais, de maniere concise et utile."));

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
