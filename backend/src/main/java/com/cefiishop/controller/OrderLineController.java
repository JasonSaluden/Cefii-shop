package com.cefiishop.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cefiishop.dto.OrderLineRequest;
import com.cefiishop.dto.OrderLineResponse;
import com.cefiishop.service.OrderLineService;

// Contrôleur pour gérer les endpoints liés aux lignes de commande, notamment pour ajouter une ligne de commande à une commande existante,
//  récupérer les lignes de commande d'une commande donnée, récupérer une ligne de commande par son ID et supprimer une ligne de commande
@RestController
@RequestMapping("/api/orderlines")
@CrossOrigin(origins = "*")
public class OrderLineController {

    private final OrderLineService orderLineService;

    public OrderLineController(OrderLineService orderLineService) {
        this.orderLineService = orderLineService;
    }

    // Ajoute une ligne de commande à une commande existante
    @PostMapping("/orders/{orderId}")
    public ResponseEntity<OrderLineResponse> addOrderLine(
            @PathVariable Integer orderId,
            @RequestBody OrderLineRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(orderLineService.addOrderLine(orderId, request));
    }

    // Récupère les lignes de commande d'une commande donnée
    @GetMapping("/orders/{orderId}")
    public ResponseEntity<List<OrderLineResponse>> getOrderLinesByOrderId(@PathVariable Integer orderId) {
        return ResponseEntity.ok(orderLineService.getOrderLinesByOrderId(orderId));
    }

    // Récupère une ligne de commande par son ID
    @GetMapping("/{id}")
    public ResponseEntity<OrderLineResponse> getOrderLineById(@PathVariable Integer id) {
        return ResponseEntity.ok(orderLineService.getOrderLineById(id));
    }

    // Supprime une ligne de commande par son ID 
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrderLine(@PathVariable Integer id) {
        orderLineService.deleteOrderLine(id);
        return ResponseEntity.noContent().build();
    }
}
