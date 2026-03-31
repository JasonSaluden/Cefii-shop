package com.cefiishop.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.cefiishop.model.conversation;

@Repository
public interface conversationRepository extends MongoRepository<conversation, String> {

    List<conversation> findByUserId(String userId);
}
