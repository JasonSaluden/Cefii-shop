package com.cefiishop.dto;

public class UserRegisterRequest {
    private String pseudo;
    private String mail;
    private String password;
    private String confirmPassword;

    public UserRegisterRequest() {
    }

    public UserRegisterRequest(String pseudo, String mail, String password, String confirmPassword) {
        this.pseudo = pseudo;
        this.mail = mail;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }

    public String getPseudo() {
        return pseudo;
    }

    public void setPseudo(String pseudo) {
        this.pseudo = pseudo;
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

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }
}

