package com.cefiishop.dto;

public class CategoryResponse {
    private Integer idCategory;
    private String nom;
    private String description;

    public CategoryResponse() {
    }

    public CategoryResponse(Integer idCategory, String nom, String description) {
        this.idCategory = idCategory;
        this.nom = nom;
        this.description = description;
    }

    public Integer getIdCategory() {
        return idCategory;
    }

    public void setIdCategory(Integer idCategory) {
        this.idCategory = idCategory;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}

