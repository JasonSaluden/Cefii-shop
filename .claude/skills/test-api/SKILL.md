---
name: test-api
description: Teste tous les endpoints de l'API REST du projet CefiiShop
allowed-tools: Bash
---

Exécute une suite de tests complète sur l'API CefiiShop (`http://localhost:8080`), endpoint par endpoint, dans l'ordre logique de dépendance.

## Données de test

- Email : `test-api@cefii.dev`
- Mot de passe : `TestApi123`
- Produit utilisé : id `1` (pour les orders, orderlines, recommendations, user-behavior)
- Catégorie utilisée : id `1`

## Instructions

Pour chaque étape :
1. Affiche un titre clair : `### [N/total] MÉTHODE /chemin`
2. Exécute le curl avec `-s -w "\nHTTP Status: %{http_code}"` et `-H "Content-Type: application/json"`
3. Affiche le status HTTP et la réponse (formatée avec `python -m json.tool` si possible)
4. Extrais les IDs nécessaires aux étapes suivantes avec `python` ou `grep` sur la réponse brute
5. Si le status est inattendu, affiche un avertissement mais **continue les étapes suivantes**

À la fin, affiche un **récapitulatif** : liste de tous les endpoints testés avec leur status HTTP et un indicateur OK / KO.

---

## Ordre des étapes

### Bloc 1 — Auth

**[1]** `POST /api/auth/register`
Body : `{"mail":"test-api@cefii.dev","password":"TestApi123"}`
Attendu : 201. Extraire `idUser` de la réponse → variable `USER_ID`.

**[2]** `POST /api/auth/login`
Body : `{"mail":"test-api@cefii.dev","password":"TestApi123"}`
Attendu : 200.

---

### Bloc 2 — Users

**[3]** `GET /api/users`
Attendu : 200.

**[4]** `GET /api/users/{USER_ID}`
Attendu : 200.

**[5]** `PUT /api/users/{USER_ID}`
Body : `{"mail":"test-api-updated@cefii.dev","password":"TestApi123"}`
Attendu : 200.

---

### Bloc 3 — Products

**[6]** `GET /api/products`
Attendu : 200.

**[7]** `GET /api/products/1`
Attendu : 200.

**[8]** `GET /api/products/search?nom=selle`
Attendu : 200.

**[9]** `GET /api/products/available`
Attendu : 200.

**[10]** `GET /api/products/category/1`
Attendu : 200.

**[11]** `GET /api/products/category/1/sorted`
Attendu : 200.

**[12]** `GET /api/products/1/recommendations`
Attendu : 200.

---

### Bloc 4 — Categories

**[13]** `GET /api/categories`
Attendu : 200.

**[14]** `GET /api/categories/1`
Attendu : 200.

**[15]** `GET /api/categories/search?nom=equipement`
Attendu : 200.

---

### Bloc 5 — Orders

**[16]** `POST /api/orders/users/{USER_ID}`
Body : `{"orderLines":[{"productId":1,"quantite":2,"prixUnitaire":299.99}]}`
Attendu : 201. Extraire `idOrder` → variable `ORDER_ID`.

**[17]** `GET /api/orders`
Attendu : 200.

**[18]** `GET /api/orders/{ORDER_ID}`
Attendu : 200.

**[19]** `GET /api/orders/users/{USER_ID}`
Attendu : 200.

**[20]** `PUT /api/orders/{ORDER_ID}/status`
Body : `{"status":"EN_COURS"}`
Attendu : 200.

---

### Bloc 6 — OrderLines

**[21]** `GET /api/orderlines/orders/{ORDER_ID}`
Attendu : 200. Extraire le premier `idOrderLine` → variable `ORDERLINE_ID`.

**[22]** `GET /api/orderlines/{ORDERLINE_ID}`
Attendu : 200.

**[23]** `POST /api/orderlines/orders/{ORDER_ID}`
Body : `{"productId":2,"quantite":1,"prixUnitaire":149.50}`
Attendu : 201. Extraire `idOrderLine` → variable `NEW_ORDERLINE_ID`.

**[24]** `DELETE /api/orderlines/{NEW_ORDERLINE_ID}`
Attendu : 204.

---

### Bloc 7 — Conversations (MongoDB)

**[25]** `POST /api/conversations`
Body : `{"userId":"{USER_ID}"}` (userId en string)
Attendu : 200. Extraire `id` → variable `CONV_ID`.

**[26]** `GET /api/conversations/{CONV_ID}`
Attendu : 200.

**[27]** `GET /api/conversations/user/{USER_ID}`
Attendu : 200.

**[28]** `POST /api/conversations/{CONV_ID}/messages`
Body : `{"role":"user","content":"Bonjour, je cherche une selle de dragon"}`
Attendu : 200.

---

### Bloc 8 — User Behavior (MongoDB)

**[29]** `POST /api/user-behavior/{USER_ID}/view/1`
Aucun body.
Attendu : 200.

**[30]** `GET /api/user-behavior/{USER_ID}`
Attendu : 200.

---

### Bloc 9 — Cleanup

**[31]** `DELETE /api/orders/{ORDER_ID}`
Attendu : 204.

**[32]** `DELETE /api/users/{USER_ID}`
Attendu : 204.

**[33]** `POST /api/auth/logout`
Aucun body.
Attendu : 200.

---

## Récapitulatif final

Affiche un tableau synthétique :

```
=== RÉSULTATS TEST-API ===
[1]  POST /api/auth/register           → 201 OK
[2]  POST /api/auth/login              → 200 OK
...
[33] POST /api/auth/logout             → 200 OK

TOTAL : X/33 OK
```

Si des étapes sont KO, liste-les séparément avec le status reçu.
