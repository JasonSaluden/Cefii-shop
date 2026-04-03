package com.cefiishop.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "user_behavior")
public class UserBehavior {

    @Id
    private String id;
    @Indexed(unique = true)
    private Integer userId;
    private List<ProductView> viewedProducts = new ArrayList<>();

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }
    public List<ProductView> getViewedProducts() { return viewedProducts; }
    public void setViewedProducts(List<ProductView> viewedProducts) { this.viewedProducts = viewedProducts; }

    public static class ProductView {
        private Integer productId;
        private LocalDateTime viewedAt = LocalDateTime.now();

        public Integer getProductId() { return productId; }
        public void setProductId(Integer productId) { this.productId = productId; }
        public LocalDateTime getViewedAt() { return viewedAt; }
        public void setViewedAt(LocalDateTime viewedAt) { this.viewedAt = viewedAt; }
    }
}
