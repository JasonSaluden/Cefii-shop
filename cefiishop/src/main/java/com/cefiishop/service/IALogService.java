package com.cefiishop.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cefiishop.model.IALog;
import com.cefiishop.repository.IALogRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class IALogService {

    private final IALogRepository iaLogRepository;

    public IALog save(IALog log) {
        return iaLogRepository.save(log);
    }

    public List<IALog> getByConversationId(String conversationId) {
        return iaLogRepository.findByConversationId(conversationId);
    }
}
