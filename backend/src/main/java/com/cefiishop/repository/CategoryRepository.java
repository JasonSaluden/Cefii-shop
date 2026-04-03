package com.cefiishop.repository;

import com.cefiishop.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

// Interface de repository pour gérer les opérations CRUD sur les catégories de produits (seulement la recherche par nom est définie ici, les autres méthodes CRUD sont héritées de JpaRepository)
@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    Optional<Category> findByNom(String nom);
}
