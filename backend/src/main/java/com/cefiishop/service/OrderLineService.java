package com.cefiishop.service;

import com.cefiishop.dto.OrderLineRequest;
import com.cefiishop.dto.OrderLineResponse;
import com.cefiishop.model.OrderLine;
import com.cefiishop.model.Order;
import com.cefiishop.model.Product;
import com.cefiishop.repository.OrderLineRepository;
import com.cefiishop.repository.OrderRepository;
import com.cefiishop.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

// Service pour gérer les opérations liées aux lignes de commande, pas entierement utilisé pour le moment dans le projet
@Service
public class OrderLineService {

    private final OrderLineRepository orderLineRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    public OrderLineService(OrderLineRepository orderLineRepository, OrderRepository orderRepository, ProductRepository productRepository) {
        this.orderLineRepository = orderLineRepository;
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    public OrderLineResponse addOrderLine(Integer orderId, OrderLineRequest request) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Commande non trouvée"));

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new IllegalArgumentException("Produit non trouvé"));

        OrderLine orderLine = new OrderLine();
        orderLine.setOrder(order);
        orderLine.setProduct(product);
        orderLine.setQuantite(request.getQuantite());
        orderLine.setPrixUnitaire(request.getPrixUnitaire());

        OrderLine savedOrderLine = orderLineRepository.save(orderLine);
        
        // Recalculer le total de la commande
        recalculateOrderTotal(order);

        return mapToResponse(savedOrderLine);
    }

    public List<OrderLineResponse> getOrderLinesByOrderId(Integer orderId) {
        return orderLineRepository.findLinesByOrderId(orderId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public OrderLineResponse getOrderLineById(Integer id) {
        OrderLine orderLine = orderLineRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Ligne de commande non trouvée"));
        return mapToResponse(orderLine);
    }

    public void deleteOrderLine(Integer id) {
        OrderLine orderLine = orderLineRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Ligne de commande non trouvée"));
        
        Order order = orderLine.getOrder();
        orderLineRepository.deleteById(id);
        
        // Recalculer le total de la commande
        recalculateOrderTotal(order);
    }

    private void recalculateOrderTotal(Order order) {
        BigDecimal total = BigDecimal.ZERO;
        for (OrderLine line : order.getOrderLines()) {
            total = total.add(line.getPrixUnitaire().multiply(BigDecimal.valueOf(line.getQuantite())));
        }
        order.setTotal(total);
        orderRepository.save(order);
    }

    private OrderLineResponse mapToResponse(OrderLine orderLine) {
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
