package com.cefiishop.repository;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;

@DataMongoTest
public class IALogRepositoryTest {

    @Autowired
    private IALogRepository iaLogRepository;

    @Test
    void repositoryBeanLoads() {
        assertNotNull(iaLogRepository);
    }
}
