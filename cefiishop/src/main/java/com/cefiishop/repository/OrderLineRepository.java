package com.cefiishop.repository;

import com.cefiishop.model.OrderLine;
import com.cefiishop.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderLineRepository extends JpaRepository<OrderLine, Integer> {
    List<OrderLine> findByOrder(Order order);
    List<OrderLine> findByOrderId(Integer orderId);
    
    @Query("SELECT ol FROM OrderLine ol WHERE ol.order.id = :orderId")
    List<OrderLine> findLinesByOrderId(@Param("orderId") Integer orderId);
}
