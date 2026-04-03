package com.cefiishop.dto;

import java.math.BigDecimal;

// Représentation d'une ligne de commande pour les réponses API, incluant les détails du produit et les calculs de prix
public class OrderLineResponse {
    private Integer id;
    private Integer orderId;
    private Integer productId;
    private String productNom;
    private Integer quantite;
    private BigDecimal prixUnitaire;
    private BigDecimal sousTotal;

    public OrderLineResponse() {
    }

    public OrderLineResponse(Integer id, Integer orderId, Integer productId, String productNom, Integer quantite, BigDecimal prixUnitaire, BigDecimal sousTotal) {
        this.id = id;
        this.orderId = orderId;
        this.productId = productId;
        this.productNom = productNom;
        this.quantite = quantite;
        this.prixUnitaire = prixUnitaire;
        this.sousTotal = sousTotal;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public String getProductNom() {
        return productNom;
    }

    public void setProductNom(String productNom) {
        this.productNom = productNom;
    }

    public Integer getQuantite() {
        return quantite;
    }

    public void setQuantite(Integer quantite) {
        this.quantite = quantite;
    }

    public BigDecimal getPrixUnitaire() {
        return prixUnitaire;
    }

    public void setPrixUnitaire(BigDecimal prixUnitaire) {
        this.prixUnitaire = prixUnitaire;
    }

    public BigDecimal getSousTotal() {
        return sousTotal;
    }

    public void setSousTotal(BigDecimal sousTotal) {
        this.sousTotal = sousTotal;
    }
}

