package com.cefiishop.dto;

import java.util.List;

// Représentation d'une requête pour créer une commande, contenant une liste de lignes de commande
public class CreateOrderRequest {
    private List<OrderLineRequest> orderLines;

    public CreateOrderRequest() {
    }

    public CreateOrderRequest(List<OrderLineRequest> orderLines) {
        this.orderLines = orderLines;
    }

    public List<OrderLineRequest> getOrderLines() {
        return orderLines;
    }

    public void setOrderLines(List<OrderLineRequest> orderLines) {
        this.orderLines = orderLines;
    }
}

