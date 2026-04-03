package com.cefiishop.dto;

import java.time.LocalDateTime;

public class UserResponse {
    private Integer id;
    private String mail;
    private String role;
    private LocalDateTime createdAt;

    public UserResponse() {
    }

    public UserResponse(Integer id, String mail, String role, LocalDateTime createdAt) {
        this.id = id;
        this.mail = mail;
        this.role = role;
        this.createdAt = createdAt;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}

