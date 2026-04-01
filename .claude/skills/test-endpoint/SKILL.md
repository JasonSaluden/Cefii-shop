---
name: test-endpoint
description: Teste un endpoint de l'API REST du projet CefiiShop
argument-hint: "[METHOD] [/api/path] [JSON body optionnel]"
allowed-tools: Bash
---

Teste l'endpoint API suivant : $ARGUMENTS

## Instructions

1. Parse les arguments :
   - `$0` = méthode HTTP (GET, POST, PUT, DELETE) — défaut : GET
   - `$1` = chemin de l'endpoint (ex: /api/products)
   - `$2` = body JSON optionnel (ex: {"mail":"test@test.com","password":"123"})

2. Construis et exécute la requête curl vers `http://localhost:8080` :
   - Ajoute toujours `-s` (silent) et `-w "\nHTTP Status: %{http_code}"` pour afficher le status code
   - Ajoute `-H "Content-Type: application/json"` pour toutes les requêtes
   - Pour POST/PUT, ajoute `-d '<body>'`
   - Formate la réponse JSON avec `| python -m json.tool` si possible

3. Affiche clairement :
   - La requête exécutée
   - Le code HTTP retourné
   - La réponse formatée

## Exemples d'utilisation

- `/test-endpoint GET /api/products`
- `/test-endpoint GET /api/products/1`
- `/test-endpoint POST /api/auth/register {"mail":"test@test.com","password":"Azerty123"}`
- `/test-endpoint POST /api/auth/login {"mail":"test@test.com","password":"Azerty123"}`
- `/test-endpoint PUT /api/users/1 {"mail":"nouveau@gmail.com","password":"NewPass"}`
- `/test-endpoint DELETE /api/users/1`
