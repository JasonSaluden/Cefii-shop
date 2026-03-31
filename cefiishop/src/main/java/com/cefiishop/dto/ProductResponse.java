package com.cefiishop.dto;

import java.math.BigDecimal;

public class ProductResponse {
    private Integer idProduct;
    private String nom;
    private String description;
    private BigDecimal prix;
    private Integer stock;
    private String imgUrl;
    private Integer idCategory;
    private String categoryNom;

    public ProductResponse() {
    }

    public ProductResponse(Integer idProduct, String nom, String description, BigDecimal prix, Integer stock, String imgUrl, Integer idCategory, String categoryNom) {
        this.idProduct = idProduct;
        this.nom = nom;
        this.description = description;
        this.prix = prix;
        this.stock = stock;
        this.imgUrl = imgUrl;
        this.idCategory = idCategory;
        this.categoryNom = categoryNom;
    }

    public Integer getIdProduct() {
        return idProduct;
    }

    public void setIdProduct(Integer idProduct) {
        this.idProduct = idProduct;
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

    public BigDecimal getPrix() {
        return prix;
    }

    public void setPrix(BigDecimal prix) {
        this.prix = prix;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public Integer getIdCategory() {
        return idCategory;
    }

    public void setIdCategory(Integer idCategory) {
        this.idCategory = idCategory;
    }

    public String getCategoryNom() {
        return categoryNom;
    }

    public void setCategoryNom(String categoryNom) {
        this.categoryNom = categoryNom;
    }
}

