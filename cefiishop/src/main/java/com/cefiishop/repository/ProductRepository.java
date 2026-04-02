package com.cefiishop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cefiishop.model.Category;
import com.cefiishop.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByCategory(Category category);
    List<Product> findByCategoryIdCategory(Integer categoryId);
    List<Product> findByNomContainingIgnoreCase(String nom);
    
    // Requête pour trouver des produits par catégorie et les trier par prix croissant
    @Query("SELECT p FROM Product p WHERE p.category.idCategory = :categoryId ORDER BY p.prix ASC")
    List<Product> findByCategoryOrderByPrice(@Param("categoryId") Integer categoryId);
    
    // Requête pour trouver tous les produits disponibles (avec des stocks)
    @Query("SELECT p FROM Product p WHERE p.stock > 0")
    List<Product> findAvailableProducts();

    // Requête pour trouver des produits similaires dans la même catégorie, en excluant un produit spécifique (le produit actuellement consulté)
    @Query("SELECT p FROM Product p WHERE p.category.idCategory = :categoryId AND p.idProduct != :excludeId AND p.stock > 0 ORDER BY p.prix ASC")
    List<Product> findSimilarProducts(@Param("categoryId") Integer categoryId, @Param("excludeId") Integer excludeId);

    // Requête pour trouver des produits similaires dans plusieurs catégories, en excluant une liste d'IDs de produits (les produits déjà consultés)
    @Query("SELECT p FROM Product p WHERE p.category.idCategory IN :categoryIds AND p.idProduct NOT IN :excludeIds AND p.stock > 0 ORDER BY p.prix ASC")
    List<Product>findByCategoryExcluding(@Param("categoryIds") List<Integer> categoryIds, @Param("excludeIds") List<Integer> excludeIds);
}
