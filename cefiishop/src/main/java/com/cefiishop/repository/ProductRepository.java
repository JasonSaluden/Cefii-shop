package com.cefiishop.repository;

import com.cefiishop.model.Product;
import com.cefiishop.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByCategory(Category category);
    List<Product> findByCategoryIdCategory(Integer categoryId);
    List<Product> findByNomContainingIgnoreCase(String nom);
    
    @Query("SELECT p FROM Product p WHERE p.category.idCategory = :categoryId ORDER BY p.prix ASC")
    List<Product> findByCategoryOrderByPrice(@Param("categoryId") Integer categoryId);
    
    @Query("SELECT p FROM Product p WHERE p.stock > 0")
    List<Product> findAvailableProducts();

    @Query("SELECT p FROM Product p WHERE p.category.idCategory = :categoryId AND p.idProduct != :excludeId AND p.stock > 0 ORDER BY p.prix ASC")
    List<Product> findSimilarProducts(@Param("categoryId") Integer categoryId, @Param("excludeId") Integer excludeId);
}
