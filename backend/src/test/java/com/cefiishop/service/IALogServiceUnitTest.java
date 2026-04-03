package com.cefiishop.service;

import com.cefiishop.model.IALog;
import com.cefiishop.repository.IALogRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class IALogServiceUnitTest {

    @Mock
    private IALogRepository iaLogRepository;

    @InjectMocks
    private IALogService iaLogService;

    @Test
    void save_delegatesToRepository() {
        IALog log = new IALog();
        log.setConversationId("c1");
        when(iaLogRepository.save(org.mockito.ArgumentMatchers.any())).thenReturn(log);

        IALog res = iaLogService.save(log);
        assertEquals("c1", res.getConversationId());
    }

    @Test
    void getByConversationId_returnsList() {
        IALog l = new IALog(); l.setConversationId("c2");
        when(iaLogRepository.findByConversationId("c2")).thenReturn(List.of(l));
        var res = iaLogService.getByConversationId("c2");
        assertEquals(1, res.size());
    }
}
