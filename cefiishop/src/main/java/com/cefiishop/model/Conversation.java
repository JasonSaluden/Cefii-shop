package com.cefiishop.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "Conversation")
public class Conversation {

    @Id
    private String id;

    private String userId;

    private List<Message> messages = new ArrayList<>();

    private LocalDateTime createdAt = LocalDateTime.now();

    @Data
    public static class Message {
        private String role;
        private String content;
        private LocalDateTime timestamp = LocalDateTime.now();
    }
}
