package com.cefiishop.config;

import org.mockito.Mockito;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.ai.chat.model.ChatModel;

@Configuration
public class ChatTestConfig {

    @Bean
    @Primary
    public ChatModel testChatModel() {
        return Mockito.mock(ChatModel.class);
    }

}
