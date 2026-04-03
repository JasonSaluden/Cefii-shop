package com.cefiishop.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.cefiishop.model.IALog;

// Interface de repository pour gérer les opérations CRUD sur les logs d'interactions avec l'IA, stockés dans MongoDB, 
// avec une méthode personnalisée pour trouver les logs d'une conversation spécifique
@Repository
public interface IALogRepository extends MongoRepository<IALog, String> {

    List<IALog> findByConversationId(String conversationId);
}
