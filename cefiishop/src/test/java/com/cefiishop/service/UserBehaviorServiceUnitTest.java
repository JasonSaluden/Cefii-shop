package com.cefiishop.service;

import com.cefiishop.model.UserBehavior;
import com.cefiishop.repository.UserBehaviorRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserBehaviorServiceUnitTest {

    @Mock
    private UserBehaviorRepository userBehaviorRepository;

    @Mock
    private org.springframework.data.mongodb.core.MongoTemplate mongoTemplate;

    @InjectMocks
    private UserBehaviorService userBehaviorService;

    @Test
    void addProductView_createsNewBehaviorIfMissing() {
        // call method under test (returns void)
        userBehaviorService.addProductView(10, 99);

        // verify mongoTemplate.upsert was used to perform the upsert
        org.mockito.Mockito.verify(mongoTemplate)
                .upsert(org.mockito.ArgumentMatchers.any(org.springframework.data.mongodb.core.query.Query.class),
                        org.mockito.ArgumentMatchers.any(org.springframework.data.mongodb.core.query.Update.class),
                        org.mockito.ArgumentMatchers.eq(UserBehavior.class));
    }

    @Test
    void getByUserId_notFound_throws() {
        when(userBehaviorRepository.findByUserId(11)).thenReturn(Optional.empty());
        assertThrows(org.springframework.web.server.ResponseStatusException.class, () -> userBehaviorService.getByUserId(11));
    }
}
