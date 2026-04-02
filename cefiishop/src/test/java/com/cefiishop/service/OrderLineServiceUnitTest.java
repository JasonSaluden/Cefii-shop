package com.cefiishop.service;

import com.cefiishop.dto.OrderLineRequest;
import com.cefiishop.model.Order;
import com.cefiishop.model.OrderLine;
import com.cefiishop.model.Product;
import com.cefiishop.repository.OrderLineRepository;
import com.cefiishop.repository.OrderRepository;
import com.cefiishop.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class OrderLineServiceUnitTest {

    @Mock
    private OrderLineRepository orderLineRepository;
    @Mock
    private OrderRepository orderRepository;
    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private OrderLineService orderLineService;

    @Test
    void addOrderLine_recalculatesOrderTotal() {
        Order order = new Order(); order.setId(1); order.setOrderLines(new java.util.ArrayList<>());
        Product p = new Product(); p.setIdProduct(2); p.setPrix(BigDecimal.valueOf(5));
        when(orderRepository.findById(1)).thenReturn(Optional.of(order));
        when(productRepository.findById(2)).thenReturn(Optional.of(p));
        when(orderLineRepository.save(any())).thenAnswer(i -> {
            OrderLine ol = i.getArgument(0);
            ol.setId(10);
            return ol;
        });

        OrderLineRequest req = new OrderLineRequest(2, 3, BigDecimal.valueOf(5));
        var resp = orderLineService.addOrderLine(1, req);

        assertEquals(10, resp.getId());
        verify(orderRepository, atLeastOnce()).save(any());
    }

    @Test
    void deleteOrderLine_removesAndRecalculates() {
        Order o = new Order(); o.setId(2); o.setOrderLines(new java.util.ArrayList<>());
        OrderLine ol = new OrderLine(); ol.setId(20); ol.setOrder(o); ol.setPrixUnitaire(BigDecimal.valueOf(3)); ol.setQuantite(2);
        o.getOrderLines().add(ol);
        when(orderLineRepository.findById(20)).thenReturn(Optional.of(ol));
        doNothing().when(orderLineRepository).deleteById(20);

        orderLineService.deleteOrderLine(20);

        verify(orderLineRepository).deleteById(20);
        verify(orderRepository).save(any());
    }

    @Test
    void getOrderLinesByOrderId_mapsResponses() {
        OrderLine ol = new OrderLine(); ol.setId(30); ol.setQuantite(1); ol.setPrixUnitaire(BigDecimal.valueOf(7));
        Order parent = new Order(); parent.setId(3);
        ol.setOrder(parent);
        Product prod = new Product(); prod.setIdProduct(99); prod.setNom("X");
        ol.setProduct(prod);
        when(orderLineRepository.findLinesByOrderId(3)).thenReturn(List.of(ol));
        var res = orderLineService.getOrderLinesByOrderId(3);
        assertEquals(1, res.size());
        assertEquals(30, res.get(0).getId());
    }
}
