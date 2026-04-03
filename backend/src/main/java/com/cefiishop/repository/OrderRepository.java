package com.cefiishop.repository;

import com.cefiishop.model.Order;
import com.cefiishop.model.Order.OrderStatus;
import com.cefiishop.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

// Interface de repository pour gérer les opérations CRUD sur les commandes, avec des méthodes personnalisées pour trouver les commandes d'un utilisateur, 
// les commandes par statut, les commandes récentes d'un utilisateur
@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findByUser(User user);
    List<Order> findByUserId(Integer userId);
    List<Order> findByStatus(OrderStatus status);
    
    @Query("SELECT o FROM Order o WHERE o.user.id = :userId ORDER BY o.createdAt DESC")
    List<Order> findOrdersByUserOrderByRecent(@Param("userId") Integer userId);
    
    @Query("SELECT o FROM Order o WHERE o.createdAt BETWEEN :startDate AND :endDate")
    List<Order> findOrdersByDateRange(@Param("startDate") LocalDateTime startDate, 
                                      @Param("endDate") LocalDateTime endDate);
}
