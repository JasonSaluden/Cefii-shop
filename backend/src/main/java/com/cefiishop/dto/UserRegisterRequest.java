package com.cefiishop.dto;

// Représentation d'une requête de connexion d'utilisateur, contenant l'email et le mot de passe
public class UserRegisterRequest {
    private String mail;
    private String password;

    public UserRegisterRequest() {
    }

    public UserRegisterRequest(String mail, String password) {
        this.mail = mail;
        this.password = password;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

