package com.cefiishop.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.cefiishop.model.Conversation;

// Interface de repository pour gérer les opérations CRUD sur les conversations entre les utilisateurs et l'IA, stockées dans MongoDB, 
// avec une méthode personnalisée pour trouver les conversations d'un utilisateur spécifique
@Repository
public interface ConversationRepository extends MongoRepository<Conversation, String> {

    List<Conversation> findByUserId(String userId);
}
