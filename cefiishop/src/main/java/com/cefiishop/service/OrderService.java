package com.cefiishop.service;

import com.cefiishop.dto.CreateOrderRequest;
import com.cefiishop.dto.OrderLineRequest;
import com.cefiishop.dto.OrderLineResponse;
import com.cefiishop.dto.OrderResponse;
import com.cefiishop.model.Order;
import com.cefiishop.model.OrderLine;
import com.cefiishop.model.Product;
import com.cefiishop.model.User;
import com.cefiishop.repository.OrderRepository;
import com.cefiishop.repository.ProductRepository;
import com.cefiishop.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public OrderService(OrderRepository orderRepository, UserRepository userRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    @Transactional
    public OrderResponse createOrder(Integer userId, CreateOrderRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Utilisateur non trouvé"));

        Order order = new Order();
        order.setUser(user);
        order.setStatus(Order.OrderStatus.EN_ATTENTE);
        order.setTotal(BigDecimal.ZERO);

        BigDecimal total = BigDecimal.ZERO;
        List<OrderLine> orderLines = request.getOrderLines().stream()
                .map(lineRequest -> {
                    Product product = productRepository.findById(lineRequest.getProductId())
                            .orElseThrow(() -> new IllegalArgumentException("Produit non trouvé"));
                    
                    OrderLine orderLine = new OrderLine();
                    orderLine.setOrder(order);
                    orderLine.setProduct(product);
                    orderLine.setQuantite(lineRequest.getQuantite());
                    orderLine.setPrixUnitaire(lineRequest.getPrixUnitaire());
                    return orderLine;
                })
                .collect(Collectors.toList());

        for (OrderLine line : orderLines) {
            total = total.add(line.getPrixUnitaire().multiply(BigDecimal.valueOf(line.getQuantite())));
        }

        order.setOrderLines(orderLines);
        order.setTotal(total);

        Order savedOrder = orderRepository.save(order);
        return mapToResponse(savedOrder);
    }

    public OrderResponse getOrderById(Integer id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Commande non trouvée"));
        return mapToResponse(order);
    }

    public List<OrderResponse> getUserOrders(Integer userId) {
        return orderRepository.findOrdersByUserOrderByRecent(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public OrderResponse updateOrderStatus(Integer orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Commande non trouvée"));
        
        try {
            order.setStatus(Order.OrderStatus.valueOf(status));
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Statut invalide");
        }

        Order updatedOrder = orderRepository.save(order);
        return mapToResponse(updatedOrder);
    }

    public void deleteOrder(Integer id) {
        orderRepository.deleteById(id);
    }

    private OrderResponse mapToResponse(Order order) {
        List<OrderLineResponse> orderLines = order.getOrderLines().stream()
                .map(this::mapOrderLineToResponse)
                .collect(Collectors.toList());

        OrderResponse response = new OrderResponse();
        response.setId(order.getId());
        response.setStatus(order.getStatus().toString());
        response.setTotal(order.getTotal());
        response.setCreatedAt(order.getCreatedAt());
        response.setUserId(order.getUser().getId());
        response.setUserPseudo(order.getUser().getPseudo());
        response.setOrderLines(orderLines);
        return response;
    }

    private OrderLineResponse mapOrderLineToResponse(OrderLine orderLine) {
        OrderLineResponse response = new OrderLineResponse();
        response.setId(orderLine.getId());
        response.setOrderId(orderLine.getOrder().getId());
        response.setProductId(orderLine.getProduct().getIdProduct());
        response.setProductNom(orderLine.getProduct().getNom());
        response.setQuantite(orderLine.getQuantite());
        response.setPrixUnitaire(orderLine.getPrixUnitaire());
        response.setSousTotal(orderLine.getPrixUnitaire().multiply(BigDecimal.valueOf(orderLine.getQuantite())));
        return response;
    }
}
