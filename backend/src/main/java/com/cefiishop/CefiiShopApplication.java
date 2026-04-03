package com.cefiishop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling // Permet le déclenchement d'évenements planifiés
@SpringBootApplication
public class CefiiShopApplication {
    public static void main(String[] args) {
        SpringApplication.run(CefiiShopApplication.class, args);
    }
}