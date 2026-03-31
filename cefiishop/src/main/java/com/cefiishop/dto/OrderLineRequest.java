package com.cefiishop.dto;

import java.math.BigDecimal;

public class OrderLineRequest {
    private Integer productId;
    private Integer quantite;
    private BigDecimal prixUnitaire;

    public OrderLineRequest() {
    }

    public OrderLineRequest(Integer productId, Integer quantite, BigDecimal prixUnitaire) {
        this.productId = productId;
        this.quantite = quantite;
        this.prixUnitaire = prixUnitaire;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
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
}

