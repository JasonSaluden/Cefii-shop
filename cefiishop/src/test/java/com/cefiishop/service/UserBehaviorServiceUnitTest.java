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

    @InjectMocks
    private UserBehaviorService userBehaviorService;

    @Test
    void addProductView_createsNewBehaviorIfMissing() {
        when(userBehaviorRepository.findByUserId(10)).thenReturn(Optional.empty());
        when(userBehaviorRepository.save(org.mockito.ArgumentMatchers.any())).thenAnswer(i -> i.getArgument(0));

        UserBehavior res = userBehaviorService.addProductView(10, 99);
        assertEquals(10, res.getUserId());
        assertTrue(res.getViewedProducts().stream().anyMatch(v -> v.getProductId().equals(99)));
    }

    @Test
    void getByUserId_notFound_throws() {
        when(userBehaviorRepository.findByUserId(11)).thenReturn(Optional.empty());
        assertThrows(org.springframework.web.server.ResponseStatusException.class, () -> userBehaviorService.getByUserId(11));
    }
}
