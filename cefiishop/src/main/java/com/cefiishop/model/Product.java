package com.cefiishop.model;

import java.math.BigDecimal;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_product")
    private Integer idProduct;

    @Column(nullable = false, length = 150)
    private String nom;

    @Column(length = 250)
    private String description;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal prix;

    @Column(nullable = false, columnDefinition = "int default 0")
    private Integer stock;

    @Column(length = 150, name = "img_url")
    private String imgUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_category", referencedColumnName = "id_category")
    private Category category;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderLine> orderLines;

    public Product() {}

    public Product(Integer idProduct, String nom, String description, BigDecimal prix,
                   Integer stock, String imgUrl, Category category, List<OrderLine> orderLines) {
        this.idProduct = idProduct;
        this.nom = nom;
        this.description = description;
        this.prix = prix;
        this.stock = stock;
        this.imgUrl = imgUrl;
        this.category = category;
        this.orderLines = orderLines;
    }

    public Integer getIdProduct() { return idProduct; }
    public void setIdProduct(Integer idProduct) { this.idProduct = idProduct; }
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public BigDecimal getPrix() { return prix; }
    public void setPrix(BigDecimal prix) { this.prix = prix; }
    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }
    public String getImgUrl() { return imgUrl; }
    public void setImgUrl(String imgUrl) { this.imgUrl = imgUrl; }
    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }
    public List<OrderLine> getOrderLines() { return orderLines; }
    public void setOrderLines(List<OrderLine> orderLines) { this.orderLines = orderLines; }
}
