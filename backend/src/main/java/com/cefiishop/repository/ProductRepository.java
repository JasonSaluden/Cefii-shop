package com.cefiishop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cefiishop.model.Category;
import com.cefiishop.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    @EntityGraph(attributePaths = "category")
    List<Product> findByCategory(Category category);

    @EntityGraph(attributePaths = "category")
    List<Product> findByCategoryIdCategory(Integer categoryId);

    @EntityGraph(attributePaths = "category")
    List<Product> findByNomContainingIgnoreCase(String nom);

    @Query("SELECT p FROM Product p JOIN FETCH p.category WHERE p.category.idCategory = :categoryId ORDER BY p.prix ASC")
    List<Product> findByCategoryOrderByPrice(@Param("categoryId") Integer categoryId);

    @Query("SELECT p FROM Product p JOIN FETCH p.category WHERE p.stock > 0")
    List<Product> findAvailableProducts();

    @Query("SELECT p FROM Product p JOIN FETCH p.category WHERE p.category.idCategory = :categoryId AND p.idProduct != :excludeId AND p.stock > 0 ORDER BY p.prix ASC")
    List<Product> findSimilarProducts(@Param("categoryId") Integer categoryId, @Param("excludeId") Integer excludeId);

    @Query("SELECT p FROM Product p JOIN FETCH p.category WHERE p.category.idCategory IN :categoryIds AND p.idProduct NOT IN :excludeIds AND p.stock > 0 ORDER BY p.prix ASC")
    List<Product> findByCategoryExcluding(@Param("categoryIds") List<Integer> categoryIds, @Param("excludeIds") List<Integer> excludeIds);
}
