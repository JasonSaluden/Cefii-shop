package com.cefiishop.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "IAlogs")
public class IALog {

    @Id
    private String id;

    private String conversationId; 

    private String model; 

    private String prompt;

    private String response;

    private int tokensUsed;

    private long durationMs; 

    private String status;

    private LocalDateTime createdAt = LocalDateTime.now();
}
