package com.cefiishop.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class BehaviorCleanupScheduler {

    private final UserBehaviorService userBehaviorService;

    public BehaviorCleanupScheduler(UserBehaviorService userBehaviorService) {
        this.userBehaviorService = userBehaviorService;
    }

    @Scheduled(cron = "0 0 3 * * *")
    public void cleanOldProductViews() {
        userBehaviorService.cleanOldViews();
    }
}
