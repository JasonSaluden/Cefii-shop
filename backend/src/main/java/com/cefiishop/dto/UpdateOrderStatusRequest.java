package com.cefiishop.dto;

// Représentation d'une requête pour mettre à jour le statut d'une commande
public class UpdateOrderStatusRequest {
    private String status;

    public UpdateOrderStatusRequest() {
    }

    public UpdateOrderStatusRequest(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

