package com.cefiishop.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class OrderResponse {
    private Integer id;
    private String status;
    private BigDecimal total;
    private LocalDateTime createdAt;
    private Integer userId;
    private String userPseudo;
    private List<OrderLineResponse> orderLines;

    public OrderResponse() {
    }

    public OrderResponse(Integer id, String status, BigDecimal total, LocalDateTime createdAt, Integer userId, String userPseudo, List<OrderLineResponse> orderLines) {
        this.id = id;
        this.status = status;
        this.total = total;
        this.createdAt = createdAt;
        this.userId = userId;
        this.userPseudo = userPseudo;
        this.orderLines = orderLines;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUserPseudo() {
        return userPseudo;
    }

    public void setUserPseudo(String userPseudo) {
        this.userPseudo = userPseudo;
    }

    public List<OrderLineResponse> getOrderLines() {
        return orderLines;
    }

    public void setOrderLines(List<OrderLineResponse> orderLines) {
        this.orderLines = orderLines;
    }
}

