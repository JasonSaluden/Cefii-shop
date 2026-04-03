package com.cefiishop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

// Point d'entrée de l'application Spring Boot, avec l'annotation @EnableScheduling pour permettre les tâches planifiées 
@EnableScheduling 
@SpringBootApplication
public class CefiiShopApplication {
    public static void main(String[] args) {
        SpringApplication.run(CefiiShopApplication.class, args);
    }
}