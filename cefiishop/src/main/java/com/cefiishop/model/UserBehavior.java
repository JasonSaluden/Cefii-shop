package com.cefiishop.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "user_behavior")
public class UserBehavior {

    @Id
    private String id;

    private Long userId;

    private List<ProductView> viewedProducts = new ArrayList<>();

    @Data
    public static class ProductView {
        private Long productId; 
        private LocalDateTime viewedAt = LocalDateTime.now();
    }
}
