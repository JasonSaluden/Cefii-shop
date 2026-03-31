package com.cefiishop.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.cefiishop.model.IALog;

@Repository
public interface IALogRepository extends MongoRepository<IALog, String> {

    List<IALog> findByConversationId(String conversationId);
}
