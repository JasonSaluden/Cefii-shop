# Contexte du projet — CDA E-Commerce IA

## Vue d'ensemble

Projet réalisé dans le cadre du titre **Concepteur Développeur d'Application (CDA)**.
Développement d'une application e-commerce intégrant des fonctionnalités d'intelligence artificielle.
Durée : **4 jours**, en équipe de 3 personnes, en autonomie dans un contexte simulant un environnement professionnel.

---

## Problématique métier

Une entreprise fictive de vente en ligne souhaite refondre son site e-commerce pour :
- Améliorer son taux de conversion (actuellement faible)
- Personnaliser l'expérience utilisateur
- Automatiser la relation client via l'IA
- Guider les utilisateurs dans leurs choix produits

---

## Stack technique imposée

| Couche | Technologie |
|---|---|
| **Backend** | Java 17+, Spring Boot, Spring AI, API REST |
| **Frontend** | React, Angular ou Vue.js |
| **Base SQL** | MySQL (données structurées) |
| **Base NoSQL** | MongoDB (conversations, logs IA, données non structurées) |
| **IA** | API externe ou modèle local, NLP, prompt engineering |
| **DevOps** | Docker, Docker Compose, GitHub Actions (CI/CD) |

---

## Architecture

```
Frontend  →  API REST (Spring Boot + Spring AI)  →  MySQL + MongoDB  →  Service IA (externe ou local)
```

Séparation stricte des responsabilités :
- **Couche présentation** — Frontend
- **Couche métier** — Spring Boot / Spring AI
- **Couche accès aux données** — MySQL + MongoDB

---

## Fonctionnalités

### E-commerce (core)
- Affichage du catalogue produits
- Fiche produit détaillée
- Système de recherche simple
- Gestion du panier

### IA — Chatbot intelligent (prioritaire)
- Répondre aux questions utilisateurs
- Proposer des produits adaptés
- Maintenir un contexte conversationnel
- Interroger un modèle d'IA et enrichir les réponses avec les données produits
- Stocker les conversations dans MongoDB

### IA — Recommandation de produits (prioritaire)
- Produits similaires
- Suggestions personnalisées
- Filtrage par règles (catégorie, prix)
- Approches : similarité de contenu, embeddings (optionnel)

### Fonctionnalités avancées (optionnelles)
- Historique utilisateur
- Personnalisation basée sur le comportement

---

## Modélisation des données

### MySQL (données structurées)
- `User`
- `Product`
- `Category`
- `Order`
- `OrderLine`

### MongoDB (données non structurées / IA)
- `conversations`
- `logs IA`
- Données non structurées diverses

Livrables attendus : MCD, MLD, justification des choix SQL vs NoSQL.

---

## Organisation de l'équipe

| Rôle | Responsabilités |
|---|---|
| Backend / IA | API REST, Spring Boot, Spring AI, intégration modèle IA |
| Frontend | Interface utilisateur, connexion à l'API, intégration chatbot |
| DevOps / Data | Docker, CI/CD, bases de données, modélisation |

> Chaque membre doit participer aux différentes parties du projet.

---

## Méthodologie & Outils

- **Agile Scrum simplifié** : 1 sprint de 4 jours, daily meetings, démo finale
- **GitHub** : repository, Issues, Pull Requests, GitHub Projects (Kanban)
- Colonnes Kanban : `Backlog` → `To Do` → `In Progress` → `Review` → `Done`

---

## Planning 4 jours

| Jour | Objectifs |
|---|---|
| **Jour 1** | Analyse du besoin, conception BDD, initialisation des projets, mise en place du Kanban |
| **Jour 2** | Développement API REST, connexion MySQL + MongoDB, intégration IA, premier chatbot fonctionnel |
| **Jour 3** | Développement frontend, connexion API, intégration chatbot, système de recommandation |
| **Jour 4** | Dockerisation complète, CI/CD, tests, préparation de la démo |

---

## Livrables attendus

- **Code source** : repository GitHub propre et structuré
- **Application** : fonctionnelle via Docker
- **Documentation** : README complet, schémas de données, description de l'architecture
- **DevOps** : `Dockerfile(s)`, `docker-compose.yml`, pipeline GitHub Actions

---

## Critères de réussite

- Application fonctionnelle
- Intégration effective de l'IA (chatbot + recommandation visibles)
- Cohérence technique globale
- Qualité du code et respect des bonnes pratiques
- Capacité à expliquer les choix techniques

---

## Bonnes pratiques

- Prioriser un **MVP fonctionnel** avant d'optimiser
- Ne pas surcomplexifier les fonctionnalités IA
- Utiliser l'IA pour accélérer le développement
- Tester régulièrement
- Commiter fréquemment avec des messages clairs
- Documenter les choix techniques au fil du développement
