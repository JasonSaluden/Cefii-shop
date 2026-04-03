package com.cefiishop.repository;

import com.cefiishop.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

// Interface de repository pour gérer les opérations CRUD sur les utilisateurs, avec des méthodes personnalisées pour trouver un utilisateur par mail ou pseudo, 
// et vérifier l'existence d'un mail
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByMail(String mail);
    Optional<User> findByPseudo(String pseudo);
    boolean existsByMail(String mail);
}
