package com.cefiishop.service;

import com.cefiishop.dto.CreateOrderRequest;
import com.cefiishop.dto.OrderLineRequest;
import com.cefiishop.model.Order;
import com.cefiishop.model.Product;
import com.cefiishop.model.User;
import com.cefiishop.repository.OrderRepository;
import com.cefiishop.repository.ProductRepository;
import com.cefiishop.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class OrderServiceUnitTest {

    @Mock
    private OrderRepository orderRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private OrderService orderService;

    @Test
    void createOrder_buildsTotalAndSaves() {
        User user = new User(); user.setId(1); user.setPseudo("u");
        when(userRepository.findById(1)).thenReturn(Optional.of(user));

        Product prod = new Product(); prod.setIdProduct(2); prod.setNom("p");
        when(productRepository.findById(2)).thenReturn(Optional.of(prod));

        OrderLineRequest lr = new OrderLineRequest(2, 3, BigDecimal.valueOf(10));
        CreateOrderRequest req = new CreateOrderRequest(List.of(lr));

        when(orderRepository.save(org.mockito.ArgumentMatchers.any())).thenAnswer(i -> {
            Order o = i.getArgument(0);
            o.setId(100);
            return o;
        });

        var resp = orderService.createOrder(1, req);
        assertEquals(100, resp.getId());
        assertEquals(0, resp.getTotal().compareTo(BigDecimal.valueOf(30)));
    }

    @Test
    void updateOrderStatus_invalidStatus_throws() {
        Order o = new Order(); o.setId(5); o.setStatus(Order.OrderStatus.EN_ATTENTE);
        when(orderRepository.findById(5)).thenReturn(Optional.of(o));
        assertThrows(IllegalArgumentException.class, () -> orderService.updateOrderStatus(5, "NOPE"));
    }
}
