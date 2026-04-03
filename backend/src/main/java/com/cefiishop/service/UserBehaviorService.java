package com.cefiishop.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.cefiishop.model.UserBehavior;
import com.cefiishop.repository.UserBehaviorRepository;

// Service pour gérer le comportement des utilisateurs, notamment pour enregistrer les produits vus, récupérer le comportement d'un utilisateur 
// et nettoyer les anciennes vues
@Service
public class UserBehaviorService {

    private final UserBehaviorRepository userBehaviorRepository;
    private final MongoTemplate mongoTemplate;

    public UserBehaviorService(UserBehaviorRepository userBehaviorRepository, MongoTemplate mongoTemplate) {
        this.userBehaviorRepository = userBehaviorRepository;
        this.mongoTemplate = mongoTemplate;
    }

    // Opération atomique : upsert du document + push de la vue en une seule requête MongoDB
    public void addProductView(Integer userId, Integer productId) {
        UserBehavior.ProductView view = new UserBehavior.ProductView();
        view.setProductId(productId);

        Query query = Query.query(Criteria.where("userId").is(userId));
        Update update = new Update()
                .setOnInsert("userId", userId)
                .push("viewedProducts", view);
        mongoTemplate.upsert(query, update, UserBehavior.class);
    }

    // Methode pour récuperer le comportement d'un utilisateur par son ID
    public UserBehavior getByUserId(Integer userId) {
        return userBehaviorRepository.findByUserId(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Aucun comportement trouve pour l utilisateur : " + userId));
    }

    // Methode pour nettoyer les produits vus il y a plus de 30 jours sur tous les utilisateurs
    public void cleanOldViews() {
        LocalDateTime cutoff = LocalDateTime.now().minusDays(30);
        List<UserBehavior> all = userBehaviorRepository.findAll();
        for (UserBehavior behavior : all) {
            int before = behavior.getViewedProducts().size();
            behavior.getViewedProducts().removeIf(view -> view.getViewedAt().isBefore(cutoff));
            if (behavior.getViewedProducts().size() < before) {
                userBehaviorRepository.save(behavior);
            }
        }
    }
}