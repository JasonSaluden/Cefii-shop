package com.cefiishop.repository;

import com.cefiishop.model.OrderLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

// Interface de repository pour gérer les opérations CRUD sur les lignes de commande, avec une méthode personnalisée pour 
// trouver les lignes d'une commande spécifique
@Repository
public interface OrderLineRepository extends JpaRepository<OrderLine, Integer> {

    @Query("SELECT ol FROM OrderLine ol WHERE ol.order.id = :orderId")
    List<OrderLine> findLinesByOrderId(@Param("orderId") Integer orderId);
}
